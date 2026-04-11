// @ts-nocheck
import VideoHeroSection from "@/components/common/VideoHeroSection";
import { fetchStructuredPageBySlug, type StructuredPageType } from "@/lib/fetchStructuredPageBySlug";

const splitTitle = (
  title?: string | null,
  options?: { preserveTitle?: boolean }
) => {
  if (!title) return { first: "SHAO", second: "NYFW" };
  if (options?.preserveTitle) return { first: title, second: "" };
  const parts = title.split(" ");
  if (parts.length === 1) return { first: parts[0], second: "" };
  return { first: parts[0], second: parts.slice(1).join(" ") };
};

const getVideoUrl = (media: any): string | null => {
  if (!media) return null;
  return media.url ?? null;
};

export default async function HeroSection({
  slug,
  pageType = "experience",
  page,
}: {
  slug: string;
  pageType?: StructuredPageType;
  page?: any;
}) {
  const resolvedPage = page ?? (await fetchStructuredPageBySlug(pageType, slug));
  if (!resolvedPage?.hero) return null;

  const { first, second } = splitTitle(resolvedPage.hero.title || resolvedPage.title, {
    preserveTitle: pageType === "home",
  });
  const videoSrc = getVideoUrl(resolvedPage.hero.video);

  if (!videoSrc) return null;

  return (
    <VideoHeroSection
      videoSrc={videoSrc}
      firstPart={first}
      secondPart={second}
      strokeColor="#000000"
      fillColor="#FFFFFF"
      textColor="#FFFFFF"
      size="large"
      overlayOpacity={20}
      className="-mt-[88px] 2xl:-mt-[120px]"
      isGoogleDrive={false}
    />
  );
}

