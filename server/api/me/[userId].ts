import { z } from 'zod'

const contentSchema = z.object({
  userId: z.number({ coerce: true }),
})

export default defineEventHandler(async (event) => {
  try {
    const params = await getValidatedRouterParams(event, contentSchema.safeParse)
    console.log('GOT PARAMS', params)
    if (!params.success) {
    // Handle validation errors
      throw new Error(`Validation failed: ${params.error}`)
    }
    const { userId } = params.data

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const userData = await response.json()
    return Response.json(userData)
  }
  catch (error) {
    console.log(error)
    throw createError({
      statusCode: error?.statusCode ?? 500,
      statusMessage: error?.message ?? 'An unexpected server error occurred.',
    })
  }
})
