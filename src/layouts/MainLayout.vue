<script setup lang="ts">
import NavBar from '@/modules/Nav/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <NavBar />
    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
