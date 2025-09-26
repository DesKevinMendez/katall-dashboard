<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import { IconCheck } from '@tabler/icons-vue'

interface Investor {
  fullName: string
  username: string
  country: string
  registrationDate: string
  kycStatus: 'Verified' | 'Pending' | 'Rejected'
  profileImage?: string
}

interface Props {
  investor: Investor
}

defineProps<Props>()

function getKycStatusVariant(status: string): 'verified' | 'pending' | 'rejected' | 'default' {
  const statusMap: Record<string, 'verified' | 'pending' | 'rejected' | 'default'> = {
    verified: 'verified',
    pending: 'pending',
    rejected: 'rejected',
  }
  return statusMap[status.toLowerCase()] || 'default'
}
</script>

<template>
  <BaseCard class="max-w-md">
    <div class="text-center">
      <!-- Title -->
      <h3 class="text-lg font-bold text-white mb-6 text-left">Investor Information</h3>

      <!-- Profile Picture -->
      <div class="relative inline-block mb-4">
        <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
          <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full"></div>
          </div>
        </div>
        <!-- KYC Badge -->
        <div class="absolute -bottom-1 -right-1">
          <BaseBadge :variant="getKycStatusVariant(investor.kycStatus)" size="sm">
            {{ investor.kycStatus }}
          </BaseBadge>
        </div>
      </div>

      <!-- Name and Username -->
      <div class="mb-6">
        <h4 class="text-xl font-bold text-white mb-1">{{ investor.fullName }}</h4>
        <p class="text-gray-400">@{{ investor.username }}</p>
      </div>

      <!-- Investor Details -->
      <div class="space-y-3 text-left">
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Country:</span>
          <span class="text-white">{{ investor.country }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-400">Registered:</span>
          <span class="text-white">{{ investor.registrationDate }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-400">KYC Status:</span>
          <div class="flex items-center gap-2">
            <span class="text-white">{{ investor.kycStatus }}</span>
            <IconCheck v-if="investor.kycStatus === 'Verified'" class="h-4 w-4 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
