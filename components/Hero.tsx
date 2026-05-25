import { MapPin, Mail, Phone } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}
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
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/falola13"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base link-hover"
            >
              <GithubIcon className="w-4 h-4" />
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