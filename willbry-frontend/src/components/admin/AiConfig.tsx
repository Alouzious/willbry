import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { ToggleLeft, ToggleRight } from 'lucide-react'

interface AiConfigData {
  model: string
  temperature: number
  max_tokens: number
  system_prompt: string
  enabled: boolean
}

interface AiConfigProps {
  initialData?: AiConfigData
  onSave: (data: AiConfigData) => void
}

const defaultData: AiConfigData = {
  model: 'gpt-4',
  temperature: 0.7,
  max_tokens: 2048,
  system_prompt: 'You are a helpful agricultural assistant for WillBry Agro-Innovations Platform.',
  enabled: true,
}

export default function AiConfig({ initialData, onSave }: AiConfigProps) {
  const [form, setForm] = useState<AiConfigData>(initialData || defaultData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'temperature' || name === 'max_tokens' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="font-medium text-gray-900">AI Assistant Enabled</p>
          <p className="text-sm text-gray-500">Allow users to interact with the AI assistant</p>
        </div>
        <button
          type="button"
          onClick={() => setForm(prev => ({ ...prev, enabled: !prev.enabled }))}
          className="text-[#2d6a4f]"
        >
          {form.enabled
            ? <ToggleRight className="h-8 w-8 text-[#2d6a4f]" />
            : <ToggleLeft className="h-8 w-8 text-gray-400" />
          }
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
        <select
          name="model"
          value={form.model}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3">Claude-3</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Temperature: <span className="text-[#2d6a4f] font-bold">{form.temperature}</span>
        </label>
        <input
          type="range"
          name="temperature"
          min={0}
          max={2}
          step={0.1}
          value={form.temperature}
          onChange={handleChange}
          className="w-full accent-[#2d6a4f]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Precise (0)</span>
          <span>Creative (2)</span>
        </div>
      </div>

      <Input
        label="Max Tokens"
        name="max_tokens"
        type="number"
        value={String(form.max_tokens)}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt</label>
        <textarea
          name="system_prompt"
          value={form.system_prompt}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
        />
      </div>

      <Button type="submit" variant="primary">Save Configuration</Button>
    </form>
  )
}
