import { ArrowUpRight } from "lucide-react";
import {
  caseStudies,
  openSourceProjects,
  sideProjects,
} from "@/data/portfolio-data";
import { CaseStudy, OpenSourceProject } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function CaseStudyEntry({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <Reveal as="article" delay={index * 60} className="group">
      <div className="grid gap-x-10 gap-y-6 border-t border-border pt-8 sm:pt-10 lg:grid-cols-[15rem_1fr]">
        {/* Left rail: company, role, period, index */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[0.6875rem] text-subtle-foreground">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-title">{study.company}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{study.role}</p>
          <p className="mt-0.5 font-mono text-[0.6875rem] text-subtle-foreground">
            {study.period}
          </p>

          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-4 inline-flex text-sm text-accent"
            >
              {study.liveUrl.replace(/^https?:\/\/(www\.)?/, "")}
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
          )}
        </div>

        {/* Right: the substance */}
        <div>
          <h4 className="text-headline">{study.title}</h4>
          <p className="mt-3 max-w-prose text-lede text-muted-foreground text-pretty">
            {study.summary}
          </p>
          <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground text-pretty">
            {study.contribution}
          </p>

          {study.metrics && study.metrics.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-[0.8125rem] text-foreground">
                    {metric.label}
                  </dt>
                  <dd className="order-1 text-2xl font-medium tracking-tight tabular-nums">
                    {metric.value}
                  </dd>
                  <dd className="order-3 font-mono text-[0.6875rem] text-subtle-foreground">
                    {metric.source}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-8 flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          {study.quote && (
            <figure className="mt-8 border-l-2 border-accent/40 pl-5">
              <blockquote className="max-w-prose text-[0.9375rem] leading-relaxed text-foreground text-pretty">
                &ldquo;{study.quote.content}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle-foreground">
                {study.quote.name} — {study.quote.role}, {study.quote.company}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function OpenSourceEntry({ project }: { project: OpenSourceProject }) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="font-mono text-title text-foreground">{project.name}</h3>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle-foreground">
          {project.tagline}
        </p>
      </div>

      <p className="mt-4 max-w-prose text-lede text-muted-foreground text-pretty">
        {project.description}
      </p>

      <ul className="mt-6 space-y-2.5">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty"
          >
            <span
              aria-hidden="true"
              className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.6875rem] text-subtle-foreground">
          {project.stack.join(" · ")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/*
            A running instance goes first: a reviewer who clicks nothing else
            will click a live link, and it costs them nothing to check.
          */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-accent transition-colors duration-200 hover:text-foreground"
            >
              Live demo
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-accent transition-colors duration-200 hover:text-foreground"
          >
            Read the source
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="01 — Selected work"
      title="Four engagements, in depth."
      intro="Fewer projects, described properly. Each entry says what the product is, what I actually did, and where the numbers come from."
    >
      <div className="space-y-16 sm:space-y-24">
        {caseStudies.map((study, index) => (
          <CaseStudyEntry key={study.id} study={study} index={index} />
        ))}
      </div>

      {/*
        Placed directly after the client work and given real weight: these are
        the only entries here whose source a reviewer can actually read, which
        makes them the most load-bearing evidence on the page for remote hiring.
      */}
      <Reveal className="mt-24">
        <div className="border-t border-border pt-8">
          <p className="eyebrow">Code you can read</p>
          <div className="mt-8 space-y-6">
            {openSourceProjects.map((project) => (
              <OpenSourceEntry key={project.name} project={project} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Secondary work — deliberately compact */}
      <Reveal className="mt-16">
        <div className="border-t border-border pt-8">
          <p className="eyebrow">Also shipped</p>
          <ul
            className={cn(
              "mt-8 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border",
              // Only split into columns when there's more than one entry —
              // otherwise a lone card leaves a conspicuous empty half.
              sideProjects.length > 1 && "sm:grid-cols-2",
            )}
          >
            {sideProjects.map((project) => (
              <li key={project.name} className="bg-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-title">{project.name}</h3>
                  {project.liveUrl && (
                    // Negative margin keeps the 40px tap target from shifting
                    // the visual alignment of the arrow.
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-m-2.5 grid size-10 shrink-0 place-items-center text-muted-foreground transition-colors duration-200 hover:text-accent"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2} />
                    </a>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.description}
                </p>
                <p className="mt-4 font-mono text-[0.6875rem] text-subtle-foreground">
                  {project.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
