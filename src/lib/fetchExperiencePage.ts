import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchExperiencePage(slug: string) {
  const page = await fetchStructuredPageBySlug("experience", slug);

  if (!page) return null;

  return {
    ...page,
    detail_rows: page.detail_rows ?? [],
    gallery: page.gallery
      ? {
          standard_media: page.gallery.standard_media ?? [],
          featured_media: page.gallery.featured_media ?? [],
          featured_content_sections: page.gallery.featured_content_sections ?? [],
          featured_interval: page.gallery.featured_interval ?? 6,
        }
      : null,
  };
}
