<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center min-h-screen p-6 text-center text-gray-100">
      <div v-if="error.statusCode === 404">
        <h1 class="text-6xl font-extrabold text-red-500 mb-4">
          404 - Page Not Found
        </h1>
        <p class="text-xl text-gray-400 mb-8">
          The page you are looking for does not exist. It may have been moved or deleted.
        </p>
        <NuxtLink to="/">
          <button class="px-6 py-3 font-bold bg-indigo-600 whitespace-nowrap hover:bg-indigo-700 text-white rounded-lg shadow-md transition-colors">
            Go to Homepage
          </button>
        </NuxtLink>
      </div>

      <div v-else>
        <h1 class="text-6xl font-extrabold text-red-500 mb-4">
          {{ error.statusCode }} - Oops!
        </h1>
        <p class="text-xl text-gray-300 mb-4">
          Something went wrong on our end.
        </p>
        <NuxtLink to="/">
          <button class="px-6 py-3 font-bold bg-indigo-600 whitespace-nowrap hover:bg-indigo-700 text-white  rounded-lg shadow-md transition-colors">
            Go to Homepage
          </button>
        </NuxtLink>
      </div>

      <pre
        v-if="isDev"
        class="mt-12 p-4 bg-gray-200 text-gray-700 rounded-lg max-w-xl text-left overflow-auto font-mono text-sm"
      >{{ error }}</pre>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: Object,
})
console.log(props.error)

const isDev = computed(() => process.env.NODE_ENV === 'development')
</script>
