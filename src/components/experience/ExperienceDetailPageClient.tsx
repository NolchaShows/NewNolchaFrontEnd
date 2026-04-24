"use client";

import React from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/common/SmoothScroll";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import {
  buildStructuredGalleryItems,
  getStructuredMediaUrl,
} from "@/lib/structuredPageMedia";

const mapDetailRows = (page: any) => {
  return (page?.detail_rows || []).map((row: any) => ({
    label: row?.label || "",
    title: row?.title || "",
    description: row?.description || "",
    tags: (row?.tags || []).map((tag: any) => tag?.text).filter(Boolean),
  }));
};

export default function ExperienceDetailPageClient({ page }: { page: any }) {
  const title = page?.title || "Page";
  const heroVideo = getStructuredMediaUrl(page?.hero?.video) || "";
  const detailRows = mapDetailRows(page);
  const galleryItems = buildStructuredGalleryItems(page?.gallery);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f0eee6] px-5 lg:px-11">
        {heroVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-auto aspect-video lg:h-screen lg:aspect-auto"
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
              autoPlay={true}
              muted={true}
              loop={true}
              className="!h-full !w-full"
            />
          </motion.div>
        ) : null}

        <motion.section
          className="py-8 lg:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-[34px] uppercase leading-[0.95] tracking-tight text-[#1A1A1A] sm:text-[42px] lg:mb-5 lg:text-[100px]">
            {title}
          </h1>

          <div className="flex flex-col gap-y-5 lg:gap-y-6">
            {detailRows.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                className="grid grid-cols-1 gap-y-2 md:grid-cols-[160px_1fr] md:gap-x-8 md:gap-y-0 lg:grid-cols-[200px_1fr] lg:gap-x-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#1d1d1d] sm:text-[14px] md:text-[16px] md:tracking-normal">
                  {item.label}
                </span>

                <div className="flex flex-col gap-y-3">
                  {item.tags?.length ? (
                    <div className="flex flex-wrap gap-2.5 lg:gap-3">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className={`border border-black px-3 py-1 text-[11px] uppercase sm:px-4 sm:py-1.5 sm:text-[12px] ${
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
                          className={`text-[13px] font-bold uppercase tracking-[0.12em] sm:text-[14px] lg:text-[16px] ${
                            item.description ? "text-[#818181]" : "text-[#1d1d1d]"
                          }`}
                        >
                          {item.title}
                        </span>
                      ) : null}

                      {item.description ? (
                        <p className="max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px]">
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
