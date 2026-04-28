import { Link } from 'react-router-dom'
import { ArrowLeft, Leaf } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Button } from '../../components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-willbry-light pt-32">
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-willbry-green-500 text-white shadow-card">
            <Leaf size={36} />
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
            Page not found
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-willbry-green-900">
            This path is not planted yet.
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-gray-600">
            The page you are looking for may have moved or does not exist on the WillBry platform.
          </p>

          <Link to="/" className="mt-8">
            <Button size="lg" leftIcon={<ArrowLeft size={18} />}>
              Back to homepage
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}