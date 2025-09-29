<script setup lang="ts">
import { ref } from 'vue'
import BaseFileUpload from '@/template/BaseFileUpload.vue'

// Document types with their configurations
const documentTypes = [
  {
    id: 'certificate',
    title: 'Certificate of Incorporation',
    description: "Upload your company's certificate of incorporation.",
    accept: '.pdf',
    maxSize: 5,
  },
  {
    id: 'articles',
    title: 'Articles of Association',
    description: "Upload your company's articles of association.",
    accept: '.pdf',
    maxSize: 5,
  },
  {
    id: 'financial',
    title: 'Financial Statements',
    description: "Upload your company's latest financial statements.",
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: 10,
  },
  {
    id: 'businessPlan',
    title: 'Business Plan',
    description: "Upload your company's business plan.",
    accept: '.pdf',
    maxSize: 10,
  },
]

// Store uploaded files for each document type
const uploadedFiles = ref<Record<string, File[]>>({})

function handleFileUpload(documentId: string, files: File[]) {
  uploadedFiles.value[documentId] = files
  console.log(`Uploaded files for ${documentId}:`, files)
}

function handleSubmit() {
  console.log('All uploaded documents:', uploadedFiles.value)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-white mb-2">Required Documents</h3>
      <p class="text-gray-400">
        Upload the required documents to complete your startup profile. All documents must be in PDF
        format.
      </p>
    </div>

    <!-- Documents Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="document in documentTypes" :key="document.id" class="bg-gray-800 rounded-lg p-6">
        <BaseFileUpload
          :title="document.title"
          :description="document.description"
          :accept="document.accept"
          :max-size="document.maxSize"
          @update:model-value="(files) => handleFileUpload(document.id, files)"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button
        @click="handleSubmit"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
      >
        Save Documents
      </button>
    </div>
  </div>
</template>

<style scoped></style>
