"use client";

import { motion } from "framer-motion";
import VideoHeroSection from "@/components/common/VideoHeroSection";

export default function AboutHeroVideo({ videoSrc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen w-full"
    >
      <VideoHeroSection
        videoSrc={videoSrc}
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
        className="!h-full !w-full"
      />
    </motion.div>
  );
}
