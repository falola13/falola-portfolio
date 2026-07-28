import { contact, profile } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sheen"
      />
      <div className="shell relative py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[0.8125rem]">
              {profile.initials}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {profile.name} — {profile.title}
            </p>
          </div>

          {/* Icon links get a full 40px tap target, not just the glyph. */}
          <div className="-mx-2 flex items-center gap-1">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-10 items-center px-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Email
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="GitHub profile"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-subtle-foreground">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[0.6875rem] text-subtle-foreground">
            Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
