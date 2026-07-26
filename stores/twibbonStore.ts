import { defineStore } from 'pinia'
import type { TransformState } from '~/types'

export const useTwibbonStore = defineStore('twibbon', {
  state: () => ({
    selectedTemplateId: 'merdeka',
    userPhotoSrc: null as string | null,
    transform: {
      x: 0,
      y: 0,
      scale: 1.0,
      rotation: 0,
      opacity: 1.0
    } as TransformState
  }),
  actions: {
    setTemplate(id: string) {
      this.selectedTemplateId = id
    },
    setUserPhoto(src: string | null) {
      this.userPhotoSrc = src
    },
    updatePosition(x: number, y: number) {
      this.transform.x = x
      this.transform.y = y
    },
    setScale(scale: number) {
      this.transform.scale = Math.max(0.2, Math.min(3.0, scale))
    },
    rotateClockwise() {
      this.transform.rotation = (this.transform.rotation + 90) % 360
    },
    setRotation(deg: number) {
      this.transform.rotation = deg
    },
    setOpacity(opacity: number) {
      this.transform.opacity = Math.max(0, Math.min(1.0, opacity))
    },
    resetTransform() {
      this.transform = {
        x: 0,
        y: 0,
        scale: 1.0,
        rotation: 0,
        opacity: 1.0
      }
    }
  }
})
