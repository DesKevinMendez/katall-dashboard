<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/template/BaseCard.vue'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'

const formData = ref({
  legalName: '',
  commercialName: '',
})

function handleSubmit() {
  console.log('Form submitted:', formData.value)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-white mb-2">Company Information</h3>
      <p class="text-gray-400">
        Provide your company's basic information. This information will be used for verification and
        legal purposes.
      </p>
    </div>

    <BaseCard>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Legal Name Field -->
          <BaseInput
            v-model="formData.legalName"
            label="Legal Name"
            placeholder="Enter legal name"
            hint="Required"
            description="The official registered name of your company."
          />

          <!-- Commercial Name Field -->
          <BaseInput
            v-model="formData.commercialName"
            label="Commercial Name"
            placeholder="Enter commercial name"
            hint="Optional"
            description="The name under which your company operates commercially."
          />
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <BaseButton type="submit"> Save Information </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped></style>
