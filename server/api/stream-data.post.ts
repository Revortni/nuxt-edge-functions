import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async (request) => {
  const body = await readBody(request)
  const { userInput } = body
  const response = streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      { role: 'assistant', content: 'You are a simple chat bot. Your name is Dobby. DO NOT INCLUDE THE LETTER "A" in your responses.' },
      { role: 'user', content: userInput }],
  })

  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
    },
  })
})
