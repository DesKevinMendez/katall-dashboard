<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { IconUpload } from '@tabler/icons-vue'
import mediumZoom from 'medium-zoom'
import type { AllowAny } from '@/types'

interface Props {
  title: string
  description: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
}

const { title, description, accept = '*/*', multiple = false, maxSize = 10 } = defineProps<Props>()

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const selectedFiles = ref<File[]>([])
const imagePreviews = ref<Record<string, string>>({})
let zoomInstance: AllowAny = null

const modelValue = defineModel<File[]>()

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    validateAndSetFiles(files)
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false

  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files)
    validateAndSetFiles(files)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave() {
  isDragOver.value = false
}

function validateAndSetFiles(files: File[]) {
  const validFiles: File[] = []
  const errors: string[] = []

  files.forEach((file) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      errors.push(`${file.name} is too large. Maximum size is ${maxSize}MB.`)
      return
    }

    // Check file type if accept is specified
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map((type) => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type

      const isValidType = acceptedTypes.some(
        (type) =>
          type === fileExtension ||
          type === mimeType ||
          (type.endsWith('/*') && mimeType.startsWith(type.replace('/*', '/'))),
      )

      if (!isValidType) {
        errors.push(`${file.name} is not an accepted file type.`)
        return
      }
    }

    validFiles.push(file)
  })

  if (errors.length > 0) {
    console.warn('File validation errors:', errors)
  }

  if (validFiles.length > 0) {
    if (multiple) {
      selectedFiles.value = [...selectedFiles.value, ...validFiles]
    } else {
      selectedFiles.value = validFiles
    }
    modelValue.value = selectedFiles.value

    // Generate image previews for image files
    validFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreviews.value[file.name] = e.target?.result as string
          // Initialize zoom for new images
          nextTick(() => {
            initializeZoom()
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

function openFileDialog() {
  fileInput.value?.click()
}

function removeFile(index: number) {
  const file = selectedFiles.value[index]
  if (file && imagePreviews.value[file.name]) {
    delete imagePreviews.value[file.name]
  }
  selectedFiles.value.splice(index, 1)
  modelValue.value = selectedFiles.value
}

function clearFiles() {
  selectedFiles.value = []
  modelValue.value = []
  imagePreviews.value = {}
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  // Clean up zoom instance
  if (zoomInstance) {
    zoomInstance.detach()
    zoomInstance = null
  }
}

function initializeZoom() {
  // Clean up existing zoom instance
  if (zoomInstance) {
    zoomInstance.detach()
  }

  // Initialize zoom for all image previews
  nextTick(() => {
    const imageElements = document.querySelectorAll('.image-preview')
    if (imageElements.length > 0) {
      zoomInstance = mediumZoom(imageElements, {
        background: 'rgba(0, 0, 0, 0.8)',
        margin: 24,
        scrollOffset: 0,
        container: null,
        template: null,
        zIndex: 999,
      })
    }
  })
}

onMounted(() => {
  // Initialize zoom when component is mounted
  nextTick(() => {
    initializeZoom()
  })
})
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
      <p class="text-gray-400">{{ description }}</p>
    </div>

    <!-- Upload Area -->
    <div
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="openFileDialog"
      :class="[
        'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragOver ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600 hover:border-gray-500',
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileSelect"
        class="hidden"
      />

      <div class="space-y-4">
        <div class="flex justify-center">
          <IconUpload class="h-12 w-12 text-gray-400" />
        </div>

        <div>
          <p class="text-gray-300 font-medium">Click to upload</p>
          <p class="text-sm text-gray-500 mt-1">Drag and drop files here, or click to select</p>
        </div>
      </div>
    </div>

    <!-- Selected Files -->
    <div v-if="selectedFiles.length > 0" class="space-y-2">
      <div class="flex justify-between items-center">
        <h4 class="text-sm font-medium text-white">Selected Files</h4>
        <button
          @click="clearFiles"
          class="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Clear all
        </button>
      </div>

      <div class="space-y-2">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="flex items-center justify-between bg-gray-800 rounded-md p-3"
        >
          <div class="flex items-center space-x-3">
            <!-- Image preview or file type icon -->
            <div
              v-if="file.type.startsWith('image/') && imagePreviews[file.name]"
              class="max-w-12 max-h-12 rounded overflow-hidden flex-shrink-0 cursor-pointer"
            >
              <img
                :src="imagePreviews[file.name]"
                :alt="file.name"
                class="max-w-full max-h-full object-contain image-preview"
              />
            </div>
            <div v-else class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span class="text-xs text-white font-medium">
                {{ file.name.split('.').pop()?.toUpperCase() }}
              </span>
            </div>
            <div>
              <p class="text-sm text-white">{{ file.name }}</p>
              <p class="text-xs text-gray-400">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
            </div>
          </div>

          <button
            @click="removeFile(index)"
            class="text-gray-400 hover:text-red-400 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
