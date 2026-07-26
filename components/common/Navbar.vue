<template>
  <header class="sticky top-0 z-50 glass-panel border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00DC82] to-[#C9A84C] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <div class="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
            <span class="text-[#00DC82] font-black text-lg">S</span>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-lg tracking-tight text-gray-900 dark:text-white group-hover:text-[#00DC82] transition-colors flex items-center gap-1">
            SuperApp <AppIcon icon="lucide:sparkles" class="w-4 h-4 text-[#00DC82]" />
          </span>
          <span class="text-[10px] text-gray-500 dark:text-zinc-400 font-medium tracking-wider uppercase">Photo & Twibbon</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav Menu -->
      <nav class="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-zinc-900/60 p-1.5 rounded-full border border-[#00DC82]/30 dark:border-[#00DC82]/50">
        <NuxtLink
          to="/"
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5"
          :class="route.path === '/' ? 'bg-[#00DC82] text-zinc-950 shadow-md' : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white'"
        >
          <AppIcon icon="lucide:home" class="w-4 h-4" /> Beranda
        </NuxtLink>
        <NuxtLink
          to="/photo-booth"
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5"
          :class="route.path === '/photo-booth' ? 'bg-[#00DC82] text-zinc-950 shadow-md' : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white'"
        >
          <AppIcon icon="lucide:camera" class="w-4 h-4" /> Photo Booth
        </NuxtLink>
        <NuxtLink
          to="/generate-twibbon"
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5"
          :class="route.path === '/generate-twibbon' ? 'bg-[#00DC82] text-zinc-950 shadow-md' : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white'"
        >
          <AppIcon icon="lucide:image" class="w-4 h-4" /> Generate Twibbon
        </NuxtLink>
      </nav>

      <!-- Right Action Items -->
      <div class="flex items-center gap-3">
        <ThemeToggle />

        <!-- Mobile Hamburger Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          type="button"
          class="md:hidden p-2 rounded-xl border border-[#00DC82]/50 dark:border-[#00DC82]/50 text-gray-600 dark:text-zinc-300 bg-[#00DC82] dark:bg-[#00DC82] hover:bg-[#00DC82]/50 text-white dark:text-zinc-950 focus:outline-none"
          id="mobile-menu-toggle"
        >
          <AppIcon v-if="!isMobileMenuOpen" icon="tabler:menu" class="w-6 h-6" />
          <AppIcon v-else icon="lucide:x" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0A0A0F]/95 px-4 pt-3 pb-5 space-y-2">
        <NuxtLink
          to="/"
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-base font-semibold transition-colors"
          :class="route.path === '/' ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'"
        >
          <AppIcon icon="lucide:home" class="w-5 h-5" /> Beranda
        </NuxtLink>
        <NuxtLink
          to="/photo-booth"
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-base font-semibold transition-colors"
          :class="route.path === '/photo-booth' ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'"
        >
          <AppIcon icon="lucide:camera" class="w-5 h-5" /> Photo Booth
        </NuxtLink>
        <NuxtLink
          to="/generate-twibbon"
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-base font-semibold transition-colors"
          :class="route.path === '/generate-twibbon' ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'"
        >
          <AppIcon icon="lucide:image" class="w-5 h-5" /> Generate Twibbon
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '~/components/common/ThemeToggle.vue'
import AppIcon from '~/components/common/AppIcon.vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)
</script>
