import {
  config,
  fields,
  singleton,
  type ComponentSchema,
} from "@keystatic/core";

/**
 * The admin for everything in content/. Served at /keystatic (and /admin, which
 * redirects there).
 *
 * In production, storage is GitHub: logging in goes through a GitHub App, and
 * saving commits the JSON straight to the repo, which Vercel deploys. Only
 * accounts with write access to the repo can save anything, so the admin can
 * be publicly reachable without being publicly usable. In development it
 * writes to the local files instead; set NEXT_PUBLIC_KEYSTATIC_STORAGE=github
 * to exercise the GitHub flow locally (needed once, to create the GitHub App).
 *
 * Field order matches the key order in the JSON files, so the first save from
 * the admin doesn't produce a diff that only reshuffles keys.
 */

const useGitHub =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

// Shared field builders. Required text can't be saved blank, which also stops
// an empty bullet being written into a list as `null`.
const required = (label: string, description?: string) =>
  fields.text({ label, description, validation: { isRequired: true } });

const paragraph = (label: string, description?: string) =>
  fields.text({
    label,
    description,
    multiline: true,
    validation: { isRequired: true },
  });

const optional = (label: string, description?: string) =>
  fields.text({ label, description });

const requiredUrl = (label: string) =>
  fields.url({ label, validation: { isRequired: true } });

const optionalUrl = (label: string, description?: string) =>
  fields.url({ label, description });

const tags = (label: string, description?: string) =>
  fields.array(required("Item"), {
    label,
    description,
    itemLabel: (props) => props.value,
  });

const lines = (label: string, itemName: string, description?: string) =>
  fields.array(paragraph(itemName), {
    label,
    description,
    itemLabel: (props) => props.value.slice(0, 80) || `New ${itemName.toLowerCase()}`,
  });

/** A list stored as `{ items: [...] }` in content/<file>.json. */
const list = <Items extends ComponentSchema>(
  file: string,
  label: string,
  items: Items,
) =>
  singleton({
    label,
    path: `content/${file}`,
    format: { data: "json" },
    schema: { items },
  });

const DATE_RANGE_HELP =
  'Use month and year at both ends — "Jan 2024 — Present" or "Jun 2024 — Sep 2025". ' +
  "Applicant tracking systems parse consistent month-year ranges reliably; a bare year on one end often fails.";

