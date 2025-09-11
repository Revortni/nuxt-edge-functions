<template>
  <main class="p-8 flex  gap-4 justify-center items-start ml-29">
    <div class="text-gray-200 flex flex-col items-center font-sans">
      <div class="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between py-2">
          <h1 class="text-3xl font-bold mb-4 text-indigo-400">
            Streamed Data
          </h1>
          <select
            id="streamType"
            v-model="streamType"
            class="bg-gray-700 text-white rounded-xl px-4 py-2 ml-4 border border-gray-600"
          >
            <option
              v-for="option in streamOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <form class="flex justify-center mb-6">
          <input
            v-if="streamType === 'stream-data'"
            v-model="userInput"
            type="text"
            class="mr-2 w-full text-blue-950 px-2 rounded-sm"
            placeholder="What would you like to chat about?"
            :disabled="isPending"
          >

          <button
            type="submit"
            :disabled="isPending"
            class="bg-indigo-600 whitespace-nowrap hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSubmit"
          >
            <span v-if="!isPending">Start Stream</span>
            <span v-else>Streaming...</span>
          </button>
        </form>

        <p class="text-gray-400 mb-6">
          Click the button to start the stream. The text will appear below as it's generated.
        </p>

        <div
          ref="contentContainer"
          class="flex bg-gray-700 h-[calc(100vh-340px)] rounded-xl p-4 min-h-[200px] border border-gray-600 overflow-y-auto"
        >
          <template v-if="!content">
            <p
              v-if="isError"
              class="text-red-400 text-center italic"
            >
              Error: {{ error?.message }}
            </p>
            <p
              v-else-if="isPending"
              class="text-gray-500 text-center italic"
            >
              Waiting for stream data...
            </p>
          </template>
          <stream-display
            v-else
            :text="content"
            placeholder-text="Waiting on you"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <NuxtLink
        to="/profile"
        aria-label="View Profile"
        class="flex gap-2 bg-slate-300 p-2 rounded-md w-50 items-center hover:cursor-pointer"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="/favicon.ico"
            alt="User"
            class="object-contain bg-blue-200"
          >
        </div>
        <h3 class="text-gray-900 align-middle">
          Rojit
        </h3>
        <span class="text-gray-300 p-1 text-xs bg-black rounded-xl">
          pro
        </span>
      </NuxtLink>
      <client-only>
        <button
          class="bg-indigo-600 whitespace-nowrap hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          @click="logout"
        >
          Logout
        </button>
      </client-only>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { StreamOptions } from '@/utils/http'

definePageMeta({
  middleware: 'auth',
  title: 'Home',
})
const { signOut } = useAuth()
const content = ref('')
const contentContainer = ref()
const streamOptions: StreamOptions[] = [
  { value: 'stream-file', label: 'Stream File', requestType: 'GET' },
  { value: 'stream-array', label: 'Stream Array', requestType: 'GET' },
  { value: 'stream-data', label: 'Stream Data', default: true, requestType: 'POST' },
]
const streamType = ref(streamOptions.find(option => option.default)?.value)
const userInput = ref('')
const fetchController = ref(new AbortController())

watch(streamType, () => {
  fetchController.value.abort()
  userInput.value = ''
})

function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  if (userInput.value.trim() === '' && streamType.value === 'stream-data') {
    return
  }
  mutate()
}

function logout() {
  signOut()
}

async function fetchStream(userInputForStream?: string) {
  content.value = ''

  fetchController.value = new AbortController()
  const controller = fetchController.value

  const streamOptionRequestType = streamOptions.find(option => option.value == streamType.value)?.requestType ?? 'GET'
  let response
  if (streamOptionRequestType === 'POST') {
    response = await $fetch<ReadableStream>(`/api/${streamType.value}`, {
      method: 'POST',
      responseType: 'stream',
      body: { userInput: userInputForStream?.trim() },
      signal: controller.signal,
    })
  }
  else {
    response = await $fetch<ReadableStream>(`/api/${streamType.value}`, {
      method: 'GET',
      responseType: 'stream',
      signal: controller.signal,
    })
  }

  // Create a new ReadableStream from the response with TextDecoderStream to get the data as text
  const reader = response.pipeThrough(new TextDecoderStream()).getReader()

  // Read the chunk of data as we get it
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }
    content.value += value
  }
  userInput.value = ''

  return content.value
};

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: () => fetchStream(userInput.value),
})
</script>
