import { useState } from 'react'
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('/inquiries', form)
      toast.success('Message sent successfully')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Contact"
          title="Let’s build agricultural impact together."
          description="Reach out for partnerships, product inquiries, training, consultancy, or digital agriculture collaboration."
        />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:px-8">
            <form onSubmit={submit} className="rounded-[2rem] border border-willbry-green-100 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-black text-willbry-green-900">Send a message</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our team will respond with the next practical steps.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Input label="Full name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
                <Input label="Email address" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
                <div className="sm:col-span-2">
                  <Input label="Subject" required value={form.subject} onChange={(e) => update('subject', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                    Message <span className="text-willbry-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                  />
                </div>
              </div>

              <div className="mt-7">
                <Button type="submit" loading={loading} rightIcon={<Send size={16} />}>
                  Send Message
                </Button>
              </div>
            </form>

            <aside className="space-y-5">
              <div className="rounded-[2rem] bg-willbry-light p-6 shadow-card">
                <h3 className="text-xl font-black text-willbry-green-900">Company information</h3>

                <div className="mt-6 space-y-5">
                  <a href="tel:+256789747881" className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <Phone className="h-5 w-5 text-willbry-green-600" />
                    <div>
                      <p className="text-sm font-black text-willbry-green-900">Phone</p>
                      <p className="text-sm text-gray-600">+256 789 747 881</p>
                    </div>
                  </a>

                  <a href="mailto:willbroad2016@gmail.com" className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <Mail className="h-5 w-5 text-willbry-green-600" />
                    <div>
                      <p className="text-sm font-black text-willbry-green-900">Email</p>
                      <p className="text-sm text-gray-600">willbroad2016@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <MapPin className="h-5 w-5 text-willbry-green-600" />
                    <div>
                      <p className="text-sm font-black text-willbry-green-900">Address</p>
                      <p className="text-sm leading-6 text-gray-600">
                        Kijuguta, Northern Division, Kabale Municipality, Uganda
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-6 text-white shadow-card">
                <MessageCircle className="h-8 w-8 text-willbry-teal" />
                <h3 className="mt-5 text-xl font-black">Need a faster response?</h3>
                <p className="mt-3 text-sm leading-6 text-willbry-green-100">
                  Contact WillBry directly through phone or WhatsApp for urgent product and partnership inquiries.
                </p>
                <a href="https://wa.me/256789747881" className="mt-6 inline-block">
                  <Button variant="accent">Open WhatsApp</Button>
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}