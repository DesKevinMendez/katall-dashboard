<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
</script>

<template>
  <BaseCard>
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-white mb-1">Funding Progress</h2>
      <p class="text-sm text-gray-400">Current round performance</p>
    </div>

    <div class="space-y-4">
      <!-- Target -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-400">Target</span>
        <span class="font-semibold text-white">$500K</span>
      </div>

      <!-- Raised -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-400">Raised</span>
        <span class="font-semibold text-white">$485K</span>
      </div>

      <!-- Progress -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-400">Progress</span>
        <span class="font-semibold text-white">97%</span>
      </div>

      <!-- Days Left -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-400">Days Left</span>
        <span class="font-semibold text-white">12</span>
      </div>
    </div>
  </BaseCard>
</template>
