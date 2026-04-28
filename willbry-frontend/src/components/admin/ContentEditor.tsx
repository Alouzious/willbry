import { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import Button from '../ui/Button'
import { Eye, Edit } from 'lucide-react'

interface ContentEditorProps {
  initialContent?: string
  onSave: (content: string) => void
}

export default function ContentEditor({ initialContent = '', onSave }: ContentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [preview, setPreview] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Content</span>
        <button
          type="button"
          onClick={() => setPreview(p => !p)}
          className="inline-flex items-center gap-1.5 text-sm text-[#2d6a4f] hover:underline"
        >
          {preview ? <><Edit className="h-4 w-4" /> Edit</> : <><Eye className="h-4 w-4" /> Preview</>}
        </button>
      </div>

      {preview ? (
        <div
          className="border border-gray-200 rounded-lg p-4 min-h-[200px] prose prose-sm max-w-none bg-gray-50"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <RichTextEditor content={content} onChange={setContent} />
      )}

      <Button type="button" variant="primary" onClick={() => onSave(content)}>
        Save Content
      </Button>
    </div>
  )
}
