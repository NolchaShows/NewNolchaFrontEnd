// @ts-nocheck
import EveningRecap from "@/components/common/EveningRecap";
import { fetchStructuredPageBySlug, type StructuredPageType } from "@/lib/fetchStructuredPageBySlug";
import { resolveStrapiFileUrl } from "@/lib/strapiMediaUrl";

export default async function EveningRecapSection({
  slug,
  pageType = "experience",
  page,
}: {
  slug: string;
  pageType?: StructuredPageType;
  page?: any;
}) {
  const resolvedPage = page ?? (await fetchStructuredPageBySlug(pageType, slug));
  const explicitBlock =
    pageType === "home" ? (resolvedPage?.evening_recap_section as any) : null;
  const blocks = resolvedPage?.blocks || [];
  const block = explicitBlock || blocks.find(
    (b) =>
      b?.__typename === "ComponentBlocksEveningRecapSection" ||
      b?.__component === "blocks.evening-recap-section"
  ) as any;

  if (!block) return null;

  const sectionTitle = typeof block.title === "string" ? block.title.trim() : "";

  const slidesRaw = Array.isArray(block.slides) ? block.slides : [];
  const slideEntries = slidesRaw
    .map((s: any) => {
      const url = resolveStrapiFileUrl(s?.video);
      if (!url) return null;
      const t = typeof s?.title === "string" ? s.title.trim() : "";
      return {
        url,
        title: t,
        isGoogleDrive: url.includes("drive.google.com"),
      };
    })
    .filter(Boolean);

  if (slideEntries.length > 0) {
    return (
      <EveningRecap
        year="2024"
        title={sectionTitle}
        videos={slideEntries}
        paddingTop={undefined}
      />
    );
  }

  const videoUrl = resolveStrapiFileUrl(block.video) || "";
  if (!videoUrl) return null;

  return (
    <EveningRecap
      year="2024"
      title={sectionTitle}
      videoUrl={videoUrl}
      paddingTop={undefined}
    />
  );
}
