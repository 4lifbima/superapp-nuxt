<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
        <AppIcon icon="lucide:layout-grid" class="w-4 h-4 text-[#00DC82]" /> Koleksi Template Twibbon (8 Tema)
      </h3>
      <span class="text-xs font-semibold text-[#00DC82]">High Vector HD</span>
    </div>

    <!-- Category Filters / Template Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        v-for="tmpl in TWIBBON_TEMPLATES"
        :key="tmpl.id"
        @click="twibbonStore.setTemplate(tmpl.id)"
        type="button"
        class="relative p-3.5 rounded-2xl text-left border transition-all duration-200 focus:outline-none flex flex-col justify-between group overflow-hidden"
        :class="[
          twibbonStore.selectedTemplateId === tmpl.id
            ? 'bg-[#00DC82]/10 border-[#00DC82] ring-2 ring-[#00DC82]/30 shadow-lg'
            : 'bg-white dark:bg-zinc-900/60 border-gray-200 dark:border-zinc-800 hover:border-[#00DC82]/50'
        ]"
      >
        <!-- Color Bar Indicator -->
        <div class="flex items-center gap-1.5 mb-2">
          <div class="w-3 h-3 rounded-full shadow-sm" :style="{ backgroundColor: tmpl.primaryColor }"></div>
          <div class="w-3 h-3 rounded-full shadow-sm" :style="{ backgroundColor: tmpl.accentColor }"></div>
          <span class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 uppercase">
            {{ tmpl.category }}
          </span>
        </div>

        <div class="space-y-1">
          <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#00DC82] transition-colors leading-tight">
            {{ tmpl.name }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 leading-tight">
            {{ tmpl.description }}
          </p>
        </div>

        <div
          v-if="twibbonStore.selectedTemplateId === tmpl.id"
          class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#00DC82] animate-ping"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTwibbonStore } from '~/stores/twibbonStore'
import { TWIBBON_TEMPLATES } from '~/utils/twibbons'
import AppIcon from '~/components/common/AppIcon.vue'

const twibbonStore = useTwibbonStore()
</script>
