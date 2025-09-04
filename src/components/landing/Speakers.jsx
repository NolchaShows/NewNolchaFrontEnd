import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Speakers() {
  const images = [
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-none w-full mx-auto lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] overflow-hidden">
      <div className="flex flex-col p-[10px] gap-[40px]">
        <h1 className="lg:text-[48px] text-[24px] font-medium uppercase text-[var(--primary-text-color)]">
          Featured Speakers
        </h1>

          <div className="flex gap-[20px] overflow-x-auto xl:hidden scrollbar-hide ">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className="md:max-w-[400px] max-w-[358px] rounded-[8px] flex-shrink-0 object-cover "
              />
            ))}
          </div>
        <div className="relative overflow-hidden hidden xl:block">
          <motion.div
            className="md:flex gap-[43px] hidden "
            animate={{ x: `-${index * (400 + 43)}px` }} // 400px width + 43px gap
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className="max-w-[400px] 2xl:max-w-[580px] rounded-[8px] flex-shrink-0 object-cover"
              />
            ))}
          </motion.div>

          <img
            src="/landing/leftArrowDark.svg"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer hidden md:block"
          />
          <img
            src="/landing/rightArrowDark.svg"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Speakers;
