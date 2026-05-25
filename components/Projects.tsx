import { AnimatedSection } from "./AnimatedSection";
import { ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "AI Escrow Platform (Web & Mobile)",
    tech: ["React", "Next.js", "TypeScript", "React Native"],
    description:
      "Led frontend development of an AI-powered escrow product, building secure transaction workflows, dispute/status tracking interfaces, and responsive user dashboards. Improved usability and transaction flow reliability through close collaboration with backend engineers and stakeholders.",
    liveUrl: "https://finaive.com",
  },
  {
    title: "School Management Dashboard (ScholéLabs)",
    tech: ["Next.js", "React", "Redux Toolkit", "React Query"],
    description:
      "Spearheaded development of a multi-role dashboard for administrators, teachers, and students, delivering responsive, high-performance interfaces from wireframes to production. Optimized client-side state and data-fetching patterns, reducing data retrieval and unnecessary re-renders by over 20%.",
    liveUrl: "https://www.scholelabs.com",
  },
  {
    title: "Reals SPV",
    tech: ["React.js", "Redux Toolkit", "Payment Gateway Integration"],
    description:
      "Built a responsive web platform for purchasing data plans, integrating payment gateways and third-party data vendor APIs. Implemented robust transaction states and user feedback flows to improve reliability and purchase completion.",
    liveUrl: "https://realsspv.com",
  },
  {
    title: "FridayApis Developer Platform",
    tech: ["Next.js (SSR)", "REST API Integrations"],
    description:
      "Developed and maintained user-facing SSR applications for a developer-focused API platform, integrating cryptocurrency, translation, and global exchange services. Improved initial load performance and SEO while ensuring resilient API error handling and data presentation.",
    liveUrl: null,
  },
  {
    title: "Chef Spice",
    tech: ["Next.js (SSG)", "Responsive UI", "SEO"],
    description:
      "Built a high-performance portfolio website for a professional chef using static generation for fast load speed and strong search visibility. Delivered a clean, mobile-first experience aligned with brand goals.",
    liveUrl: "https://chefspice.co.uk",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Featured Projects
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6 h-full flex flex-col card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground flex-1">
                  {project.description}
                </p>

                {project.liveUrl && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Code2 className="w-4 h-4" />
                      View Live Project
                    </a>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
