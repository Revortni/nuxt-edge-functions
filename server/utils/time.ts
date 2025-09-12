export async function sleep(duration: number = 1) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration * 1000)
  })
}
