<template>
  <div class="m-auto flex h-full flex-col px-6 py-8 md:px-12 xl:w-[1096px] xl:px-0">
    <slot>Content</slot>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pageName = computed<string>(() => route.meta.title ?? 'App')
useHead({
  title: pageName,
})
</script>
