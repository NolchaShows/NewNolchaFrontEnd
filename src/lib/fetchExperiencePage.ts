import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";
import {
  parseSharedTweetCarousel,
  pickSharedTweetCarouselRaw,
} from "@/lib/strapiFlatten";

export async function fetchExperiencePage(slug: string) {
  const page = await fetchStructuredPageBySlug("experience", slug);

  if (!page) return null;

  const p = page as Record<string, unknown>;
  const rawCarousel = pickSharedTweetCarouselRaw(p);

  /** Server-side: one parse; client gets only what TweetCarousel needs */
  const shared_tweet_carousel = parseSharedTweetCarousel(rawCarousel);

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
    shared_tweet_carousel,
  };
}
