type StreamData = 'file' | 'array' | 'data'
type HttpRequestTypes = 'POST' | 'GET'

export type StreamOptions = {
  value: `stream-${StreamData}`,
  label: string,
  requestType: HttpRequestTypes,
  default?: boolean
}