export default config({
  storage: useGitHub
    ? { kind: "github", repo: { owner: "falola13", name: "falola-portfolio" } }
    : { kind: "local" },

  ui: {
    brand: { name: "Portfolio admin" },
    navigation: {
      "On the résumé": [
        "profile",
        "contact",
        "roles",
        "stack",
        "projects",
        "caseStudies",
        "education",
        "credentials",
      ],
      "Site only": ["metrics", "focus", "sideProjects"],
    },
  },

  singletons: {
    profile: singleton({
      label: "Profile",
      path: "content/profile",
      format: { data: "json" },
      schema: {
        name: required("Full name"),
        shortName: required("Short name"),
        initials: required("Initials", "Used in the favicon and social card."),
        title: required(
          "Title",
          "Your job title, as a recruiter would search for it.",
        ),
        headline: paragraph(
          "Headline",
          "The one line that has to do the most work on the page.",
        ),
        lede: paragraph("Lede", "The opening paragraph on the website."),
        availability: required("Availability"),
        resumeSummary: paragraph(
          "Résumé summary",
          "The résumé opener. Deliberately different from the web lede: a recruiter screening on " +
            "keywords needs the stack and the direction stated plainly in the first three lines.",
        ),
      },
    }),

    contact: singleton({
      label: "Contact",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        email: required("Email"),
        phone: optional(
          "Phone",
          "Résumé only — never rendered on the public page. A phone number in crawlable HTML is a spam magnet.",
        ),
        location: required(
          "Location",
          "City, Country — applicant tracking systems read this for location filters.",
        ),
        timezone: required("Timezone"),
        overlap: paragraph(
          "Working-hours overlap",
          "Stated in terms of the hiring manager's calendar, not yours. Naming their cities does the arithmetic for them.",
        ),
        linkedin: requiredUrl("LinkedIn URL"),
        github: requiredUrl("GitHub URL"),
      },
    }),

    roles: list(
      "roles",
      "Experience",
      fields.array(
        fields.object({
          title: required(
            "Job title",
            "The title as it appeared on the contract — the field an ATS matches against the role you applied for.",
          ),
          company: required("Company"),
          location: required("Location"),
          period: required("Dates", DATE_RANGE_HELP),
          current: fields.checkbox({ label: "Current role" }),
          commitment: optional(
            "Weekly commitment",
            'For concurrent contracts, e.g. "~10 h/week". Several "Present" roles with no hours stated read as overemployment risk.',
          ),
          clients: tags(
            "Clients",
            "Client engagements delivered through this employer, if any.",
          ),
          bullets: lines(
            "Bullets",
            "Bullet",
            "Start with a verb. Name a number only if you can say where it came from.",
          ),
        }),
        {
          label: "Experience",
          description: "Most recent start date first.",
          itemLabel: (props) =>
            `${props.fields.title.value} — ${props.fields.company.value}`,
        },
      ),
    ),

    stack: list(
      "stack",
      "Skills",
      fields.array(
        fields.object({
          label: required("Group", "e.g. Languages, Frontend, Backend."),
          items: tags(
            "Skills",
            'Use the standard name — "PostgreSQL", not "Postgres" — so keyword matching finds it.',
          ),
        }),
        { label: "Skills", itemLabel: (props) => props.fields.label.value },
      ),
    ),

    projects: list(
      "projects",
      "Open-source projects",
      fields.array(
        fields.object({
          name: required("Name"),
          tagline: required(
            "Tagline",
            'Short technical framing, e.g. "Go · PostgreSQL · personal project".',
          ),
          description: paragraph("Description", "Shown on the website."),
          highlights: lines(
            "Highlights",
            "Highlight",
            "Each one independently checkable in the repo. Do not add one that isn't.",
          ),
          stack: tags("Stack"),
          repoUrl: requiredUrl("Repository URL"),
          liveUrl: optionalUrl("Live URL", "A running instance, where one exists."),
          resumeDescription: paragraph(
            "Résumé description",
            "The résumé rendering of this project: one dense paragraph with the claims in prose.",
          ),
        }),
        {
          label: "Open-source projects",
          description: "Public repos a reviewer can read line by line.",
          itemLabel: (props) => props.fields.name.value,
        },
      ),
    ),

    caseStudies: list(
      "case-studies",
      "Case studies",
      fields.array(
        fields.object({
          id: required(
            "ID",
            "Lowercase, no spaces. Used as the anchor on the page.",
          ),
          company: required(
            "Company",
            "If this matches a company under Experience, the résumé skips this case study rather than repeat it.",
          ),
          title: required("Title"),
          summary: paragraph("Summary", "One line on what the product is."),
          contribution: paragraph(
            "Contribution",
            "What the work actually involved. Two to three sentences, no filler.",
          ),
          role: required("Role"),
          period: required("Dates", DATE_RANGE_HELP),
          stack: tags("Stack"),
          metrics: fields.array(
            fields.object({
              value: required("Value", 'e.g. "25%".'),
              label: required("Label"),
              source: required(
                "Source",
                "Where the number comes from, so it can be defended in conversation.",
              ),
            }),
            {
              label: "Metrics",
              itemLabel: (props) =>
                `${props.fields.value.value} ${props.fields.label.value}`,
            },
          ),
          quote: fields.object(
            {
              content: optional("Quote", "Leave empty for no testimonial."),
              name: optional("Name"),
              role: optional("Their role"),
              company: optional("Their company"),
            },
            { label: "Testimonial" },
          ),
          liveUrl: optionalUrl("Live URL"),
        }),
        {
          label: "Case studies",
          itemLabel: (props) =>
            `${props.fields.company.value} — ${props.fields.title.value}`,
        },
      ),
    ),

    education: list(
      "education",
      "Education",
      fields.array(
        fields.object({
          qualification: required(
            "Qualification",
            'Spell the degree as awarded, e.g. "B.Sc. Statistics".',
          ),
          institution: optional("Institution"),
          year: required("Year"),
        }),
        {
          label: "Education",
          description: "Most recent first.",
          itemLabel: (props) => props.fields.qualification.value,
        },
      ),
    ),

    credentials: list(
      "credentials",
      "Certifications",
      fields.array(
        fields.object({
          name: required("Name"),
          issuer: required("Issuer"),
          year: required("Year", 'Or "In progress".'),
          url: optionalUrl("Verification URL"),
          inProgress: fields.checkbox({ label: "In progress" }),
        }),
        {
          label: "Certifications",
          description:
            "Deliberately short. A thin list next to substantial work is a stronger position than a padded one.",
          itemLabel: (props) => props.fields.name.value,
        },
      ),
    ),

    metrics: list(
      "metrics",
      "Headline metrics",
      fields.array(
        fields.object({
          value: required("Value"),
          label: required("Label"),
          source: required(
            "Source",
            "The specific engagement this number comes from. No unverifiable numbers.",
          ),
        }),
        {
          label: "Headline metrics",
          description:
            "Every figure maps to a specific engagement. Nothing aggregated, nothing rounded up.",
          itemLabel: (props) =>
            `${props.fields.value.value} ${props.fields.label.value}`,
        },
      ),
    ),

    focus: list(
      "focus",
      "Focus",
      fields.array(
        fields.object({
          label: required("Label"),
          detail: paragraph("Detail"),
          status: fields.select({
            label: "Status",
            options: [
              { label: "In progress", value: "in-progress" },
              { label: "Active", value: "active" },
              { label: "Next", value: "next" },
            ],
            defaultValue: "in-progress",
          }),
        }),
        {
          label: "Focus",
          description: "Written as intent and study, not as shipped achievement.",
          itemLabel: (props) => props.fields.label.value,
        },
      ),
    ),

    sideProjects: list(
      "side-projects",
      "Side projects",
      fields.array(
        fields.object({
          name: required("Name"),
          description: paragraph("Description"),
          stack: tags("Stack"),
          liveUrl: optionalUrl("Live URL"),
        }),
        { label: "Side projects", itemLabel: (props) => props.fields.name.value },
      ),
    ),
  },
});
