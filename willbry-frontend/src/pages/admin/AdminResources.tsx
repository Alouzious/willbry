import {
  BarChart3,
  Bot,
  Download,
  FileText,
  Image,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import ResourceCard from '../../components/portal/ResourceCard'
import type { ResourceItem } from '../../components/portal/ResourceCard'
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

const resources: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Irish Potato Production Guide',
    description: 'Practical production guide for highland farming conditions.',
    category: 'Crop Guides',
    download_count: 124,
  },
  {
    id: 'r2',
    title: 'Post-Harvest Handling Manual',
    description: 'Training manual for reducing losses and improving produce quality.',
    category: 'Training',
    download_count: 89,
  },
]

export default function AdminResources() {
  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Resources CMS
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage learning materials
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Upload guides, manuals, price lists, reports, and training resources for portal users.
              </p>
            </div>

            <Button leftIcon={<Plus size={16} />}>Upload Resource</Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {resources.map((resource) => (
              <div key={resource.id} className="relative">
                <ResourceCard resource={resource} />
                <button className="absolute right-4 top-4 rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-dashed border-willbry-green-200 bg-white p-8 text-center">
            <Download className="mx-auto h-10 w-10 text-willbry-green-400" />
            <h2 className="mt-4 text-xl font-black text-willbry-green-900">Cloud storage ready</h2>
            <p className="mt-2 text-sm text-gray-600">
              Connect Cloudflare R2 or backend upload endpoints to activate production file uploads.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}