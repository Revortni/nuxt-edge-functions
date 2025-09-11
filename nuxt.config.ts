// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@sidebase/nuxt-auth'],
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/style.css',
  ],
  runtimeConfig: {
    secret: process.env.NUXT_AUTH_SECRET,
    auth: {
      auth0: {
        clientId: process.env.NUXT_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_AUTH0_CLIENT_SECRET,
        issuer: `https://${process.env.NUXT_AUTH0_DOMAIN}`,
      },
    },
  },
  routeRules: {
    // '/': { prerender: true },
    // '/profile': { ssr: false },
    // user dashboard renders only on client-side
    // '/me/**': { ssr: false },
    // Add cors headers on API routes
    '/api/**': { cors: true },
    // Redirects legacy urls
    '/old': { redirect: '/new' },
  },
  compatibilityDate: '2025-07-15',
  auth: {
    // You can generate one with `openssl rand -base64 32`
    secret: process.env.NUXT_AUTH_SECRET,
    baseURL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/auth` : undefined,
    provider: {
      isEnabled: true,
      type: 'authjs',
      defaultProvider: 'auth0',
    },
  },
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
console.log('AUTH_UR______________', process.env.VERCEL_URL)
