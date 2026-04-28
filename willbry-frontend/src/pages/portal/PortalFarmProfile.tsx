import { useState } from 'react'
import { Bot, Download, FileText, MapPin, Package, Save, ShoppingBag, Sprout } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalFarmProfile() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    district: 'Kabale',
    size_acres: '2',
    crops: 'Irish potatoes, beans',
    irrigation: 'Rain-fed',
  })

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Farm profile saved')
      setLoading(false)
    }, 500)
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Farm profile
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Help WillBry personalize your advisory
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Your farm profile helps the platform understand your location, crops, and production context.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_.75fr]">
            <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <div className="grid gap-5">
                <Input
                  label="District"
                  value={form.district}
                  onChange={(e) => update('district', e.target.value)}
                  leftIcon={<MapPin size={16} />}
                />

                <Input
                  label="Farm size"
                  value={form.size_acres}
                  onChange={(e) => update('size_acres', e.target.value)}
                  rightAddon="acres"
                />

                <Input
                  label="Main crops"
                  value={form.crops}
                  onChange={(e) => update('crops', e.target.value)}
                  leftIcon={<Sprout size={16} />}
                  hint="Separate crops with commas."
                />

                <Input
                  label="Irrigation type"
                  value={form.irrigation}
                  onChange={(e) => update('irrigation', e.target.value)}
                />

                <Button type="submit" loading={loading} leftIcon={<Save size={16} />}>
                  Save Farm Profile
                </Button>
              </div>
            </form>

            <aside className="rounded-[2rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-8 text-white shadow-card">
              <FileText className="h-10 w-10 text-willbry-teal" />
              <h2 className="mt-6 text-3xl font-black">Why this matters</h2>
              <p className="mt-4 text-sm leading-7 text-willbry-green-100">
                A good farm profile makes digital advisory more relevant. The AI assistant can consider
                your location, crop type, and farm size when giving practical guidance.
              </p>

              <div className="mt-7 grid gap-3">
                {['Better crop advice', 'Relevant resources', 'Market-aware planning'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}