import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        foreground: "hsl(var(--foreground))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        "subtle-foreground": "hsl(var(--subtle-foreground))",
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          subtle: "hsl(var(--accent-subtle))",
        },
        positive: "hsl(var(--positive))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display sizes carry their own leading and negative tracking
        display: [
          "clamp(2.5rem, 7vw, 4.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        headline: [
          "clamp(1.75rem, 3.6vw, 2.375rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em" },
        ],
        title: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        lede: ["clamp(1.0625rem, 1.6vw, 1.1875rem)", { lineHeight: "1.65" }],
      },
      maxWidth: {
        prose: "38rem",
      },
      transitionTimingFunction: {
        // Soft deceleration used across reveals and hovers
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        breathe: "breathe 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
