<script setup lang="ts">
import BaseBadge from '@/template/BaseBadge.vue'
import BaseTable from '@/template/BaseTable.vue'
import BaseIconButton from '@/template/BaseIconButton.vue'
import { IconArrowsUpDown, IconShoppingCart, IconCash } from '@tabler/icons-vue'
import { computed, ref } from 'vue'

interface TradeOrder extends Record<string, unknown> {
  id: number
  type: 'Sell' | 'Buy'
  advertiser: {
    name: string
    trades: number
    completion: string
    positive: string
  }
  token: string
  availableAmount: number
  price: number
  total: number
  paymentMethods: string[]
  action: string
}

const columns = [
  { key: 'type', label: 'Type', sortable: true },
  { key: 'advertiser', label: 'Advertiser', sortable: true },
  { key: 'token', label: 'Token', sortable: true },
  { key: 'availableAmount', label: 'Available Amount', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'paymentMethods', label: 'Payment Methods', sortable: false },
  { key: 'actions', label: 'Action', sortable: false },
]

const originalOrders: TradeOrder[] = [
  {
    id: 1,
    type: 'Sell',
    advertiser: {
      name: 'Emma Johnson',
      trades: 87,
      completion: '100%',
      positive: '97.5%',
    },
    token: 'GreenEnergy',
    availableAmount: 50,
    price: 20,
    total: 1000,
    paymentMethods: ['Bank Transfer', 'Bitcoin Lightning'],
    action: 'Buy',
  },
  {
    id: 2,
    type: 'Sell',
    advertiser: {
      name: 'Sarah Davis',
      trades: 213,
      completion: '99.5%',
      positive: '98.7%',
    },
    token: 'AI Solutions',
    availableAmount: 200,
    price: 11,
    total: 2200,
    paymentMethods: ['USDT (Solana)', 'Bitcoin Lightning'],
    action: 'Buy',
  },
  {
    id: 3,
    type: 'Buy',
    advertiser: {
      name: 'John Smith',
      trades: 156,
      completion: '98.7%',
      positive: '99.2%',
    },
    token: 'AI Solutions',
    availableAmount: 100,
    price: 10,
    total: 1000,
    paymentMethods: ['Bank Transfer', 'Nubank'],
    action: 'Sell',
  },
  {
    id: 4,
    type: 'Buy',
    advertiser: {
      name: 'Michael Brown',
      trades: 42,
      completion: '95.2%',
      positive: '94.8%',
    },
    token: 'MedTech',
    availableAmount: 75,
    price: 15,
    total: 1125,
    paymentMethods: ['Bank Transfer', 'Nequi'],
    action: 'Sell',
  },
]

const orders = ref<TradeOrder[]>([...originalOrders])

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = computed(() => originalOrders.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

// Paginated data
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return orders.value.slice(start, end)
})

// Pagination object
const pagination = computed(() => ({
  currentPage: currentPage.value,
  totalPages: totalPages.value,
  totalItems: totalItems.value,
  itemsPerPage: itemsPerPage.value,
}))

function handleAction(action: string, row: Record<string, unknown>) {
  const order = row as unknown as TradeOrder
  console.log(`Action: ${action}`, order)
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleItemsPerPageChange(newItemsPerPage: number) {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`
}
</script>

<template>
  <BaseTable
    :columns="columns"
    :data="paginatedOrders"
    :pagination="pagination"
    @action="handleAction"
    @page-change="handlePageChange"
    @items-per-page-change="handleItemsPerPageChange"
  >
    <template #cell-type="{ value }">
      <BaseBadge :variant="value === 'Sell' ? 'default' : 'verified'">
        {{ value }}
      </BaseBadge>
    </template>

    <template #cell-advertiser="{ value }">
      <div class="flex flex-col">
        <a href="#" class="text-blue-500 hover:text-blue-400 text-sm font-medium">
          {{ (value as TradeOrder['advertiser']).name }}
        </a>
        <div class="text-xs text-gray-400 space-y-0.5">
          <div>{{ (value as TradeOrder['advertiser']).trades }} trades</div>
          <div>{{ (value as TradeOrder['advertiser']).completion }} completion</div>
          <div>{{ (value as TradeOrder['advertiser']).positive }} positive</div>
        </div>
      </div>
    </template>

    <template #cell-token="{ value }">
      <div class="text-sm text-white font-medium">
        {{ value }}
      </div>
    </template>

    <template #cell-availableAmount="{ value }">
      <div class="text-sm text-white">
        {{ value }}
      </div>
    </template>

    <template #cell-price="{ value }">
      <div class="flex items-center gap-1">
        <span class="text-sm text-white">{{ formatCurrency(value as number) }}</span>
        <IconArrowsUpDown class="w-4 h-4 text-gray-400" />
      </div>
    </template>

    <template #cell-total="{ value }">
      <div class="text-sm text-white">
        {{ formatCurrency(value as number) }}
      </div>
    </template>

    <template #cell-paymentMethods="{ value }">
      <div class="flex flex-wrap gap-1">
        <BaseBadge
          v-for="method in (value as string[]).slice(0, 2)"
          :key="method"
          variant="default"
          class="text-xs"
        >
          {{ method }}
        </BaseBadge>
        <BaseBadge v-if="(value as string[]).length > 2" variant="default" class="text-xs">
          +{{ (value as string[]).length - 2 }}
        </BaseBadge>
      </div>
    </template>
    <template #actions="{ row }">
      <BaseIconButton
        variant="default"
        size="sm"
        @click="handleAction((row as TradeOrder).action.toLowerCase(), row)"
      >
        <template #icon>
          <IconShoppingCart v-if="(row as TradeOrder).action === 'Buy'" class="w-4 h-4" />
          <IconCash v-else class="w-4 h-4" />
        </template>
        {{ (row as TradeOrder).action }}
      </BaseIconButton>
    </template>
  </BaseTable>
</template>
