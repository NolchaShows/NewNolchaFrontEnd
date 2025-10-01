"use client"
import React, { useState } from "react";

function Hero({ heading = "", images, headerStyling = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] max-w-[1440px] mx-auto">
        <div className={`flex flex-col ${heading ? "gap-[40px]" : ""}`}>
          {heading && (
            <h1 className="text-[24px] lg:text-[48px] 2xl:text-2xl text-[var(--primary-text-color)] uppercase">
              {heading}
            </h1>
          )}
          <div className="w-full h-[250px] sm:h-[400px] bg-gray-200 rounded-[8px] flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px]">
      <div className={`flex flex-col ${heading ? "gap-[40px]" : ""}`}>
        {heading && (
          <div className={"text-[24px] lg:text-[48px] 2xl:text-5xl text-[var(--primary-text-color)] uppercase"}>
            {heading}
          </div>
        )}

        <div className="relative w-full">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full object-cover h-[450px] sm:h-[600px] 2xl:h-[800px] rounded-[12px]"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
                aria-label="Previous image"
              >
                <img
                  src="/press/left.svg"
                  alt="Previous"
                  className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
                aria-label="Next image"
              >
                <img
                  src="/press/right.svg"
                  alt="Next"
                  className="h-[48px] w-[48px] md:h-[64px] md:w-[64px] "
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;