import { useState, useCallback } from 'react'
import type { AxiosError } from 'axios'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({ data: null, loading: false, error: null })

  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await fn()
      setState({ data, loading: false, error: null })
      return data
    } catch (err) {
      const error = (err as AxiosError<{ message: string }>)?.response?.data?.message || 'An error occurred'
      setState({ data: null, loading: false, error })
      throw err
    }
  }, [])

  return { ...state, execute }
}

export default useApi
