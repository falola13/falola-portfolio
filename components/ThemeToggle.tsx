"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Stateless by design.
 *
 * The `dark` class is set by the blocking script in the document head before
 * paint, and the two icons are shown/hidden with `dark:` variants — so this
 * component holds no React state, can't disagree with the DOM, and never flips
 * its icon after hydration.
 */
export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Private browsing or blocked storage — the toggle still works for this
      // page view, it just won't be remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
    >
      <Moon className="size-[1.05rem] dark:hidden" strokeWidth={1.6} />
      <Sun className="hidden size-[1.05rem] dark:block" strokeWidth={1.6} />
    </button>
  );
}
