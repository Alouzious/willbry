import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import AiConfig from '../../components/admin/AiConfig'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { Bot } from 'lucide-react'

interface AiConfigData {
  model: string
  temperature: number
  max_tokens: number
  system_prompt: string
  enabled: boolean
}

const defaultConfig: AiConfigData = {
  model: 'gpt-4',
  temperature: 0.7,
  max_tokens: 2048,
  system_prompt: 'You are a helpful agricultural assistant for WillBry Agro-Innovations Platform.',
  enabled: true,
}

export default function AdminAiConfig() {
  const [saving, setSaving] = useState(false)

  const handleSave = async (data: AiConfigData) => {
    setSaving(true)
    try {
      await api.post('/admin/ai-config', data)
      toast.success('AI configuration saved')
    } catch {
      toast.error('Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-[#2d6a4f]/10 rounded-xl">
              <Bot className="h-6 w-6 text-[#2d6a4f]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Configuration</h1>
              <p className="text-gray-500 mt-0.5">Manage the AI assistant settings for the platform</p>
            </div>
          </div>
          <div className="max-w-2xl bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            {saving && (
              <p className="mb-4 text-sm text-[#2d6a4f] font-medium">Saving…</p>
            )}
            <AiConfig initialData={defaultConfig} onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  )
}
