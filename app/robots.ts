import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The résumé carries a phone number. It's linked for humans, but it
        // has no business being crawled and scraped. "/resume" is a prefix
        // match, so it covers /resume.pdf as well. The admin and its API are
        // behind GitHub login, but there's nothing in them worth indexing.
        disallow: ["/resume", "/keystatic", "/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
