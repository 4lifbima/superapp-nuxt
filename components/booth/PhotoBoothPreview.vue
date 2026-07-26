<template>
  <div class="space-y-6">
    <!-- Photo Count Selector Header Chips -->
    <div class="flex items-center justify-between bg-gray-100 dark:bg-zinc-900 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800">
      <span class="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300 pl-2">
        Jumlah Foto Strip:
      </span>
      <div class="flex items-center gap-1.5">
        <button
          v-for="count in ([2, 3, 4] as const)"
          :key="count"
          @click="boothStore.setPhotoCount(count)"
          :disabled="isSessionRunning"
          type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          :class="[
            boothStore.photoCount === count
              ? 'bg-[#00DC82] text-zinc-950 shadow-md'
              : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
          ]"
        >
          {{ count }} Foto
        </button>
      </div>
    </div>

    <!-- Main Interactive Photo Strip Display / Camera Box -->
    <div class="relative w-full max-w-sm mx-auto rounded-3xl bg-zinc-950 border border-gray-200 dark:border-zinc-800 canvas-shadow overflow-hidden group">
      
      <!-- Hidden File Upload Input for specific slot -->
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileUpload"
        id="booth-file-input-slot"
      />

      <!-- Live WebCam Video Stream Element (active during session) -->
      <video
        ref="videoStreamRef"
        autoplay
        playsinline
        muted
        class="w-full aspect-square object-cover"
        :class="{ 'hidden': !boothStore.isCameraMode }"
      ></video>

      <!-- Main Rendered Vertical Photo Strip Canvas -->
      <div class="w-full overflow-y-auto max-h-[580px] p-2 bg-zinc-950 no-scrollbar" :class="{ 'hidden': boothStore.isCameraMode }">
        <canvas
          ref="canvasRef"
          class="w-full h-auto object-contain mx-auto rounded-xl"
        ></canvas>
      </div>

      <!-- Flash Overlay Animation on Snapshot -->
      <div
        v-if="showFlash"
        class="absolute inset-0 bg-white z-40 animate-ping opacity-90 pointer-events-none"
      ></div>

      <!-- Live Countdown Screen Overlay -->
      <div
        v-if="boothStore.isCountdownActive"
        class="absolute inset-0 bg-zinc-950/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4"
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DC82]/20 border border-[#00DC82]/40 text-[#00DC82] text-xs font-bold">
          <AppIcon icon="lucide:camera" class="w-4 h-4" /> Foto #{{ boothStore.activeSlotIndex + 1 }} dari {{ boothStore.photoCount }}
        </div>
        
        <div class="text-7xl sm:text-8xl font-black text-white text-gradient-primary transform scale-110 transition-transform duration-300 animate-pulse">
          {{ boothStore.countdownValue }}
        </div>

        <p class="text-xs text-zinc-300 font-medium">
          Bersiap! Senyum ke kamera...
        </p>
      </div>

      <!-- Empty State Overlay (No Session & Camera Off) -->
      <div
        v-if="!hasAnyPhotos && !boothStore.isCameraMode"
        class="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center space-y-4"
      >
        <div class="w-16 h-16 rounded-2xl bg-[#00DC82]/10 border border-[#00DC82]/30 flex items-center justify-center text-[#00DC82] text-3xl">
          <AppIcon icon="lucide:camera" class="w-8 h-8" />
        </div>
        <div class="space-y-1">
          <h4 class="font-bold text-lg text-white">Strip Photo Booth {{ boothStore.photoCount }} Frame</h4>
          <p class="text-xs text-zinc-400 max-w-xs">
            Klik "Mulai Sesi Foto" untuk otomatis menjepret {{ boothStore.photoCount }} foto berurutan dengan jeda hitung mundur.
          </p>
        </div>
        <button
          @click="startAutoPhotoSession"
          type="button"
          class="px-6 py-3 rounded-2xl bg-[#00DC82] hover:bg-[#00C573] text-zinc-950 font-extrabold text-sm shadow-xl glow-primary transition-transform hover:scale-105 flex items-center gap-2"
        >
          <AppIcon icon="lucide:rocket" class="w-4 h-4" /> Mulai Sesi Foto Auto (3.. 2.. 1..)
        </button>
      </div>
    </div>

    <!-- Camera Error Display -->
    <div v-if="cameraError" class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center font-medium flex items-center justify-center gap-1.5">
      <AppIcon icon="lucide:alert-triangle" class="w-4 h-4" /> {{ cameraError }}
    </div>

    <!-- Action Session Launch Controls -->
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button
        @click="startAutoPhotoSession"
        :disabled="isSessionRunning"
        type="button"
        class="px-5 py-3 rounded-2xl bg-[#00DC82] hover:bg-[#00C573] disabled:opacity-50 text-zinc-950 font-extrabold text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
      >
        <AppIcon icon="lucide:rocket" class="w-4 h-4" /> {{ hasAnyPhotos ? 'Ulangi Sesi Foto Auto' : 'Mulai Sesi Foto Auto' }}
      </button>

      <button
        @click="boothStore.resetAll()"
        :disabled="isSessionRunning"
        type="button"
        class="px-4 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold text-xs border border-red-500/20 transition-colors flex items-center gap-1.5"
      >
        <AppIcon icon="lucide:rotate-ccw" class="w-4 h-4" /> Reset Strip
      </button>
    </div>

    <!-- Slots Management Bar (Per-Slot Upload / Retake) -->
    <div class="p-4 bg-gray-50 dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-800 rounded-2xl space-y-3">
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-zinc-200">
        <span class="flex items-center gap-1.5"><AppIcon icon="lucide:layout-grid" class="w-4 h-4 text-[#00DC82]" /> Kelola Slot Foto Individual ({{ boothStore.photoCount }} Slot)</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div
          v-for="(imgSrc, idx) in boothStore.capturedImages"
          :key="idx"
          class="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center gap-1.5 text-center"
        >
          <div class="w-full aspect-[4/3] rounded-lg bg-zinc-800 overflow-hidden relative border border-zinc-700">
            <img v-if="imgSrc" :src="imgSrc" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-[10px] text-zinc-500">
              Kosong
            </div>
            <span class="absolute top-1 left-1 bg-zinc-900/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-white">
              #{{ idx + 1 }}
            </span>
          </div>

          <button
            @click="triggerUploadForSlot(idx)"
            type="button"
            class="w-full py-1 text-[10px] font-semibold text-[#00DC82] hover:underline flex items-center justify-center gap-1"
          >
            <AppIcon icon="lucide:upload" class="w-3 h-3" /> Upload Slot #{{ idx + 1 }}
          </button>
        </div>
      </div>
    </div>

    <!-- Download Options Panel -->
    <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/20 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5">
          <AppIcon icon="lucide:save" class="w-4 h-4 text-[#00DC82]" /> Simpan Strip Foto High HD
        </span>
        <span class="text-[11px] font-semibold text-[#00DC82]">Vertical Strip HD</span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          @click="downloadImage('png')"
          :disabled="!hasAnyPhotos || isSessionRunning"
          type="button"
          class="px-4 py-3 rounded-xl bg-[#00DC82] hover:bg-[#00C573] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          id="download-png-strip-btn"
        >
          <AppIcon icon="lucide:download" class="w-4 h-4" /> Download Strip PNG
        </button>

        <button
          @click="downloadImage('jpeg')"
          :disabled="!hasAnyPhotos || isSessionRunning"
          type="button"
          class="px-4 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#B5953C] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          id="download-jpg-strip-btn"
        >
          <AppIcon icon="lucide:download" class="w-4 h-4" /> Download Strip JPG
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useBoothStore } from '~/stores/boothStore'
import { useImageProcessor } from '~/composables/useImageProcessor'
import { useWebcam } from '~/composables/useWebcam'
import AppIcon from '~/components/common/AppIcon.vue'

