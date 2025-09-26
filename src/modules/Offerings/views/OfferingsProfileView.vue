<script setup lang="ts">
import { useRouter } from 'vue-router'
import ViewHead from '@/template/ViewHead.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseCard from '@/template/BaseCard.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import ProgressBar from '@/template/ProgressBar.vue'
import { IconArrowLeft, IconPlus, IconFlame } from '@tabler/icons-vue'

const router = useRouter()

function goBackToOfferings() {
  router.push('/offerings')
}

// Mock data for the offering
const offering = {
  name: 'Series A',
  type: 'Equity offering',
  status: 'Active',
  createdDate: 'October 15, 2023 at 04:30 AM',
  totalAmount: 1000000,
  amountRaised: 750000,
  tokenPrice: 10.0,
  totalTokens: 1000000,
  tokensSold: 750000,
}

function calculateProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}

function stopOffering() {
  console.log('Stop offering')
}

function issueTokens() {
  console.log('Issue tokens')
}

function burnTokens() {
  console.log('Burn tokens')
}
</script>

<template>
  <div>
    <ViewHead title="Offering Details" subtitle="View and manage your offering details." />
    <div class="px-6 pb-6 space-y-6">
      <BaseButton @click="goBackToOfferings">
        <IconArrowLeft class="h-4 w-4 mr-2" />
        Back to Offerings
      </BaseButton>

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
                <p class="text-white font-bold text-lg">
                  ${{ offering.totalAmount.toLocaleString() }}
                </p>
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
                  :percentage="
                    calculateProgressPercentage(offering.amountRaised, offering.totalAmount)
                  "
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
                  :percentage="
                    calculateProgressPercentage(offering.tokensSold, offering.totalTokens)
                  "
                />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-3">
            <button
              @click="stopOffering"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Offering
            </button>
            <button
              @click="issueTokens"
              class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <IconPlus class="h-4 w-4" />
              Issue Tokens
            </button>
            <button
              @click="burnTokens"
              class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <IconFlame class="h-4 w-4" />
              Burn Tokens
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
