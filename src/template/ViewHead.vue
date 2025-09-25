<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-semibold text-white mb-1">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-gray-400 text-base">
        {{ subtitle }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>
