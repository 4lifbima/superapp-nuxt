import viteTailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  vite: {
    plugins: [
      viteTailwindcss()
    ]
  },

  app: {
    head: {
      title: 'SuperApp ✦ Photo Booth Studio & Twibbon Generator',
      htmlAttrs: {
        lang: 'id',
        class: 'dark'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'description', content: 'Platform Web Creative All-In-One Modern untuk Photo Booth Vertical Strip (2, 3, 4 Foto) dengan Hitung Mundur Otomatis & Generator Twibbon HD.' },
        { name: 'author', content: 'Alif Bima Pradana' },
        { name: 'theme-color', content: '#00DC82' },

        /* Open Graph / Facebook */
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'SuperApp ✦ Photo Booth Studio & Twibbon Generator' },
        { property: 'og:description', content: 'Platform Web Creative All-In-One Modern untuk Photo Booth Vertical Strip (2, 3, 4 Foto) dengan Hitung Mundur Otomatis & Generator Twibbon HD.' },
        { property: 'og:image', content: 'https://superapp.alifbima.my.id/images/android-icon-192x192.png' },
        { property: 'og:site_name', content: 'SuperApp' },
        { property: 'og:url', content: 'https://superapp.alifbima.my.id/' },
        { property: 'og:locale', content: 'id_ID' },

        /* Twitter Cards */
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SuperApp ✦ Photo Booth Studio & Twibbon Generator' },
        { name: 'twitter:description', content: 'Platform Web Creative All-In-One Modern untuk Photo Booth Vertical Strip & Twibbon HD.' },
        { name: 'twitter:image', content: '/images/android-icon-192x192.png' },

        /* Mobile & PWA Settings */
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'SuperApp' },

        /* Microsoft Tile Meta */
        { name: 'msapplication-TileColor', content: '#0A0A0F' },
        { name: 'msapplication-TileImage', content: '/images/ms-icon-144x144.png' },
        { name: 'msapplication-config', content: '/images/browserconfig.xml' }
      ],
      link: [
        /* Web App Manifest */
        { rel: 'manifest', href: '/manifest.json' },

        /* Standard Favicons */
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/android-icon-192x192.png' },

        /* Apple Touch Icons */
        { rel: 'apple-touch-icon', href: '/images/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-icon-180x180.png' },

        /* Preconnect Fonts */
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  }
})
