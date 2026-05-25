'use client'

import { useState } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/data/portfolio-data'

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What People Say
            </h2>
            <p className="text-muted-foreground">
              Feedback from colleagues and clients I've worked with
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="relative">
            <div className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-lg">
              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              
              <blockquote className="text-lg sm:text-xl leading-relaxed mb-8">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}