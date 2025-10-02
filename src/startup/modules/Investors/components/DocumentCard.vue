<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import { IconClock, IconFileText } from '@tabler/icons-vue'

interface Document {
  title: string
  status: 'Verified' | 'Pending' | 'Rejected'
  uploadDate: string
  icon?: string
}

interface Props {
  document: Document
}

defineProps<Props>()

function getStatusVariant(status: string): 'verified' | 'pending' | 'rejected' | 'default' {
  const statusMap: Record<string, 'verified' | 'pending' | 'rejected' | 'default'> = {
    verified: 'verified',
    pending: 'pending',
    rejected: 'rejected',
  }
  return statusMap[status.toLowerCase()] || 'default'
}

function getStatusIcon(status: string) {
  if (status === 'Pending') {
    return IconClock
  }
  return null
}
</script>

<template>
  <BaseCard class="relative">
    <!-- Status Icon in top right corner -->
    <div class="absolute top-3 right-3">
      <IconClock v-if="document.status === 'Pending'" class="h-4 w-4 text-yellow-500" />
    </div>

    <div class="text-center">
      <!-- Document Icon -->
      <div class="mb-4">
        <div class="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
          <IconFileText class="h-8 w-8 text-gray-300" />
        </div>
      </div>

      <!-- Document Title -->
      <h4 class="text-lg font-bold text-white mb-3">{{ document.title }}</h4>

      <!-- Status Badge -->
      <div class="mb-3">
        <BaseBadge :variant="getStatusVariant(document.status)">
          {{ document.status }}
        </BaseBadge>
      </div>

      <!-- Upload Date -->
      <p class="text-sm text-gray-400">{{ document.uploadDate }}</p>
    </div>
  </BaseCard>
</template>
