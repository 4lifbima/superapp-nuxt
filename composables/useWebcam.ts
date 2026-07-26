import { ref, onUnmounted } from 'vue'

export function useWebcam() {
  const mediaStream = ref<MediaStream | null>(null)
  const isCameraActive = ref(false)
  const cameraError = ref<string | null>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)

  const startCamera = async (videoEl?: HTMLVideoElement) => {
    cameraError.value = null
    try {
      if (videoEl) videoElement.value = videoEl

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 1280 },
          facingMode: 'user'
        },
        audio: false
      })

      mediaStream.value = stream
      if (videoElement.value) {
        videoElement.value.srcObject = stream
        await videoElement.value.play()
      }
      isCameraActive.value = true
    } catch (err: any) {
      console.error('Camera access error:', err)
      cameraError.value = err.name === 'NotAllowedError' 
        ? 'Akses kamera ditolak. Silakan izinkan akses kamera pada browser Anda.' 
        : 'Gagal mengakses kamera perangkat.'
      isCameraActive.value = false
    }
  }

  const stopCamera = () => {
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
      mediaStream.value = null
    }
    if (videoElement.value) {
      videoElement.value.srcObject = null
    }
    isCameraActive.value = false
  }

  const captureSnapshot = (): string | null => {
    if (!videoElement.value || !isCameraActive.value) return null

    const video = videoElement.value
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 640
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  }

  onUnmounted(() => {
    stopCamera()
  })

  return {
    mediaStream,
    isCameraActive,
    cameraError,
    videoElement,
    startCamera,
    stopCamera,
    captureSnapshot
  }
}
