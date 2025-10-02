<script setup lang="ts">
import BaseBadge from '@/template/BaseBadge.vue'

interface OverviewData {
  offeringType: string
  creationDate: string
  totalInvestors: number
  tokenName: string
  blockchain: string
  status: string
  totalTransactions: number
  totalIssuances: number
}

interface Props {
  data: OverviewData
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-2xl font-bold text-white mb-2">Offering Details</h3>
      <p class="text-gray-400 text-sm">Detailed information about this offering.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <div>
          <p class="text-gray-400 text-sm mb-1">Offering Type</p>
          <p class="text-white font-semibold">{{ data.offeringType }}</p>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Creation Date</p>
          <p class="text-white font-semibold">{{ data.creationDate }}</p>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Total Investors</p>
          <p class="text-white font-semibold">{{ data.totalInvestors }}</p>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Token Name</p>
          <p class="text-white font-semibold">{{ data.tokenName }}</p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <div>
          <p class="text-gray-400 text-sm mb-1">Blockchain</p>
          <p class="text-white font-semibold">{{ data.blockchain }}</p>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Status</p>
          <BaseBadge variant="active">{{ data.status }}</BaseBadge>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Total Transactions</p>
          <p class="text-white font-semibold">{{ data.totalTransactions }}</p>
        </div>

        <div>
          <p class="text-gray-400 text-sm mb-1">Total Issuances</p>
          <p class="text-white font-semibold">{{ data.totalIssuances }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
