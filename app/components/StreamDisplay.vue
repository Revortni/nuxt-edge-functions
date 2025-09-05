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

watch(() => props.text, (newText) => {
  if (newText.length > textShown.value.length) {
    // If the new text is longer, continue typing
    startTyping()
  }
}, {
  immediate: true,
})
</script>
