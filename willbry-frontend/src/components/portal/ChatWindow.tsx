import { useState, useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types'
import ChatMessageComponent from './ChatMessage'
import { Send, Loader2 } from 'lucide-react'

interface ChatWindowProps {
  messages: ChatMessage[]
  loading: boolean
  streaming: boolean
  onSendMessage: (message: string) => void
}

export default function ChatWindow({ messages, loading, streaming, onSendMessage }: ChatWindowProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    onSendMessage(msg)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-[#2d6a4f] text-white px-5 py-4 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
        <span className="font-semibold">WillBry AI Assistant</span>
        {streaming && <span className="text-xs text-green-200 ml-auto">Typing...</span>}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg font-medium mb-2">How can I help you today?</p>
            <p className="text-sm">Ask me anything about farming, crops, or agriculture.</p>
          </div>
        )}
        {messages.map(m => (
          <ChatMessageComponent key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-3 bg-white border-t border-gray-100 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] disabled:bg-gray-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[#2d6a4f] text-white rounded-xl px-4 py-2.5 hover:bg-[#1f4f2b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </form>
    </div>
  )
}
