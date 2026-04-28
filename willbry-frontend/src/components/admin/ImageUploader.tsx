import React, { useRef, useState } from 'react'
import { Upload, Image, X } from 'lucide-react'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  currentImage?: string
}

export default function ImageUploader({ onUpload, currentImage }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    onUpload(url)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-cover border border-gray-200" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUpload('') }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragging ? 'border-[#2d6a4f] bg-[#f0f7e8]' : 'border-gray-300 hover:border-[#2d6a4f] hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Image className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Drop image here or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
            <div className="flex items-center gap-1 text-[#2d6a4f] text-sm font-medium mt-1">
              <Upload className="h-4 w-4" /> Browse files
            </div>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
