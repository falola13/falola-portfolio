import { AnimatedSection } from "./AnimatedSection";
import { Award, ExternalLink, Clock } from "lucide-react";
import { certifications } from "@/data/portfolio-data";

export function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Certifications & Learning
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuous learning and professional development
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 100}>
              <div
                className={`bg-card rounded-xl border ${
                  cert.inProgress
                    ? "border-primary border-dashed"
                    : "border-border"
                } p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {cert.inProgress && (
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer}
                    </p>
                  </div>
                  {!cert.inProgress && (
                    <Award className="w-8 h-8 text-primary opacity-50" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {cert.date}
                  </span>
                  {cert.url && !cert.inProgress && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View Certificate
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {cert.credentialId && (
                  <p className="text-xs text-muted-foreground mt-2">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              View all certifications on
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.freecodecamp.org/falola13"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                freeCodeCamp Profile
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
