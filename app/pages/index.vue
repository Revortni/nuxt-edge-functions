<template>
  <div class="text-gray-200 flex flex-col items-center p-8 font-sans">
    <div class="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold mb-4 text-indigo-400">Streamed Data from Gemini</h1>
        <select id="streamType" v-model="streamType"
          class="bg-gray-700 text-white rounded-md h-10 px-2 py-2 ml-4 border border-gray-600">
          <option v-for="option in streamOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
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
        <stream-display v-else :text="content" placeholder-text="Waiting on you" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

const content = ref('');
const contentContainer = ref();
const streamOptions = [
  { value: 'stream-file', label: 'Stream File', default: true },
  { value: 'stream-array', label: 'Stream Array' },
  { value: 'stream-data', label: 'Stream Data' },
];
const streamType = ref(streamOptions.find(option => option.default)?.value);

async function fetchStream() {
  content.value = ''
  const response = await $fetch<ReadableStream>(`/api/${streamType.value}`, {
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
  }

  return content.value
};

const { refetch, isFetching, isError, error } = useQuery({
  queryKey: ['gemini-stream'],
  queryFn: fetchStream,
  enabled: false, // Prevents the query from running automatically on component mount
});
</script>
