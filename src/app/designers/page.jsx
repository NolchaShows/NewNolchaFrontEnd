"use client";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import FeaturedArtistCardGrid from "@/components/featured-artists/FeaturedArtistCardGrid";
import Artists from "@/components/landing/Artists";
import { useDesignerPageData, useDesignersList } from "@/utils/designerPageUtils";
import React, { useMemo } from "react";

const DEFAULT_HERO_VIDEO =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";
const DEFAULT_ARTIST_GRID_VIDEOS = [
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-4.mp4",
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-5.mp4",
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-6.mp4",
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-7.mp4",
];

const page = () => {
  const { designerData, loading: pageLoading } = useDesignerPageData();
  const { designers, loading: designersLoading } = useDesignersList();

  const heroVideo = designerData?.heroVideo || DEFAULT_HERO_VIDEO;
  const heroFirstPart = designerData?.heroFirstPart ?? "Designers";
  const heroSecondPart = designerData?.heroSecondPart ?? "";

  const artistSectionVideos = useMemo(() => {
    const v = designerData?.videos;
    if (!Array.isArray(v) || v.length < 1) {
      return DEFAULT_ARTIST_GRID_VIDEOS;
    }
    const fromStrapi = v.every(
      (url) =>
        typeof url === "string" &&
        (url.startsWith("http") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url))
    );
    return fromStrapi ? v : DEFAULT_ARTIST_GRID_VIDEOS;
  }, [designerData?.videos]);

  // Use designers from collection API, fallback to galleryImages from page data
  const { galleryImages = [] } = designerData || {};
  const galleryData = designers.length > 0 ? designers : galleryImages;

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="h-screen"
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
          loading={pageLoading}
          textColor={"text-[var(--tertiary-text-color)]"}
          artistData={designerData?.artistData}
          videos={artistSectionVideos}
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
