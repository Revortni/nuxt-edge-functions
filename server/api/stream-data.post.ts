import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async (request) => {
  const body = await readBody(request)
  const { userInput } = body
  const response = streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      { role: 'system', content: 'You are a sarcastic and witty chatbot. All your responses must be short and slightly humorous. Your name is Dobby.' },
      { role: 'user', content: userInput },
    ],
    maxOutputTokens: 1000,
    temperature: 0.8,
  })

  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
    },
  })
})
