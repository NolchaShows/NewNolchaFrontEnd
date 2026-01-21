// @ts-nocheck
import ThreeImageRow from "@/components/shao/ThreeImageRow";
import { fetchExperiencePage } from "@/lib/graphql/fetchExperiencePage";

const getBestImageUrl = (media: any): string | null => {
  if (!media) return null;
  const formats = media.formats || {};
  const large = formats.large;
  const medium = formats.medium;
  const small = formats.small;
  const thumbnail = formats.thumbnail;

  return (
    (large && large.url) ||
    (medium && medium.url) ||
    media.url ||
    (small && small.url) ||
    (thumbnail && thumbnail.url) ||
    null
  );
};

export default async function ThreeImageRowSection({
  slug,
}: {
  slug: string;
}) {
  const page = await fetchExperiencePage(slug);
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksThreeImageRow"
  ) as any;

  if (!block) return null;

  const images = [
    getBestImageUrl(block.firstImage),
    getBestImageUrl(block.secondImage),
    getBestImageUrl(block.thirdImage),
  ].filter(Boolean) as string[];

  if (!images.length) return null;

  return (
    <ThreeImageRow
      images={images}
      line1="360 Projection"
      line2="Mapped Venue"
      background="#D1FFE9"
    />
  );
}

