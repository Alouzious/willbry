import { useEffect, useRef, useState } from 'react'
import { SendHorizonal, Sparkles, RefreshCw } from 'lucide-react'
import useChat from '../../hooks/useChat'
import ChatMessage from './ChatMessage'
import { Button } from '../ui/Button'

interface ChatWindowProps {
  preview?: boolean
}

const prompts = [
  'How can I improve Irish potato yields in Kabale?',
  'What causes yellowing leaves in beans?',
  'How can I reduce post-harvest losses?',
]

export default function ChatWindow({ preview = false }: ChatWindowProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const {
    messages,
    loading,
    error,
    sendMessage,
    loadHistory,
    clearMessages,
  } = useChat({ preview, autoLoad: !preview })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const submit = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    await sendMessage(text)
  }

  return (
    <section className="flex h-full min-h-[620px] flex-col overflow-hidden rounded-3xl border border-willbry-green-100 bg-willbry-light shadow-card">
      <div className="flex items-center justify-between border-b border-willbry-green-100 bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-willbry-green-500 to-willbry-teal text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-willbry-green-900">
              WillBry AI Farming Assistant
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Practical advisory for Ugandan farming conditions
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            clearMessages()
            if (!preview) void loadHistory()
          }}
          className="rounded-xl p-2 text-gray-400 transition-all hover:bg-willbry-green-50 hover:text-willbry-green-600"
          aria-label="Refresh chat"
        >
          <RefreshCw size={17} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 ? (
          <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-willbry-green-600 shadow-card">
              <Sparkles size={28} />
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-willbry-green-900">
              Ask about crops, pests, markets, or value addition
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Get practical guidance designed for farmers and agribusiness builders in Uganda.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-1">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="rounded-2xl border border-willbry-green-100 bg-white px-4 py-3 text-left text-sm font-semibold text-willbry-green-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-willbry-teal hover:shadow-card"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-willbry-green-100 bg-white p-4">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void submit()
              }
            }}
            rows={1}
            placeholder="Ask WillBry AI about farming..."
            className="min-h-12 flex-1 resize-none rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
          />

          <Button
            onClick={() => void submit()}
            loading={loading}
            disabled={!input.trim()}
            className="h-12"
            rightIcon={<SendHorizonal size={17} />}
          >
            Send
          </Button>
        </div>
      </div>
    </section>
  )
}