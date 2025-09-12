<template>
  {{ JSON.stringify(res) }}
</template>

<script setup lang="ts">
const { finish } = useLoadingIndicator()
const response = $fetch('https://jsonplaceholder.typicode.com/todos/1')
const res = await new Promise(resolve => setTimeout(() => resolve(response), 1000))

// const apiCall = async () => {
//   const response = $fetch('https://jsonplaceholder.typicode.com/todos/1')
//   const res = await new Promise(resolve => setTimeout(() => resolve(response), 1000))
//   return res
// }
// const { data } = useAsyncData('Suspended data', () => apiCall())
// const { data } = useFetch('https://jsonplaceholder.typicode.com/todos/1')

onMounted(() => {
  finish()
})
</script>
