import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // No reason to let crawlers hammer the contact endpoint.
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
