import type { BoothTemplate } from '~/types'

export const BOOTH_TEMPLATES: BoothTemplate[] = [
  {
    id: 'minimalis',
    name: 'Airmail Minimalis',
    description: 'Border merah putih biru & tipografi clean',
    badge: 'Classic',
    aspectRatio: '1:3'
  },
  {
    id: 'polaroid',
    name: 'Clean White Strip',
    description: 'Bingkai putih tebal dengan header & footer caption',
    badge: 'Minimal',
    aspectRatio: '1:3'
  },
  {
    id: 'staggered',
    name: 'Staggered Layers',
    description: 'Border offset 3D dengan aksen hijau primary',
    badge: 'Modern',
    aspectRatio: '1:3'
  },
  {
    id: 'window',
    name: 'Window Frame Gold',
    description: 'Hitam doff elegan dengan garis border emas mewah',
    badge: 'Luxury',
    aspectRatio: '1:3'
  },
  {
    id: 'corner',
    name: 'Corner Accent',
    description: 'Aksen L-shape emas & hijau di tiap slot foto',
    badge: 'Elegant',
    aspectRatio: '1:3'
  },
  {
    id: 'neon',
    name: 'Neon Cyber Strip',
    description: 'Efek garis neon glowing di sekeliling photo strip',
    badge: 'Vibrant',
    aspectRatio: '1:3'
  }
]

/**
 * 1. Render Strip Background Color (Drawn BEFORE images)
 */
export function renderBoothBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  templateId: string
) {
  if (templateId === 'window') {
    ctx.fillStyle = '#141418'
    ctx.fillRect(0, 0, width, height)
  } else if (templateId === 'staggered') {
    ctx.fillStyle = '#0A0A0F'
    ctx.fillRect(0, 0, width, height)
  } else {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)
  }
}

/**
 * 2. Render Photo Strip Headers, Airmail Stripes, Borders & Footer (Drawn AFTER images)
 */
export function renderBoothOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  templateId: string,
  headerTitle: string = 'SUPERAPP',
  headerSubtitle: string = 'PHOTO BOOTH STUDIO',
  footerCaption: string = 'SPECIAL MOMENT 2026',
  slotRects: { x: number; y: number; w: number; h: number }[] = []
) {
  const topHeaderH = 140
  const bottomFooterH = 120

  // Airmail Top/Bottom Pattern for 'minimalis'
  if (templateId === 'minimalis') {
    const barH = 16
    const blockW = 24
    let x = 0
    let toggle = true
    while (x < width) {
      ctx.fillStyle = toggle ? '#DC2626' : '#2563EB'
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + blockW, 0)
      ctx.lineTo(x + blockW - 10, barH)
      ctx.lineTo(x - 10, barH)
      ctx.closePath()
      ctx.fill()

      // Bottom bar
      ctx.beginPath()
      ctx.moveTo(x, height)
      ctx.lineTo(x + blockW, height)
      ctx.lineTo(x + blockW - 10, height - barH)
      ctx.lineTo(x - 10, height - barH)
      ctx.closePath()
      ctx.fill()

      x += blockW + 4
      toggle = !toggle
    }
  }

  // Header Title & Subtitle Rendering
  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (templateId === 'window' || templateId === 'staggered') {
    ctx.fillStyle = templateId === 'window' ? '#F3E096' : '#00DC82'
  } else {
    ctx.fillStyle = '#1A1A1A'
  }
  ctx.font = `bold ${Math.max(22, width * 0.07)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText((headerTitle || 'SUPERAPP').toUpperCase(), width / 2, topHeaderH * 0.45)

  if (templateId === 'window' || templateId === 'staggered') {
    ctx.fillStyle = '#9CA3AF'
  } else {
    ctx.fillStyle = '#DC2626'
  }
  ctx.font = `600 ${Math.max(12, width * 0.033)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText((headerSubtitle || 'PHOTO BOOTH STUDIO').toUpperCase(), width / 2, topHeaderH * 0.78)

  // Slot frames & dividers on top of photos
  slotRects.forEach((rect) => {
    ctx.save()
    if (templateId === 'minimalis') {
      ctx.strokeStyle = '#E5E7EB'
      ctx.lineWidth = 3
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    } else if (templateId === 'polaroid') {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.lineWidth = 3
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    } else if (templateId === 'staggered') {
      ctx.strokeStyle = '#00DC82'
      ctx.lineWidth = 3
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    } else if (templateId === 'window') {
      ctx.strokeStyle = '#C9A84C'
      ctx.lineWidth = 3
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    } else if (templateId === 'corner') {
      const cLen = Math.max(20, rect.w * 0.12)
      ctx.lineWidth = 4
      // Top left
      ctx.strokeStyle = '#C9A84C'
      ctx.beginPath()
      ctx.moveTo(rect.x - 4, rect.y + cLen)
      ctx.lineTo(rect.x - 4, rect.y - 4)
      ctx.lineTo(rect.x + cLen, rect.y - 4)
      ctx.stroke()
      // Bottom right
      ctx.strokeStyle = '#00DC82'
      ctx.beginPath()
      ctx.moveTo(rect.x + rect.w + 4, rect.y + rect.h - cLen)
      ctx.lineTo(rect.x + rect.w + 4, rect.y + rect.h + 4)
      ctx.lineTo(rect.x + rect.w - cLen, rect.y + rect.h + 4)
      ctx.stroke()
    } else if (templateId === 'neon') {
      ctx.shadowColor = '#00DC82'
      ctx.shadowBlur = 12
      ctx.strokeStyle = '#00DC82'
      ctx.lineWidth = 3
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    }
    ctx.restore()
  })

  // Footer Caption Rendering
  const footerY = height - bottomFooterH / 2
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (templateId === 'window' || templateId === 'staggered') {
    ctx.fillStyle = '#FFFFFF'
  } else {
    ctx.fillStyle = '#1A1A1A'
  }
  ctx.font = `bold ${Math.max(16, width * 0.055)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText((footerCaption || 'SPECIAL MOMENT 2026').toUpperCase(), width / 2, footerY - 8)

  ctx.fillStyle = '#9CA3AF'
  ctx.font = `400 ${Math.max(10, width * 0.028)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText('✦ SUPERAPP PHOTO BOOTH ✦', width / 2, footerY + 14)

  ctx.restore()
}
