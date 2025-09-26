<script setup lang="ts">
interface Tab {
  id: string
  label: string
  disabled?: boolean
}

interface Props {
  tabs: Tab[]
}

const props = defineProps<Props>()

const activeTab = defineModel<string>()

function selectTab(tabId: string) {
  const tab = props.tabs.find((t) => t.id === tabId)
  if (tab && !tab.disabled) {
    activeTab.value = tabId
  }
}
</script>

<template>
  <div>
    <div class="bg-gray-700 rounded-lg p-1">
      <div class="flex">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          :disabled="tab.disabled"
          :class="[
            'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            'focus:outline-none focus:ring-0 focus:border-transparent',
            'active:outline-none active:ring-0 active:border-transparent',
            'ring-0',
            {
              'bg-gray-800 text-white shadow-sm': activeTab === tab.id,
              'text-gray-300 hover:text-white hover:bg-gray-600/50':
                activeTab !== tab.id && !tab.disabled,
              'text-gray-500 cursor-not-allowed': tab.disabled,
            },
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="mt-6">
      <slot :activeTab="activeTab" />
    </div>
  </div>
</template>
