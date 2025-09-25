<template>
  <div class="relative dropdown-container">
    <!-- Custom User Button -->
    <button
      class="flex items-center space-x-3 bg-gray-800 rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
      @click="toggleDropdown"
    >
      <!-- Avatar -->
      <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
        <span class="text-sm font-semibold text-white">{{ initials }}</span>
      </div>
      <!-- User Name -->
      <span class="text-sm font-medium text-white">{{ name }}</span>
      <!-- Chevron -->
      <IconChevronDown
        class="w-4 h-4 text-gray-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- User Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-1 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50"
    >
      <!-- Title -->
      <div class="px-4 py-2 border-b border-gray-700">
        <h3 class="text-sm font-semibold text-white">{{ title }}</h3>
      </div>

      <!-- Menu Items -->
      <template v-for="item in userDropdownItems" :key="item.to">
        <!-- Divider before item -->
        <div v-if="item.divider" class="border-t border-gray-700 my-1"></div>

        <router-link
          :to="item.to"
          class="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          @click="closeDropdown"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { IconChevronDown, IconUser, IconSettings, IconLogout } from '@tabler/icons-vue'
import { type DropdownItem } from './BaseDropdown.vue'

interface Props {
  name: string
  initials: string
  title: string
}

defineProps<Props>()

const userDropdownItems: DropdownItem[] = [
  {
    to: '/profile',
    label: 'Profile',
    icon: IconUser,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: IconSettings,
  },
  {
    to: '/logout',
    label: 'Logout',
    icon: IconLogout,
    divider: true,
  },
]

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function closeDropdownOnClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-container')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>
