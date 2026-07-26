export type ThemeMode = 'light' | 'dark'

export type StripPhotoCount = 2 | 3 | 4

export interface BoothTemplate {
  id: string
  name: string
  description: string
  badge?: string
  aspectRatio: string
}

export interface PhotoEffect {
  id: string
  name: string
  description: string
  cssFilter?: string
}

export interface TwibbonTemplate {
  id: string
  name: string
  category: string
  description: string
  primaryColor: string
  accentColor: string
}

export interface TransformState {
  x: number
  y: number
  scale: number
  rotation: number
  opacity: number
}
