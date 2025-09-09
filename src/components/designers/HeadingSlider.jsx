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

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {headings.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadingSlider;
