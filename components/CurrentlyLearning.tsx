'use client'

import { AnimatedSection } from './AnimatedSection'
import { BookOpen, TrendingUp } from 'lucide-react'
import { currentlyLearning } from '@/data/portfolio-data'

export function CurrentlyLearning() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Currently Learning
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expanding my skillset to stay at the forefront of technology
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {currentlyLearning.map((item, index) => (
            <AnimatedSection key={item.technology} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {item.technology}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Goal: {item.goal}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-lg font-bold">{item.progress}%</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-700 ease-out rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-xl text-center">
            <p className="text-lg font-medium mb-2">
              Always Growing, Always Learning
            </p>
            <p className="text-muted-foreground text-sm">
              Committed to continuous improvement and staying current with industry trends
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}