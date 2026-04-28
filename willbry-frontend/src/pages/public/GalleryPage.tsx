import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import GalleryGrid from '../../components/public/GalleryGrid'

const sampleImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400', caption: 'Maize fields in Nakuru' },
  { id: '2', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', caption: 'Greenhouse vegetable production' },
  { id: '3', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400', caption: 'Farmer training workshop' },
  { id: '4', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400', caption: 'Fresh produce market' },
  { id: '5', url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400', caption: 'Irrigation system installation' },
  { id: '6', url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400', caption: 'Tomato harvest season' },
  { id: '7', url: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400', caption: 'Digital farming tools' },
  { id: '8', url: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400', caption: 'Community farmer gathering' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Gallery"
        subtitle="Moments from farms, training sessions, and community events"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={sampleImages} />
        </div>
      </section>
      <Footer />
    </div>
  )
}
