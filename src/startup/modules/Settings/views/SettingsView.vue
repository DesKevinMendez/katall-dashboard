<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/template/BaseCard.vue'
import BaseForm from '@/template/BaseForm.vue'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseTab from '@/template/BaseTab.vue'
import ViewHead from '@/template/ViewHead.vue'

const activeTab = ref('account')
const isSubmitting = ref(false)

const tabs = [
  { id: 'account', label: 'Account Settings' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'preferences', label: 'Preferences' },
]

function onSubmit(values: Record<string, unknown>) {
  isSubmitting.value = true
  console.log('Settings updated:', values)

  setTimeout(() => {
    isSubmitting.value = false
    // Handle success notification
  }, 2000)
}
</script>

<template>
  <div>
    <ViewHead title="Settings" subtitle="Manage your account settings and preferences." />

    <div class="px-6 pb-6 space-y-6">
      <!-- Settings Tabs -->
      <BaseCard>
        <BaseTab v-model="activeTab" :tabs="tabs">
          <template #default="{ activeTab }">
            <BaseForm :on-submit="onSubmit">
              <!-- Account Settings Tab -->
              <div v-if="activeTab === 'account'" class="space-y-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-white">Account Preferences</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Email Notifications</h4>
                        <p class="text-sm text-gray-400">
                          Receive email updates about your account
                        </p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Enabled
                      </BaseButton>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Two-Factor Authentication</h4>
                        <p class="text-sm text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <BaseButton type="button" class="bg-blue-600 hover:bg-blue-700">
                        Enable 2FA
                      </BaseButton>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Account Verification</h4>
                        <p class="text-sm text-gray-400">Verify your identity and documents</p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Verified
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Security Tab -->
              <div v-else-if="activeTab === 'security'" class="space-y-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-white">Security Settings</h3>
                  <div class="space-y-4">
                    <BaseInput
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
                    />
                    <BaseInput
                      name="newPassword"
                      label="New Password"
                      type="password"
                      placeholder="Enter your new password"
                    />
                    <BaseInput
                      name="confirmPassword"
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div class="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h4 class="text-white font-medium mb-2">Active Sessions</h4>
                    <p class="text-sm text-gray-400 mb-4">Manage your active login sessions</p>
                    <BaseButton type="button" class="bg-red-600 hover:bg-red-700">
                      End All Sessions
                    </BaseButton>
                  </div>
                </div>
              </div>

              <!-- Notifications Tab -->
              <div v-else-if="activeTab === 'notifications'" class="space-y-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-white">Notification Preferences</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Investment Updates</h4>
                        <p class="text-sm text-gray-400">
                          Get notified about investment opportunities
                        </p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Enabled
                      </BaseButton>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Document Reminders</h4>
                        <p class="text-sm text-gray-400">Reminders for document submissions</p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Enabled
                      </BaseButton>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Marketing Emails</h4>
                        <p class="text-sm text-gray-400">
                          Receive marketing and promotional content
                        </p>
                      </div>
                      <BaseButton type="button" class="bg-gray-600 hover:bg-gray-700">
                        Disabled
                      </BaseButton>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Security Alerts</h4>
                        <p class="text-sm text-gray-400">Get notified about security events</p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Enabled
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preferences Tab -->
              <div v-else-if="activeTab === 'preferences'" class="space-y-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-white">User Preferences</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 class="text-white font-medium">Dark Mode</h4>
                        <p class="text-sm text-gray-400">Use dark theme for the interface</p>
                      </div>
                      <BaseButton type="button" class="bg-green-600 hover:bg-green-700">
                        Enabled
                      </BaseButton>
                    </div>
                  </div>
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
