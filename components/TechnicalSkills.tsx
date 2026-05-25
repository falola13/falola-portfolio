import { AnimatedSection } from './AnimatedSection'
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react'

const skillCategories = [
  {
    icon: Code2,
    title: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Go', 'Python', 'HTML5', 'CSS3'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layout,
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'React Native', 'Redux', 'Redux Toolkit', 'React Query'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'Go', 'Express.js', 'REST APIs'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Wrench,
    title: 'Tools & Methodologies',
    skills: ['Git', 'Agile/Scrum', 'SOLID Principles', 'Responsive Design'],
    color: 'from-indigo-500 to-purple-500',
  },
]

export function TechnicalSkills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Technical Skills
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={category.title} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6 h-full card-hover">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10 mb-4`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}