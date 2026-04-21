import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchSpeakersPage(slug: string) {
  const page = await fetchStructuredPageBySlug("speakers", slug);

  if (!page) return null;

  return {
    ...page,
    shared_speaker_section: page.shared_speaker_section ?? null,
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
