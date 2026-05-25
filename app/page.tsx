import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { ProfessionalSummary } from '@/components/ProfessionalSummary'
import { Achievements } from '@/components/Achievements'
import { TechnicalSkills } from '@/components/TechnicalSkills'
import { SkillsRadar } from '@/components/SkillsRadar'
import { Timeline } from '@/components/Timeline'
import { Experience } from '@/components/Experience'
import { CaseStudies } from '@/components/CaseStudies'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { CodeSnippets } from '@/components/CodeSnippets'
import { Blog } from '@/components/Blog'
import { Testimonials } from '@/components/Testimonials'
import { Certifications } from '@/components/Certifications'
import { CurrentlyLearning } from '@/components/CurrentlyLearning'
import { Education } from '@/components/Education'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ScrollToTop } from '@/components/ScrollToTop'
import { AvailabilityStatus } from '@/components/AvailabilityStatus'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ThemeToggle />
      <ScrollToTop />
      <AvailabilityStatus />
      
      <Hero />
      <ProfessionalSummary />
      <Achievements />
      <Timeline />
      <TechnicalSkills />
      <SkillsRadar />
      <Experience />
      <CaseStudies />
      <Projects />
      <Services />
      <CodeSnippets />
      <Blog />
      <Testimonials />
      <Certifications />
      <CurrentlyLearning />
      <Education />
      <ContactForm />
      <Footer />
    </main>
  )
}