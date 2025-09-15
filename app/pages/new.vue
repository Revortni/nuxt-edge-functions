<template>
  <div>
    <h1>New page</h1>
    <ul>
      <li
        v-for="item in data"
        :key="item.id"
      >
        {{ JSON.stringify(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Appliance = {
  id: number
  price: number
  description: string
  category: string
  brand: string
  stock: number
}
const { data } = useFetch<Appliance[]>('/api/hello')
</script>