const boothStore = useBoothStore()
const { renderBoothToCanvas, downloadCanvasImage } = useImageProcessor()
const { cameraError, startCamera, stopCamera, captureSnapshot } = useWebcam()

const fileInputRef = ref<HTMLInputElement | null>(null)
const videoStreamRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const showFlash = ref(false)
const isSessionRunning = ref(false)
const targetSlotForUpload = ref(0)
const loadedImageObjects = ref<(HTMLImageElement | null)[]>([])

const hasAnyPhotos = computed(() => {
  return boothStore.capturedImages.some(img => img !== null)
})

const triggerUploadForSlot = (slotIdx: number) => {
  targetSlotForUpload.value = slotIdx
  fileInputRef.value?.click()
}

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target?.result) {
        boothStore.setSlotImage(targetSlotForUpload.value, evt.target.result as string)
        updateImageObjects()
      }
    }
    reader.readAsDataURL(file)
  }
}

/**
 * Automated Photo Shoot Session (3.. 2.. 1.. Snap per slot)
 */
const startAutoPhotoSession = async () => {
  if (isSessionRunning.value) return
  isSessionRunning.value = true
  boothStore.toggleCameraMode(true)
  await nextTick()

  if (videoStreamRef.value) {
    await startCamera(videoStreamRef.value)
  }

  for (let i = 0; i < boothStore.photoCount; i++) {
    boothStore.setActiveSlot(i)
    
    // Countdown 3, 2, 1
    for (let c = 3; c >= 1; c--) {
      boothStore.setCountdownState(true, c)
      await new Promise(r => setTimeout(r, 1000))
    }

    // SNAP! Flash animation & capture
    showFlash.value = true
    setTimeout(() => { showFlash.value = false }, 300)

    const snapshot = captureSnapshot()
    if (snapshot) {
      boothStore.setSlotImage(i, snapshot)
      await updateImageObjects()
    }
    boothStore.setCountdownState(false)

    // Pause between shots if not last slot
    if (i < boothStore.photoCount - 1) {
      await new Promise(r => setTimeout(r, 1500))
    }
  }

  // End session, stop camera stream & unhide canvas
  stopCamera()
  boothStore.toggleCameraMode(false)
  isSessionRunning.value = false
  await nextTick()
  renderStripCanvas()
}

