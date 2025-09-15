<template>
  <div>
    <div>
      Server date: {{ data?.date }}
    </div>
    <ClientOnly>
      <p>
        This render only on the client
        Current Date: {{ currentDate }}
      </p>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { data } = useAuthFetch<{ date: string }>('/api/server-date')
const currentDate = new Date().toISOString()
</script>
