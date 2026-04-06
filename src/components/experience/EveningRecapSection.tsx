// @ts-nocheck
import EveningRecap from "@/components/common/EveningRecap";
import { fetchExperiencePage } from "@/lib/graphql/fetchExperiencePage";

const getVideoUrl = (media: any): string | null => {
  if (!media) return null;
  return media.url ?? null;
};

export default async function EveningRecapSection({
  slug,
}: {
  slug: string;
}) {
  const page = await fetchExperiencePage(slug);
  const blocks = page?.blocks || [];
  const block = blocks.find(
    (b) => b?.__typename === "ComponentBlocksEveningRecapSection"
  ) as any;

  if (!block) return null;

  const videoUrl = getVideoUrl(block.video) || "";
  if (!videoUrl) return null;

  const title =
    typeof block.title === "string" ? block.title.trim() : "";

  return (
    <EveningRecap
      year="2024"
      title={title}
      videoUrl={videoUrl}
      paddingTop={undefined}
    />
  );
}

