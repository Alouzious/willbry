import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import ResourceCard from '../../components/portal/ResourceCard'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'

interface Resource {
  id: string
  title: string
  description: string
  type: string
  url: string
}

export default function PortalResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/resources')
      .then(res => setResources(res.data.data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Resources Library</h1>
            <p className="text-gray-500 mt-1">Guides, manuals, and training materials for farmers</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No resources available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {resources.map(r => <ResourceCard key={r.id} {...r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
