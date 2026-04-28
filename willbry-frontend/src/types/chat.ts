export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  user_id: string
  role: MessageRole
  content: string
  created_at: string
}

export interface SendMessageDto {
  message: string
  conversation_id?: string
}
