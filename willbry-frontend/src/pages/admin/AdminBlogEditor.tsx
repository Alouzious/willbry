import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import ContentEditor from '../../components/admin/ContentEditor'
import ImageUploader from '../../components/admin/ImageUploader'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import type { BlogCategory } from '../../types'

interface BlogFormData {
  title: string
  category: BlogCategory
  excerpt: string
  content: string
  cover_image: string
  published: boolean
}

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = !!id && id !== 'new'
  const [form, setForm] = useState<BlogFormData>({
    title: '', category: 'farming_tips', excerpt: '', content: '', cover_image: '', published: false,
  })
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    api.get(`/admin/blog/${id}`)
      .then(res => {
        const p = res.data.data
        setForm({
          title: p.title, category: p.category, excerpt: p.excerpt || '',
          content: p.content, cover_image: p.cover_image || '', published: p.published,
        })
      })
      .catch(() => toast.error('Failed to load post'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEdit) {
        await api.put(`/admin/blog/${id}`, form)
        toast.success('Post updated!')
      } else {
        await api.post('/admin/blog', form)
        toast.success('Post created!')
      }
      navigate('/admin/blog')
    } catch {
      toast.error('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar role="admin" />
        <div className="flex-1 flex justify-center items-center"><Spinner size="lg" /></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Post' : 'New Post'}</h1>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <Input label="Title" name="title" value={form.title} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} fullWidth required />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  >
                    <option value="farming_tips">Farming Tips</option>
                    <option value="company_news">Company News</option>
                    <option value="agri_tech">Agri Tech</option>
                    <option value="market_trends">Market Trends</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      checked={form.published}
                      onChange={handleChange}
                      className="w-4 h-4 accent-[#2d6a4f]"
                    />
                    <span className="text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Cover Image</label>
              <ImageUploader
                currentImage={form.cover_image}
                onUpload={url => setForm(prev => ({ ...prev, cover_image: url }))}
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <ContentEditor
                initialContent={form.content}
                onSave={html => setForm(prev => ({ ...prev, content: html }))}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" loading={saving}>
                {isEdit ? 'Update Post' : 'Create Post'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/blog')}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
