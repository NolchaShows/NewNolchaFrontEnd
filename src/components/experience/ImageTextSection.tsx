// @ts-nocheck
import ImageTextSection from "@/components/shao/ImageTextSection";
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

const htmlToParagraphs = (html?: string | null): string[] => {
  if (!html) return [];
  const cleaned = html
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return cleaned
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
};

export default async function ImageTextSectionServer({
  slug,
}: {
  slug: string;
}) {
  const page = await fetchExperiencePage(slug);
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksImageTextSection"
  ) as any;

  if (!block) return null;

  const imageUrl = getBestImageUrl(block.image) || "";
  const paragraphs = htmlToParagraphs(block.description);
  const tags =
    (block.tags || []).map((t: any) => ({
      label: t?.text || "",
      color: "#BDACFF",
    })) || [];

  return (
    <ImageTextSection
      image={imageUrl}
      title={block.title || ""}
      paragraphs={paragraphs}
      background="#FFF7E6"
      tags={tags}
    />
  );
}

