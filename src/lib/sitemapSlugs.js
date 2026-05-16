const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
  "https://new-nolcha-strapi-uiai.onrender.com";

function slugFromEntry(entry) {
  if (!entry || typeof entry !== "object") return "";
  if (typeof entry.slug === "string") return entry.slug;
  const attrs = entry.attributes;
  if (attrs && typeof attrs.slug === "string") return attrs.slug;
  return "";
}

/**
 * @param {string} collection Strapi REST collection name (e.g. experience-pages)
 * @returns {Promise<string[]>}
 */
export async function fetchStrapiSlugs(collection) {
  try {
    const query = new URLSearchParams();
    query.set("fields[0]", "slug");
    query.set("pagination[pageSize]", "500");

    const response = await fetch(
      `${STRAPI_BASE_URL}/api/${collection}?${query.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return [];

    const json = await response.json();
    const rows = Array.isArray(json?.data) ? json.data : [];

    return rows.map(slugFromEntry).filter(Boolean);
  } catch {
    return [];
  }
}
