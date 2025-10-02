<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/template/BaseInput.vue'
import BaseButton from '@/template/BaseButton.vue'
import BaseCard from '@/template/BaseCard.vue'
import BaseCheckbox from '@/template/BaseCheckbox.vue'
import BaseLink from '@/template/BaseLink.vue'
import { IconEye, IconEyeOff, IconLoader2 } from '@tabler/icons-vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const rememberMe = ref(false)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  isLoading.value = true

  try {
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to dashboard after successful login
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseCard>
    <form @submit.prevent="handleLogin" class="space-y-6">
      <BaseInput
        v-model="email"
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
        rules="required|email"
        description="We'll never share your email with anyone else."
      />

      <div class="relative">
        <BaseInput
          v-model="password"
          name="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          rules="required|min:6"
          description="Must be at least 6 characters long."
        />
        <button
          type="button"
          class="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors"
          @click="togglePasswordVisibility"
        >
          <IconEye v-if="!showPassword" class="w-5 h-5" />
          <IconEyeOff v-else class="w-5 h-5" />
        </button>
      </div>

      <div class="flex items-center justify-between">
        <BaseCheckbox
          v-model="rememberMe"
          id="remember-me"
          name="remember-me"
          label="Remember me"
        />

        <div class="text-sm">
          <BaseLink to="/forgot-password"> Forgot your password? </BaseLink>
        </div>
      </div>

      <BaseButton type="submit" :disabled="isLoading" class="w-full">
        <span v-if="isLoading" class="flex items-center justify-center">
          <IconLoader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Signing in...
        </span>
        <span v-else>Sign in</span>
      </BaseButton>
    </form>

    <!-- Additional Links -->
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-800 text-gray-400">New to Katall?</span>
        </div>
      </div>

      <div class="mt-6 text-center">
        <BaseLink to="/register"> Create an account </BaseLink>
      </div>
    </div>
  </BaseCard>
</template>