const updateImageObjects = () => {
  return new Promise<void>((resolve) => {
    const promises = boothStore.capturedImages.map(src => {
      return new Promise<HTMLImageElement | null>((res) => {
        if (!src) return res(null)
        const img = new Image()
        if (!src.startsWith('data:') && !src.startsWith('blob:')) {
          img.crossOrigin = 'anonymous'
        }
        img.onload = () => res(img)
        img.onerror = (err) => {
          console.warn('Image load error for slot:', err)
          res(null)
        }
        img.src = src
      })
    })

    Promise.all(promises).then(imgs => {
      loadedImageObjects.value = imgs
      renderStripCanvas()
      resolve()
    })
  })
}

const renderStripCanvas = () => {
  if (!canvasRef.value) return

  renderBoothToCanvas(
    canvasRef.value,
    loadedImageObjects.value,
    boothStore.selectedTemplateId,
    boothStore.selectedEffectId,
    boothStore.headerTitle,
    boothStore.headerSubtitle,
    boothStore.footerCaption,
    600
  )
}

const downloadImage = (format: 'png' | 'jpeg') => {
  if (canvasRef.value && hasAnyPhotos.value) {
    downloadCanvasImage(canvasRef.value, `superapp-photostrip-${boothStore.photoCount}fotos-${Date.now()}`, format)
  }
}

// Reactivity Watchers
watch(
  () => [
    boothStore.photoCount,
    boothStore.selectedTemplateId,
    boothStore.selectedEffectId,
    boothStore.headerTitle,
    boothStore.headerSubtitle,
    boothStore.footerCaption
  ],
  () => {
    updateImageObjects()
  }
)

watch(
  () => boothStore.capturedImages,
  () => {
    updateImageObjects()
  },
  { deep: true }
)

onMounted(() => {
  updateImageObjects()
})
</script>
