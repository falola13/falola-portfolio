import {
  CaseStudy,
  Contact,
  Credential,
  Education,
  FocusItem,
  Metric,
  OpenSourceProject,
  Role,
  SideProject,
  StackGroup,
} from "@/types";

export const SITE_URL = "https://falola.is-a.dev";

export const profile = {
  name: "Falola Olufemi Adedeji",
  shortName: "Falola Olufemi",
  initials: "FOA",
  title: "Full-Stack Engineer",
  /** The one line that has to do the most work on the page. */
  headline:
    "I build production web and mobile products — and I'm moving that work into AI engineering.",
  lede: "Full-stack engineer with five years shipping user-facing products across fintech, edtech, and consumer SaaS. Frontend architecture in React, Next.js, and React Native; backend delivery in Node.js, NestJS, and Go. Now taking that into AI engineering, where a statistics degree is finally earning its keep.",
  availability: "Open to full-stack and AI engineering roles",
  /**
   * The résumé opener. Deliberately different from the web lede: a recruiter
   * screening on keywords needs the stack and the direction stated plainly in
   * the first three lines, where the web page can afford a slower opening.
   */
  resumeSummary:
    "Full-stack engineer with five years shipping user-facing web and mobile products across fintech, edtech, and consumer SaaS. Frontend architecture in React, Next.js, and React Native; backend delivery in Node.js, NestJS, Go, and PostgreSQL. Have led a small frontend team and mentored three engineers. Statistics graduate now moving into AI engineering, with an AWS generative AI certification in progress and a focus on the evaluation work that decides whether model output is dependable enough to ship.",
} as const;

export const contact: Contact = {
  email: "femi.deji0@gmail.com",
  /**
   * Résumé only — never rendered on the public page. A phone number in crawlable
   * HTML is a spam magnet; on a document you hand to a recruiter it's expected.
   */
  phone: "+234 703 307 2843",
  location: "Lagos, Nigeria",
  timezone: "WAT (UTC+1)",
  overlap:
    "Same working hours as Berlin, Paris, and Amsterdam — full overlap with European teams, and afternoons overlap with US Eastern.",
  linkedin: "https://www.linkedin.com/in/falola-olufemi-87292625b",
  github: "https://github.com/falola13",
  /**
   * The generated page, not a checked-in PDF. The old PDF drifted out of sync
   * with the site; this can't. Print it to PDF when a file is needed.
   */
  resume: "/resume",
};

/**
 * Every figure here maps to a specific engagement and is stated in the same
 * terms used in the role bullets below. Nothing aggregated, nothing rounded up.
 */
