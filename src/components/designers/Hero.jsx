"use client"
import React, { useState } from "react";

function Hero({ heading = "", images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Early return if no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] max-w-[1440px] mx-auto">
        <div className="flex flex-col">
          {heading && (
            <div className="relative mb-[40px]">
              <h1 className="lg:text-[48px] text-[24px] text-[var(--primary-text-color)] uppercase text-center">
                {heading}
              </h1>
            </div>
          )}
          <div className="w-full h-[250px] sm:h-[400px] bg-gray-200 rounded-[8px] flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="lg:px-[40px] px-0 max-w-[1440px] mx-auto">
      <div className="flex flex-col">
        <div className="relative overflow-hidden lg:max-w-[1360px]">
          {/* Background Image */}
          <img
            key={currentIndex}
            src={images[currentIndex] || "/api/placeholder/800/400"}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full object-cover h-[800px] sm:h-[800px] lg:h-[800px] lg:rounded-[8px]"
          />

          <div className="absolute inset-0 flex flex-col justify-between">
            {heading && (
              <div className="relative flex items-center justify-center mt-4">
                {images.length >= 1 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
                    aria-label="Previous image"
                  >
                    <img
                      src="/press/left.svg"
                      alt="Previous"
                      className="h-[40px] w-[40px] md:h-[56px] md:w-[56px]"
                    />
                  </button>
                )}

                <h1 className="lg:text-[48px] text-[24px] text-white font-bold uppercase text-center drop-shadow-lg">
                  {heading}
                </h1>

                {images.length >= 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
                    aria-label="Next image"
                  >
                    <img
                      src="/press/right.svg"
                      alt="Next"
                      className="h-[40px] w-[40px] md:h-[56px] md:w-[56px]"
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Hero;