"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds, applied as a CSS delay rather than a timer. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Longest we'll ever leave content hidden waiting for the observer. */
const FAILSAFE_MS = 1200;

/**
 * Reveals children on first scroll into view.
 *
 * The important property here is that it fails *open*. Content whose resting
 * state is `opacity: 0` disappears entirely if the animation never runs — a
 * throttled background tab, a broken observer, JS disabled. So:
 *
 *  - The hidden state is behind `motion-safe`, so reduced-motion users and
 *    the no-JS render both get visible content.
 *  - A CSS transition (not a keyframe animation) carries the reveal, because a
 *    transition that never runs snaps to its end value instead of freezing at
 *    its start value.
 *  - A failsafe timer shows the content regardless if the observer hasn't
 *    reported within `FAILSAFE_MS`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const failsafe = window.setTimeout(() => setShown(true), FAILSAFE_MS);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={{ transitionDelay: shown && delay ? `${delay}ms` : undefined }}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
        shown
          ? "opacity-100 translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-3",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
