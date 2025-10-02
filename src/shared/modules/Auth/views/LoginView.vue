<script setup lang="ts">
import { IconChartBar } from '@tabler/icons-vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center items-center space-x-2 mb-4">
          <div class="w-10 h-10 flex items-center justify-center">
            <IconChartBar class="w-8 h-8 text-white" />
          </div>
          <span class="text-2xl font-bold text-white">Katall</span>
        </div>
        <h2 class="text-3xl font-bold text-white">Welcome back</h2>
        <p class="mt-2 text-sm text-gray-400">Sign in to your account to continue</p>
      </div>

      <!-- Login Form -->
      <LoginForm />
    </div>
  </div>
</template>
