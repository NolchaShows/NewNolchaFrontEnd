"use client";
import React, { useState } from "react";

function TextHero({ textHeroData, loading, images = [] }) {
  const mapStrapiSlides = (strapiSlides) => {
    if (!strapiSlides || !Array.isArray(strapiSlides)) return [];
    
    return strapiSlides.map((slide, index) => {
      let mainImageUrl = slide.main_image?.url;
      let secondImageUrl = slide.second_image?.url;
      
      return {
        image: mainImageUrl || "/home/hero.png",
        title: secondImageUrl || "/home/Forbes.png",
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slidesData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  const currentSlide = slidesData[currentIndex];

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
    <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] w-full max-w-none mx-auto">
      <div className="flex flex-col gap-[40px]">
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left button */}
          {slidesData.length > 1 && (
            <button
              onClick={handlePrev}
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity lg:relative lg:top-auto lg:translate-y-0"
            >
              <img src="/left_dark.png" alt="Previous" className="h-[48px] w-[48px] 2xl:h-[64px] 2xl:w-[64px]" />
            </button>
          )}

          {/* Media (Video or Image) */}
          <div className="flex-1 w-full lg:max-w-[600px] 2xl:max-w-[1300px]">
            {currentSlide?.video ? (
              <video
                key={currentIndex}
                src={currentSlide.video}
                controls
                autoPlay
                muted
                loop
                className="w-full object-cover rounded-[16px]"
              />
            ) : (
              <img
                key={currentIndex}
                src={currentSlide?.image}
                alt="Slide"
                className="w-full object-cover rounded-[16px]"
              />
            )}
          </div>

          {/* Right side content */}
          <div className="flex-1 w-full mr-0 md:mr-12 lg:text-left">
            <div className="mb-6 mt-3 lg:mt-0 lg:ml-0 2xl:ml-10 px-[30px] lg:px-0 relative">
              <img
                src="/home/quote.png"
                alt="Quote"
                className="absolute pl-[40px] lg:px-0 -left-[35px] bottom-[10px] h-[100px] w-[150px] md:w-[192px] md:h-[150px] 2xl:w-[200px] 2xl:h-[160px] z-0"
              />
              <img
                src={currentSlide?.title}
                alt="Forbes"
                className="relative h-[80px] w-[200px] md:h-[119px] md:w-[337px] z-10"
              />
            </div>
            <div className="text-black px-[25px] lg:px-0 text-[16px] lg:text-[20px] 2xl:text-[36px] leading-relaxed">
              {currentSlide?.description}
            </div>
          </div>

          {/* Right button */}
          {slidesData.length > 1 && (
            <button
              onClick={handleNext}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
            >
              <img src="/right_dark.png" alt="Next" className="h-[48px] w-[48px] 2xl:h-[64px] 2xl:w-[64px]" />
            </button>
          )}
        </div>

        {/* Mobile arrows */}
        {slidesData.length > 1 && (
          <div className="flex justify-center gap-[12px] lg:hidden">
            <button onClick={handlePrev} className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/left_dark.png" alt="Previous" className="h-[36px] w-[36px] md:h-[48px] md:w-[48px]" />
            </button>
            <button onClick={handleNext} className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/right_dark.png" alt="Next" className="h-[36px] w-[36px] md:h-[48px] md:w-[48px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextHero;
