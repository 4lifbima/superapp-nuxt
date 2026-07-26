<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header Title -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
          <AppIcon icon="lucide:image" class="w-4 h-4" /> Fitur 2
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Generate Twibbon HD
        </h1>
        <p class="text-sm text-gray-500 dark:text-zinc-400">
          Pilih tema bingkai favoritmu, unggah foto wajah, lalu atur posisi drag, zoom, rotasi & transparansi.
        </p>
      </div>

      <NuxtLink
        to="/photo-booth"
        class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-200 font-semibold text-xs transition-colors flex items-center gap-2"
      >
        <AppIcon icon="lucide:camera" class="w-4 h-4 text-[#00DC82]" /> Ke Photo Booth Studio <AppIcon icon="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>

    <!-- Template Collection Deck Top -->
    <div class="bg-white dark:bg-zinc-900/60 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
      <TemplateSelector />
    </div>

    <!-- Main Interactive Workspace Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left: Drag Canvas Workspace (6 cols) -->
      <div class="lg:col-span-6 bg-white dark:bg-zinc-900/60 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center justify-between">
          <span class="flex items-center gap-1.5"><AppIcon icon="lucide:palette" class="w-4 h-4 text-[#00DC82]" /> Preview Live Workspace</span>
          <span class="text-xs text-gray-400 font-normal">Aspect Ratio 1:1</span>
        </h3>
        <TwibbonPreview ref="twibbonPreviewRef" />
      </div>

      <!-- Right: Interactive Controls Deck (6 cols) -->
      <div class="lg:col-span-6">
        <ControlPanel @download="handleDownload" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TemplateSelector from '~/components/twibbon/TemplateSelector.vue'
import TwibbonPreview from '~/components/twibbon/TwibbonPreview.vue'
import ControlPanel from '~/components/twibbon/ControlPanel.vue'
import AppIcon from '~/components/common/AppIcon.vue'

const twibbonPreviewRef = ref<any>(null)

const handleDownload = () => {
  if (twibbonPreviewRef.value) {
    twibbonPreviewRef.value.downloadResult()
  }
}
</script>
