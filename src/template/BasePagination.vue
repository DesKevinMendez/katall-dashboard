<script setup lang="ts">
import { computed } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  showInfo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showInfo: true,
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

function goToPrevious() {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

function goToNext() {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}

function getVisiblePages(): number[] {
  const pages: number[] = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4 border-t border-gray-700">
    <!-- Info -->
    <div v-if="showInfo" class="text-sm text-gray-400">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
    </div>

    <!-- Pagination -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <button
        @click="goToPrevious"
        :disabled="currentPage === 1"
        class="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <IconChevronLeft class="h-4 w-4" />
        Previous
      </button>

      <!-- Page numbers -->
      <div class="flex items-center gap-1">
        <!-- First page -->
        <button
          v-if="getVisiblePages()[0] > 1"
          @click="goToPage(1)"
          class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          1
        </button>

        <!-- Ellipsis -->
        <span v-if="getVisiblePages()[0] > 2" class="px-2 text-gray-500"> ... </span>

        <!-- Visible pages -->
        <button
          v-for="page in getVisiblePages()"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm transition-colors',
            page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white',
          ]"
        >
          {{ page }}
        </button>

        <!-- Ellipsis -->
        <span
          v-if="getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1"
          class="px-2 text-gray-500"
        >
          ...
        </span>

        <!-- Last page -->
        <button
          v-if="getVisiblePages()[getVisiblePages().length - 1] < totalPages"
          @click="goToPage(totalPages)"
          class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next button -->
      <button
        @click="goToNext"
        :disabled="currentPage === totalPages"
        class="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <IconChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
