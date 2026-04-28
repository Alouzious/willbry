import React from 'react'

interface AdminStatCard {
  label: string
  value: string | number
  icon: React.ReactNode
  color?: string
}

interface AdminStatsProps {
  stats: AdminStatCard[]
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: s.color ? `${s.color}20` : '#f0f7e8', color: s.color || '#2d6a4f' }}
            >
              {s.icon}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
          <div className="text-sm text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
