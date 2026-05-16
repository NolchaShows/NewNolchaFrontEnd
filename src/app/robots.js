import { getSiteUrl, isIndexingAllowed } from "@/lib/siteUrl";

export default function robots() {
  const siteUrl = getSiteUrl();

  if (!isIndexingAllowed()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
