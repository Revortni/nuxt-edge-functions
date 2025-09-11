<template>
  <p
    v-if="textShown"
    class="text-gray-300 whitespace-pre-wrap leading-relaxed"
  >
    {{ textShown }}
  </p>
  <p
    v-else
    class="text-gray-500 text-center italic"
  >
    {{ placeholderText }}
  </p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const typeDelay = { min: 30, max: 38 }
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    required: false,
    default: 'You will see the streamed data here',
  },
})
const emit = defineEmits(['onContentShow'])
const textShown = ref<string>('')

function typeText(text: string, textToShow: string) {
  if (text.length > textToShow.length) {
    textToShow += text.charAt(textToShow.length)
    textShown.value = textToShow
    emit('onContentShow')
    const delay = Math.floor(Math.random() * (typeDelay.max - typeDelay.min) + typeDelay.min)
    setTimeout(() => {
      typeText(text, textToShow)
    }, delay)
  }
}

function startTyping() {
  typeText(props.text, textShown.value)
}

// Only start typing on the client. Avoid running typing logic during SSR
onMounted(() => {
  if (props.text.length > textShown.value.length) {
    startTyping()
  }
})

// Continue typing when the incoming text changes on the client
watch(() => props.text, (newText) => {
  if (newText.length > textShown.value.length) {
    startTyping()
  }
})
</script>
