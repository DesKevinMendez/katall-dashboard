<script setup lang="ts">
import BaseModal from '@/template/BaseModal.vue'
import BaseBadge from '@/template/BaseBadge.vue'

interface Transaction {
  type: string
  token: string
  amount: number
  valueUsd: number
  investor: string
  offering: string
  status: 'Completed' | 'Pending' | 'Failed'
  dateTime: string
}

interface Props {
  isOpen: boolean
  transaction: Transaction | null
}

const props = defineProps<Props>()

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
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

function generateTransactionId(): string {
  return `tx_${Math.random().toString(36).substr(2, 10)}`
}
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    title="Transaction Details"
    :subtitle="
      transaction ? `Detailed information about transaction ${generateTransactionId()}` : ''
    "
    size="md"
    @close="handleClose"
  >
    <div v-if="transaction" class="space-y-4">
      <div class="grid grid-cols-1 gap-4">
        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Transaction ID:</span>
          <span class="text-white font-mono text-sm">{{ generateTransactionId() }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Type:</span>
          <span class="text-white">{{ transaction.type }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Token:</span>
          <span class="text-white font-semibold">{{ transaction.token }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Amount of Tokens:</span>
          <span class="text-white"
            >{{ formatAmount(transaction.amount) }} {{ transaction.token }}</span
          >
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Value of Tokens (USD):</span>
          <span class="text-white font-semibold">{{ formatCurrency(transaction.valueUsd) }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Investor:</span>
          <span class="text-white">{{ transaction.investor }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Offering:</span>
          <span class="text-white">{{ transaction.offering }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-gray-700">
          <span class="text-gray-400">Status:</span>
          <BaseBadge :variant="getStatusVariant(transaction.status)">
            {{ transaction.status }}
          </BaseBadge>
        </div>

        <div class="flex justify-between items-center py-2">
          <span class="text-gray-400">Timestamp:</span>
          <span class="text-white">{{ transaction.dateTime }}</span>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-400">No transaction data available</p>
    </div>
  </BaseModal>
</template>
