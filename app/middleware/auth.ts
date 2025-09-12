export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  if (status.value === 'authenticated' && to.path === '/login') {
    return navigateTo('/')
  }

  if (to.path !== '/login' && status.value === 'unauthenticated') {
    return navigateTo('/login')
  }
})
