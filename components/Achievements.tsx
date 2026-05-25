'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { Achievement } from '@/types'
import { achievements } from '@/data/portfolio-data'

interface CounterProps {
  end: number
  duration: number
  prefix?: string
  suffix?: string
}

function AnimatedCounter({ end, duration, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      countRef.current = currentCount
      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, isVisible])

  return (
    <div ref={elementRef} className="text-4xl sm:text-5xl font-bold gradient-text">
      {prefix}{count}{suffix}
    </div>
  )
}

export function Achievements() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Impact & Achievements
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Measurable results from 5+ years of building production applications
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {achievements.map((achievement, index) => (
            <AnimatedSection key={achievement.id} delay={index * 100}>
              <div className="text-center">
                <AnimatedCounter
                  end={achievement.value}
                  duration={2000}
                  prefix={achievement.prefix}
                  suffix={achievement.suffix}
                />
                <p className="text-sm font-medium mt-2">{achievement.metric}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}