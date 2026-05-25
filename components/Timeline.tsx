'use client'

import { AnimatedSection } from './AnimatedSection'
import { Calendar, Briefcase, GraduationCap, Trophy, Code2 } from 'lucide-react'
import { timeline } from '@/data/portfolio-data'
import { TimelineEvent } from '@/types'

const iconMap = {
  education: GraduationCap,
  career: Briefcase,
  skill: Code2,
  achievement: Trophy
}

export function Timeline() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From computer science student to full-stack engineer
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500"></div>

          {timeline.map((event, index) => {
            const Icon = iconMap[event.type]
            const isEven = index % 2 === 0

            return (
              <AnimatedSection key={index} delay={index * 100}>
                <div className={`relative flex items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } mb-12`}>
                  {/* Content */}
                  <div className={`flex-1 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  } pl-20 md:pl-0`}>
                    <div className={`bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <div className={`flex items-center gap-3 mb-2 ${
                        isEven ? 'md:justify-end' : ''
                      }`}>
                        <span className="text-2xl font-bold gradient-text">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      {event.technologies && (
                        <div className={`flex flex-wrap gap-2 ${
                          isEven ? 'md:justify-end' : ''
                        }`}>
                          {event.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-background rounded-full border-4 border-primary flex items-center justify-center z-10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}