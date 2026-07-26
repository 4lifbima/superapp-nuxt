<template>
  <div class="space-y-4">
    <div
      ref="previewContainerRef"
      class="relative w-full aspect-square max-w-md mx-auto rounded-3xl bg-zinc-950 border border-gray-200 dark:border-zinc-800 canvas-shadow overflow-hidden select-none cursor-grab active:cursor-grabbing group touch-none"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @touchstart.passive="startTouchDrag"
      @touchmove.prevent="onTouchDrag"
      @touchend="stopDrag"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <!-- Main Render Canvas -->
      <canvas
        ref="canvasRef"
        class="w-full h-full object-contain pointer-events-none"
      ></canvas>

      <!-- Empty State Overlay (No Photo Uploaded Yet) -->
      <div
        v-if="!twibbonStore.userPhotoSrc"
        class="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 pointer-events-auto"
      >
        <div class="w-16 h-16 rounded-2xl bg-[#00DC82]/10 border border-[#00DC82]/30 flex items-center justify-center text-[#00DC82] text-3xl">
          <AppIcon icon="lucide:image" class="w-8 h-8" />
        </div>
        <div class="space-y-1">
          <h4 class="font-bold text-lg text-white">Unggah Foto Wajah</h4>
          <p class="text-xs text-zinc-400 max-w-xs">
            Tarik & lepas gambar ke sini, atau klik tombol pilih foto di panel samping.
          </p>
        </div>
        <button
          @click="triggerUpload"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#00DC82] hover:bg-[#00C573] text-zinc-950 font-bold text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-2"
        >
          <AppIcon icon="lucide:upload" class="w-4 h-4" /> Pilih Foto Wajah
        </button>
      </div>

      <!-- Drag Indicator Badge -->
      <div
        v-if="twibbonStore.userPhotoSrc"
        class="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700/80 text-[11px] font-semibold text-zinc-300 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
      >
        <AppIcon icon="lucide:move" class="w-3.5 h-3.5 text-[#00DC82]" /> Geser foto dengan mouse/sentuhan
      </div>
    </div>

    <!-- Hidden File Input for Empty State Click -->
    <input
      ref="hiddenInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTwibbonStore } from '~/stores/twibbonStore'
import { useImageProcessor } from '~/composables/useImageProcessor'
import AppIcon from '~/components/common/AppIcon.vue'

const twibbonStore = useTwibbonStore()
const { renderTwibbonToCanvas, downloadCanvasImage } = useImageProcessor()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const previewContainerRef = ref<HTMLDivElement | null>(null)
const hiddenInputRef = ref<HTMLInputElement | null>(null)
const loadedPhotoImg = ref<HTMLImageElement | null>(null)

const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const initialPosX = ref(0)
const initialPosY = ref(0)

const triggerUpload = () => {
  hiddenInputRef.value?.click()
}

const handleFileSelected = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    processFile(e.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = (evt) => {
    if (evt.target?.result) {
      twibbonStore.setUserPhoto(evt.target.result as string)
      loadPhoto(evt.target.result as string)
    }
  }
  reader.readAsDataURL(file)
}

const loadPhoto = (src: string) => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    loadedPhotoImg.value = img
    renderCanvas()
  }
  img.src = src
}

const renderCanvas = () => {
  if (!canvasRef.value) return

  if (loadedPhotoImg.value) {
    renderTwibbonToCanvas(
      canvasRef.value,
      loadedPhotoImg.value,
      twibbonStore.selectedTemplateId,
      twibbonStore.transform,
      1080
    )
  }
}

const downloadResult = () => {
  if (canvasRef.value && twibbonStore.userPhotoSrc) {
    downloadCanvasImage(canvasRef.value, `superapp-twibbon-${twibbonStore.selectedTemplateId}-${Date.now()}`, 'png')
  }
}

// Mouse Drag Handlers
const startDrag = (e: MouseEvent) => {
  if (!twibbonStore.userPhotoSrc) return
  isDragging.value = true
  startX.value = e.clientX
  startY.value = e.clientY
  initialPosX.value = twibbonStore.transform.x
  initialPosY.value = twibbonStore.transform.y
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  const dx = e.clientX - startX.value
  const dy = e.clientY - startY.value
  twibbonStore.updatePosition(initialPosX.value + dx, initialPosY.value + dy)
}

// Touch Drag Handlers
const startTouchDrag = (e: TouchEvent) => {
  if (!twibbonStore.userPhotoSrc || e.touches.length === 0) return
  isDragging.value = true
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
  initialPosX.value = twibbonStore.transform.x
  initialPosY.value = twibbonStore.transform.y
}

const onTouchDrag = (e: TouchEvent) => {
  if (!isDragging.value || e.touches.length === 0) return
  const dx = e.touches[0].clientX - startX.value
  const dy = e.touches[0].clientY - startY.value
  twibbonStore.updatePosition(initialPosX.value + dx, initialPosY.value + dy)
}

const stopDrag = () => {
  isDragging.value = false
}

// Reactivity watchers
watch(
  () => [
    twibbonStore.selectedTemplateId,
    twibbonStore.transform.x,
    twibbonStore.transform.y,
    twibbonStore.transform.scale,
    twibbonStore.transform.rotation,
    twibbonStore.transform.opacity
  ],
  () => {
    renderCanvas()
  }
)

watch(
  () => twibbonStore.userPhotoSrc,
  (newSrc) => {
    if (newSrc) {
      loadPhoto(newSrc)
    } else {
      loadedPhotoImg.value = null
    }
  }
)

defineExpose({
  downloadResult
})

onMounted(() => {
  if (twibbonStore.userPhotoSrc) {
    loadPhoto(twibbonStore.userPhotoSrc)
  }
})
</script>
