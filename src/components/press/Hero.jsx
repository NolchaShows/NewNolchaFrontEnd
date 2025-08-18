import React, { useState } from "react";
function Hero({heading,images}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-[40px]">
        <h1 className="lg:text-[48px] text-[24px] text-[var(--primary-text-color)] uppercase">
         {heading}
        </h1>

        <div className="relative max-w-[1360px] overflow-hidden">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            className="w-full object-cover h-[250px] sm:h-full rounded-[8px]"
          />

          {/* Left button */}
          <img
            src="/press/left.svg"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
          />

          {/* Right button */}
          <img
            src="/press/right.svg"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[48px] w-[48px] md:h-[64px] md:w-[64px] cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
