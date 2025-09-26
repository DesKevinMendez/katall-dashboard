<script setup lang="ts">
import { useRouter } from 'vue-router'
import ViewHead from '@/template/ViewHead.vue'
import BaseButton from '@/template/BaseButton.vue'
import OfferingDetails from '../components/OfferingDetails.vue'
import { IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()

function goBackToOfferings() {
  router.push('/offerings')
}

// Mock data for the offering
const offering = {
  name: 'Series A',
  type: 'Equity offering',
  status: 'Active',
  createdDate: 'October 15, 2023 at 04:30 AM',
  totalAmount: 1000000,
  amountRaised: 750000,
  tokenPrice: 10.0,
  totalTokens: 1000000,
  tokensSold: 750000,
}

function stopOffering() {
  console.log('Stop offering')
}

function issueTokens() {
  console.log('Issue tokens')
}

function burnTokens() {
  console.log('Burn tokens')
}
</script>

<template>
  <div>
    <ViewHead title="Offering Details" subtitle="View and manage your offering details." />
    <div class="px-6 pb-6 space-y-6">
      <BaseButton @click="goBackToOfferings">
        <IconArrowLeft class="h-4 w-4 mr-2" />
        Back to Offerings
      </BaseButton>

      <OfferingDetails
        :offering="offering"
        @stop-offering="stopOffering"
        @issue-tokens="issueTokens"
        @burn-tokens="burnTokens"
      />
    </div>
  </div>
</template>
