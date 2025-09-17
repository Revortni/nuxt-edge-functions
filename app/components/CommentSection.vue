<template>
  <div class="border p-6 rounded-lg bg-gray-50 mt-8">
    <h2 class="text-2xl font-semibold mb-4">
      Comments Section
    </h2>
    <p>This content was lazy loaded after a delay of 2 seconds.</p>
    <p class="mt-4 text-sm text-gray-500">
      (The current time is: {{ new Date().toLocaleTimeString() }})
    </p>
  </div>
</template>

<script setup>
// Simulate an async data fetch with a 2-second delay
await new Promise(resolve => setTimeout(resolve, 2000))
</script>
