// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  routeRules: {
    '/': { prerender: true },
    // user dashboard renders only on client-side
    '/me/**': { ssr: false },
    // Add cors headers on API routes
    '/api/**': { cors: true },
    // Redirects legacy urls
    '/old': { redirect: '/new' }
  }
  // use if pure client side rendering
  // hooks: {
  //   'prerender:routes'({ routes }) {
  //     routes.clear() // Do not generate any routes (except the defaults)
  //   }
  // },
})