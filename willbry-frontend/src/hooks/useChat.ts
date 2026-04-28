import { useState, useCallback } from 'react'
import type { ChatMessage } from '../types'
import { getAccessToken } from '../lib/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)

  const sendMessage = useCallback(async (message: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user_id: '',
      role: 'user',
      content: message,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setStreaming(true)

    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: ChatMessage = {
      id: assistantId,
      user_id: '',
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, assistantMsg])

    try {
      const token = getAccessToken()
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message }),
      })

      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        )
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: 'Sorry, I encountered an error. Please try again.' }
            : m
        )
      )
    } finally {
      setLoading(false)
      setStreaming(false)
    }
  }, [])

  const clearMessages = useCallback(() => setMessages([]), [])

  return { messages, loading, streaming, sendMessage, clearMessages }
}

export default useChat
