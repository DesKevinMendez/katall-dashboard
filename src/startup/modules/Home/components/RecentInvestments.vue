<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
</script>

<template>
  <BaseCard>
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-white mb-1">Recent Investments</h2>
      <p class="text-sm text-gray-400">Latest investments in your offerings</p>
    </div>

    <div class="space-y-4">
      <!-- Investment 1 -->
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-white">John Smith</p>
          <p class="text-sm text-gray-400">Series A</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-white">$5,000</p>
          <p class="text-sm text-gray-400">2 hours ago</p>
        </div>
      </div>

      <!-- Investment 2 -->
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-white">Sarah Johnson</p>
          <p class="text-sm text-gray-400">Series A</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-white">$10,000</p>
          <p class="text-sm text-gray-400">4 hours ago</p>
        </div>
      </div>

      <!-- Investment 3 -->
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-white">Mike Davis</p>
          <p class="text-sm text-gray-400">Seed Round</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-white">$2,500</p>
          <p class="text-sm text-gray-400">1 day ago</p>
        </div>
      </div>
    </div>

    <div class="mt-6 text-right">
      <router-link to="/transactions" class="text-blue-500 hover:text-blue-400 text-sm font-medium"
        >View all</router-link
      >
    </div>
  </BaseCard>
</template>
