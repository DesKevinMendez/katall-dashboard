<script setup lang="ts">
interface Props {
  to?: string
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const { to, disabled = false, variant = 'default', size = 'md' } = defineProps<Props>()

const baseClasses = 'font-medium transition-colors'
const variantClasses = {
  default: 'text-blue-400 hover:text-blue-300',
  primary: 'text-blue-500 hover:text-blue-400',
  secondary: 'text-gray-400 hover:text-gray-300',
}
const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}
const disabledClasses = 'opacity-50 cursor-not-allowed'

const classes = [
  baseClasses,
  variantClasses[variant],
  sizeClasses[size],
  disabled ? disabledClasses : '',
]
</script>

<template>
  <router-link v-if="to && !disabled" :to="to" :class="classes">
    <slot />
  </router-link>
  <span v-else :class="classes">
    <slot />
  </span>
</template>
