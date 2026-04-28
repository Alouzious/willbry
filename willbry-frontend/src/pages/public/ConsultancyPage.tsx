import { useState } from 'react'
import { CalendarDays, CheckCircle2, Factory, Globe2, Send, Settings2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'

const services = [
  {
    title: 'Digital Transformation',
    icon: Settings2,
    text: 'Support for agricultural organizations adopting modern digital systems and workflows.',
  },
  {
    title: 'Value Addition & Agro-Industrialization',
    icon: Factory,
    text: 'Guidance on processing, product development, packaging, and market readiness.',
  },
  {
    title: 'Environmental Governance',
    icon: Globe2,
    text: 'Sustainability, climate resilience, and green economy advisory for institutions and projects.',
  },
]

export default function ConsultancyPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    service_type: '',
    preferred_date: '',
    description: '',
  })

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('/portal/bookings', form)
      toast.success('Consultancy request submitted')
      setForm({ service_type: '', preferred_date: '', description: '' })
    } catch {
      toast.error('Please login first or try again later')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Consultancy"
          title="Expert agricultural and green economy advisory."
          description="WillBry supports organizations, cooperatives, institutions, and partners with practical consultancy for digital agriculture, value addition, and sustainability."
        />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {services.map(({ title, icon: Icon, text }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-willbry-green-100 bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-willbry-green-50 text-willbry-green-600">
                  <Icon size={28} />
                </div>
                <h2 className="mt-6 text-2xl font-black text-willbry-green-900">{title}</h2>
                <p className="mt-4 leading-8 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Book a session
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                Bring your agricultural project to our advisory team.
              </h2>
              <p className="mt-5 leading-8 text-gray-600">
                Share your challenge or opportunity and our team will help you identify the next practical steps.
              </p>

              <div className="mt-8 space-y-4">
                {['Project feasibility', 'Value chain improvement', 'Training and capacity building'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-willbry-green-600" />
                    <span className="text-sm font-black text-willbry-green-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <div className="grid gap-5">
                <Input
                  label="Consultancy type"
                  required
                  value={form.service_type}
                  onChange={(e) => update('service_type', e.target.value)}
                  placeholder="Digital transformation, value addition..."
                />

                <Input
                  label="Preferred date"
                  type="date"
                  required
                  value={form.preferred_date}
                  onChange={(e) => update('preferred_date', e.target.value)}
                  leftIcon={<CalendarDays size={16} />}
                />

                <div>
                  <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                    Description <span className="text-willbry-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                    placeholder="Tell us about your organization, project, and what support you need."
                  />
                </div>

                <Button type="submit" loading={loading} rightIcon={<Send size={16} />}>
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}