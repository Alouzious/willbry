import { useState } from 'react'
import {
  BarChart3,
  Bot,
  FileText,
  Image,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import AiConfig from '../../components/admin/AiConfig'
import type { AiConfigValue } from '../../components/admin/AiConfig'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: Settings },
]

const defaultConfig: AiConfigValue = {
  model: 'llama-3.3-70b-versatile',
  language: 'English',
  system_prompt:
    'You are WillBry AI, a practical agricultural assistant for Ugandan farmers. Give clear, safe, locally relevant advice on crops, pests, soils, post-harvest handling, value addition, and agribusiness. Keep answers simple, actionable, and farmer-friendly.',
}

export default function AdminAiConfig() {
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState(defaultConfig)

  const saveConfig = async (value: AiConfigValue) => {
    setLoading(true)

    setTimeout(() => {
      setConfig(value)
      toast.success('AI configuration saved')
      setLoading(false)
    }, 600)
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              AI configuration
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Control the farming assistant
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Tune how WillBry AI responds to farmers, clients, partners, and internal teams.
            </p>
          </div>

          <AiConfig value={config} loading={loading} onSave={saveConfig} />
        </div>
      </section>
    </main>
  )
}