import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The résumé carries a phone number. It's linked for humans, but it
        // has no business being crawled and scraped.
        disallow: "/resume",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
