import React from "react";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import { fetchProjectPage } from "@/lib/graphql/fetchProjectPage";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

const FALLBACK_HERO_VIDEO =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4";

const FALLBACK_DETAIL_ROWS = [
  { label: "CLIENT", title: "MARC JACOBS" },
  { label: "YEAR", title: "2025" },
  { label: "TAGS", tags: ["RUNWAY CAPTURE", "FASHION", "LUXURY"] },
  {
    label: "THE CONTEXT",
    title: "FOR THE FIFTH CONSECUTIVE SEASON",
    description:
      "MATTE brought a four-camera shoot to the library's storied Astor Hall, capturing dynamic coverage as 33 looks walked the length of a city block in Marc's signature sky high heels.",
  },
  {
    label: "THE APPROACH",
    title: "INSTANT TURNAROUND",
    description:
      "Overnight, we cut and color graded the show into a multicam edit and series of social videos for Marc and the brand to post next-day.",
  },
  {
    label: "THE OUTCOME",
    title: "VISUALIZING 'COURAGE'",
    description:
      "In under 24 hours, a live-action event is transformed into a digital experience for the brand's loyal following worldwide.",
  },
];

const FALLBACK_STANDARD_MEDIA = [
  { type: "image", url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 22.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 23.png", width: 1200, height: 1500 },
  { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
  { type: "image", url: "/shao_nyfw/image 24.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 25.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 26.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 27.png", width: 1200, height: 1500 },
  { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
  { type: "image", url: "/shao_nyfw/image 28.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
  { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
  { type: "image", url: "/shao_nyfw/image 22.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 23.png", width: 1200, height: 1500 },
  { type: "image", url: "/shao_nyfw/image 24.png", width: 1200, height: 1500 },
  { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
];

const FALLBACK_FEATURED_MEDIA = [
  {
    type: "video",
    url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov",
    fullWidth: true,
  },
  {
    type: "image",
    url: "/shao_nyfw/image 28.png",
    width: 1800,
    height: 1000,
    fullWidth: true,
  },
];

const getMediaUrl = (media) => {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${STRAPI_BASE_URL}${media.url}`;
};

const isVideoMedia = (media) => {
  if (!media) return false;

  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();

  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const getMediaDimensions = (media) => {
  if (!media) {
    return { width: null, height: null };
  }

  return {
    width:
      media.width ||
      media.formats?.large?.width ||
      media.formats?.medium?.width ||
      media.formats?.small?.width ||
      null,
    height:
      media.height ||
      media.formats?.large?.height ||
      media.formats?.medium?.height ||
      media.formats?.small?.height ||
      null,
  };
};

const normalizeMediaItem = (media, options = {}) => {
  if (!media) return null;

  const url = getMediaUrl(media);
  if (!url) return null;

  const { width, height } = getMediaDimensions(media);

  return {
    type: isVideoMedia(media) ? "video" : "image",
    url,
    mime: media.mime || null,
    width,
    height,
    fullWidth: Boolean(options.fullWidth),
  };
};

const interleaveGalleryMedia = (standardMedia = [], featuredMedia = [], featuredInterval = 6) => {
  const result = [];
  const safeInterval = Math.max(1, featuredInterval || 6);
  let featuredIndex = 0;

  standardMedia.forEach((item, index) => {
    result.push(item);

    if ((index + 1) % safeInterval === 0 && featuredIndex < featuredMedia.length) {
      result.push({ ...featuredMedia[featuredIndex], fullWidth: true });
      featuredIndex += 1;
    }
  });

  while (featuredIndex < featuredMedia.length) {
    result.push({ ...featuredMedia[featuredIndex], fullWidth: true });
    featuredIndex += 1;
  }

  return result;
};

const mapDetailRows = (rows = []) =>
  rows.map((row) => ({
    label: row?.label || "",
    title: row?.title || "",
    description: row?.description || "",
    tags: (row?.tags || []).map((tag) => tag?.text).filter(Boolean),
  }));

const buildGalleryItems = (gallery) => {
  const standardMedia = (gallery?.standard_media || [])
    .map((media) => normalizeMediaItem(media))
    .filter(Boolean);
  const featuredMedia = (gallery?.featured_media || [])
    .map((media) => normalizeMediaItem(media, { fullWidth: true }))
    .filter(Boolean);

  return interleaveGalleryMedia(
    standardMedia,
    featuredMedia,
    gallery?.featured_interval || 6
  );
};

export default async function MarcJacobsAW25Page() {
  const projectPage = await fetchProjectPage("marc-jacobs-aw25");

  const title = projectPage?.title || "MARC JACOBS AW25";
  const heroVideo = getMediaUrl(projectPage?.hero?.video) || FALLBACK_HERO_VIDEO;
  const detailRows = projectPage?.detail_rows?.length
    ? mapDetailRows(projectPage.detail_rows)
    : FALLBACK_DETAIL_ROWS;

  const projectGalleryItems = projectPage?.gallery ? buildGalleryItems(projectPage.gallery) : [];
  const galleryItems = projectGalleryItems.length
    ? projectGalleryItems
    : interleaveGalleryMedia(FALLBACK_STANDARD_MEDIA, FALLBACK_FEATURED_MEDIA, 6);

  return (
    <div className="min-h-screen bg-[#F3F3F3]" style={{ fontFamily: "var(--font-rm-mono)" }}>
      <VideoHeroSection
        videoSrc={heroVideo}
        firstPart=""
        secondPart=""
        strokeColor="#000000"
        fillColor="#000000"
        textColor="#000000"
        size="large"
        overlayOpacity={0}
      />

      <section className="max-w-[1400px] px-6 py-12 lg:px-20 lg:py-24">
        <h1
          className="mb-5 text-5xl uppercase leading-none tracking-tight text-[#1A1A1A] lg:text-[100px]"
          style={{ fontFamily: "var(--font-helvetica)" }}
        >
          {title}
        </h1>

        <div className="flex flex-col gap-y-6">
          {detailRows.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="grid grid-cols-[120px_1fr] items-start gap-x-10 md:grid-cols-[200px_1fr]"
            >
              <span className="text-[16px] font-bold uppercase text-[#1d1d1d]">
                {item.label}
              </span>

              <div className="flex flex-col gap-y-3">
                {item.tags?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={`${tag}-${tagIndex}`}
                        className={`border border-black px-5 py-1.5 text-[12px] uppercase ${
                          tagIndex !== 0 ? "rounded-full" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-1.5">
                    {item.title ? (
                      <span
                        className={`text-[15px] font-bold uppercase tracking-widest lg:text-[16px] ${
                          item.description ? "text-[#818181]" : "text-[#1d1d1d]"
                        }`}
                      >
                        {item.title}
                      </span>
                    ) : null}

                    {item.description ? (
                      <p
                        className="max-w-[900px] text-[15px] text-[#4a4a4a] lg:text-[16px]"
                        style={{ fontFamily: "var(--font-schibsted-grotesk)" }}
                      >
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MediaGalleryGrid items={galleryItems} background="#F3F3F3" />
    </div>
  );
}
