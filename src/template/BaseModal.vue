<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useTemplateRef } from 'vue'
import { IconX } from '@tabler/icons-vue'

interface Props {
  isOpen: boolean
  title?: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits(['close'])

const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef')

// Watch for modal open/close
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        dialogRef.value?.showModal()
      })
    } else {
      dialogRef.value?.close()
    }
  },
  { immediate: true },
)

function handleClose() {
  emit('close')
}

function handleDialogClose() {
  emit('close')
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}
</script>

<template>
  <dialog
    ref="dialogRef"
    closedby="any"
    class="backdrop:bg-black/70 backdrop:backdrop-blur-sm p-0 rounded-lg border-0 m-auto"
    @close="handleDialogClose"
  >
    <div
      :class="[
        'relative w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700',
        sizeClasses[size],
      ]"
    >
      <!-- Header -->
      <div v-if="title || subtitle" class="px-6 py-4 border-b border-gray-700">
        <div class="flex items-start justify-between">
          <div>
            <h2 v-if="title" class="text-xl font-semibold text-white mb-1">
              {{ title }}
            </h2>
            <p v-if="subtitle" class="text-gray-400 text-sm">
              {{ subtitle }}
            </p>
          </div>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-white transition-colors p-1"
            title="Close"
          >
            <IconX class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 py-4">
        <slot />
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-700">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>
