import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle,
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
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../lib/utils'
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

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  replied: boolean
  created_at: string
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadInquiries = () => {
    setLoading(true)
    api.get('/admin/inquiries')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setInquiries(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load inquiries.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadInquiries() }, [])

  const handleMarkRead = async (id: string) => {
    try {
      await api.patch(`/admin/inquiries/${id}`, { read: true })
      toast.success('Marked as read')
      loadInquiries()
    } catch {
      toast.error('Failed to update inquiry')
    }
  }

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
              Contact inquiries
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Messages submitted through the contact form.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No inquiries found.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Sender', 'Subject', 'Message', 'Status', 'Date', 'Action'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          <p className="font-black text-willbry-green-900">{inq.name}</p>
                          <p className="text-xs text-gray-500">{inq.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-800">{inq.subject}</td>
                        <td className="max-w-[220px] px-6 py-4 text-sm text-gray-600">
                          <p className="line-clamp-2">{inq.message}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={inq.read ? 'green' : 'yellow'} dot>
                            {inq.read ? 'Read' : 'Unread'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {formatDate(inq.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          {!inq.read && (
                            <Button
                              size="sm"
                              variant="secondary"
                              leftIcon={<CheckCircle size={15} />}
                              onClick={() => handleMarkRead(inq.id)}
                            >
                              Mark read
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
