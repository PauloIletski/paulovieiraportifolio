import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://paulovieira.site/sitemap.xml",
    host: "https://paulovieira.site",
  };
}
