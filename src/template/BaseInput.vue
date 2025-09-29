<script setup lang="ts">
interface Props {
  label: string
  type?: string
  placeholder?: string
  description?: string
  hint?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  description: '',
  hint: '',
  disabled: false,
})

const modelValue = defineModel<string>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <label class="block text-sm font-medium text-white">
        {{ label }}
      </label>
      <span v-if="hint" class="text-xs text-gray-400">
        {{ hint }}
      </span>
    </div>
    <input
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <p v-if="description" class="text-xs text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<style scoped></style>
