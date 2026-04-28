import { Bot, User } from 'lucide-react'

const preview = [
  { role: 'user', content: 'What are the best crops to grow in dry season?' },
  { role: 'assistant', content: 'Great question! For dry season farming, I recommend drought-tolerant crops like sorghum, millet, cowpeas, and sweet potatoes. These require minimal irrigation and can thrive with limited rainfall. Would you like specific advice for your region?' },
  { role: 'user', content: 'I\'m in central Kenya, what fertilizer should I use?' },
  { role: 'assistant', content: 'For central Kenya\'s red volcanic soils, I recommend using DAP (Di-Ammonium Phosphate) at planting and CAN (Calcium Ammonium Nitrate) as a top dressing. The soil is typically phosphorus-deficient so DAP will boost root development significantly.' },
]

export default function AiPreviewWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-lg mx-auto">
      <div className="bg-[#2d6a4f] text-white px-5 py-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-[#52b788] flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">WillBry AI Assistant</p>
          <p className="text-xs text-green-200">Powered by advanced AI • Online</p>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-64 overflow-y-auto bg-gray-50">
        {preview.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="h-7 w-7 rounded-full bg-[#2d6a4f] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div className={`max-w-xs px-3 py-2 rounded-2xl text-xs leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#2d6a4f] text-white rounded-br-none'
                : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
            }`}>
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <div className="flex gap-2 items-center bg-gray-100 rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="Ask anything about farming..."
            className="flex-1 bg-transparent text-sm text-gray-500 outline-none"
            readOnly
          />
          <Bot className="h-4 w-4 text-[#2d6a4f]" />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          <a href="/portal/chat" className="text-[#2d6a4f] hover:underline">Login to chat with AI →</a>
        </p>
      </div>
    </div>
  )
}
