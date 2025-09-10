<template>
  <div class="w-full flex justify-center text-purple-700 flex-col p-16 gap-4">
    <h1>Login</h1>
    <client-only>
      <button
        class="p-4 text-white bg-purple-900"
        @click="handleLogin"
      >
        Log In
      </button>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = import.meta.client ? useAuth0() : undefined
definePageMeta({
  middleware: 'authenticated',
})

const handleLogin = () => {
  if (auth0) {
    auth0.loginWithRedirect()
  }
}
</script>
