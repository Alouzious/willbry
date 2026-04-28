import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-8xl font-extrabold text-[#f0f7e8] select-none mb-4" style={{ fontSize: '180px', lineHeight: 1 }}>
            404
          </div>
          <div className="-mt-8 relative z-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#2d6a4f] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1f4f2b] transition-colors"
              >
                <Home className="h-4 w-4" /> Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
