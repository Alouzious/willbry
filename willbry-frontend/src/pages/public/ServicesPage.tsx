import { ArrowRight, Brain, BriefcaseBusiness, Factory, Globe2, GraduationCap, Sprout } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Button } from '../../components/ui/Button'

const services = [
  {
    title: 'Agricultural Innovation',
    icon: Sprout,
    description: 'Field-tested solutions that improve productivity, resilience, and farmer decision-making.',
    features: ['Climate-smart methods', 'Crop productivity support', 'Field demonstrations', 'Innovation pilots'],
  },
  {
    title: 'Value Addition',
    icon: Factory,
    description: 'Turning local agricultural produce into branded, market-ready food products.',
    features: ['SmartCrisps', 'SmartFlour', 'Food processing support', 'Packaging and market readiness'],
  },
  {
    title: 'Digital Farming',
    icon: Brain,
    description: 'Digital advisory, AI assistance, farmer data systems, and smart decision tools.',
    features: ['AI farming assistant', 'Market price information', 'Farm profiles', 'Digital records'],
  },
  {
    title: 'Training',
    icon: GraduationCap,
    description: 'Practical farmer and youth training for modern agriculture and agribusiness.',
    features: ['Farmer workshops', 'Youth skilling', 'Post-harvest handling', 'Business skills'],
  },
  {
    title: 'Agribusiness',
    icon: BriefcaseBusiness,
    description: 'Helping agricultural enterprises become organized, market-aware, and investment-ready.',
    features: ['Business development', 'Market linkage', 'Product strategy', 'Growth planning'],
  },
  {
    title: 'Green Economy',
    icon: Globe2,
    description: 'Sustainable agriculture and environmental governance for long-term impact.',
    features: ['Circular economy', 'Climate resilience', 'Sustainability planning', 'Green consultancy'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Our services"
          title="Agricultural solutions designed for real impact."
          description="WillBry combines farming knowledge, value addition, digital systems, and sustainability to serve farmers, clients, institutions, and partners."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {services.map(({ title, icon: Icon, description, features }) => (
                <article key={title} className="rounded-[2rem] border border-willbry-green-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-willbry-green-50 text-willbry-green-600">
                      <Icon size={30} />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-black text-willbry-green-900">{title}</h2>
                      <p className="mt-3 leading-7 text-gray-600">{description}</p>

                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm font-semibold text-willbry-green-800">
                            <span className="h-2 w-2 rounded-full bg-willbry-teal" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7">
                        <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
                          Request Service
                        </Button>
                      </div>
                    </div>
                  </div>
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