import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  "/landing/testimonial.jpg",
  "/landing/testimonial.jpg",
  "/landing/testimonial.jpg",
  "/landing/testimonial.jpg",
   "/landing/testimonial.jpg",

];

function Testimonials() {
  const itemsToShow = 3; // Number of cards visible
  const itemWidth = 411; // Card width + gap
  const totalItems = testimonials.length;

  // Duplicate array to enable smooth looping
  const loopedTestimonials = [...testimonials, ...testimonials];

  const [index, setIndex] = useState(0);
  const maxIndex = totalItems; // reset point

  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  // Reset index instantly when hitting clone set
  useEffect(() => {
    if (index === maxIndex + 1) {
      // Without animation, jump back to start set
      setIndex(1);
    }
  }, [index, maxIndex]);

  return (
    <div>
      {/* Header */}
      <div className="lg:py-[80px] lg:px-[60px] py-[20px] px-[16px] max-w-[1440px] mx-auto flex justify-between">
        <h1 className="lg:text-[48px] text-[24px] text-[var(--secondary-text-color)] font-light uppercase">
          Trusted by
        </h1>
        <div className="flex gap-[10px] ">
          <img
            src="/landing/roundedLeft.svg"
            className="cursor-pointer h-[40px] w-[40px] lg:h-full lg:w-full"
            onClick={handlePrev}
          />
          <img
            src="/landing/roundedright.svg "
            className="cursor-pointer h-[40px] w-[40px] lg:h-full lg:w-full"
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden lg:pb-[80px] pb-[20px]">
        <motion.div
          className="flex gap-[16px]"
          animate={{ x: -index * itemWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {loopedTestimonials.map((src, i) => (
            <img
              key={i}
              src={src}
              className="rounded-[8px] max-w-[395px] max-h-[526px]"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;
