export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'" }
      ]
    }
  },

  devtools: {
    enabled: false // Disable devtools to prevent cross-origin errors
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  build: {
    transpile: ['@heroicons/vue']
  },

  nitro: {
    compressPublicAssets: true
  },

  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2025-02-02'
})