import {
  flattenStrapiEntity,
  pickSharedTweetCarouselRaw,
} from "./strapiFlatten";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export type StructuredPageType = "experience" | "charity" | "home" | "speakers";

const RESOURCE_BY_TYPE: Record<StructuredPageType, string> = {
  experience: "experience-pages",
  charity: "charity-pages",
  home: "home-pages",
  speakers: "speakers-pages",
};

/**
 * Custom `experience-pages/by-slug/:slug` omits some relations even when populated
 * in admin. Merge from the standard collection endpoint when carousel is absent.
 */
async function mergeExperienceSharedTweetCarouselIfMissing(
  slug: string,
  flat: Record<string, unknown> | null
): Promise<Record<string, unknown> | null> {
  if (!flat) return flat;
  if (pickSharedTweetCarouselRaw(flat)) return flat;

  const q = new URLSearchParams();
  q.set("filters[slug][$eq]", slug);
  q.set("populate[0]", "shared_tweet_carousel");
  q.set("populate[1]", "shared_tweet_carousel.items");

  const response = await fetch(
    `${STRAPI_BASE_URL}/api/experience-pages?${q.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) return flat;

  const json = (await response.json()) as { data?: unknown[] };
  const first = json?.data?.[0];
  const fromList = flattenStrapiEntity(first);
  const carousel = pickSharedTweetCarouselRaw(fromList ?? undefined);

  if (!carousel) return flat;

  return { ...flat, shared_tweet_carousel: carousel };
}

export async function fetchStructuredPageBySlug(
  pageType: StructuredPageType,
  slug: string
) {
  if (pageType === "home") {
    const response = await fetch(`${STRAPI_BASE_URL}/api/home-page`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return flattenStrapiEntity(json?.data);
  }

  const resource = RESOURCE_BY_TYPE[pageType];
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/${resource}/by-slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  let flat = flattenStrapiEntity(json?.data);

  if (pageType === "experience") {
    flat = await mergeExperienceSharedTweetCarouselIfMissing(slug, flat);
  }

  return flat;
}
