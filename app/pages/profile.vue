<template>
  <div v-if="isLoading">
    Loading profile data...
  </div>
  <div v-else>
    <h2>User Profile</h2>
    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
      </pre>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

definePageMeta({
  middleware: 'auth',
})
const { user, isAuthenticated, isLoading } = import.meta.client ? useAuth0() : {}
console.log({ user, isAuthenticated, isLoading })
</script>
