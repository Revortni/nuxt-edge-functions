import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware((from, to) => {
  const auth0 = import.meta.client ? useAuth0() : undefined
  if (import.meta.client && auth0) {
    const { isAuthenticated, isLoading } = auth0
    if (!isLoading.value && isAuthenticated.value && to.path === '/login') {
      return navigateTo('/')
    }
  }
})
