// @ts-nocheck
import Image from "next/image";
import { preconnect, preload } from "react-dom";
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

// Prefer a smaller responsive image format so the poster loads fast.
const getPosterUrl = (media: any): string | null => {
  if (!media) return null;
  const raw =
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.url ||
    null;
  if (!raw) return null;
  if (typeof raw === "string" && raw.startsWith("http")) return raw;
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ??
    "https://new-nolcha-strapi-uiai.onrender.com";
  return `${base}${raw}`;
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
  const poster = getPosterUrl(resolvedPage.hero.thumbnail) ?? undefined;
  const preloadStrategy = pageType === "home" ? "auto" : "metadata";

  if (!videoSrc) return null;

  // Prioritize the hero asset:
  // - preconnect opens the TCP/TLS handshake to R2 before the video tag is parsed
  // - preload emits <link rel="preload" as="video" fetchpriority="high"> so the
  //   browser's preload scanner can start the download from the <head>, in
  //   parallel with HTML streaming, without blocking other resources.
  try {
    preconnect(new URL(videoSrc).origin);
  } catch {}
  if (!isImageHero) {
    preload(videoSrc, { as: "video", fetchPriority: "high" });
  }
  if (poster) {
    try {
      preconnect(new URL(poster).origin);
    } catch {}
    preload(poster, { as: "image", fetchPriority: "high" });
  }

  if (isImageHero) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src={videoSrc}
          alt={resolvedPage.hero.title || resolvedPage.title || "Hero image"}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized={
            typeof videoSrc === "string" && videoSrc.startsWith("http")
          }
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
      poster={poster}
      preload={preloadStrategy}
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

