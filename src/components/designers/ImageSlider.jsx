"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageSlider({ images, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={`w-full max-w-none mx-auto`}>
      <div className="relative mb-4">
        <div
          className={`${className} aspect-square rounded-2xl overflow-hidden bg-gray-200`}
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Left Button */}
        <button
          onClick={goToPrevious}
          className="h-8 w-8 2xl:h-16 2xl:w-16 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={images.length <= 1}
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4 2xl:h-8 2xl:w-8" />
        </button>

        <div className="flex gap-2 overflow-x-auto max-w-xl">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 2xl:w-30 2xl:h-30 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-20"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          className="h-8 w-8 2xl:w-16 2xl:h-16  flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={images.length <= 1}
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4 2xl:h-8 2xl:w-8" />
        </button>
      </div>
    </div>
  );
}
