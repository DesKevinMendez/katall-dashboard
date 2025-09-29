<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'

interface Investment {
  offering: string
  amount: number
  date: string
  tokens: number
}

// Mock data for investments
const investments: Investment[] = [
  {
    offering: 'Series A',
    amount: 300000,
    date: 'November 5, 2023',
    tokens: 30000,
  },
  {
    offering: 'Seed Round',
    amount: 150000,
    date: 'September 22, 2023',
    tokens: 15000,
  },
  {
    offering: 'Pre-Seed Round',
    amount: 100000,
    date: 'August 18, 2023',
    tokens: 10000,
  },
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function formatNumber(number: number): string {
  return number.toLocaleString()
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-bold text-white mb-2">Investment History</h3>
      <p class="text-sm text-gray-400">All investments made by this investor in your startup.</p>
    </div>

    <div class="space-y-4">
      <BaseCard v-for="investment in investments" :key="investment.offering" class="bg-gray-750">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p class="text-sm text-gray-400 mb-1">Offering</p>
            <p class="text-white font-semibold">{{ investment.offering }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-400 mb-1">Amount</p>
            <p class="text-white font-semibold">{{ formatCurrency(investment.amount) }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-400 mb-1">Date</p>
            <p class="text-white font-semibold">{{ investment.date }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-400 mb-1">Tokens</p>
            <p class="text-white font-semibold">{{ formatNumber(investment.tokens) }}</p>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
