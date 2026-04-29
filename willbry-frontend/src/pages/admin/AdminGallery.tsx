import {
  BarChart3,
  Bot,
  FileText,
  Image,
  ImagePlus,
  Package,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

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

const images = [
  {
    id: 'g1',
    title: 'Field Activities',
    category: 'Farm Activities',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g2',
    title: 'Community Training',
    category: 'Community',
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
]

export default function AdminGallery() {
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
                Gallery CMS
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage visual stories
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Upload and manage images from farms, products, events, trainings, and partnerships.
              </p>
            </div>

            <Button leftIcon={<ImagePlus size={16} />}>Upload Image</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.id}
                className="overflow-hidden rounded-[2rem] border border-willbry-green-100 bg-white shadow-card"
              >
                <img src={image.url} alt={image.title} className="h-64 w-full object-cover" />

                <div className="p-5">
                  <Badge variant="teal" size="sm">{image.category}</Badge>
                  <h3 className="mt-3 text-lg font-black text-willbry-green-900">{image.title}</h3>

                  <div className="mt-5 flex gap-2">
                    <Button size="sm" variant="secondary">Edit</Button>
                    <Button size="sm" variant="danger" leftIcon={<Trash2 size={15} />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}