<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
import HomeStats from '@/startup/modules/Home/components/HomeStats.vue'
import RecentInvestments from '@/startup/modules/Home/components/RecentInvestments.vue'
import FundingProgress from '@/startup/modules/Home/components/FundingProgress.vue'
</script>
<template>
  <div>
    <ViewHead title="Home" subtitle="Welcome to your dashboard overview" />
    <div class="space-y-8">
      <HomeStats />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentInvestments />
        <FundingProgress />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
