<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/template/BaseButton.vue'
import { IconUsers } from '@tabler/icons-vue'

interface Investor {
  name: string
  amountInvested: number
  tokensPurchased: number
}

interface Props {
  investors: Investor[]
  totalInvestors: number
}

defineProps<Props>()

const router = useRouter()

function handleViewProfile(investorName: string) {
  // Convert investor name to URL-friendly format
  const investorId = investorName.toLowerCase().replace(/\s+/g, '-')
  router.push(`/investors/${investorId}`)
}

function handleViewAll() {
  router.push('/investors')
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-2xl font-bold text-white mb-2">Top Investors</h3>
        <p class="text-gray-400 text-sm">Lead investors who have participated in this offering.</p>
      </div>
      <div class="flex items-center gap-2 text-gray-400 text-sm">
        <IconUsers class="h-4 w-4" />
        <span>{{ totalInvestors }} total investors</span>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="investor in investors"
        :key="investor.name"
        class="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0"
      >
        <div class="flex-1">
          <h4 class="text-white font-semibold mb-1">{{ investor.name }}</h4>
          <div class="flex gap-6 text-sm">
            <div>
              <span class="text-gray-400">Amount Invested: </span>
              <span class="text-white font-medium"
                >${{ investor.amountInvested.toLocaleString() }}</span
              >
            </div>
            <div>
              <span class="text-gray-400">Tokens Purchased: </span>
              <span class="text-white font-medium">{{
                investor.tokensPurchased.toLocaleString()
              }}</span>
            </div>
          </div>
        </div>
        <BaseButton variant="ghost" size="sm" @click="handleViewProfile(investor.name)">
          View Investor Profile
        </BaseButton>
      </div>
    </div>

    <div class="mt-6 text-center">
      <button
        @click="handleViewAll"
        class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        View All Investors
      </button>
    </div>
  </div>
</template>
