export default defineEventHandler(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
  const userData = await response.json()
  return Response.json(userData)
})
