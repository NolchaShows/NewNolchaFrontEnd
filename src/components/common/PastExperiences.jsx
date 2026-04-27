"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const screenSize = useScreenSize();
  const scrollRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    dragged: false,
  });
  const suppressLinkClickRef = useRef(false);

  const isMobile = screenSize === "sm";
  // Matches `px-2` on each card container (8px left + 8px right)
  const CARD_GUTTER = screenSize === "3xl" ? 24 : screenSize === "xxl" ? 20 : 16;

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 360;
    if (el.children.length >= 2) {
      const a = el.children[0];
      const b = el.children[1];
      return b.offsetLeft - a.offsetLeft;
    }
    const first = el.firstElementChild;
    return first ? first.getBoundingClientRect().width + CARD_GUTTER : 360;
  }, [CARD_GUTTER]);

  const scrollRowBy = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el) return;
      const step = getScrollStep();
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      if (direction > 0) {
        if (el.scrollLeft >= maxScroll - 2) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: step, behavior: "smooth" });
        }
      } else {
        if (el.scrollLeft <= 2) {
          el.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          el.scrollBy({ left: -step, behavior: "smooth" });
        }
      }
    },
    [getScrollStep]
  );

  const nextSlide = useCallback(() => scrollRowBy(1), [scrollRowBy]);
  const prevSlide = useCallback(() => scrollRowBy(-1), [scrollRowBy]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const el = scrollRef.current;
      if (!el) return;
      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 6) {
        dragRef.current.dragged = true;
      }
      el.scrollLeft = dragRef.current.startScroll - dx;
    };

    const onUp = () => {
      if (!dragRef.current.active) return;
      const wasDrag = dragRef.current.dragged;
      dragRef.current.active = false;
      dragRef.current.dragged = false;
      if (wasDrag) {
        suppressLinkClickRef.current = true;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onDragScrollMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      dragged: false,
    };
    e.preventDefault();
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
            ref={scrollRef}
            onMouseDown={onDragScrollMouseDown}
            className="flex cursor-grab active:cursor-grabbing overflow-x-auto snap-x snap-mandatory scrollbar-hide select-none"
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
                  <div className="relative w-full rounded-[20px] overflow-hidden h-[55vh] min-h-[360px] max-h-[560px]">
                    <div className="press-card-blur-target h-full w-full transition-[filter] duration-300 ease-out will-change-[filter]">
                      <img
                        src={imageUrl}
                        alt={text}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white text-[20px] sm:text-[22px] font-medium text-left">
                          {text}
                        </h3>
                      </div>
                    </div>
                    {href ? (
                      <>
                        <a
                          href={href}
                          aria-label={`Open ${text}`}
                          onClick={(e) => {
                            if (suppressLinkClickRef.current) {
                              e.preventDefault();
                              suppressLinkClickRef.current = false;
                            }
                          }}
                          className="absolute inset-0 z-20"
                        />
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                          <span className="inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white">
                            View
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px]">
          <div
            ref={scrollRef}
            onMouseDown={onDragScrollMouseDown}
            className="flex cursor-grab active:cursor-grabbing overflow-x-auto scrollbar-hide select-none"
            style={{
              WebkitOverflowScrolling: "touch",
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
                        draggable={false}
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
                      <>
                        <a
                          href={href}
                          aria-label={`Open ${text}`}
                          onClick={(e) => {
                            if (suppressLinkClickRef.current) {
                              e.preventDefault();
                              suppressLinkClickRef.current = false;
                            }
                          }}
                          className="absolute inset-0 z-20"
                        />
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                          <span className="inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white">
                            View
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
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

