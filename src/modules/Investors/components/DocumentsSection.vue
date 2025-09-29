<script setup lang="ts">
import DocumentCard from './DocumentCard.vue'

interface Document {
  title: string
  status: 'Verified' | 'Pending' | 'Rejected'
  uploadDate: string
}

// Mock data for documents
const documents: Document[] = [
  {
    title: 'National ID',
    status: 'Pending',
    uploadDate: 'Uploaded on October 6, 2023',
  },
  {
    title: 'Tax ID',
    status: 'Pending',
    uploadDate: 'Uploaded on October 6, 2023',
  },
  {
    title: 'Passport',
    status: 'Pending',
    uploadDate: 'Uploaded on October 6, 2023',
  },
]
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="mb-6">
      <h3 class="text-lg font-bold text-white mb-2">Personal Documents</h3>
      <p class="text-sm text-gray-400">Documents uploaded by the investor for KYC verification.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DocumentCard v-for="document in documents" :key="document.title" :document="document" />
    </div>
  </div>
</template>
