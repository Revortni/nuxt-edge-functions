export const maxDuration = 5;

function createStreamFromArray(dataArray: string[]) {
  let index = 0;
  return new ReadableStream({
    start(controller) {
      // The start method is called by the stream to get the ball rolling.
      // We can use it to push data into the stream.
      const pushChunk = () => {
        if (index < dataArray.length) {
          controller.enqueue(dataArray[index] + ' ');
          index++;
          // Use setTimeout to allow other tasks to run, preventing the stream
          // from blocking the event loop for very large arrays.
          setTimeout(pushChunk, 1000);
        } else {
          // Close the stream when all data has been pushed
          controller.close();
        }
      };

      pushChunk();
    }
  });
}

const myData = [
  'Hello', 'World', 'from', 'a', 'streaming', 'data', 'source', 'that', 'demonstrates',
  'how', 'to', 'handle', 'large', 'chunks', 'of', 'text', 'in', 'a', 'non-blocking',
  'way', 'using', 'JavaScript', 'streams', 'which', 'are', 'perfect', 'for', 'managing',
  'memory', 'efficiently', 'when', 'dealing', 'with', 'big', 'data', 'sets', 'and',
  'real-time', 'information', 'flow', 'while', 'maintaining', 'optimal', 'performance',
  'across', 'different', 'network', 'conditions', 'and', 'system', 'resources'
];

export default defineEventHandler(() => {
  try {
    const readableStream = createStreamFromArray(myData)

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