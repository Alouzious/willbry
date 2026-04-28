import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import BookingForm from '../../components/portal/BookingForm'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { Plus, Calendar } from 'lucide-react'
import { formatDate } from '../../lib/utils'

interface Booking {
  id: string
  service: string
  date: string
  time: string
  notes: string
  status: string
}

interface BookingFormData {
  service: string
  date: string
  time: string
  notes: string
}

export default function PortalBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    api.get('/bookings')
      .then(res => setBookings(res.data.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  const handleBook = async (data: BookingFormData) => {
    try {
      const res = await api.post('/bookings', data)
      setBookings(prev => [res.data.data, ...prev])
      setShowModal(false)
      toast.success('Booking created!')
    } catch {
      toast.error('Failed to create booking')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
              <p className="text-gray-500 mt-1">Schedule and manage your consultations</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus className="h-4 w-4" /> New Booking
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium">No bookings yet</p>
              <p className="text-sm mt-1">Schedule your first consultation</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{b.service}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{formatDate(b.date)} at {b.time}</p>
                    {b.notes && <p className="text-xs text-gray-400 mt-1">{b.notes}</p>}
                  </div>
                  <Badge variant={b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'error' : 'warning'}>
                    {b.status || 'pending'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Booking" size="md">
        <BookingForm onSubmit={handleBook} />
      </Modal>
    </div>
  )
}
