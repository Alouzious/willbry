import Sidebar from '../../components/layout/Sidebar'
import ChatWindow from '../../components/portal/ChatWindow'
import { useChat } from '../../hooks/useChat'

export default function PortalAiChat() {
  const { messages, loading, streaming, sendMessage } = useChat()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-hidden p-6">
        <ChatWindow
          messages={messages}
          loading={loading}
          streaming={streaming}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
