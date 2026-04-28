import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCard {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

interface DashboardStatsProps {
  stats: StatCard[]
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-[#f0f7e8] flex items-center justify-center text-[#2d6a4f]">
              {s.icon}
            </div>
            {s.trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${s.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                {s.trendUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {s.trend}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
          <div className="text-sm text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
