/**
 * Content types for the portfolio.
 *
 * Rule for everything below: a field only exists if there is a real, defensible
 * value to put in it. No self-rated proficiency scores, no aggregate
 * satisfaction figures, no metric that cannot be traced to shipped work.
 */

export interface Contact {
  email: string;
  location: string;
  timezone: string;
  /**
   * Stated in terms of the hiring manager's calendar, not mine. "UTC+1" makes a
   * European reader do arithmetic; naming their cities does the work for them.
   */
  overlap: string;
  linkedin: string;
  github: string;
  resume: string;
}

/** A single outcome, sourced from a specific engagement. */
export interface Metric {
  value: string;
  label: string;
  /** Where the number comes from, so it can be defended in conversation. */
  source: string;
}

export interface Quote {
  content: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  title: string;
  /** One line on what the product is. */
  summary: string;
  /** What the work actually involved. Two to three sentences, no filler. */
  contribution: string;
  role: string;
  period: string;
  stack: string[];
  metrics?: Metric[];
  quote?: Quote;
  liveUrl?: string;
}

export interface SideProject {
  name: string;
  description: string;
  stack: string[];
  liveUrl?: string;
}

/**
 * A personal project whose source is public. Kept as its own type rather than a
 * flag on SideProject because the whole point is different: client work proves
 * I ship, readable code proves *how* I build. Remote hiring is trust at a
 * distance, and this is the cheapest trust on offer.
 */
export interface OpenSourceProject {
  name: string;
  /** Short technical framing, e.g. the language and datastore. */
  tagline: string;
  description: string;
  /** Specific engineering properties, each independently checkable in the repo. */
  highlights: string[];
  stack: string[];
  repoUrl: string;
}

export interface Role {
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  /**
   * Weekly commitment for concurrent contracts. Ambiguous overlap between
   * several "Present" roles reads as overemployment risk to a remote employer;
   * stating the hours removes the doubt instead of leaving it to be guessed.
   */
  commitment?: string;
  /** Client engagements delivered through this employer, if any. */
  clients?: string[];
  bullets: string[];
}

export interface FocusItem {
  label: string;
  detail: string;
  status: "in-progress" | "active" | "next";
}

export interface Credential {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  inProgress?: boolean;
}

export interface StackGroup {
  label: string;
  items: string[];
}
