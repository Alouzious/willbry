import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [idx, setIdx] = useState(0)

  if (!testimonials.length) return null

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1))
  const t = testimonials[idx]

  return (
    <div className="relative max-w-2xl mx-auto text-center px-8">
      <div className="flex justify-center gap-1 mb-4">
        {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{t.content}"</p>
      <div className="flex items-center justify-center gap-3">
        {t.avatar ? (
          <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <div className="h-12 w-12 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white font-bold text-lg">
            {t.name[0]}
          </div>
        )}
        <div className="text-left">
          <p className="font-semibold text-gray-900">{t.name}</p>
          <p className="text-sm text-gray-500">{t.role}</p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={prev} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex gap-2 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-[#2d6a4f]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
