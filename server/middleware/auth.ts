import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  console.log('Path', event.path)
  if (event.path.startsWith('/api/auth') || event.path === '/' || event.path === '/login') {
    return
  }
  if (event.path.startsWith('/api/server-date')) {
  // the UI wasn't being populated as the session wasn't always available for some reason
    return
  }
  const session = await getServerSession(event)
  if (!session) {
    console.log('RETURNED AS THERES NO SESSION')
    throw createError({
      message: 'Unauthenticated',
      statusCode: 403,
    })
  }
})
