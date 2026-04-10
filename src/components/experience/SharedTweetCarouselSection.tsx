import TweetCarousel from "@/components/common/TweetCarousel";
import type { StructuredPageType } from "@/lib/fetchStructuredPageBySlug";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export default async function SharedTweetCarouselSection({
  slug,
  pageType = "experience",
}: {
  slug: string;
  pageType?: StructuredPageType;
}) {
  if (!slug) return null;

  try {
    const resource = pageType === "charity" ? "charity-pages" : "experience-pages";
    const query = [
      `filters[slug][$eq]=${encodeURIComponent(slug)}`,
      "populate[0]=shared_tweet_carousel",
      "populate[1]=shared_tweet_carousel.items",
    ].join("&");
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/${resource}?${query}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return null;

    const json = await response.json();
    const rawPage = Array.isArray(json?.data) ? json.data[0] : json?.data || null;
    const page = rawPage?.attributes || rawPage || null;
    const carousel = page?.shared_tweet_carousel || page?.sharedTweetCarousel || null;

    if (!carousel?.items?.length) return null;

    return (
      <TweetCarousel
        posts={[]}
        carousalData={carousel}
        padding=""
        title="Community Moments"
      />
    );
  } catch {
    return null;
  }
}
