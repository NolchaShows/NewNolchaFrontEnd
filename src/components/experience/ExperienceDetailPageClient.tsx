"use client";

import React from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/common/SmoothScroll";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

const getBlockType = (block: any) => block?.__component || block?.__typename || "";

const getMediaUrl = (media: any) => {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${STRAPI_BASE_URL}${media.url}`;
};

const isVideoMedia = (media: any) => {
  if (!media) return false;

  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();

  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const getMediaDimensions = (media: any) => {
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
  media: any,
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

const normalizeFeaturedContentSection = (section: any) => {
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
  standardMedia: any[] = [],
  featuredMedia: any[] = [],
  featuredContentSections: any[] = [],
  featuredInterval = 6
) => {
  const result: any[] = [];
  const safeInterval = Math.max(1, featuredInterval || 6);
  let featuredIndex = 0;

  const appendFeaturedMediaWithContent = () => {
    if (featuredIndex >= featuredMedia.length) return;

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

const htmlToText = (html?: string | null) => {
  if (!html) return "";

  return html
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
};

const mapDetailRows = (page: any) => {
  if (page?.detail_rows?.length) {
    return page.detail_rows.map((row: any) => ({
      label: row?.label || "",
      title: row?.title || "",
      description: row?.description || "",
      tags: (row?.tags || []).map((tag: any) => tag?.text).filter(Boolean),
    }));
  }

  const rows: Array<{
    label: string;
    title?: string;
    description?: string;
    tags?: string[];
  }> = [];

  if (page?.hero?.subtitle) {
    rows.push({
      label: "SUBTITLE",
      title: page.hero.subtitle,
    });
  }

  const imageTextBlock = (page?.blocks || []).find((block: any) => {
    const type = getBlockType(block);
    return (
      type === "blocks.image-text-section" ||
      type === "ComponentBlocksImageTextSection"
    );
  });

  const tags = (imageTextBlock?.tags || [])
    .map((tag: any) => tag?.text)
    .filter(Boolean);

  if (tags.length) {
    rows.push({
      label: imageTextBlock?.tagsLabel || "TAGS",
      tags,
    });
  }

  const description = htmlToText(imageTextBlock?.description);
  if (imageTextBlock?.title || description) {
    rows.push({
      label: "OVERVIEW",
      title: imageTextBlock?.title || "",
      description,
    });
  }

  if (!rows.length && page?.title) {
    rows.push({
      label: "PROJECT",
      title: page.title,
    });
  }

  return rows;
};

const buildStructuredGalleryItems = (gallery: any) => {
  const standardMedia = (gallery?.standard_media || [])
    .map((media: any) => normalizeMediaItem(media))
    .filter(Boolean);
  const featuredMedia = (gallery?.featured_media || [])
    .map((media: any) => normalizeMediaItem(media, { fullWidth: true }))
    .filter(Boolean);
  const featuredContentSections = (
    gallery?.featured_content_sections ||
    gallery?.featured_content_blocks ||
    []
  )
    .map((section: any) => normalizeFeaturedContentSection(section))
    .filter(Boolean);

  return interleaveGalleryMedia(
    standardMedia,
    featuredMedia,
    featuredContentSections,
    gallery?.featured_interval || 6
  );
};

const buildGalleryItems = (blocks: any[] = []) => {
  const items: any[] = [];

  blocks.forEach((block) => {
    const type = getBlockType(block);

    if (
      type === "blocks.evening-recap-section" ||
      type === "ComponentBlocksEveningRecapSection"
    ) {
      const videoItem = normalizeMediaItem(block?.video, { fullWidth: true });
      if (videoItem) items.push(videoItem);
      return;
    }

    if (
      type === "blocks.three-image-row" ||
      type === "ComponentBlocksThreeImageRow"
    ) {
      [block?.firstMedia, block?.secondMedia, block?.thirdMedia]
        .map((media) => normalizeMediaItem(media))
        .filter(Boolean)
        .forEach((item) => items.push(item));
      return;
    }

    if (
      type === "blocks.fashion-grid-section" ||
      type === "ComponentBlocksFashionGridSection"
    ) {
      [
        block?.leftMedia,
        block?.topMedia,
        block?.middleMedia1,
        block?.middleMedia2,
        block?.middleMedia3,
        block?.bottomMedia,
        block?.rightMedia,
      ]
        .map((media) => normalizeMediaItem(media))
        .filter(Boolean)
        .forEach((item) => items.push(item));
      return;
    }

    if (type === "blocks.gallery" || type === "ComponentBlocksGallery") {
      const galleryMedia = [
        ...(block?.images || []),
        ...((block?.items || []).map((item: any) => item?.image).filter(Boolean)),
      ];

      galleryMedia
        .map((media) => normalizeMediaItem(media))
        .filter(Boolean)
        .forEach((item) => items.push(item));
    }
  });

  return items;
};

export default function ExperienceDetailPageClient({ page }: { page: any }) {
  const title = page?.title || "Experience";
  const heroVideo = getMediaUrl(page?.hero?.video) || "";
  const detailRows = mapDetailRows(page);
  const galleryItems = page?.gallery
    ? buildStructuredGalleryItems(page.gallery)
    : buildGalleryItems(page?.blocks || []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f0eee6] px-5 lg:px-11">
        {heroVideo ? (
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
        ) : null}

        <motion.section
          className="py-10 lg:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-5 text-5xl uppercase leading-none tracking-tight text-[#1A1A1A] lg:text-[100px]">
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
                        <p className="max-w-[900px] text-[15px] text-[#4a4a4a] lg:text-[16px]">
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

        {galleryItems.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
          >
            <MediaGalleryGrid items={galleryItems} />
          </motion.div>
        ) : null}
      </div>
    </SmoothScroll>
  );
}
