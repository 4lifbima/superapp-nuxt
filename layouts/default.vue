<template>
  <div class="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#0A0A0F] text-gray-900 dark:text-white selection:bg-[#00DC82] selection:text-zinc-950">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '~/components/common/Navbar.vue'
import Footer from '~/components/common/Footer.vue'
import { useThemeStore } from '~/stores/themeStore'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>
