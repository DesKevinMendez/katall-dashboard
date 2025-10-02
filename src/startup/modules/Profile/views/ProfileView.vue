<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/template/BaseCard.vue'
import BaseForm from '@/template/BaseForm.vue'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseFileUpload from '@/template/BaseFileUpload.vue'
import BaseBadge from '@/template/BaseBadge.vue'
import BaseTab from '@/template/BaseTab.vue'
import ViewHead from '@/template/ViewHead.vue'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  country: string
  city: string
  bio: string
  profileImage?: File[]
}

const activeTab = ref('personal')
const isSubmitting = ref(false)
const profileImage = ref<File[]>([])

const profileData = ref<UserProfile>({
  firstName: 'Kevin',
  lastName: 'Méndez',
  email: 'kevin@example.com',
  phone: '+1 (555) 123-4567',
  company: 'Katall',
  position: 'CEO & Founder',
  country: 'United States',
  city: 'San Francisco',
  bio: 'Entrepreneur and startup founder with a passion for innovation and technology.',
})

const tabs = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'company', label: 'Company Information' },
]

function onSubmit(values: Record<string, unknown>) {
  isSubmitting.value = true
  console.log('Profile updated:', values)

  setTimeout(() => {
    isSubmitting.value = false
    // Handle success notification
  }, 2000)
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
</script>

<template>
  <div>
    <ViewHead
      title="Profile Settings"
      subtitle="Manage your personal information and account preferences."
    />

    <div class="px-6 pb-6 space-y-6">
      <!-- Profile Header -->
      <BaseCard>
        <div class="flex items-center space-x-6">
          <!-- Profile Picture -->
          <div class="relative">
            <div class="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-white">
                {{ getInitials(profileData.firstName, profileData.lastName) }}
              </span>
            </div>
            <BaseBadge variant="verified" size="sm" class="absolute -bottom-1 -right-1">
              Verified
            </BaseBadge>
          </div>

          <!-- User Info -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-white">
              {{ profileData.firstName }} {{ profileData.lastName }}
            </h2>
            <p class="text-gray-400">{{ profileData.position }} at {{ profileData.company }}</p>
            <p class="text-sm text-gray-500">{{ profileData.country }}, {{ profileData.city }}</p>
          </div>
        </div>
      </BaseCard>

      <!-- Tabs Navigation -->
      <BaseCard>
        <BaseTab v-model="activeTab" :tabs="tabs">
          <template #default="{ activeTab }">
            <BaseForm :on-submit="onSubmit">
              <!-- Personal Information Tab -->
              <div v-if="activeTab === 'personal'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    v-model="profileData.firstName"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    rules="required"
                  />
                  <BaseInput
                    v-model="profileData.lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    rules="required"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    v-model="profileData.email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    rules="required|email"
                  />
                  <BaseInput
                    v-model="profileData.phone"
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    v-model="profileData.company"
                    name="company"
                    label="Company"
                    placeholder="Enter your company name"
                  />
                  <BaseInput
                    v-model="profileData.position"
                    name="position"
                    label="Position"
                    placeholder="Enter your job title"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    v-model="profileData.country"
                    name="country"
                    label="Country"
                    placeholder="Enter your country"
                  />
                  <BaseInput
                    v-model="profileData.city"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                </div>

                <BaseInput
                  v-model="profileData.bio"
                  name="bio"
                  label="Bio"
                  type="textarea"
                  placeholder="Tell us about yourself"
                  description="A brief description about yourself and your background"
                />

                <BaseFileUpload
                  v-model="profileImage"
                  title="Profile Picture"
                  description="Upload a profile picture to personalize your account"
                  accept="image/*"
                  :max-size="5"
                />
              </div>

              <!-- Company Information Tab -->
              <div v-else-if="activeTab === 'company'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    v-model="profileData.company"
                    name="company"
                    label="Company Name"
                    placeholder="Enter your company name"
                    rules="required"
                  />
                  <BaseInput
                    v-model="profileData.position"
                    name="position"
                    label="Position/Title"
                    placeholder="Enter your job title"
                    rules="required"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    name="industry"
                    label="Industry"
                    placeholder="Select your industry"
                    description="Choose the industry your company operates in"
                  />
                  <BaseInput
                    name="companySize"
                    label="Company Size"
                    placeholder="Select company size"
                    description="Number of employees in your company"
                  />
                </div>

                <BaseInput
                  name="companyDescription"
                  label="Company Description"
                  type="textarea"
                  placeholder="Describe your company and its mission"
                  description="A brief overview of your company and what it does"
                />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseInput
                    name="website"
                    label="Company Website"
                    type="url"
                    placeholder="https://yourcompany.com"
                  />
                  <BaseInput
                    name="foundedYear"
                    label="Founded Year"
                    type="number"
                    placeholder="2020"
                  />
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                <BaseButton type="button" class="bg-gray-600 hover:bg-gray-700">
                  Cancel
                </BaseButton>
                <BaseButton
                  type="submit"
                  :disabled="isSubmitting"
                  class="bg-blue-600 hover:bg-blue-700"
                >
                  {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
                </BaseButton>
              </div>
            </BaseForm>
          </template>
        </BaseTab>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped></style>
