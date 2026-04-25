"use client";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import FeaturedArtistCardGrid from "@/components/featured-artists/FeaturedArtistCardGrid";
import Artists from "@/components/landing/Artists";
import { useFeaturedArtistsList, useFeaturedArtistsPageData } from "@/utils/featuredArtistUtils";
import React from "react";

const DEFAULT_HERO_VIDEO =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

const page = () => {
  const { featuredArtists, loading: artistsLoading } = useFeaturedArtistsList();
  const { page: featuredPage, loading: featuredPageLoading } = useFeaturedArtistsPageData();

  const heroVideo = featuredPage?.heroVideo || DEFAULT_HERO_VIDEO;
  const heroFirstPart = featuredPage?.heroFirstPart ?? "Featured Artists";
  const heroSecondPart = featuredPage?.heroSecondPart ?? "";

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px] h-screen"
        firstPart={heroFirstPart}
        secondPart={heroSecondPart}
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
      />
      <div className="relative z-10">
        <Artists
          loading={artistsLoading || featuredPageLoading}
          textColor={"text-[var(--tertiary-text-color)]"}
          artistData={featuredPage?.artistData}
          videos={featuredPage?.videos}
          isDesktop={true}
        />
        {(artistsLoading || (featuredArtists && featuredArtists.length > 0)) && (
          <FeaturedArtistCardGrid
            artists={featuredArtists}
            loading={artistsLoading}
          />
        )}
      </div>
    </div>
  );
};

export default page;
