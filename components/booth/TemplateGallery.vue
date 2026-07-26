<template>
  <div class="space-y-4">
    <!-- Header Title & Subtitle Customization -->
    <div class="p-4 bg-gray-50 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 rounded-2xl space-y-3">
      <h4 class="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5">
        <AppIcon icon="lucide:pencil" class="w-3.5 h-3.5 text-[#00DC82]" /> Teks Header & Footer Photo Strip
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label class="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1">Header Atas:</label>
          <input
            :value="boothStore.headerTitle"
            @input="(e: any) => boothStore.setHeaderTitle(e.target.value)"
            type="text"
            placeholder="SMARTPEOPLE"
            class="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00DC82]"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1">Sub-Header:</label>
          <input
            :value="boothStore.headerSubtitle"
            @input="(e: any) => boothStore.setHeaderSubtitle(e.target.value)"
            type="text"
            placeholder="MORE SMART THAN PHONE"
            class="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00DC82]"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1">Footer Bawah:</label>
          <input
            :value="boothStore.footerCaption"
            @input="(e: any) => boothStore.setFooterCaption(e.target.value)"
            type="text"
            placeholder="BACK TO OFFICE"
            class="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00DC82]"
          />
        </div>
      </div>
    </div>

    <!-- Template Selector Gallery -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
          <AppIcon icon="lucide:layout-template" class="w-4 h-4 text-[#00DC82]" /> Desain Frame Photo Strip
        </h3>
        <span class="text-xs font-medium text-gray-500 dark:text-zinc-400">6 Template</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          v-for="tmpl in BOOTH_TEMPLATES"
          :key="tmpl.id"
          @click="boothStore.setTemplate(tmpl.id)"
          type="button"
          class="relative p-3 rounded-2xl text-left border transition-all duration-200 focus:outline-none flex flex-col justify-between group overflow-hidden"
          :class="[
            boothStore.selectedTemplateId === tmpl.id
              ? 'bg-[#00DC82]/10 border-[#00DC82] ring-2 ring-[#00DC82]/30 shadow-lg'
              : 'bg-white dark:bg-zinc-900/60 border-gray-200 dark:border-zinc-800 hover:border-[#00DC82]/50'
          ]"
        >
          <div class="flex items-start justify-between gap-1 mb-2">
            <span class="font-bold text-xs text-gray-900 dark:text-white group-hover:text-[#00DC82] transition-colors leading-tight">
              {{ tmpl.name }}
            </span>
            <span
              v-if="tmpl.badge"
              class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
              :class="[
                boothStore.selectedTemplateId === tmpl.id
                  ? 'bg-[#00DC82] text-zinc-950'
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300'
              ]"
            >
              {{ tmpl.badge }}
            </span>
          </div>

          <p class="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-2 leading-tight">
            {{ tmpl.description }}
          </p>

          <div
            v-if="boothStore.selectedTemplateId === tmpl.id"
            class="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00DC82] animate-ping"
          ></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoothStore } from '~/stores/boothStore'
import { BOOTH_TEMPLATES } from '~/utils/templates'
import AppIcon from '~/components/common/AppIcon.vue'

const boothStore = useBoothStore()
</script>
