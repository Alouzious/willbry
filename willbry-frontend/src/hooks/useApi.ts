import { useCallback, useState } from 'react'
import type { AxiosRequestConfig } from 'axios'
import api from '../lib/api'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const response = (error as { response?: { data?: { message?: string; error?: string } } }).response
    return response?.data?.message || response?.data?.error || 'Something went wrong'
  }

  return 'Something went wrong'
}

export function useApi<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const request = useCallback(async (config: AxiosRequestConfig): Promise<T | null> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await api(config)
      const payload = response.data?.data ?? response.data

      setState({
        data: payload,
        loading: false,
        error: null,
      })

      return payload
    } catch (error) {
      const message = getErrorMessage(error)

      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }))

      return null
    }
  }, [])

  const get = useCallback(
    (url: string, params?: Record<string, unknown>) =>
      request({ method: 'GET', url, params }),
    [request]
  )

  const post = useCallback(
    (url: string, data?: unknown) =>
      request({ method: 'POST', url, data }),
    [request]
  )

  const put = useCallback(
    (url: string, data?: unknown) =>
      request({ method: 'PUT', url, data }),
    [request]
  )

  const patch = useCallback(
    (url: string, data?: unknown) =>
      request({ method: 'PATCH', url, data }),
    [request]
  )

  const del = useCallback(
    (url: string) =>
      request({ method: 'DELETE', url }),
    [request]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    request,
    get,
    post,
    put,
    patch,
    del,
    reset,
  }
}

export default useApi