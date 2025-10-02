<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import { IconX } from '@tabler/icons-vue'

const { title, width = 'w-96' } = defineProps<{
  title?: string
  width?: string
}>()

const isOpen = defineModel<boolean>('isOpen', { default: false })

const sidebarRef = useTemplateRef<HTMLDivElement>('sidebarRef')

const sidebarClasses = computed(() => [
  'fixed top-0 right-0 h-full bg-gray-800 border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-50',
  width,
  isOpen.value ? 'translate-x-0' : 'translate-x-full',
])

const overlayClasses = computed(() => [
  'fixed inset-0 bg-black/70 transition-opacity duration-300 ease-in-out z-40',
  isOpen.value ? 'opacity-100' : 'opacity-0 pointer-events-none',
])

function handleClose() {
  isOpen.value = false
}

function handleOverlayClick() {
  handleClose()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- Overlay -->
  <div v-if="isOpen" :class="overlayClasses" @click="handleOverlayClick" />

  <!-- Sidebar -->
  <div ref="sidebarRef" :class="sidebarClasses">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-700">
      <h2 class="text-xl font-semibold text-white">
        {{ title ?? 'Details' }}
      </h2>
      <button @click="handleClose" class="text-gray-400 hover:text-white transition-colors p-1">
        <IconX class="w-5 h-5" />
      </button>
    </div>

    <!-- Content -->
    <div class="p-6 overflow-y-auto h-full">
      <slot />
    </div>
  </div>
</template>
