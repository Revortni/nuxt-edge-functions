import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  console.log('Path', event.path)
  if (event.path.startsWith('/api/auth') || event.path === '/' || event.path === '/login') {
    return
  }
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      message: 'Unauthenticated',
      statusCode: 403,
    })
  }
})
