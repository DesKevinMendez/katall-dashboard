<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseForm from '@/template/BaseForm.vue'

function handleSubmit(values: Record<string, any>) {
  console.log('Form submitted:', values)
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
      <BaseForm :on-submit="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Legal Name Field -->
          <BaseInput
            name="legalName"
            label="Legal Name"
            placeholder="Enter legal name"
            hint="Required"
            rules="required|min:2|max:100"
            description="The official registered name of your company."
          />

          <!-- Commercial Name Field -->
          <BaseInput
            name="commercialName"
            label="Commercial Name"
            placeholder="Enter commercial name"
            hint="Optional"
            rules="max:100"
            description="The name under which your company operates commercially."
          />
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <BaseButton type="submit"> Save Information </BaseButton>
        </div>
      </BaseForm>
    </BaseCard>
  </div>
</template>

<style scoped></style>
