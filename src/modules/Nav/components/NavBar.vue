<template>
  <nav class="bg-gray-900 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left Section - Brand and Primary Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Brand/Logo -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 flex items-center justify-center">
              <IconChartBar class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-semibold text-white">Katall</span>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-1">
            <!-- Dashboard -->
            <router-link
              to="/"
              class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              exact-active-class="bg-gray-800 text-white"
            >
              <IconHome class="w-5 h-5" />
              <span>Dashboard</span>
            </router-link>

            <!-- Offerings -->
            <router-link
              to="/offerings"
              class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              exact-active-class="bg-gray-800 text-white"
            >
              <IconPackage class="w-5 h-5" />
              <span>Offerings</span>
            </router-link>

            <!-- Investors -->
            <router-link
              to="/investors"
              class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              exact-active-class="bg-gray-800 text-white"
            >
              <IconUsers class="w-5 h-5" />
              <span>Investors</span>
            </router-link>

            <!-- Transactions -->
            <router-link
              to="/transactions"
              class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              exact-active-class="bg-gray-800 text-white"
            >
              <IconReceipt class="w-5 h-5" />
              <span>Transactions</span>
            </router-link>

            <!-- Documents -->
            <router-link
              to="/documents"
              class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              exact-active-class="bg-gray-800 text-white"
            >
              <IconFileText class="w-5 h-5" />
              <span>Documents</span>
            </router-link>

            <!-- More -->
            <BaseDropdown label="More" :items="moreDropdownItems" />
          </div>
        </div>

        <!-- Right Section - Utility and User Account -->
        <div class="flex items-center space-x-4">
          <!-- Help/Information Icon -->
          <button
            class="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <IconHelp class="w-5 h-5" />
          </button>

          <!-- User Profile Dropdown -->
          <UserDropdown name="Kevin Méndez" initials="KM" title="My Account" />
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            class="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            @click="toggleMobileMenu"
          >
            <IconMenu2 class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
          <router-link
            to="/"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            exact-active-class="text-white bg-gray-700"
          >
            <IconHome class="w-5 h-5" />
            <span>Dashboard</span>
          </router-link>
          <router-link
            to="/offerings"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            exact-active-class="text-white bg-gray-700"
          >
            <IconPackage class="w-5 h-5" />
            <span>Offerings</span>
          </router-link>
          <router-link
            to="/investors"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            exact-active-class="text-white bg-gray-700"
          >
            <IconUsers class="w-5 h-5" />
            <span>Investors</span>
          </router-link>
          <router-link
            to="/transactions"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            exact-active-class="text-white bg-gray-700"
          >
            <IconReceipt class="w-5 h-5" />
            <span>Transactions</span>
          </router-link>
          <router-link
            to="/documents"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            exact-active-class="text-white bg-gray-700"
          >
            <IconFileText class="w-5 h-5" />
            <span>Documents</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IconChartBar,
  IconHome,
  IconPackage,
  IconUsers,
  IconReceipt,
  IconFileText,
  IconHelp,
  IconMenu2,
  IconChartLine,
  IconSettings,
} from '@tabler/icons-vue'
import BaseDropdown, { type DropdownItem } from '@/template/BaseDropdown.vue'
import UserDropdown from '@/modules/Nav/components/UserDropdown.vue'

const isMobileMenuOpen = ref(false)

const moreDropdownItems: DropdownItem[] = [
  {
    to: '/analytics',
    label: 'Analytics',
    icon: IconChartLine,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: IconSettings,
  },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>
