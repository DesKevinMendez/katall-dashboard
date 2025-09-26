<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import ProgressBar from '@/template/ProgressBar.vue'
import { IconPlus, IconFlame } from '@tabler/icons-vue'

interface Offering {
  name: string
  type: string
  status: string
  createdDate: string
  totalAmount: number
  amountRaised: number
  tokenPrice: number
  totalTokens: number
  tokensSold: number
}

interface Props {
  offering: Offering
}

defineProps<Props>()

const emit = defineEmits<{
  stopOffering: []
  issueTokens: []
  burnTokens: []
}>()

function calculateProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}

function handleStopOffering() {
  emit('stopOffering')
}

function handleIssueTokens() {
  emit('issueTokens')
}

function handleBurnTokens() {
  emit('burnTokens')
}
</script>

<template>
  <BaseCard>
    <div class="relative">
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">{{ offering.name }}</h2>
          <p class="text-gray-400 text-sm">
            {{ offering.type }} created on {{ offering.createdDate }}
          </p>
        </div>
        <BaseBadge variant="active">{{ offering.status }}</BaseBadge>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <!-- Column 1 - Total Amount & Total Tokens -->
        <div class="space-y-4">
          <div>
            <p class="text-gray-400 text-sm mb-1">Total Amount</p>
            <p class="text-white font-bold text-lg">${{ offering.totalAmount.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm mb-1">Total Tokens</p>
            <p class="text-white font-bold text-lg">
              {{ offering.totalTokens.toLocaleString() }}
            </p>
          </div>
        </div>

        <!-- Column 2 - Amount Raised -->
        <div class="space-y-4">
          <div>
            <p class="text-gray-400 text-sm mb-1">Amount Raised</p>
            <p class="text-white font-bold text-lg">
              ${{ offering.amountRaised.toLocaleString() }}
            </p>
          </div>
          <div>
            <ProgressBar
              :percentage="calculateProgressPercentage(offering.amountRaised, offering.totalAmount)"
            />
          </div>
        </div>

        <!-- Column 3 - Token Price -->
        <div>
          <p class="text-gray-400 text-sm mb-1">Token Price</p>
          <p class="text-white font-bold text-lg">${{ offering.tokenPrice.toFixed(2) }}</p>
        </div>

        <!-- Column 4 - Tokens Sold -->
        <div class="space-y-4">
          <div>
            <p class="text-gray-400 text-sm mb-1">Tokens Sold</p>
            <p class="text-white font-bold text-lg">
              {{ offering.tokensSold.toLocaleString() }}
            </p>
          </div>
          <div>
            <ProgressBar
              :percentage="calculateProgressPercentage(offering.tokensSold, offering.totalTokens)"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3">
        <button
          @click="handleStopOffering"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Stop Offering
        </button>
        <button
          @click="handleIssueTokens"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <IconPlus class="h-4 w-4" />
          Issue Tokens
        </button>
        <button
          @click="handleBurnTokens"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <IconFlame class="h-4 w-4" />
          Burn Tokens
        </button>
      </div>
    </div>
  </BaseCard>
</template>
