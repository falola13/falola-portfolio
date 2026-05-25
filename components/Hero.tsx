import { MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Falola Olufemi Adedeji</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            Full-Stack Engineer
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-5 h-5" />
            <span>Lagos, Nigeria</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            <a
              href="tel:+2347033072843"
              className="flex items-center gap-2 text-sm sm:text-base link-hover"
            >
              <Phone className="w-4 h-4" />
              <span>+234 703 307 2843</span>
            </a>
            <a
              href="mailto:femi.deji0@gmail.com"
              className="flex items-center gap-2 text-sm sm:text-base link-hover"
            >
              <Mail className="w-4 h-4" />
              <span>femi.deji0@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/falola-olufemi-87292625b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base link-hover"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/falola13"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base link-hover"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="flex justify-center gap-4">
            <a
              href="#experience"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Experience
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent/10 transition-colors"
            >
              See Projects
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}