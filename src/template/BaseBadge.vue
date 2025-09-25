<script setup lang="ts">
interface Props {
  variant?: 'active' | 'closed' | 'review' | 'validated' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

function getVariantClasses(variant: string): string {
  const variants: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    review: 'bg-yellow-100 text-yellow-800',
    validated: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  }
  return variants[variant] || variants.default
}

function getSizeClasses(size: string): string {
  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }
  return sizes[size] || sizes.md
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full font-medium',
      getVariantClasses(variant),
      getSizeClasses(size),
    ]"
  >
    <slot />
  </span>
</template>
