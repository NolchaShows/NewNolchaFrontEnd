import TweetCarousel from "@/components/common/TweetCarousel";
import {
  fetchStructuredPageBySlug,
  type StructuredPageType,
} from "@/lib/fetchStructuredPageBySlug";

export default async function SharedTweetCarouselSection({
  slug,
  pageType = "experience",
  page,
  variant = "dark",
  cardVariant,
}: {
  slug: string;
  pageType?: StructuredPageType;
  page?: any;
  variant?: "dark" | "light";
  cardVariant?: "dark" | "light";
}) {
  if (!slug) return null;

  try {
    const resolvedPage = page ?? (await fetchStructuredPageBySlug(pageType, slug));
    const carousel =
      resolvedPage?.shared_tweet_carousel || resolvedPage?.sharedTweetCarousel || null;

    if (!carousel?.items?.length) return null;

    return (
      <TweetCarousel
        posts={[]}
        carousalData={carousel}
        variant={variant}
        cardVariant={cardVariant}
        padding=""
        title="Community Moments"
      />
    );
  } catch {
    return null;
  }
}
