<script setup lang="ts">
interface Transaction {
  investor: string
  amount: number
  tokens: number
  date: string
}

interface Props {
  transactions: Transaction[]
}

defineProps<Props>()

const emit = defineEmits<{
  viewAllTransactions: []
}>()

function handleViewAll() {
  emit('viewAllTransactions')
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-2xl font-bold text-white mb-2">Recent Transactions</h3>
      <p class="text-gray-400 text-sm">Recent investment transactions for this offering.</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="text-left py-3 px-4 text-gray-400 text-sm font-medium">Investor</th>
            <th class="text-left py-3 px-4 text-gray-400 text-sm font-medium">Amount</th>
            <th class="text-left py-3 px-4 text-gray-400 text-sm font-medium">Tokens</th>
            <th class="text-left py-3 px-4 text-gray-400 text-sm font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="`${transaction.investor}-${transaction.date}`"
            class="border-b border-gray-700 last:border-b-0"
          >
            <td class="py-4 px-4">
              <span class="text-white font-semibold">{{ transaction.investor }}</span>
            </td>
            <td class="py-4 px-4">
              <span class="text-white font-semibold"
                >${{ transaction.amount.toLocaleString() }}</span
              >
            </td>
            <td class="py-4 px-4">
              <span class="text-white">{{ transaction.tokens.toLocaleString() }}</span>
            </td>
            <td class="py-4 px-4">
              <span class="text-white">{{ transaction.date }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 text-center">
      <button
        @click="handleViewAll"
        class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        View All Transactions
      </button>
    </div>
  </div>
</template>
