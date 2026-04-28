import { useState } from 'react'
import Modal from '../ui/Modal'

interface GalleryImage {
  id: string
  url: string
  caption?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div
            key={img.id}
            className="relative cursor-pointer overflow-hidden rounded-xl group"
            onClick={() => setSelected(img)}
          >
            <img
              src={img.url}
              alt={img.caption || ''}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} size="lg">
        {selected && (
          <div className="text-center">
            <img src={selected.url} alt={selected.caption || ''} className="max-h-[70vh] mx-auto rounded-lg object-contain" />
            {selected.caption && <p className="mt-3 text-gray-600 text-sm">{selected.caption}</p>}
          </div>
        )}
      </Modal>
    </>
  )
}
