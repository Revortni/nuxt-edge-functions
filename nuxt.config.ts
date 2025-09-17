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
    baseOrigin: process.env.NUXT_BASE_ORIGIN ? `${process.env.NUXT_BASE_ORIGIN}/api/auth` : undefined,
    auth: {
      auth0: {
        clientId: process.env.NUXT_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_AUTH0_CLIENT_SECRET,
        issuer: `https://${process.env.NUXT_AUTH0_DOMAIN}`,
      },
    },
  },
  routeRules: {
    '/no-js': {
      // NO js scripts
      noScripts: true,
    },
    '/cached/swr': {
      cache: {
        maxAge: 10,
        swr: true,
      },
    },
    // '/cached': {
    //   cache: {
    //     maxAge: 10,
    //     swr: false,
    //   },
    // },
    '/prerender': {
      // dynamically render at build time and create a static html
      prerender: true,
    },
    '/static': {
      // serve a static file
      static: true,
    },
    // '/isr': {
    //   // Incremental static generation
    //   // supported by vercel and netlify
    //   // isr: true // equivalent to {static: true}
    //   isr: 10, // equivalent to {maxAge: 10, swr: true}
    // },
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
    baseURL: process.env.NUXT_BASE_ORIGIN ? `${process.env.NUXT_BASE_ORIGIN}/api/auth` : undefined,
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
