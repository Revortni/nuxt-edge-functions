export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const currentDate = new Date()

  return {
    date: currentDate,
  }
})
