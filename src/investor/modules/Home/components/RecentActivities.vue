<script setup lang="ts">
import {
  IconBell,
  IconMessageCircle,
  IconTrendingUp,
  IconBriefcase,
  IconUsers,
  IconTrendingDown,
} from '@tabler/icons-vue'
import BaseCard from '@/template/BaseCard.vue'

interface Activity {
  id: number
  icon: typeof IconMessageCircle
  text: string
  timestamp: string
  iconColor: string
}

const activities: Activity[] = [
  {
    id: 1,
    icon: IconMessageCircle,
    text: "New post in 'AI Solutions' community: 'Upcoming Q3 earnings call'",
    timestamp: '30 minutes ago',
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    icon: IconTrendingUp,
    text: "Token 'GreenEnergy' price increased by 3.5%",
    timestamp: 'about 2 hours ago',
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    icon: IconBriefcase,
    text: "New investment opportunity: 'Quantum Leap Innovations'",
    timestamp: '1 day ago',
    iconColor: 'text-purple-500',
  },
  {
    id: 4,
    icon: IconUsers,
    text: "New P2P buy order for 'HealthTech' tokens",
    timestamp: '2 days ago',
    iconColor: 'text-orange-500',
  },
  {
    id: 5,
    icon: IconTrendingDown,
    text: "Token 'FinTech Solutions' price decreased by 1.2%",
    timestamp: '3 days ago',
    iconColor: 'text-red-500',
  },
  {
    id: 6,
    icon: IconMessageCircle,
    text: "New post in 'BioGen Corp' community: 'Research breakthrough announced'",
    timestamp: '4 days ago',
    iconColor: 'text-blue-500',
  },
]
</script>

<template>
  <BaseCard>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-semibold text-white">Recent Activities</h3>
        <div
          class="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          3
        </div>
      </div>
      <IconBell class="w-5 h-5 text-gray-400" />
    </div>

    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <component :is="activity.icon" :class="['w-5 h-5 mt-0.5', activity.iconColor]" />
        <div class="flex-1">
          <p class="text-sm text-white mb-1">{{ activity.text }}</p>
          <p class="text-xs text-gray-400">{{ activity.timestamp }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 text-right">
      <a href="#" class="text-blue-500 text-sm hover:text-blue-400 transition-colors"> View All </a>
    </div>
  </BaseCard>
</template>

<style scoped></style>
