<script setup lang="ts">
import BaseBadge from '@/template/BaseBadge.vue'
import BaseTable from '@/template/BaseTable.vue'
import BaseIconButton from '@/template/BaseIconButton.vue'
import SidebarModal from '@/template/SidebarModal.vue'
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

// Modal state
const isModalOpen = ref(false)
const selectedOrder = ref<TradeOrder | null>(null)
const tokenAmount = ref(1)

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
  selectedOrder.value = order
  isModalOpen.value = true
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
        variant="primary"
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

  <!-- Sidebar Modal -->
  <SidebarModal
    v-model:is-open="isModalOpen"
    :title="
      selectedOrder
        ? `${selectedOrder.action} Tokens to ${selectedOrder.advertiser.name}`
        : 'Trade Details'
    "
  >
    <div v-if="selectedOrder" class="space-y-6">
      <!-- Advertiser Instructions -->
      <div>
        <h3 class="text-sm font-medium text-gray-300 mb-2">Advertiser Instructions</h3>
        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <p class="text-gray-700 text-sm">
            I will send payment immediately after receiving tokens. Please ensure your payment
            details are correct.
          </p>
        </div>
      </div>

      <!-- Transaction Details -->
      <div>
        <h3 class="text-sm font-medium text-gray-300 mb-3">Transaction Details</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-gray-300">Payment Time Limit:</span>
            </div>
            <span class="text-white font-medium">15 minutes</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-gray-300">Average Pay Time:</span>
            </div>
            <span class="text-white font-medium">8 minutes</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
              <span class="text-gray-300">Total Availability:</span>
            </div>
            <span class="text-white font-medium">{{ selectedOrder.availableAmount }} tokens</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
              <span class="text-gray-300">Price per Token:</span>
            </div>
            <span class="text-white font-medium">{{ formatCurrency(selectedOrder.price) }}</span>
          </div>
        </div>
      </div>

      <!-- Amount Input -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Amount of Tokens to {{ selectedOrder.action }}
        </label>
        <input
          type="number"
          v-model="tokenAmount"
          min="1"
          :max="selectedOrder.availableAmount"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="mt-2">
          <span class="text-gray-300">You will receive: </span>
          <span class="text-green-500 font-medium">{{
            formatCurrency(tokenAmount * selectedOrder.price)
          }}</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Select Your Payment Method
        </label>
        <select
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="method in selectedOrder.paymentMethods" :key="method" :value="method">
            {{ method }}
          </option>
        </select>
      </div>

      <!-- Warning Box -->
      <div class="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-800">
              Make sure to verify all details before confirming. Once confirmed, you'll be committed
              to this transaction.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <BaseIconButton
          variant="primary"
          size="lg"
          class="w-full"
          @click="handleAction(selectedOrder.action.toLowerCase(), selectedOrder)"
        >
          <template #icon>
            <IconShoppingCart v-if="selectedOrder.action === 'Buy'" class="w-5 h-5" />
            <IconCash v-else class="w-5 h-5" />
          </template>
          Confirm {{ selectedOrder.action }}
        </BaseIconButton>
        <BaseIconButton variant="default" size="lg" class="w-full" @click="isModalOpen = false">
          Cancel
        </BaseIconButton>
      </div>
    </div>
  </SidebarModal>
</template>
