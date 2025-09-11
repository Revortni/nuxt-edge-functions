export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  console.log({ status })
  if (status.value === 'authenticated' && to.path === '/login') {
    return navigateTo('/')
  }

  if (to.path !== '/login' && status.value === 'unauthenticated') {
    return navigateTo('/login')
  }
})
