import { useState, useCallback, useRef } from 'react'
import api from '../lib/api'
import type { ChatMessage } from '../types'

interface UseChatOptions {
  preview?: boolean
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadHistory = useCallback(async () => {
    if (options.preview) return
    try {
      const res = await api.get('/portal/chat')
      setMessages(res.data?.data ?? [])
    } catch {
      setError('Failed to load chat history')
    }
  }, [options.preview])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return

    const userMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      user_id: '',
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    setError(null)

    const assistantMsg: ChatMessage = {
      id: `temp-ai-${Date.now()}`,
      user_id: '',
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, assistantMsg])

    try {
      const endpoint = options.preview ? '/chat/preview' : '/portal/chat'
      const res = await api.post(endpoint, { message: content })
      const reply = res.data?.data?.content ?? res.data?.data?.message ?? 'No response received.'
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: reply } : m))
      )
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to send message'
      setError(msg)
      setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id))
    } finally {
      setLoading(false)
    }
  }, [loading, options.preview])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const cancelStream = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
  }, [])

  return {
    messages,
    loading,
    error,
    sendMessage,
    loadHistory,
    clearMessages,
    cancelStream,
  }
}

export default useChat