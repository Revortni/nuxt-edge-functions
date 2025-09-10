// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  // use if pure client side rendering
  // hooks: {
  //   'prerender:routes'({ routes }) {
  //     routes.clear() // Do not generate any routes (except the defaults)
  //   }
  // },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/style.css',
  ],
  runtimeConfig: {
    public: {
      auth0: {
        domain: process.env.NUXT_AUTH0_DOMAIN,
        clientId: process.env.NUXT_AUTH0_CLIENT_ID,
      },
    },
  },
  routeRules: {
    '/': { prerender: true },
    // user dashboard renders only on client-side
    // '/me/**': { ssr: false },
    // Add cors headers on API routes
    '/api/**': { cors: true },
    // Redirects legacy urls
    '/old': { redirect: '/new' },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
})
