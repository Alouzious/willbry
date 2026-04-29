import { useState } from 'react'
import { BarChart3, Bot, CheckCircle2, FileText, Image, Mail, Package, Settings, ShoppingBag, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

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

const inquiries = [
  {
    id: 'inq1',
    name: 'Kabale Farmers Group',
    email: 'farmers@example.com',
    subject: 'Training partnership',
    message: 'We would like to partner with WillBry for farmer training and digital advisory.',
    read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'inq2',
    name: 'Institution Partner',
    email: 'partner@example.com',
    subject: 'Consultancy request',
    message: 'We need support for value addition project feasibility.',
    read: true,
    created_at: new Date().toISOString(),
  },
]

export default function AdminInquiries() {
  const [selected, setSelected] = useState(inquiries[0])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Inquiries
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Contact and partnership messages
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Manage public contact forms, service requests, and partnership opportunities.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-white p-4 shadow-card">
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => setSelected(inquiry)}
                    className={[
                      'w-full rounded-2xl border p-4 text-left transition-all hover:bg-willbry-light',
                      selected.id === inquiry.id
                        ? 'border-willbry-green-500 bg-willbry-green-50'
                        : 'border-willbry-green-100',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-willbry-green-900">{inquiry.name}</p>
                      <Badge variant={inquiry.read ? 'green' : 'yellow'} size="sm" dot>
                        {inquiry.read ? 'read' : 'new'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-600">{inquiry.subject}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                      {inquiry.message}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <article className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-bold text-willbry-teal">{selected.email}</p>
                  <h2 className="mt-2 text-2xl font-black text-willbry-green-900">
                    {selected.subject}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">From {selected.name}</p>
                </div>
                <Badge variant={selected.read ? 'green' : 'yellow'} dot>
                  {selected.read ? 'Read' : 'New'}
                </Badge>
              </div>

              <div className="mt-8 rounded-3xl bg-willbry-light p-6 text-sm leading-7 text-gray-700">
                {selected.message}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${selected.email}`}>
                  <Button leftIcon={<Mail size={16} />}>Reply</Button>
                </a>
                <Button
                  variant="secondary"
                  leftIcon={<CheckCircle2 size={16} />}
                  onClick={() => toast.success('Marked as read')}
                >
                  Mark Read
                </Button>
                <Button
                  variant="danger"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => toast.success('Inquiry removed')}
                >
                  Delete
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}