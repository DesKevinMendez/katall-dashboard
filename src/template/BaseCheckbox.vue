<script setup lang="ts">
interface Props {
  id?: string
  name?: string
  label?: string
  disabled?: boolean
  checked?: boolean
}

const { id, name, label, disabled = false, checked = false } = defineProps<Props>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue ?? checked"
      @change="modelValue = ($event.target as HTMLInputElement).checked"
      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <label v-if="label" :for="id" class="ml-2 block text-sm text-gray-300">
      {{ label }}
    </label>
  </div>
</template>
