export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()

  if (import.meta.client) {
    const auth0 = nuxtApp.auth0
    auth0.checkSession()
    if (!auth0.isAuthenticated.value) {
      auth0.loginWithRedirect({
        appState: { target: useRoute().path },
      })
    }
  }
})
