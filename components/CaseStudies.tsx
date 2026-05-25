import { AnimatedSection } from './AnimatedSection'
import { ExternalLink, TrendingUp, Users, Clock, Shield } from 'lucide-react'
import { caseStudies } from '@/data/portfolio-data'

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Case Studies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep dive into projects that showcase problem-solving and technical expertise
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.id} delay={index * 100}>
              <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                        CASE STUDY
                      </span>
                      {study.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                      {study.title}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {study.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tech.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold text-lg">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {study.metrics?.map(metric => (
                          <div key={metric.label} className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm text-muted-foreground mb-1">
                              {metric.label}
                            </p>
                            <p className="text-xl font-bold gradient-text">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {study.liveUrl && (
                        <a
                          href={study.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          View Live
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-6">
                        {index === 0 ? (
                          <Shield className="w-24 h-24 text-primary mx-auto opacity-50" />
                        ) : (
                          <Users className="w-24 h-24 text-primary mx-auto opacity-50" />
                        )}
                      </div>
                      <p className="text-lg font-medium text-muted-foreground">
                        {index === 0 ? 'Secure Transactions' : 'Multi-Role Platform'}
                      </p>
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