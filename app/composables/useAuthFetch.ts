import type { UseFetchOptions } from '#app'

const useAuthFetch = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) => {
  const headers = useRequestHeaders(['cookie']) as HeadersInit
  return useFetch(url, {
    ...options,
    headers,
    $fetch: useNuxtApp().$api as typeof $fetch,
    // onRequest({ request, options }) {
    // // Set the request headers
    // },
    // onRequestError({ request, options, error }) {
    // // Handle the request errors
    // },
    // onResponse({ request, response, options }) {
    // // Process the response data
    //   localStorage.setItem('token', response._data.token)
    // },
    // onResponseError({ request, response, options }) {
    // // Handle the response errors
    // },
  })
}

export default useAuthFetch
