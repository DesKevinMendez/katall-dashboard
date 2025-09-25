<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-800 border-t border-gray-700 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Left side - Company info -->
        <div class="flex items-center space-x-4 mb-4 md:mb-0">
          <div class="text-white font-semibold text-lg">Katall Dashboard</div>
          <div class="text-gray-400 text-sm">© {{ currentYear }} All rights reserved</div>
        </div>

        <!-- Right side - Links and info -->
        <div class="flex items-center space-x-6 text-sm text-gray-400">
          <a href="#" class="hover:text-white transition-colors"> Privacy Policy </a>
          <a href="#" class="hover:text-white transition-colors"> Terms of Service </a>
          <a href="#" class="hover:text-white transition-colors"> Support </a>
          <div class="flex items-center space-x-2">
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
