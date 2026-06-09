"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import SectionTitle from "../common/SectionTitle";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";
import { navigateToContactLikeLetsTalk } from "@/lib/letsTalkNavigation";

const DEFAULT_VIDEO_SRC =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/How%20Brands%20Work%201.mp4";

const ExploreServices = ({ title, videoSrc, caption, items }) => {
  const resolvedTitle = title || "How Brands Work With Nolcha";
  const resolvedItems =
    items && items.length > 0
      ? items
      : [];
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sectionVideoSrc = videoSrc || DEFAULT_VIDEO_SRC;

  const activeVideoSrc = useMemo(() => {
    if (expandedIndex < 0 || !resolvedItems[expandedIndex]) {
      return sectionVideoSrc;
    }
    const itemVideo = resolvedItems[expandedIndex]?.videoSrc;
    return itemVideo && String(itemVideo).trim()
      ? String(itemVideo).trim()
      : sectionVideoSrc;
  }, [expandedIndex, resolvedItems, sectionVideoSrc]);

  const toggleItem = (index) => {
    const newIndex = expandedIndex === index ? -1 : index;
    setExpandedIndex(newIndex);
  };

  // Swap video when tab changes; fall back to section default when item has no video
  useEffect(() => {
    const video = videoRef.current;
    if (!inView || !video) return;

    if (expandedIndex < 0) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const currentSrc = video.getAttribute("src") || "";
    if (currentSrc !== activeVideoSrc) {
      video.src = activeVideoSrc;
      video.load();
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [expandedIndex, activeVideoSrc, inView]);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <section ref={sectionRef} className="page-container bg-black py-[60px] lg:py-[80px] xl:py-[100px] 2xl:py-[120px] xxl:py-[140px] 3xl:py-[200px]">
      <SectionTitle className="text-white text-left mb-[30px] lg:mb-[40px] xl:mb-[50px] 2xl:mb-[60px] xxl:mb-[70px] 3xl:mb-[100px]">{resolvedTitle}</SectionTitle>

      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[24px] xl:gap-[30px] 2xl:gap-[40px] xxl:gap-[60px] 3xl:gap-[100px] items-center lg:items-start">
        {/* Left video player with play button */}
        <div className="relative w-[300px] lg:w-[380px] xl:w-[435px] 2xl:w-[500px] xxl:w-[580px] 3xl:w-[800px]">
          <div className="rounded-[14px] lg:rounded-[18px] xl:rounded-[22px] 2xl:rounded-[30px] xxl:rounded-[40px] 3xl:rounded-[60px] overflow-hidden relative bg-black">
            <video
              ref={videoRef}
              src={inView ? activeVideoSrc : undefined}
              className="w-full h-[340px] lg:h-[500px] xl:h-[570px] 2xl:h-[620px] xxl:h-[700px] 3xl:h-[1000px] object-cover"
              onPause={handleVideoPause}
              onPlay={handleVideoPlay}
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                }
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
            {/* Play button overlay - only show if video failed to autoplay */}
            {!isPlaying && expandedIndex >= 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }}
              >
                <div className="w-[60px] h-[60px] lg:w-[70px] xl:w-[80px] 2xl:w-[100px] lg:h-[70px] xl:h-[80px] 2xl:h-[100px] bg-white/90 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg
                    className="w-[30px] h-[30px] lg:w-[35px] xl:w-[40px] 2xl:w-[50px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px] text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right accordion list */}
        <div className="flex-1 flex flex-col">
          {resolvedItems.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const itemTitle = `${item.label}: ${item.text}`;
            const seeOurWork = item.work || "";
            const tagColors = [
              "bg-green-200 text-green-800",
              "bg-blue-200 text-blue-800",
              "bg-yellow-200 text-yellow-800",
              "bg-pink-200 text-pink-800"
            ];

            return (
              <div key={idx} className="bg-secondary mb-[10px] py-4 px-6 rounded-[6px] lg:rounded-[12px] 2xl:rounded-[20px]">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex justify-between items-center text-left transition-colors"
                >
                  <h3 className="text-[18px] lg:text-[22px] xl:text-[28px] 2xl:text-[32px] xxl:text-[40px] 3xl:text-[56px] text-white leading-[1.2] pr-4">
                    <span className="font-normal">{item.label}:</span>{" "}
                    <span className="font-normal">{item.text}</span>
                  </h3>
                  {/* Toggle Icon */}
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <svg
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Expandable Content — CSS max-height accordion (no framer-motion) */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: isExpanded ? "800px" : "0",
                    opacity: isExpanded ? 1 : 0,
                    transition: "max-height 0.35s ease-in-out, opacity 0.25s ease-in-out",
                  }}
                >
                  <div>
                    <StrapiRichDescription
                      value={item.description}
                      fallback="Fluent in innovation, tech, and crypto culture — we bridge creative vision with operational precision. From concept to completion, our team delivers full-scale event strategy, talent and programming, logistics, venue sourcing, art direction, and guest list curation. We handle every detail so your brand can own the moment — seamlessly merging storytelling, design, and experience."
                      className="mt-[10px] mb-[6px] text-[14px] leading-relaxed text-white lg:mt-[20px] lg:mb-[10px] lg:text-[16px] 2xl:mt-[30px] 2xl:mb-[14px] 2xl:text-[20px] [&_p]:m-0"
                    />

                    {/* Scope of work */}
                    {seeOurWork && (
                      <div className="mb-[10px] lg:mb-[20px] 2xl:mb-[30px]">
                        <h4 className="text-white text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold mb-[12px] lg:mb-[10px] 2xl:mb-[14px]">
                          See our Work
                        </h4>
                        <div className="flex flex-wrap gap-[8px] lg:gap-[12px] 2xl:gap-[16px]">
                          <p className="text-white text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed mb-[6px] lg:mb-[10px] 2xl:mb-[14px]">
                            {seeOurWork}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Lets Talk Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToContactLikeLetsTalk();
                      }}
                      className="group flex items-center gap-2 px-[16px] lg:px-[24px] 2xl:px-[32px] py-[10px] lg:py-[12px] 2xl:py-[14px] bg-primary hover:bg-primary/80 text-black font-medium rounded-lg text-[14px] lg:text-[16px] 2xl:text-[18px] transition-all duration-300"
                    >
                      <span>Lets Talk</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;


