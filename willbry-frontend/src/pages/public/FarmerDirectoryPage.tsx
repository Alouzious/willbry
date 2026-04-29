import { useEffect, useMemo, useState } from 'react'
import { Loader2, MapPin, Search, Sprout, Users } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import api from '../../lib/api'

interface Farmer {
  id: string
  name: string
  district: string
  location: string
  crops: string
  phone?: string
}

export default function FarmerDirectoryPage() {
  const [query, setQuery] = useState('')
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/farmers', { params: { per_page: 100 } })
      .then((res) => {
        const data = res.data?.data ?? res.data
        setFarmers(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load farmer directory. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const search = query.toLowerCase()

    return farmers.filter((farmer) => {
      return (
        farmer.name.toLowerCase().includes(search) ||
        farmer.district.toLowerCase().includes(search) ||
        farmer.location.toLowerCase().includes(search) ||
        farmer.crops.toLowerCase().includes(search)
      )
    })
  }, [query, farmers])

  const getCrops = (crops: string): string[] =>
    crops.split(',').map((c) => c.trim()).filter(Boolean)

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Farmer directory"
          title="Connecting farmers, cooperatives, and agricultural partners."
          description="A growing directory of WillBry partner farmers and cooperatives across southwestern Uganda."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_.45fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                  Partner farmers
                </p>
                <h2 className="mt-4 text-4xl font-black text-willbry-green-900">
                  A field network built for collaboration.
                </h2>
              </div>

              <Input
                placeholder="Search by crop, district, or group..."
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
                <div className="grid gap-6 lg:grid-cols-3">
                  {filtered.map((farmer) => (
                    <article
                      key={farmer.id}
                      className="rounded-[2rem] border border-willbry-green-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-willbry-green-50 text-willbry-green-600">
                        <Users size={28} />
                      </div>

                      <h3 className="mt-6 text-xl font-black text-willbry-green-900">
                        {farmer.name}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
                        <MapPin size={16} className="text-willbry-teal" />
                        {farmer.location}, {farmer.district}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {getCrops(farmer.crops).map((crop) => (
                          <Badge key={crop} variant="green" size="sm">
                            <Sprout size={12} />
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                {!filtered.length && (
                  <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-willbry-light p-12 text-center">
                    <p className="font-black text-willbry-green-900">No farmers found.</p>
                    <p className="mt-2 text-sm text-gray-500">Try searching another crop or district.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
