import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import GalleryGrid from '../../components/public/GalleryGrid'
import type { GalleryItem } from '../../components/public/GalleryGrid'

const items: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    title: 'Field activities',
    caption: 'Agricultural activities and farmer engagement across local communities.',
    category: 'Farm Activities',
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    title: 'Green production',
    caption: 'Sustainable farming and climate-smart practices.',
    category: 'Farm Activities',
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    title: 'Value addition',
    caption: 'Processing and packaging local agricultural produce for better markets.',
    category: 'Products',
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    title: 'Community training',
    caption: 'Building practical skills with farmers, youth, and partners.',
    category: 'Community',
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    title: 'Innovation fieldwork',
    caption: 'Testing ideas that support better agriculture and sustainability.',
    category: 'Events',
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
    title: 'Agriculture systems',
    caption: 'Linking production, markets, data, and advisory.',
    category: 'Team',
  },
]

export default function GalleryPage() {
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
            <GalleryGrid
              items={items}
              categories={['Farm Activities', 'Community', 'Products', 'Team', 'Events']}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}