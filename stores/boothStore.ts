import { defineStore } from 'pinia'
import type { StripPhotoCount } from '~/types'

export const useBoothStore = defineStore('booth', {
  state: () => ({
    photoCount: 3 as StripPhotoCount,
    capturedImages: [null, null, null] as (string | null)[],
    activeSlotIndex: 0,
    selectedTemplateId: 'minimalis',
    selectedEffectId: 'none',
    headerTitle: 'SUPERAPP',
    headerSubtitle: 'PHOTO BOOTH STUDIO',
    footerCaption: 'SPECIAL MOMENT 2026',
    isCameraMode: false,
    isCountdownActive: false,
    countdownValue: 3
  }),
  actions: {
    setPhotoCount(count: StripPhotoCount) {
      this.photoCount = count
      const current = [...this.capturedImages]
      const next: (string | null)[] = []
      for (let i = 0; i < count; i++) {
        next.push(current[i] || null)
      }
      this.capturedImages = next
      if (this.activeSlotIndex >= count) {
        this.activeSlotIndex = 0
      }
    },
    setSlotImage(index: number, src: string | null) {
      if (index >= 0 && index < this.photoCount) {
        const updated = [...this.capturedImages]
        updated[index] = src
        this.capturedImages = updated
      }
    },
    setActiveSlot(index: number) {
      if (index >= 0 && index < this.photoCount) {
        this.activeSlotIndex = index
      }
    },
    setTemplate(id: string) {
      this.selectedTemplateId = id
    },
    setEffect(id: string) {
      this.selectedEffectId = id
    },
    setHeaderTitle(title: string) {
      this.headerTitle = title
    },
    setHeaderSubtitle(sub: string) {
      this.headerSubtitle = sub
    },
    setFooterCaption(text: string) {
      this.footerCaption = text
    },
    toggleCameraMode(active?: boolean) {
      this.isCameraMode = active !== undefined ? active : !this.isCameraMode
    },
    setCountdownState(active: boolean, val: number = 3) {
      this.isCountdownActive = active
      this.countdownValue = val
    },
    resetAll() {
      this.photoCount = 3
      this.capturedImages = [null, null, null]
      this.activeSlotIndex = 0
      this.selectedTemplateId = 'minimalis'
      this.selectedEffectId = 'none'
      this.headerTitle = 'SUPERAPP'
      this.headerSubtitle = 'PHOTO BOOTH STUDIO'
      this.footerCaption = 'SPECIAL MOMENT 2026'
      this.isCameraMode = false
      this.isCountdownActive = false
      this.countdownValue = 3
    }
  }
})
