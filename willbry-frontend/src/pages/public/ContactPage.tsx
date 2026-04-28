import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { contactSchema } from '../../lib/validators'
import type { ContactFormData } from '../../lib/validators'
import api from '../../lib/api'
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const errs: Partial<ContactFormData> = {}
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof ContactFormData
        errs[key] = issue.message
      })
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      await api.post('/contact', form)
      setSent(true)
    } catch {
      // show general error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch — we'd love to hear from you"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0d2b18] mb-6">Send Us a Message</h2>
              {sent ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-[#2d6a4f] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                      error={errors.name}
                      fullWidth
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                      error={errors.email}
                      fullWidth
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                    error={errors.subject}
                    fullWidth
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className={`w-full rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-300'} py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" loading={loading} size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0d2b18] mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Address', value: '123 Farm Road, Agro District, Nakuru, Kenya' },
                    { icon: Phone, label: 'Phone', value: '+254 700 000 000' },
                    { icon: Mail, label: 'Email', value: 'info@willbry.com' },
                    { icon: Clock, label: 'Working Hours', value: 'Mon–Fri, 8am–6pm EAT' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-[#f0f7e8] rounded-xl flex items-center justify-center text-[#2d6a4f] shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-gray-600 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f0f7e8] rounded-2xl p-6">
                <h3 className="font-semibold text-[#0d2b18] mb-2">Quick Response</h3>
                <p className="text-gray-600 text-sm">
                  Need immediate help? Our farmers portal has a 24/7 AI assistant ready to answer your agricultural questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
