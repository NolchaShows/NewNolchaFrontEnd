"use client";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import FeaturedArtistCardGrid from "@/components/featured-artists/FeaturedArtistCardGrid";
import Artists from "@/components/landing/Artists";
import { useDesignerPageData, useDesignersList } from "@/utils/designerPageUtils";
import React from "react";

const page = () => {
  const { designerData, loading: pageLoading } = useDesignerPageData();
  const { designers, loading: designersLoading } = useDesignersList();

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  const videos = [
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-4.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-5.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-6.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-7.mp4",
  ];

  // Debug logging
  console.log('🎭 Designer page received data:', designerData);
  console.log('👗 Designers list received:', designers);

  // Use designers from collection API, fallback to galleryImages from page data
  const { galleryImages = [] } = designerData || {};
  const galleryData = designers.length > 0 ? designers : galleryImages;

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px] h-screen"
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
          loading={pageLoading}
          textColor={"text-[var(--tertiary-text-color)]"}
          videos={videos}
          isDesktop={true}
        />
        {(designersLoading || (galleryData && galleryData.length > 0)) && (
          <FeaturedArtistCardGrid
            artists={galleryData}
            loading={designersLoading}
            basePath="/designers"
            buttonLabel="View Designer"
          />
        )}
      </div>
    </div>
  );
};

export default page;
