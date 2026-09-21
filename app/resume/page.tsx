import type { Metadata } from "next";
import {
  RESUME_FILENAME,
  caseStudies,
  contact,
  credentials,
  education,
  openSourceProjects,
  profile,
  roles,
  stack,
} from "@/data/portfolio-data";

/**
 * The résumé, generated from the same data as the site.
 *
 * It exists as a route rather than a checked-in PDF because the two drifted
 * badly once already — the site closed out Scholé and led with the B.Sc. while
 * the PDF still showed five concurrent roles. public/resume.pdf is rendered
 * from this page by scripts/resume-pdf.mjs, so the file cannot disagree with
 * the site either.
 *
 * Laid out for applicant tracking systems first. What a parser gets is the PDF's
 * extracted text, not the page a person sees, and scripts/check-resume-pdf.mjs
 * checks exactly that. The rules it enforces, and why this page follows them:
 *
 * - Standard section headings, no letter-spacing. pdf.js extracts a
 *   letter-spaced "SKILLS" as "S K I L L S", and the section is never found.
 * - Location on the contact line, and alone. The working-hours note names
 *   European cities; on the same line as "Lagos", a parser can take one of
 *   them as where you live.
 * - Title and dates on one line, company on the next, date ranges split by a
 *   plain hyphen.
 * - One column, real text, every URL written out.
 *
 * noindex: this page carries a phone number, which has no business in
 * crawlable HTML. It's linked from the site but kept out of search and the
 * sitemap.
 */
export const metadata: Metadata = {
  // absolute: the root layout appends the site name, which would print as
  // "Falola Olufemi Adedeji — Résumé — Falola Olufemi Adedeji" in the header.
  title: { absolute: `${profile.name} — Résumé` },
  robots: { index: false, follow: false },
};

const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

/**
 * "Jan 2024 — Present" → "Jan 2024 - Present". The site keeps its em dashes;
 * the résumé normalizes, because some ATS date parsers only split a range on a
 * plain hyphen. Done here rather than in the content so an edit in the admin
 * can't reintroduce the problem.
 */
const dateRange = (period: string) => period.replace(/\s*[–—-]\s*/g, " - ");

/**
 * The public repos — the work a reader can actually inspect. Derived from the
 * same data as the site rather than restated here: this list was hard-coded
 * once and immediately became the thing most likely to drift, which is the
 * exact failure this page exists to prevent.
 */
const projects = openSourceProjects.map((project) => ({
  name: project.name,
  stack: project.stack.join(", "),
  url: bareUrl(project.repoUrl),
  liveUrl: project.liveUrl ? bareUrl(project.liveUrl) : undefined,
  description: project.resumeDescription,
}));

/** Joined with a plain separator that every parser tokenizes on. */
const joined = (parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" | ");

function Rule({ children }: { children: string }) {
  // No tracking-*: letter-spacing is what makes headings extract as "S K I L L S".
  return (
    <h2 className="mt-6 border-b print:mt-4 border-neutral-400 pb-1 text-[0.72rem] font-semibold uppercase text-neutral-900">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const links = [
    { label: contact.email, href: `mailto:${contact.email}` },
    contact.phone
      ? { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` }
      : undefined,
    { label: "falola.is-a.dev", href: "https://falola.is-a.dev" },
    { label: bareUrl(contact.github), href: contact.github },
    { label: bareUrl(contact.linkedin), href: contact.linkedin },
  ].filter((link) => link !== undefined);

  return (
    <main className="resume mx-auto max-w-[54rem] bg-white px-10 py-10 text-[0.82rem] leading-[1.45] text-neutral-800">
      <p className="mb-4 text-right print:hidden">
        <a
          href={contact.resume}
          download={RESUME_FILENAME}
          className="rounded-full border border-neutral-300 px-4 py-1.5 text-[0.78rem] font-medium text-neutral-800 hover:border-neutral-500"
        >
          Download PDF
        </a>
      </p>

      <header>
        <h1 className="text-[1.6rem] font-semibold tracking-tight text-neutral-900">
          {profile.name}
        </h1>
        <p className="mt-1 text-[0.9rem] font-medium text-neutral-800">
          {profile.title}
        </p>
        <p className="mt-1 text-[0.78rem] text-neutral-700">
          {contact.location}
          {links.map((link) => (
            <span key={link.href}>
              {" | "}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </p>
        <p className="mt-1 text-[0.78rem] text-neutral-600">
          Working hours: {contact.timezone}. {contact.overlap}
        </p>
      </header>

      <Rule>Summary</Rule>
      <p className="mt-2">{profile.resumeSummary}</p>

      <Rule>Skills</Rule>
      <dl className="mt-2 space-y-0.5">
        {stack.map((group) => (
          <div key={group.label} className="flex gap-2">
            <dt className="w-28 shrink-0 font-semibold text-neutral-900">
              {group.label}
            </dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <Rule>Experience</Rule>
      <div className="mt-2 space-y-4 print:space-y-3">
        {roles.map((role) => (
          <section key={`${role.company}-${role.period}`} className="role">
            <div className="role-header">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-semibold text-neutral-900">{role.title}</h3>
                <p className="text-[0.75rem] text-neutral-600">{dateRange(role.period)}</p>
              </div>
              <p className="text-[0.78rem] text-neutral-700">
                {joined([role.company, role.location, role.commitment])}
              </p>
            </div>
            <ul className="mt-1 space-y-0.5">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Rule>Projects</Rule>
      <div className="mt-2 space-y-3">
        {projects.map((project) => (
          <section key={project.name} className="break-inside-avoid">
            <h3 className="font-semibold text-neutral-900">
              {project.name}{" "}
              <span className="font-normal text-neutral-600">
                | {joined([project.stack, project.url, project.liveUrl])}
              </span>
            </h3>
            <p>{project.description}</p>
          </section>
        ))}

        {/*
          Only case studies that aren't already covered under Experience. The
          Finaive, Scholé, and RevHero engagements each have a role entry
          above, and repeating them here padded the document without adding
          anything a reader hadn't just read.
        */}
        {caseStudies
          .filter(
            (study) =>
              !roles.some((role) => role.company === study.company),
          )
          .map((study) => (
            <section key={study.id} className="break-inside-avoid">
              <h3 className="font-semibold text-neutral-900">
                {study.title}{" "}
                <span className="font-normal text-neutral-600">
                  | {joined([study.company, study.stack.join(", ")])}
                </span>
              </h3>
              <p>{study.contribution}</p>
            </section>
          ))}
      </div>

      <Rule>Education</Rule>
      <ul className="mt-2 space-y-0.5">
        {education.map((item) => (
          <li key={item.qualification} className="flex justify-between gap-3">
            <span>
              <span className="font-semibold text-neutral-900">
                {item.qualification}
              </span>
              {item.institution ? `, ${item.institution}` : ""}
            </span>
            <span className="shrink-0 text-neutral-600">{item.year}</span>
          </li>
        ))}
      </ul>

      <Rule>Certifications</Rule>
      <ul className="mt-2 space-y-0.5">
        {credentials.map((credential) => (
          <li key={credential.name} className="flex justify-between gap-3">
            <span>
              <span className="font-semibold text-neutral-900">
                {credential.name}
              </span>
              , {credential.issuer}
            </span>
            <span className="shrink-0 text-neutral-600">{credential.year}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
