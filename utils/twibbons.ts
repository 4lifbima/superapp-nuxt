import type { TwibbonTemplate } from '~/types'

export const TWIBBON_TEMPLATES: TwibbonTemplate[] = [
  {
    id: 'merdeka',
    name: 'Merdeka 79',
    category: 'Nasional',
    description: 'Tema Kemerdekaan Indonesia Merah Putih',
    primaryColor: '#E53E3E',
    accentColor: '#FFFFFF'
  },
  {
    id: 'gold',
    name: 'Elegant Gold',
    category: 'Mewah',
    description: 'Gold foil & garis geometris elegan',
    primaryColor: '#C9A84C',
    accentColor: '#1A1A1A'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Black',
    category: 'Modern',
    description: 'Hitam putih tipografi bold & clean',
    primaryColor: '#18181B',
    accentColor: '#00DC82'
  },
  {
    id: 'nature',
    name: 'Nature Bloom',
    category: 'Floral',
    description: 'Ornamen bunga minimalis & pastel soft',
    primaryColor: '#10B981',
    accentColor: '#F472B6'
  },
  {
    id: 'geometric',
    name: 'Geometric Pattern',
    category: 'Abstract',
    description: 'Bentuk geometris & aksen hijau primary',
    primaryColor: '#00DC82',
    accentColor: '#0F172A'
  },
  {
    id: 'celebration',
    name: 'Celebration',
    category: 'Perayaan',
    description: 'Konfeti, bintang & warna perayaan cerah',
    primaryColor: '#8B5CF6',
    accentColor: '#F59E0B'
  },
  {
    id: 'vintage',
    name: 'Vintage Frame',
    category: 'Retro',
    description: 'Ornamen klasik & border vintage emas',
    primaryColor: '#92400E',
    accentColor: '#FDE68A'
  },
  {
    id: 'tech',
    name: 'Tech Future',
    category: 'Futuristik',
    description: 'Garis neon digital & HUD futuristik',
    primaryColor: '#06B6D4',
    accentColor: '#00DC82'
  }
]

/**
 * Render Twibbon overlay frame on top of user photo on Canvas
 */
