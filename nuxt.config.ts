// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://dummyjson.com',
    },
  },
  routeRules: {
      '/**': { isr: true },
    },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  alias: {
    '@': './',
    '~': './',
  },
  css: [
    '~/assets/css/main.css',
  ],
})