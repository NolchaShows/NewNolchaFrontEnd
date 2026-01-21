// @ts-nocheck
import FashionGrid from "@/components/shao/FashionGrid";
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

const getVideoUrl = (media: any): string | null => {
  if (!media) return null;
  return media.url ?? null;
};

export default async function FashionGridSection({
  slug,
}: {
  slug: string;
}) {
  const page = await fetchExperiencePage(slug);
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksFashionGridSection"
  ) as any;

  if (!block) return null;

  const images = [
    getBestImageUrl(block.topImage),
    getBestImageUrl(block.middleImage1),
    getBestImageUrl(block.middleImage2),
    getBestImageUrl(block.middleImage3),
    getBestImageUrl(block.bottomImage),
  ].filter(Boolean) as string[];

  return (
    <FashionGrid
      leftVideo={getVideoUrl(block.leftVideo) || ""}
      rightVideo={getVideoUrl(block.rightVideo) || ""}
      images={images}
      background="#FEF991"
    />
  );
}

