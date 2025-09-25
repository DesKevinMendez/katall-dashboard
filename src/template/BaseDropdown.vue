<template>
  <div class="relative dropdown-container">
    <button
      class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
      @click="toggleDropdown"
    >
      <span>{{ label }}</span>
      <IconChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50"
    >
      <!-- Title (optional) -->
      <div v-if="title" class="px-4 py-2 border-b border-gray-700">
        <h3 class="text-sm font-semibold text-white">{{ title }}</h3>
      </div>

      <!-- Menu Items -->
      <template v-for="item in items" :key="item.to">
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
import { IconChevronDown } from '@tabler/icons-vue'

export interface DropdownItem {
  to: string
  label: string
  icon: object
  divider?: boolean
}

interface Props {
  label: string
  items: DropdownItem[]
  title?: string
}

defineProps<Props>()

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
