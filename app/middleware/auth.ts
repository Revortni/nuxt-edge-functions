import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(() => {
  const auth0 = import.meta.client ? useAuth0() : undefined
  if (import.meta.client && auth0) {
    const { isLoading, isAuthenticated } = auth0

    if (!isLoading.value && !isAuthenticated.value) {
      return navigateTo('/login')
    }
  }
})
