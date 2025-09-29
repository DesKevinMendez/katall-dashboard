<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { AllowAny } from '@/types'

interface Props {
  onSubmit?: (values: Record<string, AllowAny>) => void
}

const props = defineProps<Props>()

const { handleSubmit } = useForm()

const onSubmit = handleSubmit((values) => {
  if (props.onSubmit) {
    props.onSubmit(values)
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>

<style scoped></style>
