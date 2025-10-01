"use client";
import Artists from "@/components/landing/Artists";
import React from "react";
import Card from "@/components/artists/Card";
import { useArtistPageData } from "@/utils/artistPageUtils";

function page() {
  const { artistPageData, loading, error } = useArtistPageData();

  // Fallback data for when Strapi data is not available
  const fallbackVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ];

  const fallbackCardData = [
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/1.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/2.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/3.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/4.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/5.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/6.png",
      link: "https://www.nolcha.com/artists-pages/janedao-db55d"
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
        <div className="p-5 2xl:p-10">
          <div className="h-12 bg-gray-300 animate-pulse rounded mb-8"></div>
        </div>
        <div className="bg-gray-300 animate-pulse h-96 mx-4 rounded"></div>
        <div className="flex lg:flex-wrap gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[18px] xl:py-[20px] 2xl:py-[60px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] flex-col lg:flex-row max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full lg:w-[calc(50%-20px)] xl:w-[calc(50%-25px)] 2xl:w-[calc(50%-30px)]">
              <div className="bg-gray-300 animate-pulse h-64 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Use dynamic data if available, otherwise use fallback
  const mainHeading = artistPageData?.mainHeading || "Featured Artists";
  const artistSection = artistPageData?.artistSection;
  const videos = artistSection?.media?.length > 0 ? artistSection.media : fallbackVideos;
  const cardData = artistPageData?.cards?.length > 0 ? artistPageData.cards : fallbackCardData;

  return (
    <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
      <h1 className="p-5 2xl:p-10 font-neue font-bold text-[24px] lg:text-[48px] 2xl:text-6xl text-[#000000]">
        {mainHeading}
      </h1>
      <Artists
        artistData={artistSection}
        loading={loading}
        textColor={"text-[#000000]"}
        isFade={false}
        backgroundColor={"bg-[#F4F4F4]"}
        videos={videos}
        isSlider={true}
        isTextLeft={true}
      />
      <div className="flex lg:flex-wrap gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[18px] xl:py-[20px] 2xl:py-[60px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] flex-col lg:flex-row max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
        {cardData.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            image={card.image} 
            link={card.link}
          />
        ))}
      </div>
      {error && (
        <div className="text-center py-8 text-red-500">
          <p>Error loading content: {error}</p>
        </div>
      )}
    </div>
  );
}

export default page;
