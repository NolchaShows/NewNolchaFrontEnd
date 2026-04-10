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

const normalizeMediaList = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

export default async function GallerySection({ slug }: { slug: string }) {
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/experience-pages/by-slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) return null;

  const json = await response.json();
  const page = json?.data?.attributes || json?.data || null;
  const gallery = page?.gallery?.attributes || page?.gallery || null;
  const images = Array.from(
    new Set(
      normalizeMediaList(gallery?.images)
        .map((image: any) => getBestImageUrl(image?.attributes || image))
        .filter(Boolean)
    )
  );

  if (!images.length) return null;

  return <ProgressiveFashionGridGallery images={images} background="#FEF991" />;
}