export const headlineMetrics: Metric[] = [
  {
    value: "25%",
    label: "Faster page loads",
    source: "RevHero frontend rearchitecture",
  },
  {
    value: "30%",
    label: "Fewer re-renders",
    source: "Scholé state-management overhaul",
  },
  {
    value: "20%",
    label: "Faster data retrieval",
    source: "Scholé admin dashboard",
  },
  {
    value: "3",
    label: "Engineers mentored",
    source: "Frontend lead at Scholé",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "finaive",
    company: "Finaive",
    title: "AI-powered escrow, web and mobile",
    summary:
      "An escrow platform that uses AI-driven risk signals to protect both sides of a transaction.",
    contribution:
      "Lead frontend for the platform end to end — secure transaction workflows, dispute and status tracking, and the user dashboards that sit on top of them. Also build and debug complex UI on the React Native app. Work directly with stakeholders and backend engineers to turn business rules into interfaces people can actually trust.",
    role: "Frontend Engineer (Contract)",
    period: "Jan 2024 — Present",
    stack: ["React", "Next.js", "TypeScript", "React Native"],
    quote: {
      content:
        "Femi's work on our AI-powered escrow platform exceeded all expectations. His ability to translate complex business requirements into elegant technical solutions is remarkable.",
      name: "Uwabor Henry",
      role: "CEO",
      company: "Finaive",
    },
    liveUrl: "https://finaive.com",
  },
  {
    id: "schole",
    company: "Scholé Labs",
    title: "Multi-role school management dashboard",
    summary:
      "One dashboard serving three distinct audiences — administrators, teachers, and students.",
    contribution:
      "Frontend lead: set development strategy, enforced performance and code-quality standards, and mentored three junior engineers. Spearheaded the core dashboard from wireframes to production, then reworked client-side state with Redux Toolkit and React Query to cut redundant fetching and render churn.",
    role: "Lead Frontend Engineer",
    period: "Jun 2024 — Sep 2025",
    stack: ["Next.js", "React", "Redux Toolkit", "React Query"],
    metrics: [
      {
        value: "20%",
        label: "Faster data retrieval",
        source: "Admin dashboard",
      },
      {
        value: "30%",
        label: "Fewer re-renders",
        source: "State-management rework",
      },
      { value: "3", label: "Engineers mentored", source: "Frontend team" },
    ],
    quote: {
      content:
        "Working with Femi has been outstanding. He not only writes clean, maintainable code but also mentors junior developers effectively. His leadership on our dashboard project was instrumental to its success.",
      name: "David Oluwaloni",
      role: "CEO",
      company: "Scholé Labs",
    },
    liveUrl: "https://www.scholelabs.com",
  },
  {
    id: "revhero",
    company: "RevHero",
    title: "Ground-up UI redesign and frontend rearchitecture",
    summary:
      "A revenue platform whose interface had outgrown its original structure.",
    contribution:
      "Led a full UI redesign and rebuilt the frontend on React, Next.js, and TypeScript — replacing ad-hoc styling with a responsive design system that improved usability and accessibility. Partnered with product and UX to keep the visual direction anchored to user feedback, and drove consistency across product modules.",
    role: "Frontend Engineer — direct, then via RevStar Consulting",
    period: "Jun 2025 — Present",
    stack: ["React", "Next.js", "TypeScript", "Design systems"],
    metrics: [
      {
        value: "25%",
        label: "Faster page loads",
        source: "Frontend rearchitecture",
      },
    ],
    quote: {
      content:
        "Olufemi transformed our entire frontend architecture. His expertise in React and Next.js helped us achieve a 25% improvement in load times.",
      name: "Viktoryia Dainiak",
      role: "Product Manager",
      company: "RevHero",
    },
  },
  {
    id: "reals-spv",
    company: "Reals SPV",
    title: "Data-plan purchasing with live payment flows",
    summary:
      "A consumer platform for buying mobile data, wired to payment gateways and third-party vendors.",
    contribution:
      "Built the responsive web platform and integrated payment gateways alongside third-party data-vendor APIs. Focused on the unglamorous part that decides whether a payment product works: explicit transaction states, honest error surfaces, and feedback that tells the user exactly where their money is.",
    role: "Frontend Developer",
    period: "2023",
    stack: ["React", "Redux Toolkit", "Payment gateways"],
    liveUrl: "https://realsspv.com",
  },
];

/**
 * The one piece of work on this page whose source anyone can read. Client work
 * proves delivery; this is what backs the "full-stack" claim with something a
 * reviewer can check line by line instead of taking on trust.
 *
 * Every highlight below is verifiable in the repo — do not add one that isn't.
 */
export const openSourceProject: OpenSourceProject = {
  name: "ledgerpay",
  tagline: "Go · PostgreSQL · personal project",
  description:
    "A payments API built around a double-entry ledger, to get the parts of money movement right that are invisible when they work and unrecoverable when they don't. Not production card rails — a study of the correctness patterns real payment systems depend on.",
  highlights: [
    "Double-entry ledger with overdraft protection enforced by row-level locking (SELECT … FOR UPDATE)",
    "Idempotent charge retries keyed on client tokens, so a repeated request cannot double-charge",
    "Transactional outbox for event delivery — no lost webhooks if the process dies mid-write",
    "HMAC-SHA256 signed webhooks with retry and dead-letter handling",
    "Runs as five services under Docker Compose, with CI on every push",
  ],
  stack: ["Go", "PostgreSQL", "Docker", "GitHub Actions"],
  repoUrl: "https://github.com/falola13/ledgerpay",
};

export const sideProjects: SideProject[] = [
  {
    name: "FridayApis",
    description:
      "Server-rendered frontend for a developer API platform. Integrated cryptocurrency, translation, and currency-exchange services with resilient error handling; improved initial load performance and SEO.",
    stack: ["Next.js", "SSR", "REST APIs"],
  },
];

