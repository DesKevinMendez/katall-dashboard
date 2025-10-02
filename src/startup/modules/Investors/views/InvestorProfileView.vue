<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ViewHead from '@/template/ViewHead.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseTab from '@/template/BaseTab.vue'
import InvestorProfileCard from '../components/InvestorProfileCard.vue'
import DocumentsSection from '../components/DocumentsSection.vue'
import InvestmentsSection from '../components/InvestmentsSection.vue'
import { IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()

const activeTab = ref('documents')

const tabs = [
  { id: 'documents', label: 'Documents' },
  { id: 'investments', label: 'Investments' },
]

// Mock data for the investor - in real app, this would be fetched based on route params
const investor = {
  fullName: 'John Smith',
  username: 'johnsmith',
  country: 'United States',
  kycStatus: 'Verified' as const,
  registrationDate: 'May 10, 2023',
}

function goBackToInvestors() {
  router.push('/investors')
}
</script>

<template>
  <div>
    <ViewHead title="Investor Profile" subtitle="View and manage investor details and activity." />
    <div class="px-6 pb-6 space-y-6">
      <BaseButton @click="goBackToInvestors">
        <IconArrowLeft class="h-4 w-4 mr-2" />
        Back to Investors
      </BaseButton>

      <div class="grid grid-cols-12 gap-6">
        <!-- Investor Profile Card - 4 columns -->
        <div class="col-span-12 lg:col-span-4">
          <InvestorProfileCard :investor="investor" />
        </div>

        <!-- Tabs Content - 8 columns -->
        <div class="col-span-12 lg:col-span-8">
          <BaseTab v-model="activeTab" :tabs="tabs">
            <template #default="{ activeTab }">
              <div v-if="activeTab === 'documents'">
                <DocumentsSection />
              </div>

              <div v-else-if="activeTab === 'investments'">
                <InvestmentsSection />
              </div>
            </template>
          </BaseTab>
        </div>
      </div>
    </div>
  </div>
</template>
