import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const auth0 = createAuth0({
    domain: config.public.auth0.domain,
    clientId: config.public.auth0.clientId,
    authorizationParams: {
      redirect_uri: import.meta.client ? window.location.origin : '',
    }, // Adjust for your redirect URI
  })

  if (import.meta.client) {
    nuxtApp.vueApp.use(auth0)
  }
})
