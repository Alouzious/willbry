import { useEffect, useState } from 'react'
import { Bot, CalendarDays, Download, FileText, Package, Send, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { listMyBookings, createBooking } from '../../services/portal.service'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ service_type: '', preferred_date: '', description: '' })

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listMyBookings()
        setBookings(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load bookings')
      }
    }
    void load()
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const created = await createBooking({
        service_type: form.service_type,
        preferred_date: form.preferred_date || undefined,
        description: form.description,
      })
      setBookings((prev) => [created, ...prev])
      setForm({ service_type: '', preferred_date: '', description: '' })
      toast.success('Booking request submitted')
    } catch {
      toast.error('Failed to submit booking')
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Consultancy bookings
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Book expert agricultural support
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Request support for training, digital transformation, value addition, or green economy consultancy.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-black text-willbry-green-900">New booking</h2>
              <div className="mt-6 grid gap-5">
                <Input
                  label="Service type"
                  value={form.service_type}
                  onChange={(e) => update('service_type', e.target.value)}
                  required
                />
                <Input
                  label="Preferred date"
                  type="date"
                  value={form.preferred_date}
                  onChange={(e) => update('preferred_date', e.target.value)}
                  leftIcon={<CalendarDays size={16} />}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    required
                    className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                  />
                </div>
                <Button type="submit" loading={loading} rightIcon={<Send size={16} />}>
                  Submit Booking
                </Button>
              </div>
            </form>

            <section className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-black text-willbry-green-900">Your bookings</h2>
              <div className="mt-6 space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-sm text-gray-500">No bookings yet.</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="rounded-2xl border border-willbry-green-100 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-black text-willbry-green-900">{booking.service_type}</h3>
                          <p className="mt-1 text-sm text-gray-500">{booking.preferred_date}</p>
                        </div>
                        <Badge variant="yellow" dot>{booking.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}