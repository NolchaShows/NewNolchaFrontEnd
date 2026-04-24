"use client";

import React from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/common/SmoothScroll";
import PastSpeakers from "@/components/common/PastSpeakers";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import {
  buildStructuredGalleryItems,
  getStructuredMediaUrl,
} from "@/lib/structuredPageMedia";

export default function SpeakersPageClient({ page }: { page: any }) {
  const heroVideo = getStructuredMediaUrl(page?.hero?.video) || "";
  const galleryItems = buildStructuredGalleryItems(page?.gallery);
  const speakerSection = page?.shared_speaker_section || null;
  const speakerTitle =
    speakerSection?.title || page?.title || "Featured Speakers";

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f0eee6]">
        {heroVideo ? (
          <div className="lg:px-11">
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
          </div>
        ) : null}

        <div className="relative z-10">
          <PastSpeakers
            title={speakerTitle}
            speakers={speakerSection?.speakers || undefined}
          />

          {galleryItems.length ? (
            <div className="px-5 pt-4 pb-8 lg:px-11 lg:pt-8 lg:pb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2 }}
              >
                <MediaGalleryGrid items={galleryItems} />
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
    </SmoothScroll>
  );
}
