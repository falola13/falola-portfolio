import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  /** Mono eyebrow label, e.g. "01 — Selected work". */
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared section chrome: hairline rule, mono eyebrow, headline, optional intro.
 * Every section on the page uses this so the vertical rhythm never drifts.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="shell">
        <Reveal>
          <div className="hairline" />
          <header className="mt-8 mb-12 sm:mb-16">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-4 text-headline">{title}</h2>
            {intro && (
              <p className="mt-4 max-w-prose text-lede text-muted-foreground text-pretty">
                {intro}
              </p>
            )}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
