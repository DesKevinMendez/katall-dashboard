<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
import TransactionsTable from '../components/TransactionsTable.vue'
</script>

<template>
  <div>
    <ViewHead title="Transactions" subtitle="View all token transactions for your startup" />

    <div class="mt-6">
      <TransactionsTable />
    </div>
  </div>
</template>

<style scoped></style>
