import React, { useState } from 'react';

const ImageGallerySlider = ({ 
  leftImages = [],
  rightImage,
  arrowColor = "#FEF991"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? leftImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === leftImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!leftImages.length || !rightImage) return null;

  return (
    <div className="w-full bg-white relative">
      {/* Images Row */}
      <div className="flex w-full">
        {/* Left Image - 33% - Changeable */}
        <div className="w-[33.33%]">
          <img 
            src={leftImages[currentIndex]} 
            alt={`Gallery ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Image - 66% - Static */}
        <div className="w-[66.67%]">
          <img 
            src={rightImage} 
            alt="Gallery main"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Arrows - Positioned at bottom center */}
      {leftImages.length > 1 && (
        <div className="absolute bottom-[30px] md:bottom-[40px] left-1/2 transform -translate-x-1/2 flex gap-[16px] z-10">
          <button
            onClick={handlePrev}
            className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: arrowColor }}
            aria-label="Previous image"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: arrowColor }}
            aria-label="Next image"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallerySlider;

