/**
 * Canonical public site URL for metadata, robots, and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.nolcha.com).
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

/** Block crawlers on preview deploys and when ROBOTS_BLOCK=true. */
export function isIndexingAllowed() {
  if (process.env.ROBOTS_BLOCK === "true") return false;
  if (process.env.VERCEL_ENV === "preview") return false;
  return true;
}
