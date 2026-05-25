import { AnimatedSection } from './AnimatedSection'
import { GraduationCap, Calendar } from 'lucide-react'

const education = [
  {
    degree: 'B.Sc. Statistics',
    institution: 'Federal University of Agriculture, Ogun State, Nigeria',
    year: '2023',
  },
  {
    degree: 'NCE, Computer Science / Mathematics',
    institution: 'Federal College of Education, Ogun State, Nigeria',
    year: '2017',
  },
]

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Education
          </h2>
        </AnimatedSection>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <AnimatedSection key={edu.degree} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-muted-foreground mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}