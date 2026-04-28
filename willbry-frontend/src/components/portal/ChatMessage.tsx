import type { ChatMessage } from '../../types'
import { Bot, User } from 'lucide-react'
import { formatDate } from '../../lib/utils'

interface ChatMessageProps {
  message: ChatMessage
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-[#2d6a4f] flex items-center justify-center shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#2d6a4f] text-white rounded-br-none'
            : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'
        }`}>
          {message.content || <span className="inline-flex gap-1"><span className="animate-bounce">●</span><span className="animate-bounce" style={{ animationDelay: '0.1s' }}>●</span><span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span></span>}
        </div>
        <span className="text-xs text-gray-400 px-1">{formatDate(message.created_at)}</span>
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      )}
    </div>
  )
}
