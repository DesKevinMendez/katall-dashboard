<script setup lang="ts">
import { ref, computed } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionGroup } from 'vue'
import BasePagination from './BasePagination.vue'

interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

interface Props {
  columns: TableColumn[]
  data: Record<string, unknown>[]
  title?: string
  subtitle?: string
  loading?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
  showItemsPerPage?: boolean
}

interface Emits {
  (e: 'action', action: string, row: Record<string, unknown>): void
  (e: 'page-change', page: number): void
  (e: 'items-per-page-change', itemsPerPage: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showItemsPerPage: true,
})

const emit = defineEmits<Emits>()

const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortedData = computed(() => {
  if (!sortColumn.value) return props.data

  return [...props.data].sort((a, b) => {
    let aValue: string | number | Date = a[sortColumn.value!] as string | number
    let bValue: string | number | Date = b[sortColumn.value!] as string | number

    // Handle date sorting for common date columns
    if (
      sortColumn.value === 'dateTime' ||
      sortColumn.value === 'purchaseDate' ||
      sortColumn.value === 'createdAt' ||
      sortColumn.value === 'created'
    ) {
      aValue = new Date(aValue as string)
      bValue = new Date(bValue as string)
    }

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
})

function handleSort(column: string) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function handlePageChange(page: number) {
  emit('page-change', page)
}

function handleItemsPerPageChange(itemsPerPage: number) {
  emit('items-per-page-change', itemsPerPage)
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
    <!-- Header -->
    <div v-if="title || subtitle" class="px-6 py-4 border-b border-gray-700">
      <h2 v-if="title" class="text-xl font-semibold text-white mb-1">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-gray-400 text-sm">
        {{ subtitle }}
      </p>
    </div>

    <!-- Items per page selector -->
    <div v-if="showItemsPerPage && pagination" class="px-6 py-3 border-b border-gray-700">
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-400">Registros por página:</label>
        <select
          :value="pagination.itemsPerPage"
          @change="handleItemsPerPageChange(Number(($event.target as HTMLSelectElement).value))"
          class="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header -->
        <thead class="bg-gray-750">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider',
                column.width ? `w-${column.width}` : '',
              ]"
            >
              <div class="flex items-center gap-2">
                <span>{{ column.label }}</span>
                <button
                  v-if="column.sortable"
                  @click="handleSort(column.key)"
                  class="flex flex-col text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    :class="[
                      'h-3 w-3',
                      sortColumn === column.key && sortDirection === 'asc' ? 'text-white' : '',
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                  <svg
                    :class="[
                      'h-3 w-3 -mt-1',
                      sortColumn === column.key && sortDirection === 'desc' ? 'text-white' : '',
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="bg-gray-800 divide-y divide-gray-700">
          <template v-if="loading">
            <tr v-for="i in 5" :key="`loading-${i}`" class="animate-pulse">
              <td v-for="column in columns" :key="column.key" class="px-6 py-4">
                <div class="h-4 bg-gray-700 rounded"></div>
              </td>
            </tr>
          </template>

          <tr v-else-if="data.length === 0">
            <td :colspan="columns.length" class="px-6 py-8 text-center text-gray-400">
              No data available
            </td>
          </tr>

          <TransitionGroup
            v-else
            name="fade"
            tag="tr"
            v-for="(row, index) in sortedData"
            :key="`${row.name || index}-${index}`"
            class="hover:bg-gray-750 transition-colors"
          >
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap">
              <!-- Actions slot -->
              <slot v-if="column.key === 'actions'" name="actions" :row="row" :column="column">
                <!-- Default actions content -->
                <div class="text-sm text-gray-300">
                  {{ row[column.key] }}
                </div>
              </slot>

              <!-- Custom slot for each column -->
              <slot
                v-else
                :name="`cell-${column.key}`"
                :row="row"
                :value="row[column.key]"
                :column="column"
              >
                <!-- Default cell content -->
                <div class="text-sm text-gray-300">
                  {{ row[column.key] }}
                </div>
              </slot>
            </td>
          </TransitionGroup>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <BasePagination
      v-if="pagination"
      :current-page="pagination.currentPage"
      :total-pages="pagination.totalPages"
      :total-items="pagination.totalItems"
      :items-per-page="pagination.itemsPerPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
