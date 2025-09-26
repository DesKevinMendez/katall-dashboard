<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '@/template/BaseTable.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import ProgressBar from '@/template/ProgressBar.vue'
import { IconEye } from '@tabler/icons-vue'

interface Offering extends Record<string, unknown> {
  name: string
  type: string
  raised: number
  target: number
  chain: string
  issuances: number
  status: 'Active' | 'Closed' | 'Review' | 'Validated'
  created: string
}

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'raised', label: 'Raised', sortable: true },
  { key: 'chain', label: 'Chain', sortable: true },
  { key: 'issuances', label: 'Issuances', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

const originalOfferings: Offering[] = [
  {
    name: 'Series A',
    type: 'Equity',
    raised: 750000,
    target: 1000000,
    chain: 'Bitcoin',
    issuances: 5,
    status: 'Active',
    created: 'Oct 15, 2023',
  },
  {
    name: 'Seed Round',
    type: 'Equity',
    raised: 450000,
    target: 500000,
    chain: 'Bitcoin',
    issuances: 3,
    status: 'Active',
    created: 'Aug 20, 2023',
  },
  {
    name: 'Pre-Seed Round',
    type: 'Equity',
    raised: 250000,
    target: 250000,
    chain: 'Bitcoin',
    issuances: 1,
    status: 'Closed',
    created: 'May 10, 2023',
  },
  {
    name: 'Series B',
    type: 'Equity',
    raised: 0,
    target: 2000000,
    chain: 'Bitcoin',
    issuances: 0,
    status: 'Review',
    created: 'Nov 5, 2023',
  },
  {
    name: 'Convertible Note',
    type: 'Equity',
    raised: 150000,
    target: 300000,
    chain: 'Bitcoin',
    issuances: 2,
    status: 'Validated',
    created: 'Sep 12, 2023',
  },
  {
    name: 'Series C',
    type: 'Equity',
    raised: 2000000,
    target: 5000000,
    chain: 'Ethereum',
    issuances: 8,
    status: 'Active',
    created: 'Dec 1, 2023',
  },
  {
    name: 'Bridge Round',
    type: 'Equity',
    raised: 800000,
    target: 1200000,
    chain: 'Bitcoin',
    issuances: 4,
    status: 'Active',
    created: 'Nov 20, 2023',
  },
  {
    name: 'Strategic Round',
    type: 'Equity',
    raised: 500000,
    target: 500000,
    chain: 'Ethereum',
    issuances: 2,
    status: 'Closed',
    created: 'Oct 30, 2023',
  },
  {
    name: 'Series D',
    type: 'Equity',
    raised: 0,
    target: 10000000,
    chain: 'Bitcoin',
    issuances: 0,
    status: 'Review',
    created: 'Dec 10, 2023',
  },
  {
    name: 'Token Sale',
    type: 'Token',
    raised: 3000000,
    target: 5000000,
    chain: 'Ethereum',
    issuances: 15,
    status: 'Active',
    created: 'Nov 15, 2023',
  },
  {
    name: 'Private Sale',
    type: 'Token',
    raised: 1200000,
    target: 2000000,
    chain: 'Bitcoin',
    issuances: 6,
    status: 'Validated',
    created: 'Oct 5, 2023',
  },
  {
    name: 'Public Sale',
    type: 'Token',
    raised: 0,
    target: 3000000,
    chain: 'Ethereum',
    issuances: 0,
    status: 'Review',
    created: 'Dec 20, 2023',
  },
  {
    name: 'Pre-Series A',
    type: 'Equity',
    raised: 300000,
    target: 500000,
    chain: 'Bitcoin',
    issuances: 3,
    status: 'Active',
    created: 'Sep 8, 2023',
  },
  {
    name: 'Friends & Family',
    type: 'Equity',
    raised: 100000,
    target: 200000,
    chain: 'Bitcoin',
    issuances: 1,
    status: 'Closed',
    created: 'Jul 15, 2023',
  },
  {
    name: 'Angel Round',
    type: 'Equity',
    raised: 200000,
    target: 300000,
    chain: 'Ethereum',
    issuances: 2,
    status: 'Validated',
    created: 'Aug 25, 2023',
  },
  {
    name: 'Series E',
    type: 'Equity',
    raised: 0,
    target: 15000000,
    chain: 'Bitcoin',
    issuances: 0,
    status: 'Review',
    created: 'Jan 5, 2024',
  },
  {
    name: 'Growth Round',
    type: 'Equity',
    raised: 5000000,
    target: 8000000,
    chain: 'Ethereum',
    issuances: 12,
    status: 'Active',
    created: 'Dec 15, 2023',
  },
  {
    name: 'Expansion Round',
    type: 'Equity',
    raised: 1800000,
    target: 2500000,
    chain: 'Bitcoin',
    issuances: 7,
    status: 'Active',
    created: 'Nov 28, 2023',
  },
  {
    name: 'Mezzanine Round',
    type: 'Equity',
    raised: 0,
    target: 5000000,
    chain: 'Ethereum',
    issuances: 0,
    status: 'Review',
    created: 'Jan 10, 2024',
  },
  {
    name: 'IPO Preparation',
    type: 'Equity',
    raised: 0,
    target: 20000000,
    chain: 'Bitcoin',
    issuances: 0,
    status: 'Review',
    created: 'Jan 15, 2024',
  },
]

const offerings = ref<Offering[]>([...originalOfferings])
const router = useRouter()

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = computed(() => originalOfferings.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

// Paginated data
const paginatedOfferings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return offerings.value.slice(start, end)
})

