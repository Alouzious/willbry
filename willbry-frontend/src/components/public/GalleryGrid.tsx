import { useMemo, useState } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'
import { Button } from '../ui/Button'

export interface GalleryItem {
  id: string
  url: string
  title?: string
  caption?: string
  category: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  categories?: string[]
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const allCategories = useMemo(() => {
    if (categories?.length) return ['All', ...categories]
    return ['All', ...Array.from(new Set(items.map((item) => item.category)))]
  }, [categories, items])

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {allCategories.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={activeCategory === category ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="group relative overflow-hidden rounded-3xl bg-willbry-green-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img
                src={item.url}
                alt={item.title || item.caption || 'WillBry gallery image'}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-willbry-green-900/80 via-transparent to-transparent opacity-90" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-willbry-teal">
                  {item.category}
                </p>
                <h3 className="mt-1 text-lg font-black">
                  {item.title || item.caption || 'WillBry Field Activity'}
                </h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-willbry-green-300" />
          <p className="mt-3 text-sm font-semibold text-gray-600">No gallery images found.</p>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-willbry-green-900/80 p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>

          <div className="max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <img
              src={selected.url}
              alt={selected.title || selected.caption || 'Selected gallery image'}
              className="max-h-[75vh] w-full object-contain bg-black"
            />

            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-willbry-teal">
                {selected.category}
              </p>
              <h3 className="mt-1 text-xl font-black text-willbry-green-900">
                {selected.title || selected.caption || 'WillBry Gallery'}
              </h3>
              {selected.caption && (
                <p className="mt-2 text-sm leading-6 text-gray-600">{selected.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}