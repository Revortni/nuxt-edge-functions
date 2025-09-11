export const runtime = 'nodejs'
export const maxDuration = 1 // didn't work

export default defineEventHandler(async () => {
  const res = await new Promise<{ message: string }>((res) => {
    setTimeout(() => {
      res({ message: 'Successfully resolved in 3 seconds' })
    }, 3000)
  })

  return Response.json(res)
})
