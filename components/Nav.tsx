"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio-data";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#focus", label: "Focus" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently occupying the upper half of the viewport.
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        condensed
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-3">
          <a
            href="#top"
            className="shrink-0 font-mono text-[0.8125rem] tracking-tight text-foreground"
            aria-label={`${profile.name} — back to top`}
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </a>

          {/*
            The links stay available on mobile — a recruiter reading this on a
            phone shouldn't have to scroll the whole page to reach the work.
            The row scrolls sideways if it runs out of room, and the CTA drops
            away below `sm` to make space for it.
          */}
          <nav
            aria-label="Sections"
            className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex md:justify-center"
          >
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {links.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href} className="shrink-0">
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-3 text-xs transition-colors duration-200 sm:px-3.5 sm:text-[0.8125rem]",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[0.8125rem] font-medium text-background transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
