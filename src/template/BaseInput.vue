<script setup lang="ts">
import { Field } from 'vee-validate'

const {
  label,
  name,
  type = 'text',
  placeholder = '',
  description = '',
  hint = '',
  disabled = false,
  rules = '',
} = defineProps<{
  label: string
  name: string
  type?: string
  placeholder?: string
  description?: string
  hint?: string
  disabled?: boolean
  rules?: string
}>()

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

    <Field :name="name" :rules="rules" v-slot="{ field, errorMessage }">
      <input
        v-if="type !== 'textarea'"
        v-model="modelValue"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
          errorMessage ? 'border-red-500' : 'border-gray-600',
        ]"
      />
      <textarea
        v-else
        v-model="modelValue"
        v-bind="field"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="4"
        :class="[
          'w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none',
          errorMessage ? 'border-red-500' : 'border-gray-600',
        ]"
      />
      <p v-if="errorMessage" class="text-xs text-red-400">
        {{ errorMessage }}
      </p>
      <p v-else-if="description" class="text-xs text-gray-400">
        {{ description }}
      </p>
    </Field>
  </div>
</template>

<style scoped></style>
