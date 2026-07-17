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
  speakers: "speakers-page",
};

/**
 * Custom `experience-pages/by-slug/:slug` omits some relations even when populated
 * in admin. Merge from the standard collection endpoint when carousel is absent.
 */
/** 60-second timeout — long enough to survive a Render cold start. */
const STRAPI_TIMEOUT_MS = 60_000;

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

  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/experience-pages?${q.toString()}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS) }
    );

    if (!response.ok) return flat;

    const json = (await response.json()) as { data?: unknown[] };
    const first = json?.data?.[0];
    const fromList = flattenStrapiEntity(first);
    const carousel = pickSharedTweetCarouselRaw(fromList ?? undefined);

    if (!carousel) return flat;

    return { ...flat, shared_tweet_carousel: carousel };
  } catch {
    return flat;
  }
}

/**
 * Fetches the below-the-fold portion of the home page singleton.
 * Call this in parallel with fetchStructuredPageBySlug("home", "") and merge
 * the two results so the above-fold endpoint stays fast and shallow.
 */
export async function fetchBelowFoldHomePage(): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/home-page/below-fold`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return flattenStrapiEntity(json?.data);
  } catch (err) {
    console.error("fetchBelowFoldHomePage error:", err);
    return null;
  }
}

/** Load a Shared Tweet Carousel by its `key` (e.g. homepage). */
export async function fetchSharedTweetCarouselByKey(
  key: string
): Promise<Record<string, unknown> | null> {
  const q = new URLSearchParams();
  q.set("filters[key][$eq]", key);
  q.set("populate", "*");
  q.set("pagination[pageSize]", "1");

  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/shared-tweet-carousels?${q.toString()}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS) }
    );

    if (!response.ok) return null;

    const json = (await response.json()) as { data?: unknown[] };
    const first = json?.data?.[0];
    return flattenStrapiEntity(first);
  } catch (err) {
    console.error(`fetchSharedTweetCarouselByKey(${key}) error:`, err);
    return null;
  }
}

export async function fetchStructuredPageBySlug(
  pageType: StructuredPageType,
  slug: string
) {
  if (pageType === "home") {
    try {
      const response = await fetch(`${STRAPI_BASE_URL}/api/home-page`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
      });

      if (!response.ok) {
        return null;
      }

      const json = await response.json();
      return flattenStrapiEntity(json?.data);
    } catch (err) {
      console.error("fetchStructuredPageBySlug(home) error:", err);
      return null;
    }
  }

  const resource = RESOURCE_BY_TYPE[pageType];
  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/${resource}/by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS) }
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
  } catch (err) {
    console.error(`fetchStructuredPageBySlug(${pageType}, ${slug}) error:`, err);
    return null;
  }
}
