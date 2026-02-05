"use client";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import DynamicGallery from "@/components/designers/DynamicGallery";
import Artists from "@/components/landing/Artists";
import { useFeaturedArtistsList } from "@/utils/featuredArtistUtils";
import React from "react";

const page = () => {
  const { featuredArtists, loading: artistsLoading } = useFeaturedArtistsList();

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  const videos = [
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-4.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-5.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-6.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-7.mp4",
  ];

  // Debug logging
  console.log('🎨 Featured Artists list received:', featuredArtists);

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
        firstPart="Featured Artists"
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
          loading={artistsLoading}
          textColor={"text-[var(--tertiary-text-color)]"}
          videos={videos}
          isDesktop={true}
        />
        {featuredArtists && featuredArtists.length > 0 && (
          <DynamicGallery
            imagesGallery={featuredArtists}
            title={'Featured Artists'}
            loading={artistsLoading}
            basePath="/featured-artists"
          />
        )}
      </div>
    </div>
  );
};

export default page;
