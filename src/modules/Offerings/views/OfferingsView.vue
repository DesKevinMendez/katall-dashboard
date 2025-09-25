<script setup lang="ts">
import BaseButton from '@/template/BaseButton.vue'
import OfferingsTableExample from '@/template/OfferingsTableExample.vue'
import ViewHead from '@/template/ViewHead.vue'
import { IconPlus } from '@tabler/icons-vue'
</script>
<template>
  <div>
    <ViewHead title="Offerings" subtitle="Manage your equity offerings and track their performance">
      <BaseButton>
        <IconPlus class="w-4 h-4 mr-2" />
        Create new offering
      </BaseButton>
    </ViewHead>

    <OfferingsTableExample />
  </div>
</template>
<style scoped></style>
