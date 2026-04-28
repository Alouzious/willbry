import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface FarmProfileData {
  farm_name: string
  location: string
  farm_size: string
  crops: string
  farming_type: string
  bio: string
}

interface FarmProfileFormProps {
  initialData?: FarmProfileData
  onSubmit: (data: FarmProfileData) => void
}

export default function FarmProfileForm({ initialData, onSubmit }: FarmProfileFormProps) {
  const [form, setForm] = useState<FarmProfileData>(
    initialData || { farm_name: '', location: '', farm_size: '', crops: '', farming_type: '', bio: '' }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Farm Name"
          name="farm_name"
          value={form.farm_name}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="e.g. Green Valley Farm"
          fullWidth
        />
        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="County, Sub-county"
          fullWidth
        />
        <Input
          label="Farm Size (acres)"
          name="farm_size"
          value={form.farm_size}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="e.g. 5"
          fullWidth
        />
        <Input
          label="Main Crops"
          name="crops"
          value={form.crops}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="e.g. Maize, Beans, Tomatoes"
          fullWidth
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Farming Type</label>
        <select
          name="farming_type"
          value={form.farming_type}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        >
          <option value="">Select farming type</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
          <option value="mixed">Mixed</option>
          <option value="greenhouse">Greenhouse</option>
          <option value="irrigation">Irrigation</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio / About Your Farm</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your farm and your story..."
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
        />
      </div>
      <Button type="submit" variant="primary">Save Farm Profile</Button>
    </form>
  )
}
