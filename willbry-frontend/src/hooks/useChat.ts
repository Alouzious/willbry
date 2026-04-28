import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../lib/api'
import type { ChatMessage } from '../types'

interface UseChatOptions {
  preview?: boolean
  autoLoad?: boolean
}

function createTempMessage(role: 'user' | 'assistant', content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    user_id: '',
    role,
    content,
    created_at: new Date().toISOString(),
  }
}

function extractReply(payload: unknown): string {
  const data = payload as {
    data?: { content?: string; message?: string; reply?: string }
    content?: string
    message?: string
    reply?: string
  }

  return (
    data?.data?.content ||
    data?.data?.message ||
    data?.data?.reply ||
    data?.content ||
    data?.message ||
    data?.reply ||
    'I received your message, but I could not generate a response.'
  )
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  const endpoint = options.preview ? '/chat/preview' : '/portal/chat'

  const loadHistory = useCallback(async () => {
    if (options.preview) return

    setError(null)

    try {
      const response = await api.get('/portal/chat')
      const payload = response.data?.data ?? response.data
      setMessages(Array.isArray(payload) ? payload : [])
    } catch {
      setError('Failed to load chat history')
    }
  }, [options.preview])

  const sendMessage = useCallback(
    async (content: string) => {
      const clean = content.trim()
      if (!clean || loading) return

      const userMessage = createTempMessage('user', clean)
      const assistantMessage = createTempMessage('assistant', '')

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setLoading(true)
      setError(null)

      try {
        const response = await api.post(endpoint, { message: clean })
        const reply = extractReply(response.data)

        if (!mountedRef.current) return

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: reply }
              : message
          )
        )
      } catch {
        setMessages((prev) => prev.filter((message) => message.id !== assistantMessage.id))
        setError('Failed to send message. Please try again.')
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    },
    [endpoint, loading]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  useEffect(() => {
    mountedRef.current = true

    if (options.autoLoad) {
      void loadHistory()
    }

    return () => {
      mountedRef.current = false
    }
  }, [loadHistory, options.autoLoad])

  return {
    messages,
    loading,
    error,
    loadHistory,
    sendMessage,
    clearMessages,
  }
}

export default useChat