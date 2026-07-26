import type { PhotoEffect } from '~/types'

export const PHOTO_EFFECTS: PhotoEffect[] = [
  { id: 'none', name: 'Original', description: 'Tanpa Efek', cssFilter: 'none' },
  { id: 'bw', name: 'B&W Contrast', description: 'Hitam Putih Kontras Tinggi', cssFilter: 'grayscale(100%) contrast(140%)' },
  { id: 'sepia', name: 'Sepia Vintage', description: 'Tone Vintage Klasik', cssFilter: 'sepia(80%) contrast(110%) brightness(95%)' },
  { id: 'high-contrast', name: 'High Contrast', description: 'Kontras Tajam & Shadow Dalam', cssFilter: 'contrast(160%) saturate(120%)' },
  { id: 'matte', name: 'Soft Matte', description: 'Finishing Matte Halus', cssFilter: 'contrast(90%) brightness(110%) saturate(85%)' },
  { id: 'grain', name: 'Film Grain', description: 'Efek Film Analog', cssFilter: 'contrast(115%) saturate(110%)' },
  { id: 'vignette', name: 'Vignette', description: 'Fading Gelap di Tepi', cssFilter: 'contrast(110%)' },
  { id: 'duotone', name: 'Duotone Luxe', description: 'Dua Warna Primary & Emas', cssFilter: 'none' }
]

/**
 * Apply selected filter effect on HTML5 Canvas ImageData within target slot bounds (x, y, width, height)
 */
export function applyCanvasEffect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  effectId: string
) {
  if (effectId === 'none') return

  const imageData = ctx.getImageData(x, y, width, height)
  const data = imageData.data

  if (effectId === 'bw') {
    for (let i = 0; i < data.length; i += 4) {
      let avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      avg = (avg - 128) * 1.4 + 128
      avg = Math.max(0, Math.min(255, avg))
      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }
    ctx.putImageData(imageData, x, y)
  } else if (effectId === 'sepia') {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
    }
    ctx.putImageData(imageData, x, y)
  } else if (effectId === 'high-contrast') {
    const factor = (259 * (150 + 255)) / (255 * (259 - 150))
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128))
      data[i + 1] = Math.max(0, Math.min(255, factor * (data[i + 1] - 128) + 128))
      data[i + 2] = Math.max(0, Math.min(255, factor * (data[i + 2] - 128) + 128))
    }
    ctx.putImageData(imageData, x, y)
  } else if (effectId === 'matte') {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * 0.85 + 30
      data[i + 1] = data[i + 1] * 0.85 + 30
      data[i + 2] = data[i + 2] * 0.85 + 35
    }
    ctx.putImageData(imageData, x, y)
  } else if (effectId === 'grain') {
    ctx.putImageData(imageData, x, y)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    for (let i = 0; i < width * height * 0.08; i++) {
      const rx = Math.floor(Math.random() * width)
      const ry = Math.floor(Math.random() * height)
      const size = Math.random() > 0.5 ? 1 : 2
      ctx.fillRect(x + rx, y + ry, size, size)
    }
  } else if (effectId === 'vignette') {
    ctx.putImageData(imageData, x, y)
    const gradient = ctx.createRadialGradient(
      x + width / 2, y + height / 2, Math.min(width, height) * 0.35,
      x + width / 2, y + height / 2, Math.max(width, height) * 0.75
    )
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.65)')
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, width, height)
  } else if (effectId === 'duotone') {
    for (let i = 0; i < data.length; i += 4) {
      const luma = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
      data[i] = Math.floor(0 + luma * (201 - 0))
      data[i + 1] = Math.floor(220 + luma * (168 - 220))
      data[i + 2] = Math.floor(130 + luma * (76 - 130))
    }
    ctx.putImageData(imageData, x, y)
  }
}
