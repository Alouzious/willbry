import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import FarmProfileForm from '../../components/portal/FarmProfileForm'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'
import toast from 'react-hot-toast'

interface FarmProfileData {
  farm_name: string
  location: string
  farm_size: string
  crops: string
  farming_type: string
  bio: string
}

export default function PortalFarmProfile() {
  const [profile, setProfile] = useState<FarmProfileData | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/portal/farm-profile')
      .then(res => setProfile(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (data: FarmProfileData) => {
    try {
      await api.put('/portal/farm-profile', data)
      setProfile(data)
      toast.success('Farm profile saved!')
    } catch {
      toast.error('Failed to save profile')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Farm Profile</h1>
            <p className="text-gray-500 mt-1">Share information about your farm</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
              <FarmProfileForm initialData={profile} onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
