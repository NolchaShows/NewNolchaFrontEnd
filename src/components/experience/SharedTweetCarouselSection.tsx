import TweetCarousel from "@/components/common/TweetCarousel";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export default async function SharedTweetCarouselSection({
  slug,
}: {
  slug: string;
}) {
  if (!slug) return null;

  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/experience-pages/by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return null;

    const json = await response.json();
    const page = json?.data?.attributes || json?.data || null;
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
