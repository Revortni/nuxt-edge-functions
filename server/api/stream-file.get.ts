import { createReadStream } from 'fs'
import { sleep } from '~~/server/utils/time'

export default defineEventHandler(() => {
  const filename = '/Users/rojitkhayargoli/Home/personal/edge-functions/edge-function/server/api/content.txt'
  try {
    const decoder = new TextDecoder()
    const stream = createReadStream(filename)
    const readableStream = new ReadableStream({
      async start(controller) {
        stream.on('data', async (chunk) => {
          stream.pause()
          const decodedChunk = decoder.decode(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk), { stream: true })
          for (const char of decodedChunk) {
            controller.enqueue(char)
            await sleep(0.01)
          }
          stream.resume()
        })
        stream.on('end', () => {
          //  flush of the decoder
          const finalChunk = decoder.decode()
          if (finalChunk) {
            controller.enqueue(finalChunk)
          }
          controller.close()
        })
        stream.on('error', err => controller.error(err))
      },
    })
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
      },
    })
  }
  catch (error) {
    console.error('Error reading file:', error)
    throw error
  }
})
