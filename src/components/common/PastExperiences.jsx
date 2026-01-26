import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StyledHeading from "./StyledHeading";
import SectionTitle from "./SectionTitle";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

const PastExperiences = ({
  experiences = [],
  title = "Past experience",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenSize = useScreenSize();

  const getItemsPerSlide = () => {
    switch (screenSize) {
      case "sm":
        return 1;
      case "md":
        return 2;
      case "lg":
        return 5;
      default:
        return 5;
    }
  };

  const itemsPerSlide = getItemsPerSlide();
  const isDesktop = screenSize === "lg";
  // Card sizing (requested)
  const CARD_W = 345;
  const CARD_H = 397;
  // Matches `px-2` on each card container (8px left + 8px right)
  const CARD_GUTTER = 16;

  const nextSlide = () => {
    if (currentIndex + itemsPerSlide < experiences.length) {
      setCurrentIndex((prev) => prev + itemsPerSlide);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerSlide >= 0) {
      setCurrentIndex((prev) => prev - itemsPerSlide);
    } else {
      // Go to end
      setCurrentIndex(Math.max(0, experiences.length - itemsPerSlide));
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50; // Minimum drag distance to trigger slide change
    const velocity = info.velocity.x;

    // Determine slide change based on drag distance and velocity
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 || velocity > 0) {
        // Swiped right (dragged left) - go to previous
        prevSlide();
      } else {
        // Swiped left (dragged right) - go to next
        nextSlide();
      }
    }
  };

  // If no data available, don't render the component
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <div className="py-[60px] lg:py-[100px] 2xl:py-[180px] overflow-hidden bg-secondary">
      <div className="px-[20px] lg:px-[140px] 2xl:px-[250px] title-spacing flex flex-row items-center justify-between">
        <SectionTitle disableTitleSpacing className="text-white">Past experience</SectionTitle>

        {/* Navigation Arrows - Desktop Only */}
        <div className="hidden lg:flex gap-4">
          <button
            onClick={prevSlide}
            aria-label="Scroll left"
          >
            <motion.img
              src="/icons/left-black-button.svg"
              className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Scroll right"
          >
            <motion.img
              src="/icons/right-black-button.svg"
              className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden px-[20px] lg:px-[140px] 2xl:px-[250px]">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{
            x: isDesktop
              ? -currentIndex * (CARD_W + CARD_GUTTER)
              : `-${(currentIndex / itemsPerSlide) * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {experiences.map((experience, idx) => {
            const imageUrl = typeof experience === 'string' ? experience :
              experience.image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${experience.image.url}` : experience.image || experience;
            const text = experience.text || experience.title || `Experience ${idx + 1}`;

            return (
              <div
                key={idx}
                className="w-full sm:w-1/2 lg:w-[345px] flex-shrink-0 mx-2"
              >
                <div className="relative w-full lg:w-[345px] rounded-[20px] overflow-hidden h-[300px] lg:h-[397px]">
                  <img
                    src={imageUrl}
                    alt={text}
                    className="w-full h-full object-cover"
                  />
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 lg:p-6 2xl:p-8">
                    <h3 className="text-white text-[20px] lg:text-[24px] 2xl:text-[42px] font-medium text-left">
                      {text}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile arrows */}
      {experiences.length > 1 && (
        <div className="flex justify-center gap-[12px] lg:hidden mt-8">
          <button onClick={prevSlide} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/icons/left-black-button.svg" alt="Previous" className="h-[36px] w-[36px] filter brightness-0 invert" />
          </button>
          <button onClick={nextSlide} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/icons/right-black-button.svg" alt="Next" className="h-[36px] w-[36px] filter brightness-0 invert" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PastExperiences;

