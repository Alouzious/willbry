import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface BookingFormData {
  service: string
  date: string
  time: string
  notes: string
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void
}

const serviceOptions = [
  'Soil Testing',
  'Crop Planning',
  'Pest Control',
  'Market Analysis',
  'Training Session',
]

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormData>({ service: '', date: '', time: '', notes: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service <span className="text-red-500">*</span></label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        >
          <option value="">Select a service</option>
          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          required
          fullWidth
        />
        <Input
          label="Time"
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          required
          fullWidth
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional information..."
          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full">Book Appointment</Button>
    </form>
  )
}
