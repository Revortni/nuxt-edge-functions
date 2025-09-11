<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
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
