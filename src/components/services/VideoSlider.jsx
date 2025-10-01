import React, { useState, useRef, useEffect } from "react";

const VideoSlider = ({ videos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">No videos available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {videos.map((videoSrc, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {videos.length > 1 && (
        <>
          {/* Left Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
            aria-label="Previous video"
          >
            <img src="/left_dark.png" alt="" className="w-16 h-16 2xl:w-32 2xl:h-32" />
          </button>

          {/* Right Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
            aria-label="Next video"
          >
            <img src="/right_dark.png" alt="" className="w-16 h-16 2xl:w-32 2xl:h-32" />
          </button>
        </>
      )}
    </div>
  );
};

export default VideoSlider;
