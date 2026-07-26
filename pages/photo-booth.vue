<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header Title -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00DC82] uppercase tracking-wider">
          <AppIcon icon="lucide:camera" class="w-4 h-4" /> Fitur 1
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Photo Booth Studio
        </h1>
        <p class="text-sm text-gray-500 dark:text-zinc-400">
          Ambil foto via webcam atau unggah gambar, pilih bingkai modern & terapkan efek filter eksklusif.
        </p>
      </div>

      <NuxtLink
        to="/generate-twibbon"
        class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-200 font-semibold text-xs transition-colors flex items-center gap-2"
      >
        <AppIcon icon="lucide:image" class="w-4 h-4 text-[#C9A84C]" /> Ke Twibbon Generator <AppIcon icon="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>

    <!-- Main 2-Column App Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Interactive Canvas & Action Buttons (5 cols) -->
      <div class="lg:col-span-5 bg-white dark:bg-zinc-900/60 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <PhotoBoothPreview />
      </div>

      <!-- Right Column: Templates & Filters Selection Deck (7 cols) -->
      <div class="lg:col-span-7 space-y-8 bg-white dark:bg-zinc-900/60 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <!-- Frame Template Selector Gallery -->
        <TemplateGallery />

        <div class="border-t border-gray-100 dark:border-zinc-800/80 pt-6">
          <!-- Filter Effects Selector -->
          <EffectControls />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhotoBoothPreview from '~/components/booth/PhotoBoothPreview.vue'
import TemplateGallery from '~/components/booth/TemplateGallery.vue'
import EffectControls from '~/components/booth/EffectControls.vue'
import AppIcon from '~/components/common/AppIcon.vue'
</script>
