import { useState } from 'react'
import { Bot, Save, SlidersHorizontal } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export interface AiConfigValue {
  system_prompt: string
  model: string
  language?: string
}

interface AiConfigProps {
  value: AiConfigValue
  loading?: boolean
  onSave: (value: AiConfigValue) => Promise<void> | void
}

export default function AiConfig({ value, loading = false, onSave }: AiConfigProps) {
  const [form, setForm] = useState<AiConfigValue>(value)

  const update = (key: keyof AiConfigValue, next: string) => {
    setForm((prev) => ({ ...prev, [key]: next }))
  }

  return (
    <section className="rounded-3xl border border-willbry-green-100 bg-white shadow-card">
      <div className="border-b border-willbry-green-100 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-willbry-green-900">
              AI Farming Assistant Configuration
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Control how WillBry AI responds to farmers, clients, and partners.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6">
        <Input
          label="Groq Model"
          value={form.model}
          onChange={(event) => update('model', event.target.value)}
          leftIcon={<SlidersHorizontal size={16} />}
          hint="Example: llama-3.3-70b-versatile"
        />

        <Input
          label="Default Language"
          value={form.language ?? 'English'}
          onChange={(event) => update('language', event.target.value)}
          hint="English, Luganda, Rukiga, or multilingual"
        />

        <div>
          <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
            System Prompt
          </label>
          <textarea
            value={form.system_prompt}
            onChange={(event) => update('system_prompt', event.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
          />
          <p className="mt-2 text-xs text-gray-500">
            Keep the assistant practical, Uganda-focused, and clear for farmers.
          </p>
        </div>

        <div className="flex justify-end">
          <Button loading={loading} leftIcon={<Save size={16} />} onClick={() => onSave(form)}>
            Save Configuration
          </Button>
        </div>
      </div>
    </section>
  )
}