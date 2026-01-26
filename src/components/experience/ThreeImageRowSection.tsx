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

  const mediaItems = [
    normalizeMedia(block.firstMedia),
    normalizeMedia(block.secondMedia),
    normalizeMedia(block.thirdMedia),
  ].filter(Boolean) as Array<{ type: string; url: string }>;

  if (!mediaItems.length) return null;

  return (
    <ThreeImageRow
      mediaItems={mediaItems}
      line1="360 Projection"
      line2="Mapped Venue"
      background="#D1FFE9"
    />
  );
}

