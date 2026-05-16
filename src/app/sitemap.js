import { getSiteUrl, isIndexingAllowed } from "@/lib/siteUrl";
import { fetchStrapiSlugs } from "@/lib/sitemapSlugs";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/designers", changeFrequency: "weekly", priority: 0.9 },
  { path: "/featured-artists", changeFrequency: "weekly", priority: 0.9 },
  { path: "/speakers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/press", changeFrequency: "weekly", priority: 0.8 },
  { path: "/white-label", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
];

const DYNAMIC_COLLECTIONS = [
  { prefix: "/experiences", collection: "experience-pages", priority: 0.7 },
  { prefix: "/charity", collection: "charity-pages", priority: 0.7 },
  { prefix: "/designers", collection: "designers", priority: 0.6 },
  { prefix: "/featured-artists", collection: "featured-artists", priority: 0.6 },
];

export default async function sitemap() {
  if (!isIndexingAllowed()) {
    return [];
  }

  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const dynamicGroups = await Promise.all(
    DYNAMIC_COLLECTIONS.map(async ({ prefix, collection, priority }) => {
      const slugs = await fetchStrapiSlugs(collection);
      return slugs.map((slug) => ({
        url: `${siteUrl}${prefix}/${slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority,
      }));
    })
  );

  return [...staticEntries, ...dynamicGroups.flat()];
}
