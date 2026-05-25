import { AnimatedSection } from './AnimatedSection'
import { Calendar, Clock, BookOpen } from 'lucide-react'
import { blogPosts } from '@/data/portfolio-data'

export function Blog() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Technical Writing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sharing insights and lessons from building production applications
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => post.published).map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 100}>
              <article className="bg-card rounded-xl border border-border p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                    Coming Soon
                  </span>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}