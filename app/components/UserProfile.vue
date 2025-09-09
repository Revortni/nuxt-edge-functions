<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        User Profile (Nuxt)
      </h1>
      <div class="text-center mb-4 text-gray-600 text-sm">
        This example demonstrates how Nuxt's `useFetch` handles both server-side and
        client-side data fetching automatically.
      </div>

      <!-- Loading and Error States -->
      <div
        v-if="pending"
        class="text-center py-8 text-gray-500"
      >
        Loading profile...
      </div>
      <div
        v-else-if="error"
        class="text-center py-8 text-red-500 font-medium"
      >
        Error: {{ error }}
      </div>

      <!-- Display Profile Data -->
      <div
        v-else-if="user"
        class="space-y-4"
      >
        <div class="flex flex-col items-center">
          <h2 class="text-2xl font-semibold">
            {{ user.name }}
          </h2>
          <p class="text-gray-500">
            @{{ user.username }}
          </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-bold text-gray-700 mb-2">
            Details
          </h3>
          <p class="text-gray-600">
            <span class="font-semibold">Email:</span> {{ user.email }}
          </p>
          <p class="text-gray-600">
            <span class="font-semibold">Phone:</span> {{ user.phone }}
          </p>
          <p class="text-gray-600">
            <span class="font-semibold">Company:</span> {{ user.company.name }}
          </p>
        </div>
      </div>

      <!-- <div class="mt-8 text-center">
        <button
          :disabled="pending"
          :class="pending ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'"
          class="px-6 py-3 rounded-full font-medium transition-colors"
        >
          {{ pending ? 'Loading...' : `Switch to User ${userId === 1 ? '5' : '1'}` }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/components/types/user-profile.types'

const { data: user, pending, error } = await useFetch<User>(() => '/api/me', {
  method: 'GET',
})
</script>
