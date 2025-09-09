const useOverflow = (contentContainer: Ref<HTMLDivElement | undefined>, content: Ref<string>) => {
  const isOverflowing = ref<boolean>(false)

  // Only measure layout on the client after mount
  onMounted(() => {
    const measure = () => {
      nextTick(() => {
        if (contentContainer.value) {
          const isOverflown = contentContainer.value.scrollHeight > contentContainer.value.clientHeight
          isOverflowing.value = isOverflown
        }
      })
    }

    // Initial measure
    measure()

    // Re-measure when content changes
    watch(content, () => {
      measure()
    })
  })

  return isOverflowing
}

export default useOverflow
