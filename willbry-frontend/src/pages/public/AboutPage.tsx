import { Leaf, Target, Eye, ShieldCheck, Users, Handshake } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import TeamCard from '../../components/public/TeamCard'

const values = [
  { title: 'Innovation', icon: Leaf, text: 'We design practical agriculture solutions that work in real local conditions.' },
  { title: 'Integrity', icon: ShieldCheck, text: 'We build trust through transparency, accountability, and farmer-first decisions.' },
  { title: 'Community', icon: Users, text: 'We strengthen farmers, youth, cooperatives, and institutions through collaboration.' },
  { title: 'Partnership', icon: Handshake, text: 'We work with universities, development partners, and agricultural stakeholders.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="About WillBry"
          title="Building the future of agriculture from Kabale, Uganda."
          description="WillBry Agro-Innovations Limited combines smart farming, value addition, digital advisory, and green economy thinking to transform agriculture into a scalable opportunity."
        />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Our story</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                Founded in 2024 by Dr. Byamukama Willbroad.
              </h2>
              <p className="mt-6 text-base leading-8 text-gray-600">
                WillBry Agro-Innovations Limited was founded in Kabale Municipality,
                Kijuguta, Northern Division, Uganda to solve practical agriculture challenges
                through innovation, value addition, and technology.
              </p>
              <p className="mt-5 text-base leading-8 text-gray-600">
                The company works across agricultural innovation, fortified foods,
                digital farming advisory, training, agribusiness development, and sustainability.
              </p>
            </div>

            <div className="rounded-[2rem] bg-willbry-light p-6 shadow-card">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-8 text-white">
                <Leaf className="h-10 w-10 text-willbry-teal" />
                <h3 className="mt-8 text-3xl font-black">Smart Farming, Smarter Foods</h3>
                <p className="mt-4 text-sm leading-7 text-willbry-green-100">
                  Our platform connects farmers, clients, partners, products, resources,
                  and AI-powered advisory in one modern agricultural ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <article className="rounded-3xl bg-white p-8 shadow-card">
              <Target className="h-9 w-9 text-willbry-green-600" />
              <h3 className="mt-6 text-2xl font-black text-willbry-green-900">Mission</h3>
              <p className="mt-4 leading-8 text-gray-600">
                To empower farmers and communities through agricultural innovation,
                digital tools, value addition, and sustainable business models.
              </p>
            </article>

            <article className="rounded-3xl bg-white p-8 shadow-card">
              <Eye className="h-9 w-9 text-willbry-green-600" />
              <h3 className="mt-6 text-2xl font-black text-willbry-green-900">Vision</h3>
              <p className="mt-4 leading-8 text-gray-600">
                To become a leading African agri-tech and value-addition platform
                improving food systems, farmer livelihoods, and green growth.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Core values</p>
              <h2 className="mt-4 text-4xl font-black text-willbry-green-900">
                Principles behind every solution we build.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {values.map(({ title, icon: Icon, text }) => (
                <article key={title} className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
                  <Icon className="h-7 w-7 text-willbry-green-600" />
                  <h3 className="mt-5 text-lg font-black text-willbry-green-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Leadership</p>
            <h2 className="mt-4 text-4xl font-black text-willbry-green-900">Board and leadership team.</h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <TeamCard
                name="Dr. Byamukama Willbroad"
                role="Founder & Director"
                bio="Agricultural innovation leader focused on value addition, farmer empowerment, and sustainable food systems."
              />
              <TeamCard
                name="WillBry Technical Team"
                role="Platform & Innovation"
                bio="Building digital tools, AI advisory systems, and modern agribusiness workflows."
              />
              <TeamCard
                name="Field Partnerships Team"
                role="Community Engagement"
                bio="Working with farmers, cooperatives, and local stakeholders to scale practical solutions."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}