"use client";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import DynamicGallery from "@/components/designers/DynamicGallery";
import Artists from "@/components/landing/Artists";
import { useDesignerPageData } from "@/utils/designerPageUtils";
import React from "react";

const page = () => {
  const { designerData, loading, error } = useDesignerPageData();

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  const videos = [
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-4.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-5.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-6.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-7.mp4",
  ];

  // Debug logging
  console.log('🎭 Designer component received data:', designerData);

  // Use data from hook or fallback to empty object
  const {
    galleryImages = [],
  } = designerData || {};

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
        firstPart="Designers"
        secondPart=""
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
      />
      <div className="relative z-10">
        <Artists
          loading={loading}
          textColor={"text-[var(--tertiary-text-color)]"}
          videos={videos}
          isDesktop={true}
        />
        {/* <ArtistGallery /> */}
        {galleryImages && galleryImages.length > 0 && (
          <DynamicGallery imagesGallery={galleryImages} title={'Featured Artists'} />
        )}
      </div>
    </div>
  );
};

export default page;
