import { AnimatedSection } from './AnimatedSection'
import { Calendar, MapPin, Building } from 'lucide-react'

const experiences = [
  {
    title: 'Full-Stack Engineer (Contract)',
    company: 'RevStar Consulting',
    location: 'Tampa, FL, USA',
    date: 'Oct 2025 – Present',
    bullets: [
      'Contribute to end-to-end product delivery across multiple client engagements, building features across frontend and backend layers.',
      'Collaborate with cross-functional consulting teams to deliver maintainable solutions under tight timelines.',
      'Support integration, testing, and release activities to ensure stable production deployments.',
    ],
  },
  {
    title: 'Frontend Engineer',
    company: 'RevHero',
    location: 'Tampa, FL, USA',
    date: 'Jun 2025 – Present',
    bullets: [
      'Led a ground-up UI redesign, implementing a modern responsive design system that significantly improved usability and accessibility.',
      'Rebuilt the frontend architecture using React.js, Next.js, and TypeScript, improving maintainability and reducing load times by over 25%.',
      'Partnered with product managers and UX designers to align visual design with user feedback and business objectives.',
      'Drove design consistency and brand cohesion across multiple product modules.',
    ],
  },
  {
    title: 'Lead Frontend Engineer (Next.js)',
    company: 'Scholé (Scholélabs)',
    location: 'Lagos, Nigeria',
    date: 'Jun 2024 – Present',
    bullets: [
      'Serve as Frontend Lead, setting development strategy, mentoring 3 junior developers, and enforcing code quality, performance, and best practices across the team.',
      'Spearheaded development of the core school management dashboard for administrators, teachers, and students, improving data retrieval time by 20%.',
      'Translated wireframes into responsive, high-performance web applications using React.js and Next.js in close collaboration with UX/UI designers.',
      'Implemented state management with Redux Toolkit and React Query, optimizing data flow and reducing application re-renders by over 30%.',
    ],
  },
  {
    title: 'Frontend Engineer (Contract)',
    company: 'Finaive',
    location: 'Lagos, Nigeria & MD, USA (HQ)',
    date: 'Jan 2024 – Present',
    bullets: [
      'Lead end-to-end frontend development for an AI-powered escrow platform focused on security, transparency, and transaction efficiency.',
      'Contribute to the React Native mobile application, building complex UI components and resolving critical bugs.',
      'Collaborate directly with stakeholders and backend engineers to translate business requirements into a high-performance, responsive platform.',
    ],
  },
  {
    title: 'Frontend Engineer (Contract)',
    company: 'FridayApis',
    location: 'Remote',
    date: 'Sep 2023 – Dec 2023',
    bullets: [
      'Developed and maintained user-facing web applications for a platform delivering reliable, cost-effective APIs to developers.',
      'Built dynamic, server-rendered (SSR) applications with Next.js, improving initial load performance and SEO ranking.',
      'Integrated third-party APIs (cryptocurrency, translation, global currency exchange) with backend engineers to ensure robust data handling.',
    ],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    date: 'Aug 2021 – Present',
    bullets: [
      'Designed and built custom websites and web applications for a diverse portfolio of small businesses and personal brands.',
      'Built dynamic Single-Page Applications (SPAs) in React.js with a strong focus on user experience and performance.',
      'Owned the full project lifecycle: requirements gathering, client communication, timeline management, and deployment.',
    ],
  },
  {
    title: 'Graphic Designer',
    company: 'Allure Effects LLC',
    location: 'Remote',
    date: 'Feb 2020 – Nov 2021',
    bullets: [
      'Designed engaging brochures, banners, and signage for digital and print media.',
      'Created complete corporate branding packages based on client briefs.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Professional Experience
          </h2>
        </AnimatedSection>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={`${exp.company}-${index}`} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground mt-2 sm:mt-0">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.date}</span>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex">
                      <span className="text-primary mr-2 mt-1.5">•</span>
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}