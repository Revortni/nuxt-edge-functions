<template>
  <div class="w-full flex justify-center text-purple-700 flex-col p-16 gap-4">
    <h1>Login</h1>
    <button
      class="p-4 text-white bg-purple-900"
      @click="handleLogin"
    >
      Login with Auth0
    </button>
  </div>
</template>

<script setup lang="ts">
const { signIn } = useAuth()

definePageMeta({
  // middleware: 'auth',
  title: 'Login',
  auth: false,
})

const handleLogin = () => {
  signIn('auth0')
}
</script>
