import type { Metadata } from "next";
import {
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
 * the PDF still showed five concurrent roles. Print this page to PDF and the
 * document cannot disagree with the site it came from.
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
 * The public repos — the work a reader can actually inspect. Derived from the
 * same data as the site rather than restated here: this list was hard-coded
 * once and immediately became the thing most likely to drift, which is the
 * exact failure this page exists to prevent.
 */
const projects = openSourceProjects.map((project) => ({
  name: project.name,
  stack: project.stack.join(" · "),
  url: bareUrl(project.repoUrl),
  liveUrl: project.liveUrl ? bareUrl(project.liveUrl) : undefined,
  description: project.resumeDescription,
}));

function Rule({ children }: { children: string }) {
  return (
    <h2 className="mt-6 border-b border-neutral-400 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-neutral-900">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const links = [
    contact.email,
    contact.phone,
    "falola.is-a.dev",
    "github.com/falola13",
    "linkedin.com/in/falola-olufemi",
  ].filter(Boolean);

  return (
    <main className="resume mx-auto max-w-[54rem] bg-white px-10 py-10 text-[0.82rem] leading-[1.45] text-neutral-800">
      <header>
        <h1 className="text-[1.6rem] font-semibold tracking-tight text-neutral-900">
          {profile.name}
        </h1>
        <p className="mt-1 text-[0.82rem] text-neutral-700">
          {profile.title} · {contact.location} · {contact.overlap}
        </p>
        <p className="mt-1 text-[0.78rem] text-neutral-600">
          {links.join(" · ")}
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
      <div className="mt-2 space-y-4">
        {roles.map((role) => (
          <section key={`${role.company}-${role.period}`} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold text-neutral-900">
                {role.title} · {role.company}
              </h3>
              <p className="text-[0.75rem] text-neutral-600">
                {role.period}
                {role.commitment ? ` · ${role.commitment}` : ""}
              </p>
            </div>
            <p className="text-[0.75rem] text-neutral-600">{role.location}</p>
            <ul className="mt-1 space-y-0.5">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Rule>Selected projects</Rule>
      <div className="mt-2 space-y-3">
        {projects.map((project) => (
          <section key={project.name} className="break-inside-avoid">
            <h3 className="font-semibold text-neutral-900">
              {project.name}{" "}
              <span className="font-normal text-neutral-600">
                — {project.stack} — {project.url}
                {project.liveUrl && ` · ${project.liveUrl}`}
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
                  — {study.company} — {study.stack.join(", ")}
                </span>
              </h3>
              <p>{study.contribution}</p>
            </section>
          ))}
      </div>

      <Rule>Education &amp; certifications</Rule>
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
