"use client";
import React, { useState } from "react";

const EventSlider = ({ eventName = "CONCENSUS 2025", images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const eventImages = images.length > 0 ? images : [];
  const maxIndex = Math.max(0, Math.ceil(eventImages.length / 5) - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Get current 5 images to display
  const getCurrentImages = () => {
    const startIndex = currentIndex * 5;
    return eventImages.slice(startIndex, startIndex + 5);
  };

  const currentImages = getCurrentImages();

  return (
    <div className="w-full bg-[#EBE2D7] py-8 px-4 mt-10">
      <div className="max-w-none mx-auto">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl 2xl:text-5xl font-bold text-center text-gray-800 mb-8">
          FEATURED EVENTS
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {currentImages.length > 0 && (
            <div className="space-y-6">
              {/* First row - 3 images with w-1/3 each */}
              {currentImages.slice(0, 3).length > 0 && (
                <div className="flex gap-6">
                  {currentImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="w-1/3">
                      <div className="relative">
                        <img
                          src={image}
                          alt={`${eventName} ${currentIndex * 5 + index + 1}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      <p className="text-[20px] 2xl:text-[30px] 2xl:text-xl font-semibold text-[#000000] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Second row - 2 images: first w-2/3, second w-1/3 */}
              {currentImages.slice(3, 5).length > 0 && (
                <div className="flex gap-6">
                  {currentImages[3] && (
                    <div className="w-2/3">
                      <div className="relative">
                        <img
                          src={currentImages[3]}
                          alt={`${eventName} ${currentIndex * 5 + 4}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      <p className="text-[20px]  2xl:text-[30px] 2xl:text-xl font-semibold text-[#000000] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  )}
                  {currentImages[4] && (
                    <div className="w-1/3">
                      <div className="relative">
                        <img
                          src={currentImages[4]}
                          alt={`${eventName} ${currentIndex * 5 + 5}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      <p className="text-[#000000] 2xl:text-xl font-semibold text-[20px] 2xl:text-[30px] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden">
          {currentImages.length > 0 && (
            <div className="flex flex-col gap-4">
              {currentImages.map((image, index) => (
                <div key={index} className="w-full">
                  <div className="relative">
                    <img
                      src={image}
                      alt={`${eventName} ${currentIndex * 5 + index + 1}`}
                      className="w-full h-100 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <p className="text-[20px] font-semibold text-[#000000] mt-2 text-left">
                    {eventName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {eventImages.length > 5 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`cursor-pointer z-10 hover:opacity-80 transition-opacity ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/gallery/left.svg"
                alt="Previous"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`cursor-pointer z-10 hover:opacity-80 transition-opacity ${
                currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/gallery/right.svg"
                alt="Next"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSlider;
