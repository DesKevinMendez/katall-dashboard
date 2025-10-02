<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
</script>

<template>
  <div>
    <ViewHead title="Investor Dashboard" />

    <div class="space-y-6">
      <div class="bg-gray-800 rounded-lg p-6">
        <h1 class="text-2xl font-bold text-white mb-4">Welcome to Investor Dashboard</h1>
        <p class="text-gray-300">
          This is the investor dashboard home view. Here you can manage your investments, view
          portfolio performance, and access investor-specific features.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Portfolio Overview</h3>
          <p class="text-gray-300 text-sm">
            View your investment portfolio and performance metrics.
          </p>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Recent Investments</h3>
          <p class="text-gray-300 text-sm">Track your latest investment activities and updates.</p>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Market Insights</h3>
          <p class="text-gray-300 text-sm">Access market data and investment opportunities.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
