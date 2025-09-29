<script setup lang="ts">
import { ref } from 'vue'
import ViewHead from '@/template/ViewHead.vue'
import BaseTab from '@/template/BaseTab.vue'
import CompanyInformationSection from '../components/CompanyInformationSection.vue'
import ContactInformationSection from '../components/ContactInformationSection.vue'
import RequiredDocumentsSection from '../components/RequiredDocumentsSection.vue'

const activeTab = ref('company-information')

const tabs = [
  { id: 'company-information', label: 'Company Information' },
  { id: 'contact-information', label: 'Contact Information' },
  { id: 'required-documents', label: 'Required Documents' },
]
</script>

<template>
  <div>
    <ViewHead
      title="Documents"
      subtitle="Complete your startup information and upload required documents"
    />

    <div class="px-6 pb-6">
      <BaseTab v-model="activeTab" :tabs="tabs">
        <template #default="{ activeTab }">
          <CompanyInformationSection v-if="activeTab === 'company-information'" />
          <ContactInformationSection v-else-if="activeTab === 'contact-information'" />
          <RequiredDocumentsSection v-else-if="activeTab === 'required-documents'" />
        </template>
      </BaseTab>
    </div>
  </div>
</template>

<style scoped></style>
