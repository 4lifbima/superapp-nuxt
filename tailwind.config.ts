import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './stores/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './app/**/*.vue'
  ]
}
