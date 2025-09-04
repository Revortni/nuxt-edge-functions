import { streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

export default defineEventHandler(() => {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  // const response = streamText({
  //   model: openai('gpt-4o-mini'),
  //   messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  // });

  const response = streamText({
    model: google('gemini-2.5-flash'),
    messages: [{ role: 'user', content: 'Write a vegetarian lasagna recipe for 4 people. Write each step in a new line' }],
    //  messages: [{ role: 'user', content: 'Write a vegetarian lasagna recipe for 4 people. The response SHOULD NOT EXCEED 50 WORDS' }],
  });

  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
    },
  })
})