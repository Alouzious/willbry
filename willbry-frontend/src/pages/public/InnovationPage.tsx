import { Brain, Leaf, LineChart, Recycle, ShieldCheck, Sprout } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'

const innovations = [
  {
    title: 'AI & Data Analytics',
    icon: Brain,
    text: 'Using AI-powered advisory and farmer data systems to support practical, timely decision-making.',
  },
  {
    title: 'Green Processing',
    icon: Recycle,
    text: 'Improving value addition through smarter processing, lower waste, and better product development.',
  },
  {
    title: 'Climate-Smart Advisory',
    icon: Sprout,
    text: 'Helping farmers adapt with practical guidance for crop management, pests, soils, and weather risk.',
  },
]

const sdgs = [
  { label: 'SDG 2', text: 'Zero Hunger', icon: Leaf },
  { label: 'SDG 12', text: 'Responsible Consumption', icon: Recycle },
  { label: 'SDG 13', text: 'Climate Action', icon: ShieldCheck },
]

export default function InnovationPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Innovation"
          title="Where agriculture meets data, sustainability, and local value creation."
          description="WillBry Platform 2.0 is designed to connect farmers, products, advisory, resources, and decision support into one modern agricultural system."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {innovations.map(({ title, icon: Icon, text }) => (
                <article
                  key={title}
                  className="rounded-[2rem] border border-willbry-green-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-willbry-green-50 text-willbry-green-600">
                    <Icon size={30} />
                  </div>
                  <h2 className="mt-7 text-2xl font-black text-willbry-green-900">{title}</h2>
                  <p className="mt-4 leading-8 text-gray-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                AI in farming
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                Turning local agricultural questions into practical guidance.
              </h2>
              <p className="mt-5 leading-8 text-gray-600">
                The WillBry assistant is designed to help farmers understand crop diseases,
                pest control, value addition, post-harvest handling, and market decisions.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-card">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-8 text-white">
                <LineChart className="h-10 w-10 text-willbry-teal" />
                <h3 className="mt-8 text-3xl font-black">Data-informed agriculture</h3>
                <p className="mt-4 leading-7 text-willbry-green-100">
                  Farm profiles, market prices, resources, AI chat, and admin dashboards
                  help create a stronger agricultural intelligence layer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              SDG alignment
            </p>
            <h2 className="mt-4 text-4xl font-black text-willbry-green-900">
              Designed for sustainable development impact.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {sdgs.map(({ label, text, icon: Icon }) => (
                <article key={label} className="rounded-3xl bg-willbry-light p-8 shadow-card">
                  <Icon className="h-8 w-8 text-willbry-green-600" />
                  <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-willbry-teal">
                    {label}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-willbry-green-900">{text}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}