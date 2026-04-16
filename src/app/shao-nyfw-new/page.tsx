"use client";
import React from "react";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import { fetchProjectPage } from "@/lib/graphql/fetchProjectPage";
import SmoothScroll from "@/components/common/SmoothScroll";
import { motion } from "framer-motion";

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
    url: "/shao_nyfw/image 24.png",
    width: 1800,
    height: 1000,
    fullWidth: true,
  },
];

const FALLBACK_FEATURED_CONTENT_SECTIONS = [
  {
    label: "COURAGE",
    description:
      'Behind our lens at Marc Jacobs Runway 2025-making visual Marc\'s theme of unflinching fashion. "Fear is not my enemy," Marc writes in the show\'s notes, "it is a necessary companion to creativity."',
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

const normalizeMediaItem = (
  media,
  options: { fullWidth?: boolean } = {}
) => {
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

const normalizeFeaturedContentSection = (section) => {
  if (!section) return null;

  const label = section.label || section.title || "";
  const description = section.description || section.body || "";

  if (!label && !description) {
    return null;
  }

  return {
    type: "contentSection",
    fullWidth: true,
    label,
    description,
  };
};

const interleaveGalleryMedia = (
  standardMedia = [],
  featuredMedia = [],
  featuredContentSections = [],
  featuredInterval = 6
) => {
  const result = [];
  const safeInterval = Math.max(1, featuredInterval || 6);
  let featuredIndex = 0;

  const appendFeaturedMediaWithContent = () => {
    if (featuredIndex >= featuredMedia.length) {
      return;
    }

    result.push({ ...featuredMedia[featuredIndex], fullWidth: true });

    if (featuredContentSections[featuredIndex]) {
      result.push(featuredContentSections[featuredIndex]);
    }

    featuredIndex += 1;
  };

  standardMedia.forEach((item, index) => {
    result.push(item);

    if ((index + 1) % safeInterval === 0 && featuredIndex < featuredMedia.length) {
      appendFeaturedMediaWithContent();
    }
  });

  while (featuredIndex < featuredMedia.length) {
    appendFeaturedMediaWithContent();
  }

  while (featuredIndex < featuredContentSections.length) {
    result.push(featuredContentSections[featuredIndex]);
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
  const featuredContentSections = (
    gallery?.featured_content_sections ||
    gallery?.featured_content_blocks ||
    []
  )
    .map((section) => normalizeFeaturedContentSection(section))
    .filter(Boolean);

  return interleaveGalleryMedia(
    standardMedia,
    featuredMedia,
    featuredContentSections,
    gallery?.featured_interval || 6
  );
};

export default function MarcJacobsAW25Page() {
  const [projectPage, setProjectPage] = React.useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjectPage();
      setProjectPage(data);
    };
    loadData();
  }, []);

  const title = projectPage?.title || "MARC JACOBS AW25";
  const heroVideo = getMediaUrl(projectPage?.hero?.video) || FALLBACK_HERO_VIDEO;
  const detailRows = projectPage?.detail_rows?.length
    ? mapDetailRows(projectPage.detail_rows)
    : FALLBACK_DETAIL_ROWS;

  const projectGalleryItems = projectPage?.gallery ? buildGalleryItems(projectPage.gallery) : [];
  const galleryItems = projectGalleryItems.length
    ? projectGalleryItems
    : interleaveGalleryMedia(
        FALLBACK_STANDARD_MEDIA,
        FALLBACK_FEATURED_MEDIA,
        FALLBACK_FEATURED_CONTENT_SECTIONS,
        6
      );

  return (
    <SmoothScroll>
      <div
        className="min-h-screen bg-[#f0eee6] lg:px-11 px-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-screen w-full"
        >
          <VideoHeroSection
            videoSrc={heroVideo}
            firstPart=""
            secondPart=""
            strokeColor="#000000"
            fillColor="#000000"
            textColor="#000000"
            size="large"
            overlayOpacity={0}
            showControls={true}
            className="!h-full"
          />
        </motion.div>

        <motion.section
          className="py-10 lg:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1
            className="mb-5 text-5xl uppercase leading-none tracking-tight text-[#1A1A1A] lg:text-[100px]"
          >
            {title}
          </h1>

          <div className="flex flex-col gap-y-6">
            {detailRows.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                className="grid grid-cols-[120px_1fr] items-start gap-x-10 md:grid-cols-[200px_1fr]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        >
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
        >
          <MediaGalleryGrid items={galleryItems} />
        </motion.div>
      </div>
    </SmoothScroll>
  );
}
