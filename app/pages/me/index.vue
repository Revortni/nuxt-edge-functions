<script setup lang="ts">
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
