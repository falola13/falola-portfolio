/**
 * Checks public/resume.pdf the way an applicant tracking system reads it: by
 * extracting the text layer and parsing that. What a person sees on the page
 * doesn't matter here — only what comes out of the extraction.
 *
 * There is no single "ATS standard"; Workday, Greenhouse, Lever, iCIMS and
 * Taleo all parse differently. These checks cover the failure modes they share.
 * FAIL exits non-zero (and fails CI); WARN is content advice that doesn't block.
 *
 * Usage: node scripts/check-resume-pdf.mjs [path/to/resume.pdf]
 * Set RESUME_CHECK_DUMP=1 to print the extracted text.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, PDFName } from "pdf-lib";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = process.cwd();
const file = path.resolve(root, process.argv[2] ?? "public/resume.pdf");
const readJson = async (name) =>
  JSON.parse(await readFile(path.join(root, "content", name), "utf8"));

const [profile, contact, roles, stack, education, credentials] =
  await Promise.all(
    ["profile", "contact", "roles", "stack", "education", "credentials"].map(
      (name) => readJson(`${name}.json`),
    ),
  );

// --- extract -----------------------------------------------------------------

const bytes = await readFile(file);
const pdf = await getDocument({ data: new Uint8Array(bytes), isEvalSupported: false }).promise;
const meta = await pdf.getMetadata();

// Structure is read from the catalog with pdf-lib: pdf.js's getMarkInfo()
// doesn't return a plain object, so reading `.Marked` off it is always undefined.
const catalog = (await PDFDocument.load(bytes, { updateMetadata: false })).catalog;
const markInfo = catalog.lookup(PDFName.of("MarkInfo"));
const isTagged =
  Boolean(catalog.lookup(PDFName.of("StructTreeRoot"))) &&
  markInfo?.lookup?.(PDFName.of("Marked"))?.toString() === "true";

/**
 * Rebuild lines by baseline, top to bottom and left to right. Within a line, a
 * space goes in only where there is a real gap between pieces of text — the
 * way parsers do it. Letter-spaced text comes out of Chromium as one piece per
 * glyph; joining those with spaces would read "SUMMARY" as "S U M M A R Y" and
 * blame the heading for what is really the checker's naivety.
 */
const lines = [];
for (let n = 1; n <= pdf.numPages; n++) {
  const page = await pdf.getPage(n);
  const { items } = await page.getTextContent();
  const rows = new Map();
  for (const item of items) {
    if (!("str" in item) || item.str.trim() === "") continue;
    const y = Math.round(item.transform[5]);
    const key = [...rows.keys()].find((k) => Math.abs(k - y) <= 2) ?? y;
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push({
      x: item.transform[4],
      width: item.width,
      size: Math.hypot(item.transform[0], item.transform[1]),
      str: item.str,
    });
  }
  for (const y of [...rows.keys()].sort((a, b) => b - a)) {
    const parts = rows.get(y).sort((a, b) => a.x - b.x);
    let joined = "";
    parts.forEach((part, i) => {
      const prev = parts[i - 1];
      const gap = prev ? part.x - (prev.x + prev.width) : 0;
      joined += (prev && gap > part.size * 0.2 ? " " : "") + part.str;
    });
    const glyphPieces = parts.filter((part) => part.str.trim().length === 1).length;
    lines.push({
      page: n,
      text: joined.replace(/\s+/g, " ").trim(),
      // One piece per glyph across most of a line is the signature of letter-spacing.
      letterSpaced: parts.length >= 4 && glyphPieces / parts.length > 0.7,
    });
  }
}
const text = lines.map((line) => line.text).join("\n");
const flat = text.replace(/\s+/g, " ");

// --- checks ------------------------------------------------------------------

const FAIL = "FAIL";
const WARN = "WARN";
const results = [];
const check = (level, name, ok, detail = "") =>
  results.push({ level: ok ? "PASS" : level, name, detail: ok ? "" : detail });
