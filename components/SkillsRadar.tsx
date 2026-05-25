'use client'

import { useState, useEffect } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { skills } from '@/data/portfolio-data'
import { Skill } from '@/types'

interface SkillBarProps {
  skill: Skill
  delay: number
}

function SkillBar({ skill, delay }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return 'from-blue-500 to-cyan-500'
      case 'backend': return 'from-green-500 to-emerald-500'
      case 'language': return 'from-purple-500 to-pink-500'
      case 'database': return 'from-orange-500 to-red-500'
      case 'tool': return 'from-indigo-500 to-purple-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  )
}

export function SkillsRadar() {
  const [selectedCategory, setSelectedCategory] = useState<Skill['category'] | 'all'>('all')

  const categories = [
    { value: 'all' as const, label: 'All Skills' },
    { value: 'language' as const, label: 'Languages' },
    { value: 'frontend' as const, label: 'Frontend' },
    { value: 'backend' as const, label: 'Backend' },
    { value: 'database' as const, label: 'Databases' },
    { value: 'tool' as const, label: 'Tools' }
  ]

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory)

  // Sort skills by level for better visualization
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Skills Proficiency
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visual representation of my technical expertise across different domains
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-card/80 border border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="space-y-6">
              {sortedSkills.map((skill, index) => (
                <SkillBar
                  key={`${skill.name}-${selectedCategory}`}
                  skill={skill}
                  delay={index * 50}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-muted-foreground">Languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className="text-muted-foreground">Frontend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <span className="text-muted-foreground">Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <span className="text-muted-foreground">Databases</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">Tools</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}