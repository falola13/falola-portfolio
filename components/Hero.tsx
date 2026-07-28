import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";
import { contact, headlineMetrics, profile } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./Reveal";

/**
 * The entrance is staggered with `Reveal` rather than keyframe animations on
 * purpose — a keyframe that starts at `opacity: 0` leaves the hero blank if the
 * animation never runs. Transitions degrade to "already visible" instead.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Backdrop: faint grid, then a single soft light source from above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheen"
      />

      <div className="shell relative">
        {/* Availability — inline, not a floating pill */}
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1.5 pl-2.5 pr-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-positive/40 motion-safe:animate-breathe" />
              <span className="size-1 rounded-full bg-positive" />
            </span>
            {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-8 max-w-[22ch] text-display">{profile.name}</h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-[34ch] text-headline text-muted-foreground text-balance">
            {profile.headline}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-prose text-lede text-muted-foreground text-pretty">
            {profile.lede}
          </p>
        </Reveal>

        {/* Actions */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              See selected work
              <ArrowDownRight
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                strokeWidth={2}
              />
            </a>
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:bg-surface"
            >
              <FileText className="size-4" strokeWidth={1.7} />
              Résumé
            </a>

            <span
              aria-hidden="true"
              className="mx-1 hidden h-5 w-px bg-border sm:block"
            />

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
              aria-label="GitHub profile"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </Reveal>

        {/* Metrics — each one carries its own provenance */}
        <Reveal delay={300}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-4">
            {/*
              `order` puts the number above its label visually while keeping
              dt-before-dd in the DOM, so the list stays valid and screen
              readers don't hear the label twice.
            */}
            {headlineMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col bg-surface px-5 py-6"
              >
                <dt className="order-2 mt-2 text-[0.8125rem] leading-snug text-foreground">
                  {metric.label}
                </dt>
                <dd className="order-1 text-3xl font-medium tracking-tight tabular-nums">
                  {metric.value}
                </dd>
                <dd className="order-3 mt-1 font-mono text-[0.6875rem] leading-snug text-subtle-foreground">
                  {metric.source}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={340}>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[0.6875rem] text-subtle-foreground">
            <ArrowUpRight className="size-3" strokeWidth={2} />
            Figures from named engagements. Nothing aggregated.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
