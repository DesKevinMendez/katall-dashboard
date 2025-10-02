<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '@/template/BaseTable.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import TransactionDetailsModal from './TransactionDetailsModal.vue'
import { IconEye } from '@tabler/icons-vue'

interface Transaction extends Record<string, unknown> {
  type: string
  token: string
  amount: number
  valueUsd: number
  investor: string
  offering: string
  status: 'Completed' | 'Pending' | 'Failed'
  dateTime: string
}

const columns = [
  { key: 'type', label: 'Type', sortable: true },
  { key: 'token', label: 'Token', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'valueUsd', label: 'Value (USD)', sortable: true },
  { key: 'investor', label: 'Investor', sortable: true },
  { key: 'offering', label: 'Offering', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'dateTime', label: 'Date & Time', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

const originalTransactions: Transaction[] = [
  {
    type: 'Investment',
    token: 'ETH',
    amount: 10,
    valueUsd: 25000,
    investor: 'John Smith',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Oct 15, 2023, 04:30 AM',
  },
  {
    type: 'Investment',
    token: 'USDT',
    amount: 15000,
    valueUsd: 15000,
    investor: 'Maria Garcia',
    offering: 'Seed Round',
    status: 'Completed',
    dateTime: 'Sep 22, 2023, 08:15 AM',
  },
  {
    type: 'Investment',
    token: 'BTC',
    amount: 0.5,
    valueUsd: 30000,
    investor: 'Hiroshi Tanaka',
    offering: 'Series A',
    status: 'Pending',
    dateTime: 'Nov 5, 2023, 03:45 AM',
  },
  {
    type: 'Investment',
    token: 'SOL',
    amount: 100,
    valueUsd: 10000,
    investor: 'Sophie Dubois',
    offering: 'Pre-Seed Round',
    status: 'Completed',
    dateTime: 'Aug 18, 2023, 10:20 AM',
  },
  {
    type: 'Investment',
    token: 'ETH',
    amount: 20,
    valueUsd: 50000,
    investor: 'Ahmed Al-Farsi',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Oct 30, 2023, 05:10 AM',
  },
  {
    type: 'Investment',
    token: 'USDC',
    amount: 20000,
    valueUsd: 20000,
    investor: 'Emma Wilson',
    offering: 'Series A',
    status: 'Failed',
    dateTime: 'Nov 2, 2023, 07:25 AM',
  },
  {
    type: 'Investment',
    token: 'BTC',
    amount: 0.3,
    valueUsd: 20000,
    investor: 'Carlos Rodriguez',
    offering: 'Seed Round',
    status: 'Completed',
    dateTime: 'Sep 15, 2023, 02:40 AM',
  },
  {
    type: 'Investment',
    token: 'ETH',
    amount: 15,
    valueUsd: 37500,
    investor: 'Anna Kowalski',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Oct 8, 2023, 11:30 AM',
  },
  {
    type: 'Investment',
    token: 'USDT',
    amount: 25000,
    valueUsd: 25000,
    investor: 'David Chen',
    offering: 'Series B',
    status: 'Pending',
    dateTime: 'Nov 12, 2023, 09:15 AM',
  },
  {
    type: 'Investment',
    token: 'SOL',
    amount: 200,
    valueUsd: 20000,
    investor: 'Lisa Anderson',
    offering: 'Seed Round',
    status: 'Completed',
    dateTime: 'Sep 28, 2023, 01:45 PM',
  },
  {
    type: 'Investment',
    token: 'BTC',
    amount: 0.8,
    valueUsd: 40000,
    investor: 'Roberto Silva',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Oct 22, 2023, 06:20 PM',
  },
  {
    type: 'Investment',
    token: 'USDC',
    amount: 30000,
    valueUsd: 30000,
    investor: 'Yuki Nakamura',
    offering: 'Pre-Seed Round',
    status: 'Pending',
    dateTime: 'Nov 8, 2023, 12:10 PM',
  },
  {
    type: 'Investment',
    token: 'ETH',
    amount: 25,
    valueUsd: 62500,
    investor: 'Michael Brown',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Oct 5, 2023, 03:30 AM',
  },
  {
    type: 'Investment',
    token: 'USDT',
    amount: 50000,
    valueUsd: 50000,
    investor: 'Elena Petrov',
    offering: 'Series B',
    status: 'Failed',
    dateTime: 'Nov 15, 2023, 08:45 AM',
  },
  {
    type: 'Investment',
    token: 'BTC',
    amount: 1.2,
    valueUsd: 60000,
    investor: 'James Wilson',
    offering: 'Series A',
    status: 'Completed',
    dateTime: 'Sep 30, 2023, 04:15 PM',
  },
]

const transactions = ref<Transaction[]>([...originalTransactions])
const router = useRouter()

// Modal state
const isModalOpen = ref(false)
const selectedTransaction = ref<Transaction | null>(null)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = computed(() => originalTransactions.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

// Paginated data
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return transactions.value.slice(start, end)
})

// Pagination object
const pagination = computed(() => ({
  currentPage: currentPage.value,
  totalPages: totalPages.value,
  totalItems: totalItems.value,
  itemsPerPage: itemsPerPage.value,
}))

function handleAction(action: string, row: Record<string, unknown>) {
  const transaction = row as unknown as Transaction

  if (action === 'view') {
    selectedTransaction.value = transaction
    isModalOpen.value = true
  }

  console.log(`Action: ${action}`, transaction)
}

function handleCloseModal() {
  isModalOpen.value = false
  selectedTransaction.value = null
}

function getStatusVariant(status: string): 'verified' | 'pending' | 'rejected' | 'default' {
  const statusMap: Record<string, 'verified' | 'pending' | 'rejected' | 'default'> = {
    completed: 'verified',
    pending: 'pending',
    failed: 'rejected',
  }
  return statusMap[status.toLowerCase()] || 'default'
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function formatAmount(amount: number): string {
  return amount.toLocaleString()
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleItemsPerPageChange(newItemsPerPage: number) {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1
}
</script>

<template>
  <BaseTable
    :columns="columns"
    :data="paginatedTransactions"
    :pagination="pagination"
    @action="handleAction"
    @page-change="handlePageChange"
    @items-per-page-change="handleItemsPerPageChange"
  >
    <template #cell-status="{ value }">
      <BaseBadge :variant="getStatusVariant(value as string)">
        {{ value }}
      </BaseBadge>
    </template>

    <template #cell-valueUsd="{ value }">
      <div class="text-sm text-white">
        {{ formatCurrency(value as number) }}
      </div>
    </template>

    <template #cell-amount="{ value }">
      <div class="text-sm text-white">
        {{ formatAmount(value as number) }}
      </div>
    </template>

    <template #actions="{ row }">
      <div class="flex items-center gap-2">
        <button
          @click="handleAction('view', row)"
          class="text-gray-400 hover:text-white transition-colors p-1"
          title="Ver más"
        >
          <IconEye class="h-4 w-4" />
        </button>
      </div>
    </template>
  </BaseTable>

  <!-- Transaction Details Modal -->
  <TransactionDetailsModal
    :is-open="isModalOpen"
    :transaction="selectedTransaction"
    @close="handleCloseModal"
  />
</template>
