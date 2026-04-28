import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: string
  url: string
}

interface ResourceForm {
  title: string
  description: string
  type: string
  url: string
}

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ResourceForm>({ title: '', description: '', type: 'PDF', url: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/admin/resources')
      .then(res => setResources(res.data.data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.post('/admin/resources', form)
      setResources(prev => [res.data.data, ...prev])
      setForm({ title: '', description: '', type: 'PDF', url: '' })
      setShowForm(false)
      toast.success('Resource added!')
    } catch {
      toast.error('Failed to add resource')
    } finally {
      setSaving(false)
    }
  }

  const deleteResource = async (id: string) => {
    if (!confirm('Delete this resource?')) return
    try {
      await api.delete(`/admin/resources/${id}`)
      setResources(prev => prev.filter(r => r.id !== id))
      toast.success('Resource deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
              <p className="text-gray-500 mt-1">Manage downloadable resources and guides</p>
            </div>
            <Button variant="primary" onClick={() => setShowForm(p => !p)}><Plus className="h-4 w-4" /> Add Resource</Button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">New Resource</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Title" name="title" value={form.title} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} fullWidth required />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Video">Video</option>
                      <option value="Guide">Guide</option>
                      <option value="Template">Template</option>
                    </select>
                  </div>
                </div>
                <Input label="URL" name="url" value={form.url} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} fullWidth required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" variant="primary" loading={saving}>Save</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : resources.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No resources yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Title</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Type</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">URL</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(r => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{r.title}</td>
                      <td className="py-3 px-4 text-gray-500">{r.type}</td>
                      <td className="py-3 px-4 text-gray-500 max-w-xs truncate"><a href={r.url} className="text-[#2d6a4f] hover:underline" target="_blank" rel="noopener noreferrer">{r.url}</a></td>
                      <td className="py-3 px-4">
                        <button onClick={() => deleteResource(r.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
