import { ArrowUpRight } from "lucide-react";
import { contact, credentials, education, stack } from "@/data/portfolio-data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Layout note: the prose and the meta rail have very different heights, so the
 * stack is pulled out into its own full-width band underneath instead of being
 * stacked in the rail — otherwise the rail runs several hundred pixels past the
 * end of the prose and leaves a dead column.
 */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="04 — About"
      title="How I work."
      className="bg-surface-raised/40"
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_18rem]">
        <Reveal className="max-w-prose space-y-5 text-lede text-muted-foreground text-pretty">
          <p>
            I started in graphic design, moved into frontend because I wanted the
            things I designed to actually run, and ended up owning full-stack
            delivery. That route left me with a bias I still work from: the
            interface is where a product either earns trust or loses it.
          </p>
          <p>
            Most of what I&apos;ve shipped lives in domains where being wrong is
            expensive — escrow payments, school records, data purchases. So I
            care disproportionately about the parts nobody demos: explicit
            loading and error states, honest empty screens, and messages that
            tell a user where their money or their data went.
          </p>
          <p>
            I&apos;ve led a small frontend team, which mostly taught me that
            setting a readable standard and reviewing against it beats being the
            person who writes the most code. I&apos;m now pointing all of that at
            AI engineering, because the interesting reliability problems have
            moved there.
          </p>
        </Reveal>

        <div className="space-y-10">
          <Reveal delay={80}>
            <p className="eyebrow">Credentials</p>
            <ul className="mt-5 space-y-3">
              {credentials.map((credential) => {
                const label = (
                  <>
                    <span className="block text-[0.9375rem] leading-snug">
                      {credential.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.6875rem] text-subtle-foreground">
                      {`${credential.issuer} · ${credential.year}`}
                    </span>
                  </>
                );

                return (
                  <li key={credential.name}>
                    {credential.url ? (
                      <a
                        href={credential.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <span>{label}</span>
                        <ArrowUpRight
                          className="mt-1 size-3 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          strokeWidth={2}
                        />
                      </a>
                    ) : (
                      <div
                        className={
                          credential.inProgress
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <p className="eyebrow">Education</p>
            <ul className="mt-5 space-y-3">
              {education.map((item) => (
                <li
                  key={item.qualification}
                  className="text-[0.9375rem] leading-snug text-muted-foreground"
                >
                  {item.qualification}
                  <span className="mt-0.5 block font-mono text-[0.6875rem] text-subtle-foreground">
                    {item.institution
                      ? `${item.institution} · ${item.year}`
                      : item.year}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="eyebrow">Based in</p>
            <p className="mt-5 text-[0.9375rem] leading-snug text-muted-foreground">
              {`${contact.location} · ${contact.timezone}`}
              <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty">
                {contact.overlap}
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stack — full width, so it reads as a band rather than a long tail */}
      <Reveal className="mt-16">
        <div className="border-t border-border pt-8">
          <p className="eyebrow">Stack</p>
          <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((group) => (
              <div key={group.label}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle-foreground">
                  {group.label}
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
