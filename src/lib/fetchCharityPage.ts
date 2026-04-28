import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

type NormalizedGallery = {
  standard_media: unknown[];
  featured_media: unknown[];
  featured_content_sections: unknown[];
  featured_interval: number;
};

function normalizeGallery(gallery: unknown): NormalizedGallery | null {
  if (!gallery || typeof gallery !== "object") return null;

  const g = gallery as Partial<NormalizedGallery>;

  return {
    standard_media: Array.isArray(g.standard_media) ? g.standard_media : [],
    featured_media: Array.isArray(g.featured_media) ? g.featured_media : [],
    featured_content_sections: Array.isArray(g.featured_content_sections)
      ? g.featured_content_sections
      : [],
    featured_interval:
      typeof g.featured_interval === "number" ? g.featured_interval : 6,
  };
}

export async function fetchCharityPage(slug: string) {
  const page = await fetchStructuredPageBySlug("charity", slug);

  if (!page) return null;

  return {
    ...page,
    detail_rows: page.detail_rows ?? [],
    gallery: normalizeGallery(page.gallery),
  };
}
