import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
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
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../lib/utils'
import api from '../../lib/api'
import type { User } from '../../types'

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

export default function AdminUserDetail() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api.get(`/admin/users/${id}`)
      .then((res) => {
        const data = res.data?.data ?? res.data
        setUser(data)
      })
      .catch(() => setError('User not found.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Link to="/admin/users">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Back to users
            </Button>
          </Link>

          {loading ? (
            <div className="mt-10 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error || !user ? (
            <div className="mt-10 rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error ?? 'User not found'}</p>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-willbry-green-500 text-xl font-black text-white">
                  {user.full_name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-willbry-green-900">{user.full_name}</h1>
                  <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant={user.role === 'admin' ? 'orange' : 'teal'}>{user.role}</Badge>
                    <Badge variant="gray">{user.user_type}</Badge>
                    <Badge variant={user.active ? 'green' : 'red'} dot>
                      {user.active ? 'Active' : 'Suspended'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-willbry-light p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-500">Phone</p>
                  <p className="mt-1 text-sm font-bold text-willbry-green-900">{user.phone ?? '—'}</p>
                </div>
                <div className="rounded-2xl bg-willbry-light p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-500">Joined</p>
                  <p className="mt-1 text-sm font-bold text-willbry-green-900">{formatDate(user.created_at)}</p>
                </div>
                <div className="rounded-2xl bg-willbry-light p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-500">Verified</p>
                  <p className="mt-1 text-sm font-bold text-willbry-green-900">{user.verified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
