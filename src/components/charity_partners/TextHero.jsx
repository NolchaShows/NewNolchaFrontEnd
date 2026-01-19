"use client";
import React from "react";

function TextHero({ textHeroData, loading, images = [] }) {
  const mapStrapiSlides = (strapiSlides) => {
    if (!strapiSlides || !Array.isArray(strapiSlides)) return [];
    
    return strapiSlides.map((slide, index) => {
      let mainImageUrl = slide.main_image?.url;
      let secondImageUrl = slide.second_image?.url;
      
      return {
        image: mainImageUrl || "/home/hero.png",
        title: secondImageUrl || "/home/forbes/forbes.png",
        description: slide.description || "Default description text",
        video: slide.video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // fallback demo video
      };
    });
  };

  const slidesData =
    textHeroData?.slides?.length > 0
      ? mapStrapiSlides(textHeroData.slides)
      : images?.length > 0
      ? images
      : [];

  if (loading) {
    return (
      <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] w-full max-w-none mx-auto">
        <div className="flex flex-col gap-[40px]">
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 w-full lg:max-w-[600px] 2xl:max-w-[1300px]">
              <div className="w-full h-[400px] bg-gray-300 animate-pulse rounded-[16px]"></div>
            </div>
            <div className="flex-1 w-full mr-0 md:mr-12 lg:text-left">
              <div className="mb-6 mt-3 lg:mt-0 lg:ml-0 2xl:ml-10 px-[30px] lg:px-0">
                <div className="h-[80px] w-[200px] md:h-[119px] md:w-[337px] bg-gray-300 animate-pulse rounded"></div>
              </div>
              <div className="px-[25px] lg:px-0">
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSlide = slidesData[0];

  if (!slidesData || slidesData.length === 0) {
    return (
      <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] w-full max-w-none mx-auto">
        <div className="flex flex-col gap-6 items-center">
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            className="w-full max-w-[1200px] rounded-[16px]"
          />
          <div className="text-center text-black max-w-4xl">
            Our partnership with St. Jude Children’s Research Hospital commenced over 15 years ago, launching the Design Cares Fashion Show Presents Kaleidoscope fundraiser in support of St. Jude's mission.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container w-full max-w-none mx-auto bg-[#000]">
      <div className="flex flex-col">
        <div className="relative flex flex-col lg:flex-row gap-[40px] lg:gap-[52px] 2xl:gap-[92px] items-center">
          {/* Media (Video or Image) */}
          <div className="flex-1 w-full lg:max-w-[656px] 2xl:max-w-[1165px]">
            {currentSlide?.video ? (
              <video
                src={currentSlide.video}
                controls
                autoPlay
                muted
                loop
                className="w-full object-cover rounded-[16px]"
              />
            ) : (
              <img
                src={currentSlide?.image}
                alt="Slide"
                className="w-full object-cover rounded-[16px]"
              />
            )}
          </div>

          {/* Right side content */}
          <div className="flex-1 w-full lg:text-left">
            <div className="mb-[25px] lg:mb-[40px] 2xl:mb-[72px] relative">
              {/* <img
                src="/home/quote.png"
                alt="Quote"
                className="absolute pl-[40px] lg:px-0 -left-[35px] bottom-[40px] lg:bottom-[30px] 2xl:bottom-[60px] w-[140px] lg:w-[160px] 2xl:w-[283px] z-0"
              /> */}
              <img
                src={'/home/forbes/forbes.png'}
                alt="Forbes"
                className="relative w-[230px] lg:w-[340px] 2xl:w-[600px] z-10"
              />
            </div>
            <div className="text-white text-[16px] lg:text-[20px] 2xl:text-[36px] font-bold">
              {currentSlide?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextHero;
