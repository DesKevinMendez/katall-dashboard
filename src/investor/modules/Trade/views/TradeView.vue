<script setup lang="ts">
import ViewHead from '@/template/ViewHead.vue'
import BaseButton from '@/template/BaseButton.vue'
import { IconPlus } from '@tabler/icons-vue'
import TradeTable from '../components/TradeTable.vue'
</script>

<template>
  <div>
    <ViewHead
      title="Trade Tokens"
      subtitle="Sell and buy tokens to a network of certified investors"
    >
      <BaseButton class="bg-blue-600 hover:bg-blue-700 text-white">
        <IconPlus class="w-4 h-4 mr-2" />
        Post Order
      </BaseButton>
    </ViewHead>

    <div class="mt-6">
      <TradeTable />
    </div>
  </div>
</template>

<style scoped></style>
