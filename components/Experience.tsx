import { roles } from "@/data/portfolio-data";
import { Role } from "@/types";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function RoleEntry({ role, index }: { role: Role; index: number }) {
  return (
    <Reveal as="li" delay={index * 50}>
      <div className="grid gap-x-10 gap-y-4 border-t border-border py-8 sm:grid-cols-[11rem_1fr]">
        <div>
          <p className="font-mono text-[0.75rem] text-muted-foreground">
            {role.period}
          </p>
          {role.current && (
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-positive">
              <span className="size-1 rounded-full bg-positive" />
              Current
            </p>
          )}
          {/*
            Stated hours on a concurrent contract. Ambiguous overlap between
            two "Present" roles invites the overemployment read; naming the
            commitment answers the question before it's asked.
          */}
          {role.commitment && (
            <p className="mt-1.5 font-mono text-[0.6875rem] text-subtle-foreground">
              {role.commitment}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-title">{role.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {role.company}
            <span className="mx-2 text-subtle-foreground">·</span>
            {role.location}
          </p>
          <ul className="mt-4 space-y-2">
            {role.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] size-1 shrink-0 rounded-full bg-border-strong"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function Experience() {
  const current = roles.filter((role) => role.current);
  const previous = roles.filter((role) => !role.current);

  return (
    <Section
      id="experience"
      eyebrow="02 — Experience"
      title="Where the work happened."
      intro="Two current engagements: a full-time consulting contract, and a long-running part-time contract with stated hours. Everything else is closed out with real end dates."
    >
      <ul>
        {current.map((role, index) => (
          <RoleEntry
            key={`${role.company}-${role.title}`}
            role={role}
            index={index}
          />
        ))}
      </ul>

      <Reveal className="mt-16">
        <p className="eyebrow">Earlier</p>
      </Reveal>

      <ul className="mt-6">
        {previous.map((role, index) => (
          <RoleEntry
            key={`${role.company}-${role.title}`}
            role={role}
            index={index}
          />
        ))}
      </ul>
    </Section>
  );
}
