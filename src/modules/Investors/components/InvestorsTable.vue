<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '@/template/BaseTable.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import { IconEye } from '@tabler/icons-vue'

interface Investor extends Record<string, unknown> {
  fullName: string
  country: string
  kycStatus: 'Verified' | 'Pending' | 'Rejected'
  tokenAmount: number
  offering: string
  purchaseDate: string
}

const columns = [
  { key: 'fullName', label: 'Full Name', sortable: true },
  { key: 'country', label: 'Country', sortable: true },
  { key: 'kycStatus', label: 'KYC Status', sortable: true },
  { key: 'tokenAmount', label: 'Token Amount', sortable: true },
  { key: 'offering', label: 'Offering', sortable: true },
  { key: 'purchaseDate', label: 'Purchase Date', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

const originalInvestors: Investor[] = [
  {
    fullName: 'John Smith',
    country: 'United States',
    kycStatus: 'Verified',
    tokenAmount: 25000,
    offering: 'Series A',
    purchaseDate: 'Oct 15, 2023',
  },
  {
    fullName: 'Maria Garcia',
    country: 'Spain',
    kycStatus: 'Verified',
    tokenAmount: 15000,
    offering: 'Seed Round',
    purchaseDate: 'Sep 22, 2023',
  },
  {
    fullName: 'Hiroshi Tanaka',
    country: 'Japan',
    kycStatus: 'Pending',
    tokenAmount: 30000,
    offering: 'Series A',
    purchaseDate: 'Nov 5, 2023',
  },
  {
    fullName: 'Sophie Dubois',
    country: 'France',
    kycStatus: 'Verified',
    tokenAmount: 10000,
    offering: 'Pre-Seed Round',
    purchaseDate: 'Aug 18, 2023',
  },
  {
    fullName: 'Ahmed Al-Farsi',
    country: 'UAE',
    kycStatus: 'Verified',
    tokenAmount: 50000,
    offering: 'Series A',
    purchaseDate: 'Oct 30, 2023',
  },
  {
    fullName: 'Emma Wilson',
    country: 'United Kingdom',
    kycStatus: 'Rejected',
    tokenAmount: 0,
    offering: 'Series A',
    purchaseDate: 'Nov 2, 2023',
  },
  {
    fullName: 'Carlos Rodriguez',
    country: 'Mexico',
    kycStatus: 'Verified',
    tokenAmount: 20000,
    offering: 'Seed Round',
    purchaseDate: 'Sep 15, 2023',
  },
  {
    fullName: 'Anna Kowalski',
    country: 'Poland',
    kycStatus: 'Verified',
    tokenAmount: 18000,
    offering: 'Series A',
    purchaseDate: 'Oct 8, 2023',
  },
  {
    fullName: 'David Chen',
    country: 'Singapore',
    kycStatus: 'Pending',
    tokenAmount: 35000,
    offering: 'Series B',
    purchaseDate: 'Nov 12, 2023',
  },
  {
    fullName: 'Lisa Anderson',
    country: 'Canada',
    kycStatus: 'Verified',
    tokenAmount: 12000,
    offering: 'Seed Round',
    purchaseDate: 'Sep 28, 2023',
  },
  {
    fullName: 'Roberto Silva',
    country: 'Brazil',
    kycStatus: 'Verified',
    tokenAmount: 28000,
    offering: 'Series A',
    purchaseDate: 'Oct 22, 2023',
  },
  {
    fullName: 'Yuki Nakamura',
    country: 'Japan',
    kycStatus: 'Pending',
    tokenAmount: 22000,
    offering: 'Pre-Seed Round',
    purchaseDate: 'Nov 8, 2023',
  },
  {
    fullName: 'Michael Brown',
    country: 'Australia',
    kycStatus: 'Verified',
    tokenAmount: 40000,
    offering: 'Series A',
    purchaseDate: 'Oct 5, 2023',
  },
  {
    fullName: 'Elena Petrov',
    country: 'Russia',
    kycStatus: 'Rejected',
    tokenAmount: 0,
    offering: 'Series B',
    purchaseDate: 'Nov 15, 2023',
  },
  {
    fullName: 'James Wilson',
    country: 'United Kingdom',
    kycStatus: 'Verified',
    tokenAmount: 32000,
    offering: 'Series A',
    purchaseDate: 'Sep 30, 2023',
  },
]

const investors = ref<Investor[]>([...originalInvestors])
const router = useRouter()

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = computed(() => originalInvestors.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

// Paginated data
const paginatedInvestors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return investors.value.slice(start, end)
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

  investors.value = [...originalInvestors].sort((a, b) => {
    let aValue: string | number | Date = a[column as keyof Investor] as string | number
    let bValue: string | number | Date = b[column as keyof Investor] as string | number

    // Handle date sorting for 'purchaseDate' column
    if (column === 'purchaseDate') {
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
  const investor = row as unknown as Investor

  if (action === 'view') {
    // Use the investor name as ID for navigation (you can change this to use a different field)
    const investorId = investor.fullName.toLowerCase().replace(/\s+/g, '-')
    router.push(`/investors/${investorId}`)
  }

  console.log(`Action: ${action}`, investor)
}

function getKycStatusVariant(status: string): 'verified' | 'pending' | 'rejected' | 'default' {
  const statusMap: Record<string, 'verified' | 'pending' | 'rejected' | 'default'> = {
    verified: 'verified',
    pending: 'pending',
    rejected: 'rejected',
  }
  return statusMap[status.toLowerCase()] || 'default'
}

function formatTokenAmount(amount: number): string {
  return amount.toLocaleString()
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
    :data="paginatedInvestors"
    :pagination="pagination"
    @sort="handleSort"
    @action="handleAction"
    @page-change="handlePageChange"
    @items-per-page-change="handleItemsPerPageChange"
  >
    <template #cell-kycStatus="{ value }">
      <BaseBadge :variant="getKycStatusVariant(value as string)">
        {{ value }}
      </BaseBadge>
    </template>

    <template #cell-tokenAmount="{ value }">
      <div class="text-sm text-white">
        {{ formatTokenAmount(value as number) }}
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
