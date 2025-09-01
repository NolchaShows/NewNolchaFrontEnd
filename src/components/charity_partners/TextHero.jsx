"use client"
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
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity lg:relative lg:top-auto lg:translate-y-0"
                aria-label="Previous image"
              >
                <img
                  src="/press/left.svg"
                  alt="Previous"
                  className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                />
              </button>
            </>
          )}

          <div className="flex-1 lg:max-w-[600px] 2xl:max-w-[1300px]">
            <img
              key={currentIndex}
              src={currentImage?.image || "/api/placeholder/600/400"}
              alt={currentImage?.title || `Slide ${currentIndex + 1}`}
              className="w-full object-cover h-[300px] lg:h-[400px] rounded-[16px]"
              onError={(e) => {
                e.target.src = "/api/placeholder/600/400";
              }}
            />
          </div>

          <div className="flex-1 w-full text-center lg:text-left">
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-black">
                {currentImage?.title || "Forbes"}
              </h2>
            </div>

            <div className="text-gray-700 text-lg lg:text-xl leading-relaxed">
              <p className="italic">
                "{currentImage?.description || "Default description text"}"
              </p>
            </div>
          </div>

          {/* Right button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity lg:relative lg:top-auto lg:translate-y-0"
              aria-label="Next image"
            >
              <img
                src="/press/right.svg"
                alt="Next"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
          )}
        </div>

        {/* Dot indicators for mobile */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 lg:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextHero;