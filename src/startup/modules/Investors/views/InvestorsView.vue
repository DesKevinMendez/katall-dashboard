<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
import InvestorsTable from '../components/InvestorsTable.vue'
</script>

<template>
  <div>
    <ViewHead
      title="Investors"
      subtitle="View and manage investors who own tokens in your startup"
    />

    <div class="mt-6">
      <InvestorsTable />
    </div>
  </div>
</template>

<style scoped></style>
