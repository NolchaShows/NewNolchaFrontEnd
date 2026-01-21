// @ts-nocheck
import FashionGrid3x3 from "@/components/shao/FashionGrid3x3";
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

export default async function GallerySection({ slug }: { slug: string }) {
  const page = await fetchExperiencePage(slug);
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksGallery"
  ) as any;

  if (!block) return null;

  const images =
    (block.items || [])
      .map((item: any) => getBestImageUrl(item?.image))
      .filter(Boolean) || [];

  if (!images.length) return null;

  return <FashionGrid3x3 images={images.slice(0, 9)} background="#FEF991" />;
}

