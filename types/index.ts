// Single Responsibility: Each interface has one reason to change
// Interface Segregation: Clients don't depend on interfaces they don't use

export interface ContactInfo {
  phone: string
  email: string
  linkedin: string
  github: string
  location: string
}

export interface Achievement {
  id: string
  metric: string
  value: number
  suffix?: string
  prefix?: string
  description: string
}

export interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>
  title: string
  skills: string[]
  color: string
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'language' | 'tool' | 'database'
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  date: string
  bullets: string[]
  technologies?: string[]
}

export interface Project {
  id: string
  title: string
  tech: string[]
  description: string
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  image?: string
  featured?: boolean
  metrics?: ProjectMetric[]
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  published: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ComponentType<{ className?: string }>
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  url?: string
  inProgress?: boolean
}

export interface CodeSnippet {
  id: string
  title: string
  language: 'typescript' | 'javascript' | 'go' | 'python' | 'jsx' | 'tsx'
  code: string
  description: string
  category: 'performance' | 'patterns' | 'architecture' | 'algorithms'
}

export interface TimelineEvent {
  year: number
  title: string
  description: string
  type: 'education' | 'career' | 'skill' | 'achievement'
  technologies?: string[]
}

export interface CurrentlyLearning {
  technology: string
  progress: number
  goal: string
}

// Repository pattern interfaces
export interface IDataRepository<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create?(data: T): Promise<T>
  update?(id: string, data: Partial<T>): Promise<T>
  delete?(id: string): Promise<boolean>
}

// Observer pattern for availability status
export interface IAvailabilityObserver {
  update(status: AvailabilityStatus): void
}

export interface AvailabilityStatus {
  available: boolean
  nextAvailableDate?: string
  currentProject?: string
}

// Factory pattern for creating components
export interface IComponentFactory<T> {
  create(props: T): React.ReactElement
}