"use client";
import React, { useState } from "react";

function TextHero({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] w-full max-w-none mx-auto">
      <div className="flex flex-col gap-[40px]">
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left button (desktop only) */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity lg:relative lg:top-auto lg:translate-y-0"
              aria-label="Previous image"
            >
              <img
                src="/left_dark.png"
                alt="Previous"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
          )}

          <div className="flex-1 w-full lg:max-w-[600px] 2xl:max-w-[1300px]">
            <video
              key={currentIndex}
              src={currentImage?.video || "/api/placeholder/600/400"}
              className="w-full object-cover rounded-[16px]"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div className="flex-1 w-full mr-12 lg:text-left">
            <div className="mb-6 ml-16 mt-3 lg:mt-0 lg:ml-0 2xl:ml-10 relative">
              {/* Quotation mark */}
              <img
                src="/home/quote.png"
                alt="Quote"
                className="absolute -left-[35px] bottom-[10px] w-[192px] h-[150px] 2xl:w-[200px] 2xl:h-[160px] z-0"
              />

              {/* Forbes logo */}
              <img
                src={currentImage?.title}
                alt="Forbes"
                className="relative h-[119px] w-[337px] z-10"
              />
            </div>

            <div className="text-gray-700 text-[20px] ml-4 lg:ml-0  lg:text-[20px] 2xl:text-[36px] font-semibold leading-relaxed">
              {currentImage?.description || "Default description text"}
            </div>
          </div>

          {/* Right button (desktop only) */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
              aria-label="Next image"
            >
              <img
                src="/right_dark.png"
                alt="Next"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
          )}
        </div>

        {/* Arrows for mobile & md (below-centered) */}
        {images.length > 1 && (
          <div className="flex justify-center gap-6 lg:hidden">
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src="/left_dark.png"
                alt="Previous"
                className="h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
              />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src="/right_dark.png"
                alt="Next"
                className="h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextHero;
