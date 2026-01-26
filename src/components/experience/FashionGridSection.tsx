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

const isVideoMedia = (media: any): boolean => {
  if (!media) return false;
  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();
  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const normalizeMedia = (media: any) => {
  if (!media) return null;
  if (isVideoMedia(media)) {
    return { type: "video", url: media.url };
  }
  const imageUrl = getBestImageUrl(media);
  return imageUrl ? { type: "image", url: imageUrl } : null;
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

  const mediaItems = [
    normalizeMedia(block.topMedia),
    normalizeMedia(block.middleMedia1),
    normalizeMedia(block.middleMedia2),
    normalizeMedia(block.middleMedia3),
    normalizeMedia(block.bottomMedia),
  ].filter(Boolean) as Array<{ type: string; url: string }>;

  return (
    <FashionGrid
      leftMedia={normalizeMedia(block.leftMedia)}
      rightMedia={normalizeMedia(block.rightMedia)}
      mediaItems={mediaItems}
      background="#FEF991"
    />
  );
}

