<script setup lang="ts">
import BaseCard from '@/template/BaseCard.vue'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseForm from '@/template/BaseForm.vue'
import type { AllowAny } from '@/types'

function handleSubmit(values: Record<string, AllowAny>) {
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
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Legal Name Field -->
            <BaseInput
              name="legalName"
              label="Legal Name"
              placeholder="Enter legal name"
              hint="Required"
              rules="required|min:2|max:100"
              description="The official registered name of your company."
            />

            <!-- Registration Number Field -->
            <BaseInput
              name="registrationNumber"
              label="Registration Number"
              placeholder="Enter registration number"
              hint="Required"
              rules="required|min:3|max:50"
              description="Your company's official registration number."
            />

            <!-- Country Field -->
            <BaseInput
              name="country"
              label="Country"
              placeholder="Enter country"
              hint="Required"
              rules="required|min:2|max:50"
              description="The country where your company is registered."
            />

            <!-- Address Field -->
            <BaseInput
              name="address"
              label="Address"
              placeholder="Enter company address"
              hint="Required"
              rules="required|min:5|max:200"
              description="Your company's registered address."
            />
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Commercial Name Field -->
            <BaseInput
              name="commercialName"
              label="Commercial Name"
              placeholder="Enter commercial name"
              hint="Optional"
              rules="max:100"
              description="The name under which your company operates commercially."
            />

            <!-- Tax ID Field -->
            <BaseInput
              name="taxId"
              label="Tax ID"
              placeholder="Enter tax ID"
              hint="Required"
              rules="required|min:3|max:50"
              description="Your company's tax identification number."
            />

            <!-- Website Field -->
            <BaseInput
              name="website"
              label="Website"
              placeholder="https://example.com"
              hint="Optional"
              rules="url"
              description="Your company's official website."
            />
          </div>
        </div>

        <!-- Company Description Field (Full Width) -->
        <BaseInput
          name="companyDescription"
          label="Company Description"
          type="textarea"
          placeholder="Enter a brief description of your company"
          hint="Required"
          rules="required|min:10|max:500"
          description="A brief description of your company's business and activities."
        />

        <!-- Submit Button -->
        <div class="flex justify-end">
          <BaseButton type="submit"> Save Information </BaseButton>
        </div>
      </BaseForm>
    </BaseCard>
  </div>
</template>

<style scoped></style>