export function renderTwibbonOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  templateId: string
) {
  const size = Math.min(width, height)

  if (templateId === 'merdeka') {
    ctx.fillStyle = '#DC2626'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.lineTo(width, height * 0.15)
    ctx.quadraticCurveTo(width / 2, height * 0.22, 0, height * 0.15)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.moveTo(0, height * 0.14)
    ctx.quadraticCurveTo(width / 2, height * 0.21, width, height * 0.14)
    ctx.lineTo(width, height * 0.16)
    ctx.quadraticCurveTo(width / 2, height * 0.23, 0, height * 0.16)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.max(18, size * 0.05)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('DIRGAHAYU REPUBLIK INDONESIA', width / 2, height * 0.09)

    const bHeight = height * 0.18
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)'
    ctx.beginPath()
    ctx.roundRect(width * 0.08, height - bHeight - height * 0.04, width * 0.84, bHeight, 16)
    ctx.fill()
    ctx.strokeStyle = '#DC2626'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.max(20, size * 0.055)}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText('NKRI HARGA MATI', width / 2, height - bHeight / 2 - height * 0.02)
    ctx.fillStyle = '#FCA5A5'
    ctx.font = `500 ${Math.max(12, size * 0.03)}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText('✦ Bersatu, Berdaulat, Semakin Maju ✦', width / 2, height - bHeight / 2 + height * 0.03)

  } else if (templateId === 'gold') {
    const border = size * 0.06

    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, '#F3E096')
    grad.addColorStop(0.5, '#C9A84C')
    grad.addColorStop(1, '#9A7B2C')

    ctx.strokeStyle = grad
    ctx.lineWidth = border
    ctx.strokeRect(border / 2, border / 2, width - border, height - border)

    ctx.lineWidth = 2
    ctx.strokeRect(border * 1.4, border * 1.4, width - border * 2.8, height - border * 2.8)

    const cornerS = border * 1.5
    ctx.fillStyle = grad
    ctx.fillRect(border * 0.7, border * 0.7, cornerS, cornerS)
    ctx.fillRect(width - border * 0.7 - cornerS, border * 0.7, cornerS, cornerS)
    ctx.fillRect(border * 0.7, height - border * 0.7 - cornerS, cornerS, cornerS)
    ctx.fillRect(width - border * 0.7 - cornerS, height - border * 0.7 - cornerS, cornerS, cornerS)

    ctx.fillStyle = '#0F0F12'
    ctx.fillRect(width * 0.2, height - border * 2.5, width * 0.6, border * 1.8)
    ctx.strokeStyle = grad
    ctx.strokeRect(width * 0.2, height - border * 2.5, width * 0.6, border * 1.8)

    ctx.fillStyle = '#F3E096'
    ctx.font = `600 ${Math.max(14, size * 0.035)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('EXCLUSIVE MEMBER', width / 2, height - border * 1.4)

  } else if (templateId === 'minimalist') {
    const bHeight = height * 0.22
    ctx.fillStyle = '#18181B'
    ctx.fillRect(0, height - bHeight, width, bHeight)

    ctx.fillStyle = '#00DC82'
    ctx.fillRect(0, height - bHeight, width, 6)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.max(22, size * 0.06)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'left'
    ctx.fillText('SUPERAPP 2026', width * 0.08, height - bHeight + 45)

    ctx.fillStyle = '#9CA3AF'
    ctx.font = `400 ${Math.max(14, size * 0.032)}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText('Empowering digital creativity everywhere', width * 0.08, height - bHeight + 75)

    ctx.fillStyle = '#00DC82'
    ctx.fillRect(width - 120, 0, 120, 40)
    ctx.fillStyle = '#0A0A0F'
    ctx.font = `bold 12px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('VERIFIED', width - 60, 25)

  } else if (templateId === 'nature') {
    ctx.lineWidth = 8
    ctx.strokeStyle = '#10B981'
    ctx.strokeRect(20, 20, width - 40, height - 40)

    ctx.fillStyle = 'rgba(236, 253, 245, 0.92)'
    ctx.beginPath()
    ctx.arc(width / 2, height + 100, width * 0.55, Math.PI, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#10B981'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.fillStyle = '#065F46'
    ctx.font = `bold ${Math.max(18, size * 0.048)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('✦ GO GREEN COMMUNITY', width / 2, height - 55)

    ctx.fillStyle = '#047857'
    ctx.font = `500 ${Math.max(12, size * 0.03)}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText('Save Earth, Plant a Tree Today', width / 2, height - 25)

  } else if (templateId === 'geometric') {
    ctx.fillStyle = '#00DC82'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width * 0.4, 0)
    ctx.lineTo(0, height * 0.4)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#0F172A'
    ctx.beginPath()
    ctx.moveTo(width, height)
    ctx.lineTo(width * 0.3, height)
    ctx.lineTo(width, height * 0.3)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#00DC82'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(width * 0.3 - 10, height)
    ctx.lineTo(width, height * 0.3 - 10)
    ctx.stroke()

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.max(18, size * 0.048)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'right'
    ctx.fillText('CREATIVE WAVE', width - 25, height - 40)

  } else if (templateId === 'celebration') {
    ctx.fillStyle = '#8B5CF6'
    ctx.fillRect(0, 0, width, height * 0.12)

    ctx.fillStyle = '#F59E0B'
    ctx.font = `bold ${Math.max(20, size * 0.05)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('✦ HAPPY CELEBRATION ✦', width / 2, height * 0.07)

    ctx.strokeStyle = '#F59E0B'
    ctx.lineWidth = 10
    ctx.strokeRect(5, 5, width - 10, height - 10)

    ctx.fillStyle = '#8B5CF6'
    ctx.fillRect(width * 0.1, height - height * 0.14, width * 0.8, height * 0.1)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.max(16, size * 0.04)}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText('JOIN THE FESTIVAL 2026', width / 2, height - height * 0.08)

  } else if (templateId === 'vintage') {
    const m = 30
    ctx.strokeStyle = '#92400E'
    ctx.lineWidth = 6
    ctx.strokeRect(m, m, width - m * 2, height - m * 2)

    ctx.strokeStyle = '#FDE68A'
    ctx.lineWidth = 2
    ctx.strokeRect(m + 8, m + 8, width - (m + 8) * 2, height - (m + 8) * 2)

    ctx.fillStyle = '#78350F'
    ctx.fillRect(width * 0.15, height - 80, width * 0.7, 50)
    ctx.strokeStyle = '#FDE68A'
    ctx.strokeRect(width * 0.15, height - 80, width * 0.7, 50)

    ctx.fillStyle = '#FEF3C7'
    ctx.font = `bold ${Math.max(14, size * 0.038)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('VINTAGE EDITION', width / 2, height - 50)

  } else if (templateId === 'tech') {
    ctx.strokeStyle = '#06B6D4'
    ctx.lineWidth = 3

    const hLen = 60
    ctx.beginPath()
    ctx.moveTo(20, 20 + hLen)
    ctx.lineTo(20, 20)
    ctx.lineTo(20 + hLen, 20)

    ctx.moveTo(width - 20 - hLen, 20)
    ctx.lineTo(width - 20, 20)
    ctx.lineTo(width - 20, 20 + hLen)

    ctx.moveTo(20, height - 20 - hLen)
    ctx.lineTo(20, height - 20)
    ctx.lineTo(20 + hLen, height - 20)

    ctx.moveTo(width - 20 - hLen, height - 20)
    ctx.lineTo(width - 20, height - 20)
    ctx.lineTo(width - 20, height - 20 - hLen)
    ctx.stroke()

    ctx.fillStyle = 'rgba(6, 182, 212, 0.9)'
    ctx.fillRect(20, height - 60, width - 40, 40)

    ctx.fillStyle = '#00DC82'
    ctx.fillRect(20, height - 60, 10, 40)

    ctx.fillStyle = '#0A0A0F'
    ctx.font = `bold ${Math.max(14, size * 0.035)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'left'
    ctx.fillText('SYSTEM STATUS: ONLINE // CYBER 2026', 45, height - 35)
  }
}
