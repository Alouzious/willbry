import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface AdminStat {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendDirection?: 'up' | 'down'
  description?: string
}

interface AdminStatsProps {
  stats: AdminStat[]
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, trend, trendDirection = 'up', description }) => {
        const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown

        return (
          <article
            key={label}
            className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
                <Icon size={22} />
              </div>

              {trend && (
                <span
                  className={[
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black',
                    trendDirection === 'up'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700',
                  ].join(' ')}
                >
                  <TrendIcon size={13} />
                  {trend}
                </span>
              )}
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold text-gray-500">{label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-willbry-green-900">
                {value}
              </p>
              {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
            </div>
          </article>
        )
      })}
    </div>
  )
}