const has = (needle) => flat.toLowerCase().includes(needle.toLowerCase());
const lineIndex = (predicate) => lines.findIndex((line) => predicate(line.text));

// 1. A real text layer, not an image of text.
check(FAIL, "Has an extractable text layer", flat.length > 1500,
  `only ${flat.length} characters extracted`);

// 2. Glyphs that extract as the wrong characters.
const ligatures = flat.match(/[ﬀ-ﬆ]/g);
check(FAIL, "No ligature glyphs", !ligatures,
  `found ${ligatures?.length}: "certification" extracts as "certiﬁcation" and stops matching keyword searches`);
const garbled = flat.match(/[-�]/g);
check(FAIL, "No unmapped or private-use glyphs", !garbled,
  `found ${garbled?.length} characters with no Unicode mapping`);

// 2b. Letter-spaced text. Extraction is parser-dependent: PyMuPDF reads a
//     letter-spaced "SKILLS" correctly, but pdf.js returns "S K I L L S" as a
//     single string, and a section keyed on "Skills" is never found. Caught two
//     ways: split into one piece per glyph, or already spaced out by the extractor.
const SPACED_OUT = /(?:^|\s)(?:\p{L} ){3,}\p{L}(?=\s|$)/u;
const spaced = lines
  .filter((line) => line.letterSpaced || SPACED_OUT.test(line.text))
  .map((line) => `"${line.text}"`);
check(FAIL, "No letter-spaced text", spaced.length === 0,
  `${spaced.length} line(s) extract as separate letters, e.g. ${spaced.slice(0, 3).join(", ")}`);

// 3. Things the browser adds to a printout.
check(FAIL, "No browser-stamped header or footer",
  !/localhost|127\.0\.0\.1|\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}|\bPage \d+ of \d+\b|^\d+\/\d+$/m.test(text),
  "found a URL, timestamp, or page counter added by the browser");

// 4. Parsers take the first line as the candidate's name.
check(FAIL, "Name is the first line", lines[0]?.text === profile.name,
  `first line is "${lines[0]?.text}"`);

// 5. Contact details, in plain text.
check(FAIL, "Email is extractable", has(contact.email), `"${contact.email}" not found`);
if (contact.phone) {
  const digits = contact.phone.replace(/\D/g, "");
  check(FAIL, "Phone is extractable", flat.replace(/\D/g, "").includes(digits),
    `"${contact.phone}" not found`);
}
for (const url of [contact.linkedin, contact.github]) {
  const bare = url.replace(/^https?:\/\/(www\.)?/, "");
  check(FAIL, `URL written out: ${bare}`, has(bare),
    "a hyperlink with no visible URL is invisible to a parser");
}

// 6. Your location should sit with your contact details, and be the only
//    place named on its line. The working-hours note names European cities;
//    beside the location, a parser can take one of them as where you live.
const contactLine = lines.find((line) => line.text.includes(contact.email))?.text ?? "";
check(FAIL, "Location is on the contact line", contactLine.includes(contact.location),
  `contact line is "${contactLine}"`);
const locationLine = lines.find((line) => line.text.includes(contact.location))?.text ?? "";
const otherPlaces = (contact.overlap.match(/\b[A-Z][a-z]+\b/g) ?? []).filter(
  (word) => !contact.location.includes(word) && !["Same", "European", "Eastern"].includes(word),
);
const leaked = otherPlaces.filter((place) => locationLine.includes(place));
check(FAIL, "No other place names beside your location", leaked.length === 0,
  `${leaked.join(", ")} on the same line as "${contact.location}": a location parser can take one of these as where you live`);

