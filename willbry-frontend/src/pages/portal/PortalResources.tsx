import { useEffect, useMemo, useState } from 'react'
import { Bot, Download, FileText, Loader2, Package, Search, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import ResourceCard from '../../components/portal/ResourceCard'
import type { ResourceItem } from '../../components/portal/ResourceCard'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalResources() {
  const [query, setQuery] = useState('')
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/portal/resources')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setResources(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load resources. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(search) ||
        resource.description?.toLowerCase().includes(search) ||
        resource.category.toLowerCase().includes(search)
    )
  }, [query, resources])

  const handleDownload = async (resource: ResourceItem) => {
    try {
      const res = await api.get(`/portal/resources/${resource.id}/download`)
      const data = res.data?.download_url ? res.data : res.data?.data
      const url = data?.download_url ?? resource.file_url
      if (url) {
        window.open(url, '_blank')
      } else {
        toast.error('Download link not available')
      }
    } catch {
      toast.error('Failed to get download link')
    }
  }

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 lg:grid-cols-3">
                {filtered.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onDownload={handleDownload}
                  />
                ))}
              </div>

              {!filtered.length && (
                <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
                  <p className="font-black text-willbry-green-900">No resources found.</p>
                  <p className="mt-2 text-sm text-gray-500">Try another search term.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
