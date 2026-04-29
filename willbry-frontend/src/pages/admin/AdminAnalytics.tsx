import {
  BarChart3,
  Bot,
  FileText,
  Image,
  Package,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import AdminStats from '../../components/admin/AdminStats'
import AnalyticsChart from '../../components/admin/AnalyticsChart'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: Settings },
]

const userGrowth = [
  { name: 'Jan', value: 22, farmers: 14 },
  { name: 'Feb', value: 41, farmers: 28 },
  { name: 'Mar', value: 63, farmers: 44 },
  { name: 'Apr', value: 88, farmers: 61 },
  { name: 'May', value: 121, farmers: 92 },
  { name: 'Jun', value: 164, farmers: 126 },
]

const orders = [
  { name: 'Jan', value: 8 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 24 },
  { name: 'Apr', value: 33 },
  { name: 'May', value: 47 },
  { name: 'Jun', value: 57 },
]

const aiUsage = [
  { name: 'Mon', value: 42 },
  { name: 'Tue', value: 57 },
  { name: 'Wed', value: 71 },
  { name: 'Thu', value: 66 },
  { name: 'Fri', value: 86 },
  { name: 'Sat', value: 53 },
]

export default function AdminAnalytics() {
  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Analytics
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Platform growth intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Understand adoption, product demand, farmer engagement, and AI assistant usage.
            </p>
          </div>

          <AdminStats
            stats={[
              { label: 'Total Revenue', value: 'UGX 17.4M', icon: TrendingUp, trend: '+18%' },
              { label: 'Registered Users', value: 164, icon: Users, trend: '+26%' },
              { label: 'Orders', value: 57, icon: ShoppingBag, trend: '+12%' },
              { label: 'AI Conversations', value: 375, icon: Bot, trend: '+31%' },
            ]}
          />

          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            <AnalyticsChart
              title="User growth"
              description="Total registered users over time."
              data={userGrowth}
              type="line"
              dataKey="value"
            />

            <AnalyticsChart
              title="Order growth"
              description="Product and service orders by month."
              data={orders}
              type="bar"
              dataKey="value"
            />

            <AnalyticsChart
              title="AI assistant usage"
              description="Daily AI conversations this week."
              data={aiUsage}
              type="line"
              dataKey="value"
            />

            <section className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
              <h2 className="text-lg font-black text-willbry-green-900">
                Strategic insights
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  'Farmer registrations are growing fastest in Kabale and Rukiga.',
                  'SmartCrisps and SmartFlour are the highest-interest products.',
                  'AI assistant usage peaks around pest and disease questions.',
                  'Resource downloads show strong demand for potato and post-harvest guides.',
                ].map((insight) => (
                  <div
                    key={insight}
                    className="rounded-2xl bg-willbry-light p-4 text-sm font-semibold leading-6 text-willbry-green-900"
                  >
                    {insight}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}


















// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts'

// export interface ChartDataPoint {
//   name: string
//   value: number
//   [key: string]: string | number
// }

// interface AnalyticsChartProps {
//   title: string
//   description?: string
//   data: ChartDataPoint[]
//   type?: 'line' | 'bar'
//   dataKey?: string
// }

// export default function AnalyticsChart({
//   title,
//   description,
//   data,
//   type = 'line',
//   dataKey = 'value',
// }: AnalyticsChartProps) {
//   return (
//     <section className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
//       <div className="mb-6">
//         <h3 className="text-lg font-black tracking-tight text-willbry-green-900">
//           {title}
//         </h3>
//         {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
//       </div>

//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           {type === 'bar' ? (
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0f0e4" />
//               <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7f72" />
//               <YAxis tick={{ fontSize: 12 }} stroke="#6b7f72" />
//               <Tooltip />
//               <Bar dataKey={dataKey} fill="#2d6a4f" radius={[10, 10, 0, 0]} />
//             </BarChart>
//           ) : (
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0f0e4" />
//               <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7f72" />
//               <YAxis tick={{ fontSize: 12 }} stroke="#6b7f72" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey={dataKey}
//                 stroke="#2d6a4f"
//                 strokeWidth={3}
//                 dot={{ r: 4, fill: '#52b788' }}
//                 activeDot={{ r: 6 }}
//               />
//             </LineChart>
//           )}
//         </ResponsiveContainer>
//       </div>
//     </section>
//   )
// }