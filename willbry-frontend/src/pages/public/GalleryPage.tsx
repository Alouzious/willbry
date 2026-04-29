import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import GalleryGrid from '../../components/public/GalleryGrid'
import type { GalleryItem } from '../../components/public/GalleryGrid'
import api from '../../lib/api'

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/gallery')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setItems(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load gallery. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Gallery"
          title="Stories from the field, the lab, and the community."
          description="Explore WillBry activities across farming, value addition, training, products, and agricultural innovation."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
                <p className="font-black text-red-700">{error}</p>
              </div>
            ) : (
              <GalleryGrid items={items} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
