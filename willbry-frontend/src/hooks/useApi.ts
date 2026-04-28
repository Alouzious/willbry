import { useState, useCallback } from 'react'
import api from '../lib/api'
import type { AxiosRequestConfig } from 'axios'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
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
      const res = await api(config)
      const data = res.data?.data ?? res.data
      setState({ data, loading: false, error: null })
      return data
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong'
      setState((prev) => ({ ...prev, loading: false, error: msg }))
      return null
    }
  }, [])

  const get = useCallback((url: string, params?: Record<string, unknown>) =>
    request({ method: 'GET', url, params }), [request])

  const post = useCallback((url: string, data?: unknown) =>
    request({ method: 'POST', url, data }), [request])

  const put = useCallback((url: string, data?: unknown) =>
    request({ method: 'PUT', url, data }), [request])

  const patch = useCallback((url: string, data?: unknown) =>
    request({ method: 'PATCH', url, data }), [request])

  const del = useCallback((url: string) =>
    request({ method: 'DELETE', url }), [request])

  const reset = useCallback(() =>
    setState({ data: null, loading: false, error: null }), [])

  return { ...state, get, post, put, patch, del, reset }
}

export default useApi