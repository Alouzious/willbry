import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Bot, FileText, Image, Package, Search, Settings, ShoppingBag, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import UsersTable from '../../components/admin/UsersTable'
import { Input } from '../../components/ui/Input'
import { adminListUsers, adminUpdateUser } from '../../services/admin.service'
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

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminListUsers()
        setUsers(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load users')
      }
    }
    void load()
  }, [])

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.user_type.toLowerCase().includes(search)
    )
  }, [query, users])

  const handleToggleActive = async (user: User) => {
    try {
      await adminUpdateUser(user.id, { active: !user.active })
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u))
      )
      toast.success(`${user.full_name} status updated`)
    } catch {
      toast.error('Failed to update user')
    }
  }

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

          <UsersTable users={filtered} onToggleActive={handleToggleActive} />
        </div>
      </section>
    </main>
  )
}