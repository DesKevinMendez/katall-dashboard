<script setup lang="ts">
import { IconPackage, IconUsers, IconCurrencyDollar } from '@tabler/icons-vue'
import BaseCard from '@/template/BaseCard.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Active Offerings Card -->
    <BaseCard>
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-sm font-medium text-white">Active Offerings</h3>
        <IconPackage class="w-5 h-5 text-gray-400" />
      </div>
      <div class="text-3xl font-bold text-white mb-1">3</div>
      <p class="text-sm text-gray-400">2 fully funded</p>
    </BaseCard>

    <!-- Total Investors Card -->
    <BaseCard>
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-sm font-medium text-white">Total Investors</h3>
        <IconUsers class="w-5 h-5 text-gray-400" />
      </div>
      <div class="text-3xl font-bold text-white mb-1">127</div>
      <p class="text-sm text-gray-400">+23 this month</p>
    </BaseCard>

    <!-- Funds Raised Card -->
    <BaseCard>
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-sm font-medium text-white">Funds Raised</h3>
        <IconCurrencyDollar class="w-5 h-5 text-gray-400" />
      </div>
      <div class="text-3xl font-bold text-white mb-1">$485K</div>
      <p class="text-sm text-gray-400">97% of target of current round</p>
    </BaseCard>
  </div>
</template>
