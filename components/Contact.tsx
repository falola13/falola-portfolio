"use client";

import { useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { contact } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./Reveal";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

const SUBJECTS = [
  { value: "role", label: "A role on your team" },
  { value: "project", label: "Project work" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Something else" },
];

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const update =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Couldn't send that. Try again?");
      }

      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send that. Try again, or email me directly.",
      );
    }
  };

  const fieldClasses =
    "w-full rounded-[calc(var(--radius)-2px)] border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-subtle-foreground hover:border-border-strong focus:border-accent focus:outline-none";

  const labelClasses =
    "block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle-foreground";

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="hairline" />
          <header className="mt-8 mb-12 sm:mb-16">
            <p className="eyebrow">05 — Contact</p>
            <h2 className="mt-4 text-headline">Let&apos;s talk.</h2>
            <p className="mt-4 max-w-prose text-lede text-muted-foreground text-pretty">
              I&apos;m open to full-stack and AI engineering roles, and to
              project work where the problem is interesting. Either form below
              reaches me — the direct email is faster.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_18rem]">
          <Reveal>
            <form onSubmit={handleSubmit} noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={update("name")}
                    className={`mt-2 ${fieldClasses}`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    value={form.email}
                    onChange={update("email")}
                    className={`mt-2 ${fieldClasses}`}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className={labelClasses}>
                  About
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={update("subject")}
                  className={`mt-2 ${fieldClasses}`}
                >
                  <option value="">Pick one</option>
                  {SUBJECTS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={4000}
                  value={form.message}
                  onChange={update("message")}
                  className={`mt-2 resize-y ${fieldClasses}`}
                  placeholder="What are you building?"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-[calc(var(--radius)-2px)] border border-border bg-surface px-3.5 py-3 text-sm"
                >
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.8}
                  />
                  <p className="text-muted-foreground">
                    {error}{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-accent underline underline-offset-2"
                    >
                      Email me instead
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="mt-7 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90 disabled:opacity-55"
                >
                  {status === "sending" && (
                    <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                  )}
                  {status === "sent" && (
                    <Check className="size-4" strokeWidth={2.2} />
                  )}
                  {status === "sending"
                    ? "Sending"
                    : status === "sent"
                      ? "Message sent"
                      : "Send message"}
                </button>

                {status === "sent" && (
                  <p
                    role="status"
                    className="text-sm text-muted-foreground animate-fade-in"
                  >
                    Thanks — I&apos;ll reply within a day or two.
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={100} className="space-y-9">
            <div>
              <p className="eyebrow">Direct</p>
              <a
                href={`mailto:${contact.email}`}
                className="link mt-4 inline-flex text-[0.9375rem]"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[0.9375rem] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                    <ArrowUpRight
                      className="size-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[0.9375rem] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <LinkedinIcon className="size-4" />
                    LinkedIn
                    <ArrowUpRight
                      className="size-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Availability</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty">
                {contact.location} · {contact.timezone}
                <span className="mt-1.5 block">{contact.overlap}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
