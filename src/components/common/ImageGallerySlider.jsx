import React, { useState } from 'react';
import { motion } from "framer-motion";

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
    <div className="w-full py-[70px] lg:py-[150px] bg-[#F4F4F4]">
      <div className="relative h-[840px]">
        {/* Images Row */}
        <div className="flex w-full h-full">
          {/* Left Image - 33% - Changeable */}
          <div className="w-[33.33%] h-full">
            <img
              src={leftImages[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image - 66% - Static */}
          <div className="w-[66.67%] h-full">
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
              aria-label="Previous image"
            >
              <motion.img
                src="/left_yellow.png"
                className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
                whileTap={{ scale: 0.9 }}
              />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next image"
            >
              <motion.img
                src="/right_yellow.png"
                className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
                whileTap={{ scale: 0.9 }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallerySlider;

