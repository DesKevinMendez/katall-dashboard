<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ViewHead from '@/template/ViewHead.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseTab from '@/template/BaseTab.vue'
import OfferingDetails from '../components/OfferingDetails.vue'
import OverviewTabContent from '../components/OverviewTabContent.vue'
import InvestorTabContent from '../components/InvestorTabContent.vue'
import TransactionsTabContent from '../components/TransactionsTabContent.vue'
import { IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'investors', label: 'Investors' },
  { id: 'transactions', label: 'Transactions' },
]

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

// Mock data for overview tab
const overviewData = {
  offeringType: 'Equity',
  creationDate: 'October 15, 2023 at 04:30 AM',
  totalInvestors: 5,
  tokenName: 'KATALL Token A',
  blockchain: 'Bitcoin',
  status: 'Active',
  totalTransactions: 5,
  totalIssuances: 5,
}

// Mock data for investors tab
const investorsData = [
  {
    name: 'Hiroshi Tanaka',
    amountInvested: 300000,
    tokensPurchased: 30000,
  },
  {
    name: 'John Smith',
    amountInvested: 250000,
    tokensPurchased: 25000,
  },
  {
    name: 'Ahmed Al-Farsi',
    amountInvested: 200000,
    tokensPurchased: 20000,
  },
]

// Mock data for transactions tab
const transactionsData = [
  {
    investor: 'John Smith',
    amount: 250000,
    tokens: 25000,
    date: 'October 15, 2023 at 04:30 AM',
  },
  {
    investor: 'Hiroshi Tanaka',
    amount: 300000,
    tokens: 30000,
    date: 'November 5, 2023 at 03:45 AM',
  },
  {
    investor: 'Ahmed Al-Farsi',
    amount: 200000,
    tokens: 20000,
    date: 'October 30, 2023 at 05:10 AM',
  },
]

function stopOffering() {
  console.log('Stop offering')
}

function issueTokens() {
  console.log('Issue tokens')
}

function burnTokens() {
  console.log('Burn tokens')
}

function viewInvestorProfile(investorName: string) {
  console.log('View investor profile:', investorName)
}

function viewAllInvestors() {
  console.log('View all investors')
}

function viewAllTransactions() {
  console.log('View all transactions')
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

      <BaseTab v-model="activeTab" :tabs="tabs">
        <template #default="{ activeTab }">
          <div v-if="activeTab === 'overview'">
            <OverviewTabContent :data="overviewData" />
          </div>

          <div v-else-if="activeTab === 'investors'">
            <InvestorTabContent
              :investors="investorsData"
              :total-investors="overviewData.totalInvestors"
              @view-investor-profile="viewInvestorProfile"
              @view-all-investors="viewAllInvestors"
            />
          </div>

          <div v-else-if="activeTab === 'transactions'">
            <TransactionsTabContent
              :transactions="transactionsData"
              @view-all-transactions="viewAllTransactions"
            />
          </div>
        </template>
      </BaseTab>
    </div>
  </div>
</template>
