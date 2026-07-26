import { defineStore } from 'pinia'
import type { ThemeMode } from '~/types'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'dark' as ThemeMode
  }),
  actions: {
    initTheme() {
      if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('superapp-theme') as ThemeMode
        if (savedMode) {
          this.mode = savedMode
        } else {
          // Always default to Dark Mode
          this.mode = 'dark'
        }
        this.applyTheme()
      }
    },
    toggleTheme() {
      this.mode = this.mode === 'dark' ? 'light' : 'dark'
      if (typeof window !== 'undefined') {
        localStorage.setItem('superapp-theme', this.mode)
      }
      this.applyTheme()
    },
    applyTheme() {
      if (typeof window !== 'undefined') {
        const root = document.documentElement
        const body = document.body
        if (this.mode === 'dark') {
          root.classList.add('dark')
          body?.classList.add('dark')
        } else {
          root.classList.remove('dark')
          body?.classList.remove('dark')
        }
      }
    }
  }
})