/** Roles are listed as stated on the résumé, current engagements first. */
export const roles: Role[] = [
  {
    title: "Full-Stack Engineer (Contract)",
    company: "RevStar Consulting",
    location: "Tampa, FL",
    period: "Oct 2025 — Present",
    current: true,
    clients: ["RevHero"],
    bullets: [
      "Deliver features end to end across frontend and backend layers within a cross-functional consulting team of engineers, AI engineers, and product managers.",
      "Currently assigned to RevHero — continuing the frontend work started under a direct contract, after the engagement moved onto RevStar.",
      "Support integration, testing, and release activities to keep production deployments stable.",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "RevHero",
    location: "Tampa, FL",
    period: "Jun 2025 — Oct 2025",
    current: false,
    bullets: [
      "Led a ground-up UI redesign, introducing a responsive design system that improved usability and accessibility.",
      "Rebuilt the frontend on React, Next.js, and TypeScript — improving maintainability and cutting load times by over 25%.",
      "Partnered with product managers and UX designers to align the visual direction with user feedback and business goals.",
      "Engagement continued under RevStar Consulting from October 2025.",
    ],
  },
  {
    title: "Lead Frontend Engineer",
    company: "Scholé Labs",
    location: "Lagos, NG",
    period: "Jun 2024 — Sep 2025",
    current: false,
    bullets: [
      "Set frontend development strategy, mentored 3 junior engineers, and enforced code-quality and performance standards.",
      "Spearheaded the core school management dashboard for administrators, teachers, and students — improving data retrieval time by 20%.",
      "Implemented state management with Redux Toolkit and React Query, reducing application re-renders by over 30%.",
    ],
  },
  {
    title: "Frontend Engineer (Contract)",
    company: "Finaive",
    location: "Lagos, NG / MD, USA",
    period: "Jan 2024 — Present",
    current: true,
    commitment: "~10 h/week",
    bullets: [
      "Lead frontend development for an AI-powered escrow platform built around security, transparency, and transaction efficiency.",
      "Contribute to the React Native mobile app, building complex UI components and resolving critical bugs.",
      "Translate business requirements into a performant, responsive platform alongside stakeholders and backend engineers.",
    ],
  },
  {
    title: "Frontend Engineer (Contract)",
    company: "FridayApis",
    location: "Remote",
    period: "Sep 2023 — Dec 2023",
    current: false,
    bullets: [
      "Built and maintained SSR applications with Next.js for a developer-focused API platform, improving initial load performance and SEO.",
      "Integrated cryptocurrency, translation, and currency-exchange APIs with resilient data handling.",
    ],
  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    period: "Aug 2021 — 2023",
    current: false,
    bullets: [
      "Designed and built custom sites and applications for small businesses and personal brands.",
      "Owned the full lifecycle: requirements, client communication, timelines, and deployment.",
    ],
  },
];

/**
 * Current direction. Written as intent and study, not as shipped achievement —
 * these are things in progress, and the copy says so.
 */
export const focus: FocusItem[] = [
  {
    label: "AWS generative AI certification",
    detail:
      "Working through the AWS generative AI certification track — foundation models, prompt engineering, retrieval-augmented generation, and the Bedrock service surface, alongside the AWS and Docker fundamentals that give it somewhere reliable to run.",
    status: "in-progress",
  },
  {
    label: "A statistics degree, pointed at AI systems",
    detail:
      "My degree is in statistics, which turns out to be the useful half of this move. Sampling, inference, and experimental design are what separate a model that demos well from one that holds up — and they apply at the application layer, not just in training.",
    status: "active",
  },
  {
    label: "Evaluation over impressions",
    detail:
      "Working toward labelled evaluation sets, precision and recall reported per class, and prompt versions scored against each other rather than eyeballed. Calling a model is the easy half; proving its output is dependable is the part worth being good at.",
    status: "next",
  },
  {
    label: "AI features in production products",
    detail:
      "Applying that work where I already build — the AI-driven risk and fraud signals inside Finaive's escrow platform are the closest thing I have to a live proving ground.",
    status: "active",
  },
];

export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Python"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST APIs"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    label: "Platform",
    items: ["AWS", "Docker", "Git", "CI/CD"],
  },
  {
    label: "AI (learning)",
    items: ["Amazon Bedrock", "RAG", "Prompt engineering"],
  },
];

/**
 * Deliberately short. The three 2023 freeCodeCamp certificates were removed:
 * next to a lead role at five years' experience they read as an entry-level
 * signal and dilute the one credential that carries weight. A thin credentials
 * list next to substantial work is a stronger position than a padded one.
 */
export const credentials: Credential[] = [
  {
    name: "Generative AI certification",
    issuer: "Amazon Web Services",
    year: "In progress",
    inProgress: true,
  },
];

/** Most recent first. */
export const education: Education[] = [
  {
    qualification: "B.Sc. Statistics",
    institution: "Federal University of Agriculture, Ogun State",
    year: "2023",
  },
  {
    qualification: "NCE, Computer Science / Mathematics",
    institution: "Federal College of Education, Ogun State",
    year: "2017",
  },
];