// Pagination object
const pagination = computed(() => ({
  currentPage: currentPage.value,
  totalPages: totalPages.value,
  totalItems: totalItems.value,
  itemsPerPage: itemsPerPage.value,
}))

function handleSort(column: string, direction: 'asc' | 'desc') {
  console.log(`Sorting by ${column} in ${direction} order`)

  offerings.value = [...originalOfferings].sort((a, b) => {
    let aValue: string | number | Date = a[column as keyof Offering] as string | number
    let bValue: string | number | Date = b[column as keyof Offering] as string | number

    // Handle date sorting for 'created' column
    if (column === 'created') {
      aValue = new Date(aValue as string)
      bValue = new Date(bValue as string)
    }

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
}

function handleAction(action: string, row: Record<string, unknown>) {
  const offering = row as unknown as Offering

  if (action === 'view') {
    // Use the offering name as ID for navigation (you can change this to use a different field)
    const offeringId = offering.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/offerings/${offeringId}`)
  }

  console.log(`Action: ${action}`, offering)
}

function getStatusVariant(
  status: string,
): 'active' | 'closed' | 'review' | 'validated' | 'default' {
  const statusMap: Record<string, 'active' | 'closed' | 'review' | 'validated' | 'default'> = {
    active: 'active',
    closed: 'closed',
    review: 'review',
    validated: 'validated',
  }
  return statusMap[status.toLowerCase()] || 'default'
}

function calculateProgressPercentage(raised: number, target: number): number {
  if (target === 0) return 0
  return Math.round((raised / target) * 100)
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleItemsPerPageChange(newItemsPerPage: number) {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1 // Reset to first page when changing items per page
}
</script>

<template>
  <BaseTable
    :columns="columns"
    :data="paginatedOfferings"
    :pagination="pagination"
    title="All Offerings"
    subtitle="Manage and track all your equity offerings"
    @sort="handleSort"
    @action="handleAction"
    @page-change="handlePageChange"
    @items-per-page-change="handleItemsPerPageChange"
  >
    <template #cell-status="{ value }">
      <BaseBadge :variant="getStatusVariant(value as string)">
        {{ value }}
      </BaseBadge>
    </template>

    <template #cell-raised="{ row }">
      <div class="flex flex-col">
        <div class="text-sm text-white">
          ${{ ((row.raised as number) || 0).toLocaleString() }} / ${{
            ((row.target as number) || 1).toLocaleString()
          }}
        </div>
        <div class="mt-1">
          <ProgressBar
            :percentage="
              calculateProgressPercentage((row.raised as number) || 0, (row.target as number) || 1)
            "
          />
        </div>
      </div>
    </template>

    <template #actions="{ row }">
      <div class="flex items-center gap-2">
        <button
          @click="handleAction('view', row)"
          class="text-gray-400 hover:text-white transition-colors p-1"
          title="View details"
        >
          <IconEye class="h-4 w-4" />
        </button>
      </div>
    </template>
  </BaseTable>
</template>
