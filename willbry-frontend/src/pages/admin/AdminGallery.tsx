import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import ImageUploader from '../../components/admin/ImageUploader'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  caption?: string
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingUrl, setPendingUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    api.get('/admin/gallery')
      .then(res => setImages(res.data.data || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  const handleUpload = async () => {
    if (!pendingUrl) return
    setUploading(true)
    try {
      const res = await api.post('/admin/gallery', { url: pendingUrl, caption })
      setImages(prev => [res.data.data, ...prev])
      setPendingUrl('')
      setCaption('')
      toast.success('Image added!')
    } catch {
      toast.error('Failed to save image')
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try {
      await api.delete(`/admin/gallery/${id}`)
      setImages(prev => prev.filter(i => i.id !== id))
      toast.success('Image deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-500 mt-1">Manage public gallery images</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Upload New Image</h2>
            <ImageUploader currentImage={pendingUrl} onUpload={url => setPendingUrl(url)} />
            {pendingUrl && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Caption (optional)"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                />
                <Button variant="primary" loading={uploading} onClick={handleUpload}>Add to Gallery</Button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden">
                  <img src={img.url} alt={img.caption || ''} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    {img.caption && <p className="text-white text-xs flex-1">{img.caption}</p>}
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="text-red-400 hover:text-red-300 ml-auto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
