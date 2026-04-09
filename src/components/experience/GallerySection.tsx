// @ts-nocheck
import ProgressiveFashionGridGallery from "@/components/experience/ProgressiveFashionGridGallery";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

const getBestImageUrl = (media: any): string | null => {
  if (!media) return null;
  const formats = media.formats || {};
  const medium = formats.medium;
  const small = formats.small;
  const large = formats.large;
  const thumbnail = formats.thumbnail;

  return (
    (medium && medium.url) ||
    (small && small.url) ||
    (large && large.url) ||
    media.url ||
    (thumbnail && thumbnail.url) ||
    null
  );
};

export default async function GallerySection({ slug }: { slug: string }) {
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/experience-pages/by-slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) return null;

  const json = await response.json();
  const page = json?.data?.attributes || json?.data || null;
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksGallery" || b?.__component === "blocks.gallery"
  ) as any;

  if (!block) return null;

  const images =
    (block.items || [])
      .map((item: any) => getBestImageUrl(item?.image))
      .filter(Boolean) || [];

  if (!images.length) return null;

  return <ProgressiveFashionGridGallery images={images} background="#FEF991" />;
}

