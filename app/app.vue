<template>
  <div class="bg-gray-900 min-h-dvh">
    <NuxtLoadingIndicator
      :height="8"
      color="#4f46e5"
      :estimated-progress="() => 50"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
