import Auth0Provider from 'next-auth/providers/auth0'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption - NUXT_AUTH_SECRET required in production
  secret: useRuntimeConfig().authSecret,
  providers: [
    Auth0Provider.default({
      clientId: useRuntimeConfig().auth.auth0.clientId,
      issuer: useRuntimeConfig().auth.auth0.issuer,
      clientSecret: useRuntimeConfig().auth.auth0.clientSecret,
      params: {
        prompt: 'login',
      },
    }),
  ],
})
