<script setup lang="ts">
definePageMeta({
  // middleware: 'auth',
  title: 'About Page',
})
</script>

<template>
  <Suspense>
    <template #default>
      <UserProfile />
    </template>
    <template #fallback>
      <div>Loading user profile...</div>
    </template>
  </Suspense>
</template>