// 7. Standard section headings, each on its own line, in conventional order.
const HEADINGS = ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"];
const headingAt = HEADINGS.map((heading) =>
  lineIndex((t) => t.toLowerCase() === heading.toLowerCase()),
);
HEADINGS.forEach((heading, i) => {
  const spacedOut = lines.find(
    (line) => line.text.replace(/ /g, "").toLowerCase() === heading.toLowerCase(),
  );
  check(FAIL, `Standard heading "${heading}"`, headingAt[i] !== -1,
    spacedOut
      ? `extracts as "${spacedOut.text}" (letter-spacing), so a search for "${heading}" misses it`
      : `no line reads exactly "${heading}"; parsers key sections on standard headings`);
});
const present = headingAt.filter((i) => i !== -1);
check(FAIL, "Sections extract in reading order",
  present.every((value, i) => i === 0 || value > present[i - 1]),
  "headings come out of order, which is what a multi-column layout does to a parser");

// 8. Every role: title, company, and a date range a parser can read.
const MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const RANGE = new RegExp(`^${MONTH} \\d{4} - (?:${MONTH} \\d{4}|Present)$`);
let previousRole = -1;
for (const role of roles.items) {
  const titleAt = lineIndex((t) => t.startsWith(role.title));
  check(FAIL, `Role title: ${role.title}`, titleAt !== -1, "not found at the start of a line");
  check(FAIL, `Company: ${role.company}`, has(role.company), "not found");
  if (titleAt !== -1) {
    check(FAIL, `Role in sequence: ${role.title}`, titleAt > previousRole,
      "extracts out of order relative to the role above it");
    previousRole = titleAt;
    const dates = lines[titleAt].text.slice(role.title.length).trim();
    check(FAIL, `Dates on the title line: ${role.title}`, /\d{4}/.test(dates),
      `title line is "${lines[titleAt].text}"`);
    if (/\d{4}/.test(dates)) {
      check(FAIL, `Plain hyphen in date range: ${role.title}`, !/[–—]/.test(dates),
        `"${dates}": some parsers only split a range on a plain hyphen`);
      check(WARN, `Month and year at both ends: ${role.title}`, RANGE.test(dates),
        `"${dates}": a bare year on one end is where date parsers most often give up`);
    }
  }
  for (const bullet of role.bullets) {
    check(FAIL, `Bullet extracts intact (${role.company})`, has(bullet.slice(0, 60)),
      `"${bullet.slice(0, 60)}..." did not come out as continuous text`);
  }
}

// 9. Keywords: every listed skill, spelled as listed.
const skills = stack.items.flatMap((group) => group.items);
const missing = skills.filter((skill) => !has(skill));
check(FAIL, `All ${skills.length} skills extract as keywords`, missing.length === 0,
  `missing: ${missing.join(", ")}`);

// 10. Education and certifications.
for (const item of education.items) {
  check(FAIL, `Education: ${item.qualification}`, has(item.qualification), "not found");
}
for (const item of credentials.items) {
  check(FAIL, `Certification: ${item.name}`, has(item.name), "not found");
}

// 11. The file itself.
check(FAIL, "Tagged PDF", isTagged,
  "no structure tags; reading order is left to guesswork");
check(WARN, "Document title set", Boolean(meta.info?.Title), "empty Title property");
check(WARN, "Author set to your name", meta.info?.Author === profile.name,
  `Author is "${meta.info?.Author ?? ""}"`);
check(WARN, "Two pages or fewer", pdf.numPages <= 2, `${pdf.numPages} pages`);

// --- report ------------------------------------------------------------------

const rank = { FAIL: 0, WARN: 1, PASS: 2 };
const width = Math.max(...results.map((r) => r.name.length));
for (const r of [...results].sort((a, b) => rank[a.level] - rank[b.level])) {
  console.log(`${r.level}  ${r.name.padEnd(width)}${r.detail ? `  ${r.detail}` : ""}`);
}
const count = (level) => results.filter((r) => r.level === level).length;
console.log(
  `\n${path.relative(root, file)}: ${pdf.numPages} page(s), ${flat.length} characters. ` +
    `${count("PASS")} passed, ${count("WARN")} warnings, ${count("FAIL")} failed.`,
);
if (process.env.RESUME_CHECK_DUMP) console.log(`\n--- extracted text ---\n${text}`);
process.exit(count("FAIL") ? 1 : 0);
