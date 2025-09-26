<script setup lang="ts">
interface Props {
  percentage: number
}

defineProps<Props>()
</script>

<template>
  <div class="w-full bg-gray-700 rounded-full h-2">
    <div
      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
      :style="{
        width: `${Math.min(100, Math.max(0, percentage))}%`,
      }"
    ></div>
  </div>
</template>
