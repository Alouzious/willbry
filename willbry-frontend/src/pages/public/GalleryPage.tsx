import { useQuery } from '@tanstack/react-query'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import GalleryGrid from '../../components/public/GalleryGrid'
import type { GalleryItem } from '../../components/public/GalleryGrid'
import { listImages } from '../../services/public.service'

export default function GalleryPage() {
  const { data: raw = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: listImages,
    staleTime: 1000 * 60 * 10,
  })

  const items: GalleryItem[] = (Array.isArray(raw) ? raw : []).map((img: any) => ({
    id: img.id,
    url: img.url,
    title: img.caption ?? img.category,
    caption: img.caption,
    category: img.category,
  }))

  const galleryCategories = [...new Set(items.map((i) => i.category))]

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
            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-willbry-light p-12 text-center">
                <p className="font-black text-willbry-green-900">No images yet.</p>
              </div>
            ) : (
              <GalleryGrid items={items} categories={galleryCategories} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}