import { applyCanvasEffect } from '~/utils/filters'
import { renderBoothBackground, renderBoothOverlay } from '~/utils/templates'
import { renderTwibbonOverlay } from '~/utils/twibbons'
import type { TransformState } from '~/types'

export function useImageProcessor() {
  /**
   * Render Vertical Photo Strip (2, 3, or 4 photos stacked vertically)
   */
  const renderBoothToCanvas = async (
    canvas: HTMLCanvasElement,
    images: (HTMLImageElement | null)[],
    templateId: string,
    effectId: string,
    headerTitle: string = 'SUPERAPP',
    headerSubtitle: string = 'PHOTO BOOTH STUDIO',
    footerCaption: string = 'SPECIAL MOMENT 2026',
    targetWidth: number = 600
  ) => {
    const photoCount = images.length || 3
    const topHeaderH = 140
    const bottomFooterH = 120
    const sideMargin = 40
    const gap = 20

    const slotW = targetWidth - sideMargin * 2
    const slotH = Math.round(slotW * 0.72) // 4:3 rectangle slot

    const targetHeight = topHeaderH + bottomFooterH + photoCount * slotH + (photoCount - 1) * gap

    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, targetWidth, targetHeight)

    // 1. Draw Strip Background Fill FIRST
    renderBoothBackground(ctx, targetWidth, targetHeight, templateId)

    const slotRects: { x: number; y: number; w: number; h: number }[] = []

    // Calculate slot rectangles
    for (let i = 0; i < photoCount; i++) {
      const slotY = topHeaderH + i * (slotH + gap)
      slotRects.push({
        x: sideMargin,
        y: slotY,
        w: slotW,
        h: slotH
      })
    }

    // 2. Render each photo image into its respective slot with filter effect
    for (let i = 0; i < photoCount; i++) {
      const rect = slotRects[i]
      const img = images[i]

      ctx.save()
      ctx.beginPath()
      ctx.rect(rect.x, rect.y, rect.w, rect.h)
      ctx.clip()

      if (img && (img.naturalWidth || img.width) > 0) {
        const imgW = img.naturalWidth || img.width
        const imgH = img.naturalHeight || img.height
        const scale = Math.max(rect.w / imgW, rect.h / imgH)
        const sw = rect.w / scale
        const sh = rect.h / scale
        const sx = (imgW - sw) / 2
        const sy = (imgH - sh) / 2

        ctx.drawImage(img, sx, sy, sw, sh, rect.x, rect.y, rect.w, rect.h)
        // Apply filter effect to this slot region
        applyCanvasEffect(ctx, rect.x, rect.y, rect.w, rect.h, effectId)
      } else {
        // Empty slot placeholder
        ctx.fillStyle = '#F3F4F6'
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
        ctx.fillStyle = '#9CA3AF'
        ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`📷 Slot Foto #${i + 1}`, rect.x + rect.w / 2, rect.y + rect.h / 2)
      }

      ctx.restore()
    }

    // 3. Render Photo Strip Airmail Stripes, Headers, Dividers & Footer OVERLAY on top
    renderBoothOverlay(
      ctx,
      targetWidth,
      targetHeight,
      templateId,
      headerTitle,
      headerSubtitle,
      footerCaption,
      slotRects
    )
  }

  /**
   * Process Twibbon output onto canvas
   */
  const renderTwibbonToCanvas = async (
    canvas: HTMLCanvasElement,
    photoImg: HTMLImageElement,
    templateId: string,
    transform: TransformState,
    targetSize: number = 1080
  ) => {
    canvas.width = targetSize
    canvas.height = targetSize
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, targetSize, targetSize)

    ctx.save()
    ctx.globalAlpha = transform.opacity

    const centerX = targetSize / 2 + transform.x
    const centerY = targetSize / 2 + transform.y
    ctx.translate(centerX, centerY)
    ctx.rotate((transform.rotation * Math.PI) / 180)
    ctx.scale(transform.scale, transform.scale)

    const imgWidth = photoImg.naturalWidth || photoImg.width
    const imgHeight = photoImg.naturalHeight || photoImg.height

    if (imgWidth > 0 && imgHeight > 0) {
      const baseScale = Math.max(targetSize / imgWidth, targetSize / imgHeight)
      const renderW = imgWidth * baseScale
      const renderH = imgHeight * baseScale

      ctx.drawImage(photoImg, -renderW / 2, -renderH / 2, renderW, renderH)
    }

    ctx.restore()

    renderTwibbonOverlay(ctx, targetSize, targetSize, templateId)
  }

  /**
   * Helper to trigger browser download of Canvas content
   */
  const downloadCanvasImage = (
    canvas: HTMLCanvasElement,
    filename: string,
    format: 'png' | 'jpeg' = 'png',
    quality: number = 0.95
  ) => {
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
    const dataUrl = canvas.toDataURL(mimeType, quality)
    const link = document.createElement('a')
    link.download = `${filename}.${format}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    renderBoothToCanvas,
    renderTwibbonToCanvas,
    downloadCanvasImage
  }
}
