import {
  parseSharedTweetCarousel,
  pickSharedTweetCarouselRaw,
} from "@/lib/strapiFlatten";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export async function fetchFeaturedArtistPage(slug) {
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/featured-artists/by-slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  const page = json?.data?.attributes || json?.data || null;

  if (!page) return null;

  return {
    ...page,
    title: page.title || page.name || "Featured Artist",
    detail_rows: page.detail_rows ?? [],
    gallery: page.gallery
      ? {
          standard_media: page.gallery.standard_media ?? [],
          featured_media: page.gallery.featured_media ?? [],
          featured_content_sections: page.gallery.featured_content_sections ?? [],
          featured_interval: page.gallery.featured_interval ?? 6,
        }
      : null,
    shared_tweet_carousel: parseSharedTweetCarousel(
      pickSharedTweetCarouselRaw(page as Record<string, unknown>)
    ),
  };
}
