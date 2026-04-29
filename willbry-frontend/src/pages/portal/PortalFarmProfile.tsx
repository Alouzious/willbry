import { useEffect, useState } from 'react'
import { Bot, Download, FileText, Loader2, MapPin, Package, Save, ShoppingBag, Sprout } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

interface FarmProfileForm {
  district: string
  size_acres: string
  crops: string
  irrigation: string
}

export default function PortalFarmProfile() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState<FarmProfileForm>({
    district: '',
    size_acres: '',
    crops: '',
    irrigation: '',
  })

  useEffect(() => {
    api.get('/portal/farm-profile')
      .then((res) => {
        const data = res.data?.data ?? res.data
        if (data) {
          setForm({
            district: data.district ?? '',
            size_acres: data.size_acres != null ? String(data.size_acres) : '',
            crops: data.crops ?? '',
            irrigation: data.irrigation ?? '',
          })
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false))
  }, [])

  const update = (key: keyof FarmProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await api.put('/portal/farm-profile', {
        district: form.district,
        size_acres: form.size_acres ? parseFloat(form.size_acres) : null,
        crops: form.crops,
        irrigation: form.irrigation || null,
      })
      toast.success('Farm profile saved')
    } catch {
      toast.error('Failed to save farm profile')
    } finally {
      setLoading(false)
    }
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

          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_.75fr]">
              <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
                <div className="grid gap-5">
                  <Input
                    label="District"
                    value={form.district}
                    onChange={(e) => update('district', e.target.value)}
                    leftIcon={<MapPin size={16} />}
                    required
                  />

                  <Input
                    label="Farm size"
                    value={form.size_acres}
                    onChange={(e) => update('size_acres', e.target.value)}
                    rightAddon="acres"
                    type="number"
                    min="0"
                    step="0.1"
                  />

                  <Input
                    label="Main crops"
                    value={form.crops}
                    onChange={(e) => update('crops', e.target.value)}
                    leftIcon={<Sprout size={16} />}
                    hint="Separate crops with commas."
                    required
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
          )}
        </div>
      </section>
    </main>
  )
}
