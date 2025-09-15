<template>
  <div>
    <h1>No JS page</h1>
    <button @click="count++">
      add
    </button>
    <div>Count: {{ count }}</div>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)
if (import.meta.server) {
  // inject script
  useHead({
    script: [
      { innerHTML: ``, tagPosition: 'bodyClose' },
    ],
  })
}
</script>
