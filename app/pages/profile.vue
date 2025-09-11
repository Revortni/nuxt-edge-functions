<template>
  <UserProfile
    :user="authUser"
    :is-loading="isLoading"
  />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  title: 'Your Profile',
})

const { data, status } = useAuth()
const authUser = computed(() => data.value?.user ?? null)
const isLoading = computed(() => status.value === 'loading')
</script>
