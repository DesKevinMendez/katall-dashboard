<script setup lang="ts">
import NavBar from '@/modules/Nav/components/NavBar.vue'
import Footer from '@/modules/Nav/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex flex-col">
    <NavBar />
    <main class="container mx-auto px-4 py-6 flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
