<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
        <AppIcon icon="lucide:wand-2" class="w-4 h-4 text-[#00DC82]" /> Pilih Efek Filter (8 Efek)
      </h3>
      <span class="text-xs font-medium text-gray-500 dark:text-zinc-400">Realtime Rendering</span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <button
        v-for="effect in PHOTO_EFFECTS"
        :key="effect.id"
        @click="boothStore.setEffect(effect.id)"
        type="button"
        class="p-2.5 rounded-xl border text-left transition-all duration-200 focus:outline-none flex flex-col justify-between group"
        :class="[
          boothStore.selectedEffectId === effect.id
            ? 'bg-[#00DC82]/15 border-[#00DC82] ring-2 ring-[#00DC82]/40'
            : 'bg-white dark:bg-zinc-900/60 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
        ]"
      >
        <span class="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#00DC82] transition-colors">
          {{ effect.name }}
        </span>
        <span class="text-[11px] text-gray-500 dark:text-zinc-400 truncate mt-1">
          {{ effect.description }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoothStore } from '~/stores/boothStore'
import { PHOTO_EFFECTS } from '~/utils/filters'
import AppIcon from '~/components/common/AppIcon.vue'

const boothStore = useBoothStore()
</script>
