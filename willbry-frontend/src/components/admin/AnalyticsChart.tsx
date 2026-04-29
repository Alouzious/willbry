import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataPoint {
  name: string
  value: number
}

interface AnalyticsChartProps {
  title: string
  description?: string
  data: ChartDataPoint[]
  type?: 'line' | 'bar'
}

export default function AnalyticsChart({
  title,
  description,
  data,
  type = 'line',
}: AnalyticsChartProps) {
  return (
    <div className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-black text-willbry-green-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                fontWeight: 700,
              }}
            />
            <Bar dataKey="value" fill="#2d6a4f" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                fontWeight: 700,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2d6a4f"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2d6a4f' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
