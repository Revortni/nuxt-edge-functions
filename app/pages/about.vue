<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <Suspense>
    <SuspendedComponent />
    <template #fallback>
      <div>Loading user profile...</div>
    </template>
  </Suspense>
</template>
