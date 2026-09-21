import caseStudiesJson from "@/content/case-studies.json";
import contactJson from "@/content/contact.json";
import credentialsJson from "@/content/credentials.json";
import educationJson from "@/content/education.json";
import focusJson from "@/content/focus.json";
import metricsJson from "@/content/metrics.json";
import profileJson from "@/content/profile.json";
import projectsJson from "@/content/projects.json";
import rolesJson from "@/content/roles.json";
import sideProjectsJson from "@/content/side-projects.json";
import stackJson from "@/content/stack.json";
import type {
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

/**
 * The content itself lives in `content/*.json` and is edited through the admin
 * at /admin (Keystatic — see keystatic.config.ts). This file is the typed layer
 * over it: components import from here and never touch the JSON directly.
 *
 * The editorial rules that used to sit as comments beside each value now also
 * appear as help text on the matching admin field, so they are visible at the
 * moment of editing rather than only to someone reading this file.
 *
 * The CMS writes an empty optional list as `[]` and an empty optional object as
 * `{}`. Both are truthy, so components guarding on `study.quote &&` would render
 * an empty block. They are normalized to `undefined` here, once, rather than
 * defended against in every component.
 */

export const SITE_URL = "https://falola.is-a.dev";

/** Each list-shaped content file is stored as `{ items: [...] }`. */
const items = <T>(file: unknown): T[] => (file as { items: T[] }).items;

const nonEmpty = <T>(list: T[] | undefined): T[] | undefined =>
  list && list.length > 0 ? list : undefined;

export const profile = profileJson;

export const contact: Contact = {
  ...(contactJson as Omit<Contact, "resume">),
  /**
   * Rendered from /resume by scripts/resume-pdf.mjs, never edited by hand. The
   * old hand-made PDF drifted out of sync with the site; this one is rebuilt by
   * CI whenever résumé content changes, so it can't.
   */
  resume: "/resume.pdf",
};

/** Download name. A recruiter's Downloads folder is full of "resume.pdf". */
export const RESUME_FILENAME = `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`;

/**
 * Every figure here maps to a specific engagement and is stated in the same
 * terms used in the role bullets below. Nothing aggregated, nothing rounded up.
 */
export const headlineMetrics: Metric[] = items<Metric>(metricsJson);

export const caseStudies: CaseStudy[] = items<CaseStudy>(caseStudiesJson).map(
  (study) => ({
    ...study,
    metrics: nonEmpty(study.metrics),
    quote: study.quote?.content ? study.quote : undefined,
  }),
);

/**
 * The work on this page whose source anyone can read. Client work proves
 * delivery; this is what backs the engineering claims with something a reviewer
 * can check line by line instead of taking on trust.
 *
 * Two entries, deliberately: ledgerpay is the backend-correctness argument and
 * dispute-triage is the AI-engineering one. The move into AI is stated as intent
 * everywhere else on this page — this is the only place it is stated as code.
 *
 * Every highlight below is verifiable in the repo — do not add one that isn't.
 */
export const openSourceProjects: OpenSourceProject[] =
  items<OpenSourceProject>(projectsJson);

export const sideProjects: SideProject[] = items<SideProject>(sideProjectsJson);

/** Roles are listed as stated on the résumé, most recent start date first. */
export const roles: Role[] = items<Role>(rolesJson).map((role) => ({
  ...role,
  clients: nonEmpty(role.clients),
}));

const FOCUS_STATUSES = new Set<FocusItem["status"]>([
  "in-progress",
  "active",
  "next",
]);

/**
 * Current direction. Written as intent and study, not as shipped achievement —
 * these are things in progress, and the copy says so.
 */
export const focus: FocusItem[] = items<FocusItem>(focusJson).map((item) => {
  // The admin only offers these three values; this catches a hand edit that
  // would otherwise render a blank status badge.
  if (!FOCUS_STATUSES.has(item.status)) {
    throw new Error(
      `content/focus.json: "${item.label}" has unknown status "${item.status}"`,
    );
  }
  return item;
});

export const stack: StackGroup[] = items<StackGroup>(stackJson);

/**
 * Deliberately short. The three 2023 freeCodeCamp certificates were removed:
 * next to a lead role at five years' experience they read as an entry-level
 * signal and dilute the one credential that carries weight. A thin credentials
 * list next to substantial work is a stronger position than a padded one.
 */
export const credentials: Credential[] = items<Credential>(credentialsJson);

/** Most recent first. */
export const education: Education[] = items<Education>(educationJson);
