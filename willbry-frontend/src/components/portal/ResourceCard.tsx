import { Download, FileText } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

export interface ResourceItem {
  id: string
  title: string
  description?: string
  category: string
  file_url?: string
  download_count?: number
  created_at?: string
}

interface ResourceCardProps {
  resource: ResourceItem
  onDownload?: (resource: ResourceItem) => void
}

export default function ResourceCard({ resource, onDownload }: ResourceCardProps) {
  return (
    <article className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
          <FileText size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="teal" size="sm">
              {resource.category}
            </Badge>

            {typeof resource.download_count === 'number' && (
              <span className="text-xs font-semibold text-gray-400">
                {resource.download_count} downloads
              </span>
            )}
          </div>

          <h3 className="text-lg font-black tracking-tight text-willbry-green-900">
            {resource.title}
          </h3>

          {resource.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
              {resource.description}
            </p>
          )}

          <div className="mt-5">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download size={15} />}
              onClick={() => {
                if (onDownload) onDownload(resource)
                else if (resource.file_url) window.open(resource.file_url, '_blank')
              }}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}