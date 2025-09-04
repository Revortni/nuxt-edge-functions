import { createReadStream } from 'fs';

// export default defineEventHandler(() => {
//   const filename = '/Users/rojitkhayargoli/Home/personal/edge-functions/edge-function/server/api/content.txt'
//   try {
//     const stream = createReadStream(filename, { encoding: 'utf8', decod });
//     const readableStream = new ReadableStream({
//       async start(controller) {
//         stream.on('data', (chunk) => {
//           console.log("Chunk loaded", { chunk })
//           controller.enqueue(chunk)
//         });
//         stream.on('end', () => controller.close());
//         stream.on('error', (err) => controller.error(err));
//       },
//     });
//     return new Response(readableStream, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Connection': 'keep-alive',
//       },
//     });
//   } catch (error) {
//     console.error('Error reading file:', error);
//     throw error;
//   }
// })
export default defineEventHandler(() => {
  const filename = '/Users/rojitkhayargoli/Home/personal/edge-functions/edge-function/server/api/content.txt'
  try {
    const decoder = new TextDecoder()
    const stream = createReadStream(filename);
    const readableStream = new ReadableStream({
      async start(controller) {
        stream.on('data', (chunk) => {
          const decodedChunk = decoder.decode(  Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk), { stream: true });
          controller.enqueue(decodedChunk);
        });
        stream.on('end', () => {
          decoder.decode(); // flush the decoder
          controller.close();
        });
        stream.on('error', (err) => controller.error(err));
      },
    });
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
})