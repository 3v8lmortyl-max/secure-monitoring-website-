'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Property Manager',
    company: 'Anderson Real Estate',
    content: 'Secure Monitoring has been absolutely essential for our commercial properties. The professional operators caught a break-in attempt within minutes. Outstanding service!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Security Director',
    company: 'Tech Innovation Corp',
    content: 'We switched from automated systems to human monitoring and it\'s been a game-changer. The attention to detail from your operators is incredible.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Warehouse Owner',
    company: 'Chen Distribution',
    content: 'The 24/7 human monitoring gave us peace of mind we didn\'t have before. Their response time is phenomenal and the team is professional.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michelle Rodriguez',
    role: 'Retail Manager',
    company: 'Metro Retail Group',
    content: 'Best security investment we\'ve made. The operators caught suspicious activity that a system would have missed. Highly recommend!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Robert Thompson',
    role: 'Facility Manager',
    company: 'Global Manufacturing',
    content: 'Professional, reliable, and always there when we need them. Secure Monitoring has exceeded our expectations in every way.',
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [])

  useEffect(() => {
    if (!auto) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [auto, next])

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Client Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold reveal delay-1">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto reveal delay-2">
            Hundreds of satisfied clients trust Secure Monitoring for their security needs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main card */}
          <div className="glass p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-6 right-8 opacity-10">
              <Quote size={80} />
            </div>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
              "{testimonials[current].content}"
            </p>

            <div className="flex items-center gap-4 border-t border-border pt-6">
              <div className="w-10 h-10 border border-cyan/40 flex items-center justify-center text-cyan text-sm font-bold">
                {testimonials[current].name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{testimonials[current].name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[current].role} · {testimonials[current].company}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => { prev(); setAuto(false) }}
              className="p-3 border border-border hover:border-cyan/50 hover:text-cyan transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAuto(false) }}
                  className={`h-px transition-all duration-300 ${
                    i === current ? 'w-8 bg-cyan' : 'w-4 bg-border'
                  }`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => { next(); setAuto(false) }}
              className="p-3 border border-border hover:border-cyan/50 hover:text-cyan transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
