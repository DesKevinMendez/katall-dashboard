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
      <h3 class="text-lg font-semibold text-white mb-2">Contact Information</h3>
      <p class="text-gray-400">
        Provide contact information for the legal representative of your company.
      </p>
    </div>

    <BaseCard>
      <BaseForm :on-submit="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Legal Representative Field -->
            <BaseInput
              name="legalRepresentative"
              label="Legal Representative"
              placeholder="Enter legal representative name"
              hint="Required"
              rules="required|min:2|max:100"
              description="The name of your company's legal representative."
            />

            <!-- Email Field -->
            <BaseInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email address"
              hint="Required"
              rules="required|email"
              description="The official email address of the legal representative."
            />
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Position Field -->
            <BaseInput
              name="position"
              label="Position"
              placeholder="Enter position (e.g., CEO, CFO)"
              hint="Required"
              rules="required|min:2|max:50"
              description="The position of the legal representative."
            />

            <!-- Phone Number Field -->
            <BaseInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              hint="Required"
              rules="required|min:10|max:20"
              description="The contact phone number of the legal representative."
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <BaseButton type="submit"> Save and Continue </BaseButton>
        </div>
      </BaseForm>
    </BaseCard>
  </div>
</template>

<style scoped></style>
