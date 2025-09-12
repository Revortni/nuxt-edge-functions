<template>
  <main class="bg-gray-900 h-dvh">
    <div class="m-auto flex flex-col px-6 py-8 md:px-12 xl:w-[1096px] xl:px-0">
      <slot>Content</slot>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const pageName = computed<string>(() => route.meta.title ?? 'App')
useHead({
  title: pageName,
})
</script>
