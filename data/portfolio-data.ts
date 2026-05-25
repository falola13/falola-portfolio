import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Briefcase,
  Users,
  Zap,
  Target,
} from "lucide-react";
import {
  Achievement,
  SkillCategory,
  Experience,
  Project,
  Education,
  Testimonial,
  BlogPost,
  Service,
  Certification,
  CodeSnippet,
  TimelineEvent,
  CurrentlyLearning,
  Skill,
} from "@/types";

export const achievements: Achievement[] = [
  {
    id: "1",
    metric: "Load Time Improved",
    value: 25,
    suffix: "%",
    description: "Faster page loads achieved",
  },
  {
    id: "2",
    metric: "Re-renders Reduced",
    value: 30,
    suffix: "%",
    description: "Performance optimization",
  },
  {
    id: "3",
    metric: "Developers Mentored",
    value: 3,
    suffix: "+",
    description: "Junior team members guided",
  },
  {
    id: "4",
    metric: "Years Experience",
    value: 5,
    suffix: "+",
    description: "Building production apps",
  },
  {
    id: "5",
    metric: "Projects Delivered",
    value: 20,
    suffix: "+",
    description: "Successfully shipped",
  },
  {
    id: "6",
    metric: "Client Satisfaction",
    value: 98,
    suffix: "%",
    description: "Positive feedback rate",
  },
];

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", level: 90, category: "language" },
  { name: "JavaScript", level: 95, category: "language" },
  { name: "Go", level: 75, category: "language" },
  { name: "Python", level: 70, category: "language" },

  // Frontend
  { name: "React.js", level: 95, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "React Native", level: 85, category: "frontend" },
  { name: "Redux", level: 90, category: "frontend" },

  // Backend
  { name: "Node.js", level: 85, category: "backend" },
  { name: "NestJS", level: 80, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "REST APIs", level: 90, category: "backend" },
  { name: "Golang", level: 70, category: "backend" },

  // Databases
  { name: "PostgreSQL", level: 80, category: "database" },
  { name: "MongoDB", level: 85, category: "database" },

  // Tools
  { name: "Git", level: 90, category: "tool" },
  { name: "Docker", level: 70, category: "tool" },
  { name: "AWS", level: 65, category: "tool" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Viktoryia Dainiak",
    role: "Product Manager",
    company: "RevHero",
    content:
      "Olufemi transformed our entire frontend architecture. His expertise in React and Next.js helped us achieve a 25% improvement in load times. A truly exceptional engineer who delivers beyond expectations.",
  },
  {
    id: "2",
    name: "David Oluwaloni",
    role: "CEO",
    company: "Scholé Labs",
    content:
      "Working with Femi has been outstanding. He not only writes clean, maintainable code but also mentors junior developers effectively. His leadership on our dashboard project was instrumental to its success.",
  },
  {
    id: "3",
    name: "Uwabor Henry",
    role: "CEO",
    company: "Finaive",
    content:
      "Femi's work on our AI-powered escrow platform exceeded all expectations. His ability to translate complex business requirements into elegant technical solutions is remarkable.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing React Performance in Production",
    excerpt:
      "Learn practical techniques to improve React app performance, from code splitting to memoization strategies that actually work.",
    date: "2024-11-15",
    readTime: "8 min",
    tags: ["React", "Performance", "JavaScript"],
    slug: "optimizing-react-performance",
    published: true,
  },
  {
    id: "2",
    title: "Building Scalable Next.js Applications",
    excerpt:
      "Architecture patterns and best practices for building Next.js apps that scale from MVP to millions of users.",
    date: "2024-10-28",
    readTime: "12 min",
    tags: ["Next.js", "Architecture", "TypeScript"],
    slug: "scalable-nextjs-apps",
    published: true,
  },
  {
    id: "3",
    title: "Lessons from Leading a Frontend Team",
    excerpt:
      "Insights and strategies from my experience leading frontend teams, fostering growth, and delivering quality products.",
    date: "2024-09-20",
    readTime: "6 min",
    tags: ["Leadership", "Team Management", "Engineering"],
    slug: "frontend-team-leadership",
    published: true,
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Frontend Architecture Design",
    description:
      "Design scalable, maintainable frontend architectures for complex applications",
    features: [
      "Component architecture planning",
      "State management strategy",
      "Performance optimization roadmap",
      "Technology stack selection",
    ],
    icon: Layout,
  },
  {
    id: "2",
    title: "React/Next.js Development",
    description:
      "Build high-performance web applications with modern React ecosystem",
    features: [
      "Custom React applications",
      "Next.js SSR/SSG implementation",
      "API integration",
      "Responsive UI development",
    ],
    icon: Code2,
  },
  {
    id: "3",
    title: "Team Mentoring & Training",
    description:
      "Level up your development team with personalized mentoring and training",
    features: [
      "Code review & best practices",
      "React/TypeScript training",
      "Agile development coaching",
      "Technical interview preparation",
    ],
    icon: Users,
  },
  {
    id: "4",
    title: "Performance Optimization",
    description:
      "Optimize existing applications for speed, efficiency, and user experience",
    features: [
      "Performance audits",
      "Bundle size optimization",
      "Runtime performance tuning",
      "SEO improvements",
    ],
    icon: Zap,
  },
  {
    id: "5",
    title: "Backend & API Development",
    description:
      "Build robust, scalable backends and RESTful APIs that power your applications",
    features: [
      "Node.js & NestJS services",
      "Go microservices",
      "RESTful API design",
      "Database architecture (PostgreSQL, MongoDB)",
    ],
    icon: Server,
  },
  {
    id: "6",
    title: "DevOps & Cloud Infrastructure",
    description:
      "Deploy and manage applications with modern cloud and containerization tools",
    features: [
      "Docker containerization",
      "AWS cloud services",
      "CI/CD pipeline setup",
      "Monitoring & logging",
    ],
    icon: Database,
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "In Progress",
    inProgress: true,
  },
  {
    id: "2",
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-RWD-2023",
    url: "https://www.freecodecamp.org/certification/falola13/responsive-web-design",
  },
  {
    id: "3",
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-JS-2023",
    url: "https://www.freecodecamp.org/certification/falola13/javascript-algorithms-and-data-structures",
  },
  {
    id: "4",
    name: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-FEDL-2023",
    url: "https://www.freecodecamp.org/certification/falola13/front-end-development-libraries",
  },
];

