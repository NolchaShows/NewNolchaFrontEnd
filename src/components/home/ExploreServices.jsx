"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";

const ExploreServices = ({ title, image, caption, items }) => {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Video URLs mapping
  const videoUrls = [
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/How%20Brands%20Work%201.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/How%20Brands%20Work%203.mp4",
  ];

  // Get video URL for current item (cycle through if more items than videos)
  const getVideoUrl = (index) => {
    return videoUrls[index % videoUrls.length];
  };

  const toggleItem = (index) => {
    const newIndex = expandedIndex === index ? -1 : index;
    setExpandedIndex(newIndex);
  };

  // Auto-play video when expandedIndex changes
  useEffect(() => {
    if (videoRef.current && expandedIndex >= 0) {
      const newSrc = getVideoUrl(expandedIndex);
      if (videoRef.current.src !== newSrc) {
        videoRef.current.src = newSrc;
        videoRef.current.load();
      }
      // Auto-play video
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay failed (user interaction required in some browsers)
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    } else {
      // Pause when no item is expanded
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [expandedIndex]);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <section className="page-container bg-white py-[60px] lg:py-[100px] 2xl:py-[140px]">
      <SectionTitle className="text-black text-left mb-[30px] lg:mb-[50px] 2xl:mb-[70px]">{title}</SectionTitle>

      <div className="flex flex-col lg:flex-row gap-[10px] lg:gap-[30px] 2xl:gap-[60px]">
        {/* Left video player with play button */}
        <div className="relative w-[300px] lg:w-[435px] 2xl:w-[580px]">
          <div className="rounded-[14px] lg:rounded-[22px] 2xl:rounded-[40px] overflow-hidden relative bg-black">
            <video
              ref={videoRef}
              src={getVideoUrl(expandedIndex >= 0 ? expandedIndex : 0)}
              className="w-full h-[340px] lg:h-[570px] 2xl:h-[700px] object-cover"
              onPause={handleVideoPause}
              onPlay={handleVideoPlay}
              onEnded={() => {
                // Loop video when it ends
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                }
              }}
              autoPlay
              muted
              loop
              playsInline
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
                <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] 2xl:w-[100px] 2xl:h-[100px] bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg
                    className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] 2xl:w-[50px] 2xl:h-[50px] text-black ml-1"
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
          {items.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const itemTitle = `${item.label}: ${item.text}`;
            const rawDescription = item.description || "Fluent in innovation, tech, and crypto culture — we bridge creative vision with operational precision. From concept to completion, our team delivers full-scale event strategy, talent and programming, logistics, venue sourcing, art direction, and guest list curation. We handle every detail so your brand can own the moment — seamlessly merging storytelling, design, and experience.";
            
            // Process description to replace <br /> tags with spacing divs
            const processDescription = (text) => {
              if (!text) return "";
              // Replace <br /> and <br> tags with a div that adds spacing (responsive)
              return text.replace(/<br\s*\/?>/gi, '<div class="h-[6px] lg:h-[12px] 2xl:h-[18px]"></div>');
            };
            const description = processDescription(rawDescription);
            
            const seeOurWork = item.work || "";
            const tagColors = [
              "bg-green-200 text-green-800",
              "bg-blue-200 text-blue-800",
              "bg-yellow-200 text-yellow-800",
              "bg-pink-200 text-pink-800"
            ];

            return (
              <div key={idx} className="bg-[#F3F3F3] mb-[10px] py-4 px-6 rounded-[6px] lg:rounded-[12px] 2xl:rounded-[20px]">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex justify-between items-center text-left transition-colors"
                >
                  <h3 className="text-[18px] lg:text-[28px] 2xl:text-[40px] text-black leading-[1.2] pr-4">
                    <span className="font-bold">{item.label}:</span>{" "}
                    <span className="font-normal">{item.text}</span>
                  </h3>
                  {/* Toggle Icon */}
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <svg
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-black"
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
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-black"
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

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div>
                        {/* Description */}
                        <div
                          className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed mb-[6px] lg:mb-[10px] 2xl:mb-[14px] mt-[10px] lg:mt-[20px] 2xl:mt-[30px]"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />

                        {/* Scope of work */}
                        {seeOurWork && (
                          <div className="mb-[10px] lg:mb-[20px] 2xl:mb-[30px]">
                            <h4 className="text-black text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold mb-[12px] lg:mb-[10px] 2xl:mb-[14px]">
                              See our Work
                            </h4>
                            <div className="flex flex-wrap gap-[8px] lg:gap-[12px] 2xl:gap-[16px]">
                              <p className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed mb-[6px] lg:mb-[10px] 2xl:mb-[14px]">
                                {seeOurWork}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Lets Talk Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById("contact");
                            if (!el) return;
                            const nav = document.querySelector(".sticky.top-0");
                            const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset -
                              navHeight -
                              12;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }}
                          className="group flex items-center gap-2 px-[16px] lg:px-[24px] 2xl:px-[32px] py-[10px] lg:py-[12px] 2xl:py-[14px] bg-[#FF6813] hover:bg-[#FF9640] text-white font-medium rounded-full text-[14px] lg:text-[16px] 2xl:text-[18px] transition-all duration-300"
                        >
                          <span>Lets Talk</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;


