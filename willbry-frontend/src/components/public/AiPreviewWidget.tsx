import { useRef, useState } from 'react'
import { Bot, Send, Sprout, X } from 'lucide-react'
import { useChat } from '../../hooks/useChat'

const suggestions = [
  'How do I control pests on Irish potatoes?',
  'What crops grow well in Kabale?',
  'How can I add value to my maize?',
  'Best time to plant beans in Uganda?',
]

export default function AiPreviewWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, loading, sendMessage } = useChat({ preview: true })

  const submit = async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    await sendMessage(msg)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-willbry-green-500 px-5 py-3 text-sm font-black text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-willbry-green-600 hover:shadow-card-hover lg:hidden"
      >
        <Bot size={18} />
        Ask WillBry AI
      </button>

      {/* ── Inline section widget (desktop) — used in HomePage ── */}
      <div className="hidden lg:block">
        <WidgetBody
          open={true}
          inline
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          submit={submit}
          bottomRef={bottomRef}
        />
      </div>

      {/* ── Mobile modal ── */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center lg:hidden">
          <button
            className="absolute inset-0 bg-willbry-green-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-t-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-willbry-green-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-willbry-green-500 text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-willbry-green-900">WillBry AI</p>
                  <p className="text-xs text-willbry-teal">Agricultural assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-gray-400 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <WidgetBody
              open={open}
              inline={false}
              messages={messages}
              loading={loading}
              input={input}
              setInput={setInput}
              submit={submit}
              bottomRef={bottomRef}
            />
          </div>
        </div>
      )}
    </>
  )
}

// ── Shared body ──────────────────────────────────────────────────────────────
interface BodyProps {
  open: boolean
  inline: boolean
  messages: any[]
  loading: boolean
  input: string
  setInput: (v: string) => void
  submit: (text?: string) => void
  bottomRef: React.RefObject<HTMLDivElement | null>
}

const suggestions_list = [
  'How do I control pests on Irish potatoes?',
  'What crops grow well in Kabale?',
  'How can I add value to my maize?',
  'Best time to plant beans in Uganda?',
]

function WidgetBody({ inline, messages, loading, input, setInput, submit, bottomRef }: BodyProps) {
  return (
    <div className={inline ? 'flex h-[520px] flex-col overflow-hidden rounded-[2rem] border border-willbry-green-100 bg-white shadow-card' : 'flex h-[420px] flex-col'}>
      {/* Header (inline only) */}
      {inline && (
        <div className="flex items-center gap-3 border-b border-willbry-green-100 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-willbry-green-500 text-white">
            <Bot size={18} />
          </div>
          <div>
            <p className="text-sm font-black text-willbry-green-900">WillBry AI Assistant</p>
            <p className="text-xs text-willbry-teal">Ask anything about farming or WillBry</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Online
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-willbry-green-500 text-white">
                <Sprout size={15} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-willbry-light px-4 py-3 text-sm leading-6 text-willbry-green-900">
                Hello! I'm WillBry AI — your agricultural assistant. Ask me anything about farming, crops, value addition, or WillBry's services.
              </div>
            </div>
            <p className="pl-11 text-xs font-bold text-gray-400">Try a question:</p>
            <div className="flex flex-wrap gap-2 pl-11">
              {suggestions_list.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-willbry-green-100 bg-white px-3 py-1.5 text-xs font-semibold text-willbry-green-700 transition-all hover:bg-willbry-green-50 hover:text-willbry-green-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={['flex items-start gap-3', msg.role === 'user' ? 'flex-row-reverse' : ''].join(' ')}
            >
              <div className={[
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-white text-xs font-black',
                msg.role === 'user' ? 'bg-willbry-teal' : 'bg-willbry-green-500',
              ].join(' ')}>
                {msg.role === 'user' ? 'You' : <Sprout size={14} />}
              </div>
              <div className={[
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6',
                msg.role === 'user'
                  ? 'rounded-tr-sm bg-willbry-teal text-white'
                  : 'rounded-tl-sm bg-willbry-light text-willbry-green-900',
              ].join(' ')}>
                {msg.content || (loading && msg.role === 'assistant' ? (
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-green-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-green-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-green-400" style={{ animationDelay: '300ms' }} />
                  </span>
                ) : '…')}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-willbry-green-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && submit()}
            placeholder="Ask about crops, pests, markets, WillBry..."
            className="flex-1 rounded-2xl border border-willbry-green-100 bg-willbry-light px-4 py-2.5 text-sm outline-none transition-all focus:border-willbry-teal focus:ring-2 focus:ring-willbry-teal/15"
          />
          <button
            onClick={() => submit()}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-willbry-green-500 text-white transition-all hover:bg-willbry-green-600 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">
          No account needed · Powered by WillBry AI
        </p>
      </div>
    </div>
  )
}