<template>
  <button
    @click="themeStore.toggleTheme()"
    type="button"
    class="relative p-2 rounded-xl border border-[#00DC82]/60 dark:border-[#00DC82]/50 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-zinc-800"
    :aria-label="themeStore.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    id="theme-toggle-btn"
  >
    <div class="relative w-6 h-6 flex items-center justify-center">
      <AppIcon
        v-if="themeStore.mode === 'dark'"
        icon="lucide:sun"
        class="w-5 h-5 text-[#C9A84C] transform transition-transform duration-500 hover:rotate-90"
      />
      <AppIcon
        v-else
        icon="lucide:moon"
        class="w-5 h-5 text-[#00DC82] transform transition-transform duration-500 -rotate-12 hover:rotate-0"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/themeStore'
import AppIcon from '~/components/common/AppIcon.vue'

const themeStore = useThemeStore()
</script>
