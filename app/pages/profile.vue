<template>
  <div v-if="isLoading">
    Loading ...
  </div>
  <div v-else>
    <h2>User Profile</h2>
    <button @click="login">
      Log in
    </button>
    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
      </pre>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  setup() {
    const auth0 = import.meta.client ? useAuth0() : undefined

    return {
      login: () => auth0.loginWithRedirect(),
      user: auth0.user,
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
    }
  },
}
</script>
