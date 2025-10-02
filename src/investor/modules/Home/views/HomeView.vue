<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
import { IconWallet, IconTrendingUp, IconCurrencyDollar, IconUsers } from '@tabler/icons-vue'
import BaseCard from '@/template/BaseCard.vue'
import RecentActivities from '../components/RecentActivities.vue'
</script>

<template>
  <div>
    <ViewHead
      title="Investor Dashboard"
      subtitle="Welcome back! Here's your investment overview."
    />

    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Portfolio Value Card -->
        <BaseCard>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-white">Total Portfolio Value</h3>
            <IconCurrencyDollar class="w-5 h-5 text-gray-400" />
          </div>
          <div class="text-3xl font-bold text-white mb-1">$45,231.89</div>
          <p class="text-sm text-gray-400">+20.1% from last month</p>
        </BaseCard>

        <!-- Active Investments Card -->
        <BaseCard>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-white">Active Investments</h3>
            <IconWallet class="w-5 h-5 text-gray-400" />
          </div>
          <div class="text-3xl font-bold text-white mb-1">12</div>
          <p class="text-sm text-gray-400">+2 new this month</p>
        </BaseCard>

        <!-- Total Returns Card -->
        <BaseCard>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-white">Total Returns</h3>
            <IconTrendingUp class="w-5 h-5 text-gray-400" />
          </div>
          <div class="text-3xl font-bold text-white mb-1">+12.5%</div>
          <p class="text-sm text-gray-400">Average return rate</p>
        </BaseCard>

        <!-- Startups Backed Card -->
        <BaseCard>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-white">Startups Backed</h3>
            <IconUsers class="w-5 h-5 text-gray-400" />
          </div>
          <div class="text-3xl font-bold text-white mb-1">8</div>
          <p class="text-sm text-gray-400">Across various sectors</p>
        </BaseCard>
      </div>

      <RecentActivities />
    </div>
  </div>
</template>

<style scoped></style>
