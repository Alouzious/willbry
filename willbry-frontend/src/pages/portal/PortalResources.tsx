import { Bot, Download, FileText, Package, Search, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import ResourceCard from '../../components/portal/ResourceCard'
import type { ResourceItem } from '../../components/portal/ResourceCard'
import { Input } from '../../components/ui/Input'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

const resources: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Irish Potato Production Guide',
    description: 'A practical guide for better potato production in highland conditions.',
    category: 'Crop Guides',
    download_count: 124,
  },
  {
    id: 'r2',
    title: 'Post-Harvest Handling Manual',
    description: 'Guidance for reducing losses after harvest and improving market quality.',
    category: 'Training',
    download_count: 89,
  },
  {
    id: 'r3',
    title: 'Value Addition Starter Checklist',
    description: 'A simple checklist for turning raw produce into market-ready products.',
    category: 'Business',
    download_count: 57,
  },
]

export default function PortalResources() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(search) ||
        resource.description?.toLowerCase().includes(search) ||
        resource.category.toLowerCase().includes(search)
    )
  }, [query])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_.45fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Resources
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Farming guides and training materials
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Access practical knowledge on crop production, post-harvest handling,
                value addition, and agribusiness growth.
              </p>
            </div>

            <Input
              placeholder="Search resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={<Search size={17} />}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {!filtered.length && (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="font-black text-willbry-green-900">No resources found.</p>
              <p className="mt-2 text-sm text-gray-500">Try another search term.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}