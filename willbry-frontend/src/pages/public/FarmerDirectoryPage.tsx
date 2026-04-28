import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'
import { Search, MapPin, Leaf } from 'lucide-react'

interface FarmerProfile {
  id: string
  full_name: string
  location: string
  farm_name?: string
  crops?: string
  farming_type?: string
  verified: boolean
}

export default function FarmerDirectoryPage() {
  const [farmers, setFarmers] = useState<FarmerProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/farmers')
      .then(res => setFarmers(res.data.data || []))
      .catch(() => setFarmers([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = farmers.filter(f =>
    f.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (f.location || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Farmer Directory"
        subtitle="Connect with verified farmers across Kenya"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Farmer Directory' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farmers or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl font-medium mb-2">No farmers found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(farmer => (
                <div key={farmer.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {farmer.full_name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{farmer.full_name}</h3>
                        {farmer.verified && (
                          <span className="text-xs bg-[#f0f7e8] text-[#2d6a4f] px-2 py-0.5 rounded-full font-medium">Verified</span>
                        )}
                      </div>
                      {farmer.farm_name && <p className="text-sm text-[#2d6a4f] font-medium">{farmer.farm_name}</p>}
                      {farmer.location && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />{farmer.location}
                        </p>
                      )}
                      {farmer.crops && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Leaf className="h-3 w-3" />{farmer.crops}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
