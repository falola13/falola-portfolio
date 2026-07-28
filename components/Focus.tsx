import { focus } from "@/data/portfolio-data";
import { FocusItem } from "@/types";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const STATUS_LABEL: Record<FocusItem["status"], string> = {
  "in-progress": "In progress",
  active: "Active",
  next: "Next",
};

function statusClasses(status: FocusItem["status"]) {
  switch (status) {
    case "in-progress":
      return "border-accent/40 bg-accent-subtle text-accent";
    case "active":
      return "border-border-strong text-foreground";
    case "next":
      return "border-border text-subtle-foreground";
  }
}

export function Focus() {
  return (
    <Section
      id="focus"
      eyebrow="03 — Current focus"
      title="Taking product engineering into AI."
      intro="I'd rather show you what I'm learning than imply I've already mastered it. This is what's actually on my desk right now."
      className="relative"
    >
      <ol className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
        {focus.map((item, index) => (
          <Reveal as="li" key={item.label} delay={index * 60} className="bg-surface">
            <div className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] ${statusClasses(item.status)}`}
                >
                  {STATUS_LABEL[item.status]}
                </span>
              </div>

              <h3 className="mt-5 text-title">{item.label}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
