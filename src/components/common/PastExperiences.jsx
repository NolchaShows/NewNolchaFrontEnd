"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StyledHeading from "./StyledHeading";
import SectionTitle from "./SectionTitle";
import ArrowNavButtons from "./ArrowNavButtons";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else if (window.innerWidth < 1920) {
        setScreenSize("lg");
      } else if (window.innerWidth < 2560) {
        setScreenSize("xxl");
      } else {
        setScreenSize("3xl");
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
  const isMobile = screenSize === "sm";
  // Card sizing (requested)
  const CARD_W = screenSize === "3xl" ? 500 : screenSize === "xxl" ? 420 : 345;
  const CARD_H = screenSize === "3xl" ? 580 : screenSize === "xxl" ? 480 : 397;
  // Matches `px-2` on each card container (8px left + 8px right)
  const CARD_GUTTER = screenSize === "3xl" ? 24 : screenSize === "xxl" ? 20 : 16;

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
    <div className="py-[60px] lg:py-[80px] xl:py-[100px] 2xl:py-[140px] xxl:py-[180px] 3xl:py-[250px] overflow-hidden bg-secondary">
      <div className="px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px] title-spacing flex flex-row items-center justify-between">
        <SectionTitle disableTitleSpacing className="text-white">Past experience</SectionTitle>

        {/* Navigation Arrows - Desktop Only */}
        {!isMobile ? <ArrowNavButtons onLeft={prevSlide} onRight={nextSlide} /> : null}
      </div>

      {isMobile ? (
        <div className="relative overflow-hidden px-0">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              gap: `${CARD_GUTTER}px`,
              WebkitOverflowScrolling: "touch",
              paddingInline: "7.5vw",
              scrollPaddingInline: "7.5vw",
            }}
          >
            {experiences.map((experience, idx) => {
              const imageUrl = typeof experience === "string" ? experience :
                experience.image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${experience.image.url}` : experience.image || experience;
              const text = experience.text || experience.title || `Experience ${idx + 1}`;
              const href =
                typeof experience === "object" && experience?.href ? experience.href : null;

              return (
                <div
                  key={idx}
                  className="group w-[85vw] snap-center flex-shrink-0 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
                >
                  <div className="relative w-full rounded-[20px] overflow-hidden h-[300px]">
                    <div className="press-card-blur-target h-full w-full transition-[filter] duration-300 ease-out will-change-[filter]">
                      <img
                        src={imageUrl}
                        alt={text}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white text-[20px] font-medium text-left">
                          {text}
                        </h3>
                      </div>
                    </div>
                    {href ? (
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        <a
                          href={href}
                          className="pointer-events-auto inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white"
                        >
                          View
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px]">
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
              const href =
                typeof experience === "object" && experience?.href ? experience.href : null;

              return (
                <div
                  key={idx}
                  className="group w-full sm:w-1/2 lg:w-[345px] flex-shrink-0 mx-2 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
                >
                  <div className="relative w-full lg:w-[345px] rounded-[20px] overflow-hidden h-[300px] lg:h-[397px]">
                    <div className="press-card-blur-target h-full w-full transition-[filter] duration-300 ease-out will-change-[filter]">
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
                    {href ? (
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        <a
                          href={href}
                          className="pointer-events-auto inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white"
                        >
                          View
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Mobile arrows */}
      {/* {experiences.length > 1 && (
        <div className="flex justify-center gap-[12px] lg:hidden mt-8">
          <button onClick={prevSlide} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/icons/left-black-button.svg" alt="Previous" className="h-[36px] w-[36px] filter brightness-0 invert" />
          </button>
          <button onClick={nextSlide} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/icons/right-black-button.svg" alt="Next" className="h-[36px] w-[36px] filter brightness-0 invert" />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default PastExperiences;

