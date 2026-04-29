import { useEffect, useMemo, useState } from 'react'
import { Bot, Download, FileText, Package, Search, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import ResourceCard from '../../components/portal/ResourceCard'
import { Input } from '../../components/ui/Input'
import { listResources, getDownloadUrl } from '../../services/portal.service'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalResources() {
  const [resources, setResources] = useState<any[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listResources()
        setResources(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load resources')
      }
    }
    void load()
  }, [])

  const handleDownload = async (id: string) => {
    try {
      const url = await getDownloadUrl(id)
      window.open(url, '_blank')
    } catch {
      toast.error('Could not get download link')
    }
  }

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(search) ||
        r.description?.toLowerCase().includes(search) ||
        r.category.toLowerCase().includes(search)
    )
  }, [query, resources])

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
              <div key={resource.id} onClick={() => handleDownload(resource.id)} className="cursor-pointer">
                <ResourceCard resource={resource} />
              </div>
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