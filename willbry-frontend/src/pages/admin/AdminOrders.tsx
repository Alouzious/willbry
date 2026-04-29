import { useMemo, useState } from 'react'
import { BarChart3, Bot, FileText, Image, Package, Search, Settings, ShoppingBag, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import UsersTable from '../../components/admin/UsersTable'
import { Input } from '../../components/ui/Input'
import type { User } from '../../types'

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

const users: User[] = [
  {
    id: 'u1',
    full_name: 'Farmer Cooperative Lead',
    email: 'farmer@willbry.com',
    phone: '+256700000001',
    role: 'user',
    user_type: 'farmer',
    verified: true,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'u2',
    full_name: 'WillBry Admin',
    email: 'admin@willbry.com',
    role: 'admin',
    user_type: 'partner',
    verified: true,
    active: true,
    created_at: new Date().toISOString(),
  },
]

export default function AdminUsers() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.user_type.toLowerCase().includes(search)
    )
  }, [query])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_.42fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                User management
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Farmers, clients, partners, and staff
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage platform accounts, user types, roles, verification, and access status.
              </p>
            </div>

            <Input
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={<Search size={17} />}
            />
          </div>

          <UsersTable
            users={filtered}
            onToggleActive={(user) => toast.success(`${user.full_name} status updated`)}
          />
        </div>
      </section>
    </main>
  )
}