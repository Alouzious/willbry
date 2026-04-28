import { Bot, UserRound } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '../../types'
import { formatDate } from '../../lib/utils'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={['flex gap-3', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-willbry-green-500 text-white shadow-sm">
          <Bot size={18} />
        </div>
      )}

      <div className={['max-w-[82%] sm:max-w-[70%]', isUser ? 'items-end' : 'items-start'].join(' ')}>
        <div
          className={[
            'rounded-3xl px-5 py-4 text-sm leading-7 shadow-sm',
            isUser
              ? 'rounded-br-lg bg-willbry-green-500 text-white'
              : 'rounded-bl-lg border border-willbry-green-100 bg-white text-willbry-green-900',
          ].join(' ')}
        >
          {message.content ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-teal [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-teal [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-willbry-teal" />
            </div>
          )}
        </div>

        <p
          className={[
            'mt-1 px-2 text-[11px] font-medium text-gray-400',
            isUser ? 'text-right' : 'text-left',
          ].join(' ')}
        >
          {formatDate(message.created_at)}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-willbry-teal text-white shadow-sm">
          <UserRound size={18} />
        </div>
      )}
    </div>
  )
}