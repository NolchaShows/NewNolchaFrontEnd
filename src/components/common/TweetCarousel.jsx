"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";
import ArrowNavButtons from "./ArrowNavButtons";
import { parseTweetIdentifier } from "@/lib/strapiFlatten";

/** Re-export — same normalization as CMS parsing */
export const parseTweetId = parseTweetIdentifier;

const TweetCarousel = ({
  posts,
  carousalData,
  padding = "",
  title = "Trusted by",
  embedded = false,
  variant = "dark",
  cardVariant = "dark",
}) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [embedRequested, setEmbedRequested] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const carouselRootRef = useRef(null);

  // Prefer Strapi carousel items; fall back to static posts only when CMS has none
  const carouselTitle = carousalData?.title || title;
  const cmsItems =
    carousalData?.items ||
    carousalData?.carousal_item ||
    carousalData?.carousalItem ||
    null;
  const carouselItems =
    (Array.isArray(cmsItems) && cmsItems.length > 0 ? cmsItems : null) ||
    posts ||
    [];

  // Defer Twitter until near/in viewport — widgets.js dominates main-thread on mobile PSI
  useEffect(() => {
    if (!carouselItems.length) return;
    if (typeof IntersectionObserver === "undefined") {
      setEmbedRequested(true);
      return;
    }
    let io;
    const raf = requestAnimationFrame(() => {
      const el = carouselRootRef.current;
      if (!el) return;
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEmbedRequested(true);
            io.disconnect();
          }
        },
        { root: null, rootMargin: "240px 0px 320px 0px", threshold: 0.01 }
      );
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [carouselItems.length]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!embedRequested || typeof window === "undefined") return;

    const root = carouselRootRef.current;

    const finishLoad = () => setIsLoaded(true);

    const runWidgetLoad = () => {
      try {
        if (!window.twttr?.widgets?.load) {
          finishLoad();
          return;
        }
        const p = root ? window.twttr.widgets.load(root) : window.twttr.widgets.load();
        if (p && typeof p.then === "function") {
          p.then(finishLoad).catch(finishLoad);
        } else {
          finishLoad();
        }
      } catch {
        finishLoad();
      }
    };

    const startWhenReady = () => {
      if (window.twttr?.widgets?.load) {
        runWidgetLoad();
      } else if (window.twttr?.ready) {
        window.twttr.ready(runWidgetLoad);
      } else {
        finishLoad();
      }
    };

    let script = document.getElementById("twitter-wjs");
    if (!script) {
      script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.addEventListener("load", startWhenReady);
      document.body.appendChild(script);
    } else {
      startWhenReady();
    }

    return () => {
      script?.removeEventListener("load", startWhenReady);
    };
  }, [embedRequested]);

  useEffect(() => {
    if (!isLoaded || !embedRequested || typeof window === "undefined" || !window.twttr?.widgets?.load)
      return;
    try {
      const root = carouselRootRef.current;
      const p = root ? window.twttr.widgets.load(root) : window.twttr.widgets.load();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch {
      /* ignore */
    }
  }, [currentPostIndex, isLoaded, embedRequested, carouselItems.length, embedded, variant, cardVariant]);

  const nextPost = () => {
    setCurrentPostIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  if (!carouselItems || carouselItems.length === 0) {
    return null;
  }

  const isLight = variant === "light" && !embedded;
  const useLightCards = cardVariant === "light" || variant === "light";

  // Determine items per view based on window width
  const getItemsPerView = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const itemsPerView = getItemsPerView();
  const maxDesktopIndex = Math.max(0, carouselItems.length - itemsPerView);
  const gap = embedded
    ? windowWidth < 768
      ? 10
      : windowWidth < 1024
        ? 12
        : 14
    : windowWidth < 768
      ? 24
      : windowWidth < 1024
        ? 32
        : 40;
  const isMobile = windowWidth < 768;

  const desktopCardWidthClass = embedded
    ? "w-full md:w-[calc(50%-6px)] lg:w-[calc(33.333%-9.5px)]"
    : "w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-26.666px)]";

  const rootClass = embedded
    ? `py-4 sm:py-6 lg:py-8 overflow-hidden bg-[#0f0f0f] rounded-[14px] border border-white/12 ${padding} relative`
    : isLight
      ? `py-10 lg:py-14 xl:py-16 overflow-hidden rounded-[20px] border border-[#1a1a1a]/12 bg-white/55 shadow-[0_1px_0_rgba(26,26,26,0.06)] ${padding} relative`
      : `py-[60px] lg:py-[80px] xl:py-[100px] 2xl:py-[140px] xxl:py-[180px] 3xl:py-[250px] overflow-hidden bg-black ${padding} relative`;

  const headerWrapClass = embedded
    ? "px-3 sm:px-5 lg:px-8 mb-4 lg:mb-6 flex flex-row items-center justify-between"
    : isLight
      ? "px-4 sm:px-6 lg:px-8 mb-6 lg:mb-8 flex flex-row items-center justify-between gap-4"
      : "px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px] mb-12 flex flex-row items-center justify-between";

  const innerPadClass = embedded
    ? "px-0 lg:px-4 xl:px-6"
    : isLight
      ? "px-2 sm:px-4 lg:px-6"
      : "px-0 lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px]";

  const cardShell =
    embedded
      ? "min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]"
      : isLight
        ? "min-h-[380px] lg:min-h-[460px]"
        : "min-h-[450px] lg:min-h-[550px]";

  const cardShellClass = useLightCards
    ? `bg-white rounded-3xl p-4 ${cardShell} flex items-center justify-center relative group border border-[#1a1a1a]/10 shadow-[0_2px_12px_rgba(26,26,26,0.06)] transition-colors duration-300 hover:border-[#1a1a1a]/18`
    : `bg-[#111] rounded-3xl p-4 ${cardShell} flex items-center justify-center relative group border border-white/5 hover:border-white/20 transition-colors duration-500`;

  const tweetTheme = useLightCards ? "light" : "dark";

  const spinnerClass = useLightCards
    ? "border-[#1a1a1a]/20 border-t-[#1a1a1a]/80"
    : "border-white/10 border-t-white";

  const tweetCardOuterClass = embedded
    ? useLightCards
      ? `bg-white rounded-3xl p-4 ${cardShell} flex items-center justify-center relative group border border-[#1a1a1a]/10 shadow-[0_2px_12px_rgba(26,26,26,0.06)] transition-colors duration-300 hover:border-[#1a1a1a]/18`
      : `bg-[#111] rounded-3xl p-4 ${cardShell} flex items-center justify-center relative group border border-white/5 hover:border-white/20 transition-colors duration-500`
    : cardShellClass;

  return (
    <div ref={carouselRootRef} className={rootClass}>
      <div className={headerWrapClass}>
        {isLight ? (
          <h2 className="text-[#1A1A1A] text-[20px] sm:text-[24px] lg:text-[30px] font-bold uppercase tracking-[-0.04em] leading-[1.1]">
            {carouselTitle}
          </h2>
        ) : (
          <SectionTitle disableTitleSpacing className="text-white">
            {carouselTitle}
          </SectionTitle>
        )}

        {/* Navigation Arrows */}
        {!isMobile ? <ArrowNavButtons onLeft={prevPost} onRight={nextPost} /> : null}
      </div>

      <div className="relative">
        <div className={innerPadClass}>
          {isMobile ? (
            <div
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{
                gap: `${gap}px`,
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pinch-zoom",
                paddingInline: isLight ? "3vw" : embedded ? "4vw" : "7.5vw",
                scrollPaddingInline: isLight ? "3vw" : embedded ? "4vw" : "7.5vw",
              }}
            >
              {carouselItems.map((item, idx) => {
                const rawId = typeof item === "string" ? item : item.tweetId || item.id;
                const tweetId = parseTweetId(rawId);
                return (
                  <div
                    key={`${tweetId}-${idx}`}
                    className="w-[85vw] snap-center flex-shrink-0"
                  >
                    <div className={tweetCardOuterClass}>
                      {embedRequested && !isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center z-[1]">
                          <div
                            className={`w-10 h-10 border-4 ${spinnerClass} rounded-full animate-spin`}
                          />
                        </div>
                      )}
                      <div
                        className={`w-full h-full overflow-hidden ${isLoaded ? "pointer-events-none" : ""}`}
                      >
                        <blockquote
                          className="twitter-tweet"
                          data-theme={tweetTheme}
                          data-chrome="noheader nofooter noborders transparent"
                        >
                          <a href={`https://twitter.com/x/status/${tweetId}`} />
                        </blockquote>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="overflow-visible cursor-grab active:cursor-grabbing select-none"
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
              onPointerDown={(e) => {
                if (e.pointerType === "mouse" && e.button !== 0) return;
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                setIsDragging(true);
                setDragStartX(e.clientX);
                setDragDeltaX(0);
              }}
              onPointerMove={(e) => {
                if (!isDragging) return;
                setDragDeltaX(e.clientX - dragStartX);
              }}
              onPointerUp={(e) => {
                if (!isDragging) return;
                setIsDragging(false);
                const delta = e.clientX - dragStartX;
                const threshold = 60;
                if (delta <= -threshold) {
                  setCurrentPostIndex((prev) => Math.min(prev + 1, maxDesktopIndex));
                } else if (delta >= threshold) {
                  setCurrentPostIndex((prev) => Math.max(prev - 1, 0));
                }
                setDragDeltaX(0);
              }}
              onPointerCancel={() => {
                setIsDragging(false);
                setDragDeltaX(0);
              }}
            >
              <div
                className="flex select-none"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(-${currentPostIndex * (100 / itemsPerView)}% - ${currentPostIndex * (gap / itemsPerView)}px + ${isDragging ? dragDeltaX : 0}px))`,
                  transition: isDragging ? "none" : "transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                {carouselItems.map((item, idx) => {
                  const rawId = typeof item === "string" ? item : item.tweetId || item.id;
                  const tweetId = parseTweetId(rawId);
                  return (
                    <div
                      key={`${tweetId}-${idx}`}
                      className={`${desktopCardWidthClass} flex-shrink-0`}
                    >
                      <div className={tweetCardOuterClass}>
                        {embedRequested && !isLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center z-[1]">
                            <div
                              className={`w-10 h-10 border-4 ${spinnerClass} rounded-full animate-spin`}
                            />
                          </div>
                        )}
                        <div
                          className={`w-full h-full overflow-hidden ${isLoaded ? "pointer-events-none" : ""}`}
                        >
                          <blockquote
                            className="twitter-tweet"
                            data-theme={tweetTheme}
                            data-chrome="noheader nofooter noborders transparent"
                          >
                            <a href={`https://twitter.com/x/status/${tweetId}`} />
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetCarousel;
