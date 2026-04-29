import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

interface AnalyticsChartProps {
  title: string
  description?: string
  data: ChartDataPoint[]
  type?: 'line' | 'bar'
  dataKey?: string
}

export default function AnalyticsChart({
  title,
  description,
  data,
  type = 'line',
  dataKey = 'value',
}: AnalyticsChartProps) {
  return (
    <section className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-willbry-green-900">
          {title}
        </h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f0e4" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7f72" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7f72" />
              <Tooltip />
              <Bar dataKey={dataKey} fill="#2d6a4f" radius={[10, 10, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f0e4" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7f72" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7f72" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#2d6a4f"
                strokeWidth={3}
                dot={{ r: 4, fill: '#52b788' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  )
}