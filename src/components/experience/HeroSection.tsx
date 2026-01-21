// @ts-nocheck
import VideoHeroSection from "@/components/common/VideoHeroSection";
import { fetchExperiencePage } from "@/lib/graphql/fetchExperiencePage";

const splitTitle = (title?: string | null) => {
  if (!title) return { first: "SHAO", second: "NYFW" };
  const parts = title.split(" ");
  if (parts.length === 1) return { first: parts[0], second: "" };
  return { first: parts[0], second: parts.slice(1).join(" ") };
};

const getVideoUrl = (media: any): string | null => {
  if (!media) return null;
  return media.url ?? null;
};

export default async function HeroSection({ slug }: { slug: string }) {
  const page = await fetchExperiencePage(slug);
  if (!page?.hero) return null;

  const { first, second } = splitTitle(page.hero.title || page.title);
  const videoSrc = getVideoUrl(page.hero.video);

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

