// @ts-nocheck
import VideoHeroSection from "@/components/common/VideoHeroSection";
import StyledHeading from "@/components/common/StyledHeading";
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
  const url = media.url ?? null;
  if (!url) return null;
  if (typeof url === "string" && url.startsWith("http")) return url;
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ??
    "https://new-nolcha-strapi-uiai.onrender.com";
  return `${base}${url}`;
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
  const mediaMime = String(resolvedPage?.hero?.video?.mime || "").toLowerCase();
  const isImageHero = mediaMime.startsWith("image/");

  if (!videoSrc) return null;

  if (isImageHero) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={videoSrc}
          alt={resolvedPage.hero.title || resolvedPage.title || "Hero image"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center h-full page-container">
          <div className="text-center text-white">
            <StyledHeading
              firstPart={first}
              secondPart={second}
              strokeColor="#000000"
              fillColor="#FFFFFF"
              textColor="#FFFFFF"
              size="large"
            />
          </div>
        </div>
      </div>
    );
  }

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
      className="h-screen"
      isGoogleDrive={false}
    />
  );
}

