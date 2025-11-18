'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Property Manager',
    company: 'Anderson Real Estate',
    content: 'Secure Monitoring has been absolutely essential for our commercial properties. The professional operators caught a break-in attempt within minutes. Outstanding service!',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Security Director',
    company: 'Tech Innovation Corp',
    content: 'We switched from automated systems to human monitoring and it\'s been a game-changer. The attention to detail from your operators is incredible.',
    rating: 5
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Warehouse Owner',
    company: 'Chen Distribution',
    content: 'The 24/7 human monitoring gave us peace of mind we didn\'t have before. Their response time is phenomenal and the team is professional.',
    rating: 5
  },
  {
    id: 4,
    name: 'Michelle Rodriguez',
    role: 'Retail Manager',
    company: 'Metro Retail Group',
    content: 'Best security investment we\'ve made. The operators caught suspicious activity that a system would have missed. Highly recommend!',
    rating: 5
  },
  {
    id: 5,
    name: 'Robert Thompson',
    role: 'Facility Manager',
    company: 'Global Manufacturing',
    content: 'Professional, reliable, and always there when we need them. Secure Monitoring has exceeded our expectations in every way.',
    rating: 5
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoplay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoplay(false)
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Secure Monitoring for their security needs.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-lg">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-lg text-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-primary hover:bg-accent text-primary-foreground p-2 md:p-3 rounded-full transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-primary hover:bg-accent text-primary-foreground p-2 md:p-3 rounded-full transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoplay(false)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-border'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
