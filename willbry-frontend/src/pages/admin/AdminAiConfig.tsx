import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  Image,
  Leaf,
  Loader2,
  MessageCircle,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import AiConfig from '../../components/admin/AiConfig'
import type { AiConfigValue } from '../../components/admin/AiConfig'
import api from '../../lib/api'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: ShoppingBag },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageCircle },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Resources', href: '/admin/resources', icon: FileText },
  { label: 'Farmers', href: '/admin/farmers', icon: Leaf },
  { label: 'Prices', href: '/admin/prices', icon: TrendingUp },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

const defaults: AiConfigValue = {
  system_prompt: '',
  model: 'llama-3.3-70b-versatile',
  language: 'English',
}

export default function AdminAiConfig() {
  const [config, setConfig] = useState<AiConfigValue>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/admin/ai-config')
      .then((res) => {
        const data = res.data?.data ?? res.data
        if (data) {
          setConfig({
            system_prompt: data.system_prompt ?? '',
            model: data.model ?? 'llama-3.3-70b-versatile',
            language: data.language ?? 'English',
          })
        }
      })
      .catch(() => toast.error('Failed to load AI configuration'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (value: AiConfigValue) => {
    setSaving(true)
    try {
      await api.put('/admin/ai-config', value)
      setConfig(value)
      toast.success('AI configuration saved')
    } catch {
      toast.error('Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              AI Config
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              AI configuration
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Control how the WillBry AI farming assistant responds to users.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : (
            <AiConfig value={config} loading={saving} onSave={handleSave} />
          )}
        </div>
      </section>
    </main>
  )
}
