<template>
  <div class="flex flex-col items-center justify-center p-4 font-sans">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold  text-gray-800">
          User Profile
        </h1>
        <button
          class="text-gray-800 hover:underline"
          @click="goBack"
        >
          Back
        </button>
      </div>
      <div class="mb-4 text-gray-600 text-sm">
        Data shown below comes from the authenticated session.
      </div>

      <!-- Loading and Empty States -->
      <div
        v-if="isLoading"
        class=" py-8 text-gray-500"
      >
        Loading profile...
      </div>
      <div
        v-else-if="!user"
        class=" py-8 text-red-500 font-medium"
      >
        No user session found.
      </div>

      <!-- Display Profile Data -->
      <div
        v-else
        class="space-y-6"
      >
        <div class="flex  items-center gap-3">
          <div class="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
            <img
              v-if="user.image"
              :src="user.image"
              alt="Avatar"
              class="h-full w-full object-cover"
            >
            <span
              v-else
              class="text-xl font-semibold text-indigo-700"
            >
              {{ initials }}
            </span>
          </div>
          <div class="flex flex-col">
            <h2 class="text-2xl font-semibold text-gray-800">
              {{ user.name || 'Unnamed User' }}
            </h2>
            <p class="text-gray-500">
              {{ user.email || 'No email' }}
            </p>
          </div>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-bold text-gray-700 mb-2">
            Session Details
          </h3>
          <div class="grid grid-cols-1 gap-2">
            <p class="text-gray-600">
              <span class="font-semibold">Name:</span> {{ user.name || '—' }}
            </p>
            <p class="text-gray-600">
              <span class="font-semibold">Email:</span> {{ user.email || '—' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AuthUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

const props = defineProps<{ user: AuthUser | null, isLoading: boolean }>()
const router = useRouter()
const goBack = () => {
  router.back()
}

const initials = computed(() => {
  const source = props.user?.name || props.user?.email || ''
  const parts = source
    .replace(/@.*/, '')
    .split(/\s|\.|_|-/)
    .filter(Boolean)
  const [first = '', second = ''] = parts
  return (first + second).toUpperCase() || 'U'
})
</script>
