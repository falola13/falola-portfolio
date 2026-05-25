import { Mail, Phone, Linkedin, Github, Heart } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Let's build something amazing together
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:femi.deji0@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a
                href="tel:+2347033072843"
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Call/WhatsApp</span>
              </a>
              <a
                href="https://www.linkedin.com/in/falola-olufemi-87292625b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/falola13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-500" /> using
              Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} Falola Olufemi Adedeji. All rights
              reserved.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
