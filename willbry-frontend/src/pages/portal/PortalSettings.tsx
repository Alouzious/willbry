import { useState } from 'react'
import { Bot, Download, FileText, Package, Save, Settings, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
  { label: 'Settings', href: '/portal/settings', icon: Settings },
]

export default function PortalSettings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    setTimeout(() => {
      toast.success('Settings saved')
      setLoading(false)
    }, 500)
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Settings
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Manage your profile
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Update your contact information and account details.
            </p>
          </div>

          <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-5">
              <Input
                label="Full name"
                value={form.full_name}
                onChange={(e) => update('full_name', e.target.value)}
              />
              <Input
                label="Email address"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
              <Input
                label="Phone number"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
              />

              <div className="pt-3">
                <Button type="submit" loading={loading} leftIcon={<Save size={16} />}>
                  Save Settings
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}