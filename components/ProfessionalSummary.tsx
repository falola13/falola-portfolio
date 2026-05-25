import { AnimatedSection } from './AnimatedSection'

export function ProfessionalSummary() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Professional Summary
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Full-Stack Engineer with 5 years of experience building and shipping user-focused web and mobile 
              products across fintech, edtech, and consumer SaaS. Strong in frontend architecture with React, 
              Next.js, and React Native, with backend delivery in Node.js, NestJS, and Go. Known for leading 
              small teams, mentoring junior engineers, and delivering performant, maintainable applications 
              aligned with business goals.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}