export const codeSnippets: CodeSnippet[] = [
  {
    id: "1",
    title: "React Performance: Memoization Pattern",
    language: "tsx",
    category: "performance",
    description:
      "Optimizing expensive computations with useMemo and React.memo",
    code: `// Memoized component to prevent unnecessary re-renders
const ExpensiveList = React.memo<{ items: Item[] }>(({ items }) => {
  // Memoize expensive filtering operation
  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 100);
  }, [items]);

  return (
    <div>
      {filteredItems.map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for deeper optimization
  return prevProps.items.length === nextProps.items.length &&
    prevProps.items.every((item, idx) => 
      item.id === nextProps.items[idx].id
    );
});`,
  },
  {
    id: "2",
    title: "TypeScript: Generic Repository Pattern",
    language: "typescript",
    category: "patterns",
    description: "Implementing a type-safe repository pattern for data access",
    code: `interface Repository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

class BaseRepository<T extends { id: string }> 
  implements Repository<T> {
  constructor(private endpoint: string) {}

  async getAll(): Promise<T[]> {
    const response = await fetch(this.endpoint);
    return response.json();
  }

  async getById(id: string): Promise<T | null> {
    const response = await fetch(\`\${this.endpoint}/\${id}\`);
    if (!response.ok) return null;
    return response.json();
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  // ... other methods
}`,
  },
  {
    id: "3",
    title: "Go: Concurrent Task Processing",
    language: "go",
    category: "architecture",
    description: "Processing tasks concurrently with goroutines and channels",
    code: `func ProcessTasksConcurrently(tasks []Task) []Result {
    resultChan := make(chan Result, len(tasks))
    var wg sync.WaitGroup

    // Worker pool pattern
    workerCount := runtime.NumCPU()
    taskChan := make(chan Task, len(tasks))

    // Start workers
    for i := 0; i < workerCount; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for task := range taskChan {
                result := processTask(task)
                resultChan <- result
            }
        }()
    }

    // Send tasks to workers
    for _, task := range tasks {
        taskChan <- task
    }
    close(taskChan)

    // Wait and collect results
    go func() {
        wg.Wait()
        close(resultChan)
    }()

    results := make([]Result, 0, len(tasks))
    for result := range resultChan {
        results = append(results, result)
    }
    
    return results
}`,
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: 2017,
    title: "Started Journey in Tech",
    description: "Completed NCE in Computer Science/Mathematics",
    type: "education",
  },
  {
    year: 2020,
    title: "First Professional Role",
    description: "Joined Allure Effects LLC as Graphic Designer",
    type: "career",
  },
  {
    year: 2021,
    title: "Transition to Web Development",
    description: "Started freelance web development, mastering React.js",
    type: "career",
    technologies: ["React", "JavaScript", "HTML/CSS"],
  },
  {
    year: 2023,
    title: "Full-Stack Evolution",
    description: "Expanded to backend development with Node.js and Go",
    type: "skill",
    technologies: ["Node.js", "Go", "PostgreSQL"],
  },
  {
    year: 2024,
    title: "Leadership Role",
    description: "Became Lead Frontend Engineer, mentoring team members",
    type: "achievement",
    technologies: ["Next.js", "TypeScript", "React Native"],
  },
  {
    year: 2025,
    title: "International Expansion",
    description: "Working with US-based companies (RevStar, RevHero)",
    type: "career",
    technologies: ["React", "Next.js", "TypeScript"],
  },
];

export const currentlyLearning: CurrentlyLearning[] = [
  {
    technology: "Kubernetes & Docker",
    progress: 45,
    goal: "Container orchestration for microservices",
  },
  {
    technology: "Web3 & Blockchain",
    progress: 30,
    goal: "Smart contract development with Solidity",
  },
  {
    technology: "Rust Programming Language",
    progress: 25,
    goal: "AWS Solutions Architect Certification",
  },
  {
    technology: "Machine Learning with Python",
    progress: 25,
    goal: "ML integration in web applications",
  },
];

export const caseStudies: Project[] = [
  {
    id: "cs-1",
    title: "AI-Powered Escrow Platform",
    tech: ["React", "Next.js", "TypeScript", "React Native"],
    description:
      "Complete redesign and implementation of a secure escrow platform with AI-driven fraud detection.",
    liveUrl: "https://finaive.com",
    featured: true,
    metrics: [
      { label: "Transaction Success Rate", value: "99.8%" },
      { label: "Load Time Improvement", value: "40%" },
      { label: "User Satisfaction", value: "4.8/5" },
      { label: "Security Incidents", value: "0" },
    ],
  },
  {
    id: "cs-2",
    title: "School Management Dashboard",
    tech: ["Next.js", "Zustand", "React Query"],
    description:
      "Multi-role educational platform serving 10,000+ users with real-time data synchronization.",
    liveUrl: "https://www.scholelabs.com",
    featured: true,
    metrics: [
      { label: "Data Retrieval Speed", value: "+20%" },
      { label: "Re-renders Reduced", value: "30%" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
];
