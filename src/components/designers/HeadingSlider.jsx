import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeadingSlider = ({ headings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? headings.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === headings.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center justify-between w-full max-w-none mx-auto py-8 px-4">
      {/* Left Arrow Button */}
      <button onClick={goToPrevious} aria-label="Previous heading">
        <img src="/left_dark.png" className="w-14 h-14 2xl:w-22 2xl:h-22 text-gray-700" />
      </button>

      {/* Heading */}
      <div className="flex-1 text-center mx-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black transition-opacity duration-300">
          {headings[currentIndex]}
        </h1>
      </div>

      {/* Right Arrow Button */}
      <button onClick={goToNext} aria-label="Next heading">
        <img src="/right_dark.png" className="w-14 h-14 2xl:w-22 2xl:h-22  text-gray-700" />
      </button>
    </div>
  );
};

export default HeadingSlider;
