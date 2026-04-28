import { FileText, ExternalLink, Download } from 'lucide-react'

interface ResourceCardProps {
  title: string
  description: string
  type: string
  url: string
}

export default function ResourceCard({ title, description, type, url }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-[#f0f7e8] flex items-center justify-center text-[#2d6a4f] shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-[#2d6a4f] bg-[#f0f7e8] px-2 py-0.5 rounded-full">{type}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{title}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{description}</p>
          <div className="flex gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2d6a4f] hover:underline"
            >
              <ExternalLink className="h-4 w-4" /> View
            </a>
            <a
              href={url}
              download
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#2d6a4f]"
            >
              <Download className="h-4 w-4" /> Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
