<template>
  <div class="text-gray-200 flex flex-col items-center p-8 font-sans">
    <div class="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl">
      <h1 class="text-3xl font-bold mb-4 text-center text-indigo-400">Streamed Data from Gemini</h1>
      <p class="text-gray-400 mb-6 text-center">
        Click the button to start the stream. The text will appear below as it's generated.
      </p>

      <div class="flex justify-center mb-6">
        <button @click="() => refetch()" :disabled="isFetching"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="!isFetching">Start Stream</span>
          <span v-else>Streaming...</span>
        </button>
      </div>

      <div ref="contentContainer"
        class="flex bg-gray-700 h-[calc(65vh)] rounded-xl p-4 min-h-[200px] border border-gray-600 overflow-y-auto">
        <template v-if="!content">
          <p v-if="isError" class="text-red-400 text-center italic">Error: {{ error?.message }}</p>
          <p v-else-if="isFetching" class="text-gray-500 text-center italic">Waiting for stream data...</p>
        </template>
        <stream-display v-else :text="content" placeholder-text="Waiting on you" @onContentShow="scrollToBottom" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

const content = ref('');
const contentContainer = ref();

function scrollToBottom() {
  if (contentContainer.value) {
    contentContainer.value.scrollTop = contentContainer.value.scrollHeight;
  }
}

async function fetchStream() {
  const response = await $fetch<ReadableStream>('/api/stream', {
    method: 'GET',
    responseType: 'stream',
  })

  // Create a new ReadableStream from the response with TextDecoderStream to get the data as text
  const reader = response.pipeThrough(new TextDecoderStream()).getReader()

  // Read the chunk of data as we get it
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }
    console.log("Received chunk:", value)
    content.value += value
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
  }

  return content.value
};

const { refetch, isFetching, isError, error } = useQuery({
  queryKey: ['gemini-stream'],
  queryFn: fetchStream,
  enabled: false, // Prevents the query from running automatically on component mount
});
</script>
