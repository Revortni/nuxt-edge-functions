const useOverflow = (contentContainer: Ref<HTMLDivElement>, content: Ref<string>) => {
  const isOverflowing = ref<boolean>(false)
  watch(content, () => {
    // Use nextTick to ensure the DOM has updated with the new content
    nextTick(() => {
      if (contentContainer.value) {
        const isOverflown = contentContainer.value.scrollHeight > contentContainer.value.clientHeight;
        isOverflowing.value = isOverflown
      }
    });
  });

  // Also check on initial mount
  onMounted(() => {
    if (contentContainer.value) {
      const isOverflown = contentContainer.value.scrollHeight > contentContainer.value.clientHeight;
      isOverflowing.value = isOverflown
    }
  });

  return isOverflowing
}

export default useOverflow