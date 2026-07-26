<template>
  <div class="space-y-5 bg-white dark:bg-zinc-900/70 p-5 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
    <div class="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800/80 pb-3">
      <h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
        <AppIcon icon="lucide:sliders" class="w-4 h-4 text-[#00DC82]" /> Kontrol Presisi Photo
      </h3>
      <button
        @click="twibbonStore.resetTransform()"
        type="button"
        class="text-xs text-[#00DC82] hover:underline font-semibold flex items-center gap-1"
      >
        <AppIcon icon="lucide:rotate-ccw" class="w-3.5 h-3.5" /> Reset Posisi
      </button>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handlePhotoUpload"
      id="twibbon-file-input"
    />

    <!-- Upload Button -->
    <div>
      <button
        @click="triggerUpload"
        type="button"
        class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#00DC82]/20 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-[#00DC82]/40 text-[#00DC82] dark:text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
        id="twibbon-upload-btn"
      >
        <AppIcon icon="lucide:upload" class="w-4 h-4" /> {{ twibbonStore.userPhotoSrc ? 'Ganti Foto Wajah' : 'Pilih / Upload Foto Wajah' }}
      </button>
    </div>

    <!-- Zoom Slider -->
    <div class="space-y-1.5">
      <div class="flex justify-between text-xs font-semibold text-gray-700 dark:text-zinc-300">
        <label for="zoom-slider" class="flex items-center gap-1.5">
          <AppIcon icon="lucide:search-zoom-in" class="w-3.5 h-3.5 text-[#00DC82]" /> Zoom (Ukuran Foto)
        </label>
        <span class="text-[#00DC82] font-mono">{{ Math.round(twibbonStore.transform.scale * 100) }}%</span>
      </div>
      <input
        id="zoom-slider"
        type="range"
        min="0.2"
        max="3.0"
        step="0.05"
        :value="twibbonStore.transform.scale"
        @input="(e: any) => twibbonStore.setScale(parseFloat(e.target.value))"
        class="w-full h-2 rounded-lg bg-gray-200 dark:bg-zinc-800 cursor-pointer"
      />
    </div>

    <!-- Rotation Selector -->
    <div class="space-y-2">
      <label class="block text-xs font-semibold text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
        <AppIcon icon="lucide:rotate-cw" class="w-3.5 h-3.5 text-[#00DC82]" /> Rotasi Gambar:
      </label>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="deg in [0, 90, 180, 270]"
          :key="deg"
          @click="twibbonStore.setRotation(deg)"
          type="button"
          class="py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center"
          :class="[
            twibbonStore.transform.rotation === deg
              ? 'bg-[#00DC82] text-zinc-950 border-[#00DC82] shadow-md'
              : 'bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:border-[#00DC82]'
          ]"
        >
          {{ deg }}°
        </button>
      </div>
    </div>

    <!-- Opacity Slider -->
    <div class="space-y-1.5">
      <div class="flex justify-between text-xs font-semibold text-gray-700 dark:text-zinc-300">
        <label for="opacity-slider" class="flex items-center gap-1.5">
          <AppIcon icon="lucide:droplet" class="w-3.5 h-3.5 text-[#00DC82]" /> Opacity (Transparansi Foto)
        </label>
        <span class="text-[#00DC82] font-mono">{{ Math.round(twibbonStore.transform.opacity * 100) }}%</span>
      </div>
      <input
        id="opacity-slider"
        type="range"
        min="0.1"
        max="1.0"
        step="0.05"
        :value="twibbonStore.transform.opacity"
        @input="(e: any) => twibbonStore.setOpacity(parseFloat(e.target.value))"
        class="w-full h-2 rounded-lg bg-gray-200 dark:bg-zinc-800 cursor-pointer"
      />
    </div>

    <!-- Export & Share Actions -->
    <div class="pt-2 space-y-3">
      <button
        @click="$emit('download')"
        :disabled="!twibbonStore.userPhotoSrc"
        type="button"
        class="w-full py-3.5 px-4 rounded-2xl bg-[#00DC82] hover:bg-[#00C573] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
        id="twibbon-download-png"
      >
        <AppIcon icon="lucide:download" class="w-4 h-4" /> Download Twibbon PNG
      </button>

      <button
        @click="copyShareLink"
        type="button"
        class="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-gray-200 dark:border-zinc-700 transition-colors"
      >
        <AppIcon icon="lucide:share-2" class="w-4 h-4" /> {{ shareCopied ? 'Tautan Berhasil Disalin!' : 'Bagikan Link Aplikasi' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTwibbonStore } from '~/stores/twibbonStore'
import AppIcon from '~/components/common/AppIcon.vue'

defineEmits(['download'])
const twibbonStore = useTwibbonStore()
const fileInputRef = ref<HTMLInputElement | null>(null)
const shareCopied = ref(false)

const triggerUpload = () => {
  fileInputRef.value?.click()
}

const handlePhotoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target?.result) {
        twibbonStore.setUserPhoto(evt.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
}

const copyShareLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href)
    shareCopied.value = true
    setTimeout(() => {
      shareCopied.value = false
    }, 2500)
  }
}
</script>
