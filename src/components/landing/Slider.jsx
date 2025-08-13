import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Variants for image and text
  const imageVariants = {
    enter: (direction) => ({
      x: direction === 1 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction === 1 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const textVariants = {
    enter: (direction) => ({
      x: direction === 1 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
    },
    exit: (direction) => ({
      x: direction === 1 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
    <div className="lg:py-[80px] lg:px-[20px] p-[10px] md:p-[20px] max-w-[1440px] mx-auto flex xl:flex-row flex-col  justify-between items-center overflow-hidden">
      <img
        src="/landing/left.svg"
        onClick={handlePrev}
        className="cursor-pointer hidden xl:block"
        alt="Previous"
      />

      <div className="flex-1 flex justify-center relative">
        <AnimatePresence custom={direction} mode="wait">
          <div
            key={currentIndex}
            className="flex justify-between xl:flex-row flex-col items-center gap-6"
          >
            {/* Image */}
            <motion.img
              key={`img-${currentIndex}`}
              src={slides[currentIndex].mainImage}
              className="rounded-[8px] xl:w-[691px] xl:h-[389px]   object-cover"
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />

            {/* Text & Logo */}
            <motion.div
              key={`text-${currentIndex}`}
              className="px-1 xl:max-w-[434px] flex flex-col gap-4"
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img
                src={slides[currentIndex].logo}
                className="xl:w-[373px] xl:h-[193px] object-contain"
                alt="Logo"
              />
              <p className="text-[20px] text-[var(--tertiary-text-color)] font-medium">
                {slides[currentIndex].text}
              </p>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
      <div className="flex gap-[10px] mt-[20px] xl:mt-[0px]">
        <motion.img
          src="/landing/left.svg"
          onClick={handlePrev}
          className="cursor-pointer xl:hidden"
          alt="Previous"
        />
        <motion.img
          src="/landing/right.svg"
          onClick={handleNext}
          className="cursor-pointer"
           whileTap={{ scale: 0.9 }}
          alt="Next"
        />
      </div>
    </div>
  );
}

export default Slider;
