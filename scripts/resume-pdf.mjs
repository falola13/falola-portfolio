/**
 * Renders /resume to public/resume.pdf with headless Chromium.
 *
 * Run after `next build`. It starts the production server, prints the page the
 * same way a browser would, and stops the server again. The PDF is generated
 * from the same data as the site — never edited by hand — so it can't drift.
 *
 * In CI this runs from .github/workflows/resume-pdf.yml whenever résumé
 * content changes. Locally: `npm run resume:pdf`.
 */
import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const root = process.cwd();
const require = createRequire(import.meta.url);
const PORT = Number(process.env.RESUME_PDF_PORT ?? 3939);
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(root, "public", "resume.pdf");
const READY_TIMEOUT_MS = 60_000;

const readJson = async (file) =>
  JSON.parse(await readFile(path.join(root, "content", file), "utf8"));

/** Start `next start` and resolve once /resume answers, or reject if it dies or hangs. */
function startServer() {
  const nextBin = require.resolve("next/dist/bin/next");
  const server = spawn(
    process.execPath,
    [nextBin, "start", "-p", String(PORT), "-H", "127.0.0.1"],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  let log = "";
  server.stdout.on("data", (chunk) => (log += chunk));
  server.stderr.on("data", (chunk) => (log += chunk));

  const ready = new Promise((resolve, reject) => {
    const deadline = Date.now() + READY_TIMEOUT_MS;
    server.once("exit", (code) =>
      reject(new Error(`next start exited with code ${code} before it was ready:\n${log}`)),
    );
    const poll = async () => {
      try {
        const res = await fetch(`${BASE}/resume`);
        if (res.ok) return resolve();
      } catch {
        // not listening yet
      }
      if (Date.now() > deadline) {
        return reject(new Error(`next start wasn't ready after ${READY_TIMEOUT_MS / 1000}s:\n${log}`));
      }
      setTimeout(poll, 500);
    };
    poll();
  });

  return { server, ready };
}

/**
 * The date of the last commit touching résumé content. Using it for the PDF's
 * creation and modification dates makes the output depend only on the content,
 * so re-rendering unchanged content produces an identical file and CI has
 * nothing to commit.
 */
function contentDate() {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", "content", "app/resume", "app/globals.css"],
      { cwd: root, encoding: "utf8" },
    ).trim();
    if (iso) return new Date(iso);
  } catch {
    // not a git checkout
  }
  return new Date(Date.UTC(2026, 0, 1));
}

async function render() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ colorScheme: "light" });
    const res = await page.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
    if (!res || !res.ok()) throw new Error(`/resume returned ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({
      preferCSSPageSize: true, // A4 and margins come from the @page rule in globals.css
      printBackground: true,
      displayHeaderFooter: false, // no browser-stamped date, URL, or page numbers
      tagged: true, // structure tags: reading order for screen readers and parsers
    });
  } finally {
    await browser.close();
  }
}

/** Document properties some applicant tracking systems read before the body text. */
async function withMetadata(pdfBytes) {
  const [profile, stack] = await Promise.all([
    readJson("profile.json"),
    readJson("stack.json"),
  ]);
  const doc = await PDFDocument.load(pdfBytes, { updateMetadata: false });
  const date = contentDate();
  doc.setTitle(`${profile.name} — Résumé`, { showInWindowTitleBar: true });
  doc.setAuthor(profile.name);
  doc.setSubject(`${profile.title} résumé`);
  doc.setKeywords(stack.items.flatMap((group) => group.items));
  doc.setCreator("falola.is-a.dev");
  doc.setProducer("Chromium via Playwright");
  doc.setCreationDate(date);
  doc.setModificationDate(date);
  doc.setLanguage("en");
  return doc.save();
}

const { server, ready } = startServer();
try {
  await ready;
  const pdf = await withMetadata(await render());
  await writeFile(OUT, pdf);
  console.log(`Wrote ${path.relative(root, OUT)} (${(pdf.length / 1024).toFixed(1)} KB)`);
} finally {
  server.kill();
}
