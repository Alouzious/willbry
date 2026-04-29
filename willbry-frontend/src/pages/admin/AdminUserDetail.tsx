import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  FileText,
  Image,
  Mail,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  Users,
} from 'lucide-react'
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

export default function AdminUserDetail() {
  const { id } = useParams()

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <Link to="/admin/users">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Back to users
            </Button>
          </Link>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-willbry-green-500 text-2xl font-black text-white">
                  U
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                    User profile
                  </p>
                  <h1 className="mt-2 text-3xl font-black text-willbry-green-900">
                    Farmer Cooperative Lead
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <Mail size={16} className="text-willbry-teal" />
                    farmer@willbry.com
                  </p>
                </div>
              </div>

              <Badge variant="green" dot>Active</Badge>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { label: 'User ID', value: id || 'u1', icon: UserRound },
                { label: 'Role', value: 'User', icon: ShieldCheck },
                { label: 'Verified', value: 'Yes', icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-3xl bg-willbry-light p-6">
                  <Icon className="h-7 w-7 text-willbry-green-600" />
                  <p className="mt-5 text-sm font-bold text-gray-500">{label}</p>
                  <p className="mt-1 text-xl font-black text-willbry-green-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-willbry-green-100 p-6">
              <h2 className="text-xl font-black text-willbry-green-900">Activity summary</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-willbry-light p-4">
                  <p className="text-sm font-bold text-gray-500">Orders</p>
                  <p className="mt-1 text-2xl font-black text-willbry-green-900">3</p>
                </div>
                <div className="rounded-2xl bg-willbry-light p-4">
                  <p className="text-sm font-bold text-gray-500">AI Chats</p>
                  <p className="mt-1 text-2xl font-black text-willbry-green-900">14</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button leftIcon={<CheckCircle2 size={16} />}>Verify User</Button>
              <Button variant="secondary">Reset Password</Button>
              <Button variant="danger">Suspend Account</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}