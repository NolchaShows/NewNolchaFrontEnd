// @ts-nocheck
import ProgressiveFashionGridGallery from "@/components/experience/ProgressiveFashionGridGallery";
import {
  fetchStructuredPageBySlug,
  type StructuredPageType,
} from "@/lib/fetchStructuredPageBySlug";

const getBestImageUrl = (media: any): string | null => {
  if (!media) return null;
  const formats = media.formats || {};
  const large = formats.large;
  const medium = formats.medium;
  const small = formats.small;
  const thumbnail = formats.thumbnail;

  return (
    (large && large.url) ||
    media.url ||
    (medium && medium.url) ||
    (small && small.url) ||
    (thumbnail && thumbnail.url) ||
    null
  );
};

export default async function GallerySection({
  slug,
  pageType = "experience",
  page,
}: {
  slug: string;
  pageType?: StructuredPageType;
  page?: any;
}) {
  const resolvedPage = page ?? (await fetchStructuredPageBySlug(pageType, slug));
  const blocks = resolvedPage?.blocks || [];
  const galleryBlock = blocks.find(
    (b: any) => b?.__typename === "ComponentBlocksGallery" || b?.__component === "blocks.gallery"
  ) as any;

  if (!galleryBlock) return null;

  const images = Array.from(
    new Set(
      (galleryBlock.images || [])
        .map((image: any) => getBestImageUrl(image))
        .filter(Boolean)
    )
  );

  if (!images.length) return null;

  return <ProgressiveFashionGridGallery images={images} background="#FEF991" />;
}

