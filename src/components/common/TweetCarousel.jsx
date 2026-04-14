"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";

const TweetCarousel = ({
  posts,
  carousalData,
  padding = "",
  title = "Trusted by",
}) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Use dynamic data from Strapi if available, otherwise fallback to posts prop
  const carouselTitle = carousalData?.title || title;
  const carouselItems =
    carousalData?.items ||
    carousalData?.carousal_item ||
    carousalData?.carousalItem ||
    posts ||
    [];

  // Load Twitter embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    const timer = setTimeout(() => setIsLoaded(true), 1500);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextPost = () => {
    setCurrentPostIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  if (!carouselItems || carouselItems.length === 0) {
    return null;
  }

  // Determine items per view based on window width
  const getItemsPerView = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const itemsPerView = getItemsPerView();
  const gap = windowWidth < 768 ? 24 : windowWidth < 1024 ? 32 : 40;

  return (
    <div className={`py-[60px] lg:py-[80px] xl:py-[100px] 2xl:py-[140px] xxl:py-[180px] 3xl:py-[250px] overflow-hidden bg-black ${padding} relative`}>
      <div className="px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px] mb-12 flex flex-row items-center justify-between">
        <SectionTitle disableTitleSpacing className="text-white">{carouselTitle}</SectionTitle>

        {/* Navigation Arrows */}
        <div className="flex gap-4 xl:gap-6 2xl:gap-8 xxl:gap-10">
          <button
            onClick={prevPost}
            aria-label="Scroll left"
            className="group"
          >
            <motion.img
              src="/left.jpg"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[60px] 2xl:h-[60px] xxl:w-[70px] xxl:h-[70px] 3xl:w-[100px] 3xl:h-[100px] rounded-[5px] lg:rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] xxl:rounded-[15px] 3xl:rounded-[20px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
          <button
            onClick={nextPost}
            aria-label="Scroll right"
            className="group"
          >
            <motion.img
              src="/right.jpg"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[60px] 2xl:h-[60px] xxl:w-[70px] xxl:h-[70px] 3xl:w-[100px] 3xl:h-[100px] rounded-[5px] lg:rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] xxl:rounded-[15px] 3xl:rounded-[20px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="px-[20px] lg:px-[60px] xl:px-[140px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px]">
          <div className="overflow-visible">
            <motion.div
              className="flex"
              style={{ gap: `${gap}px` }}
              animate={{
                x: `calc(-${currentPostIndex * (100 / itemsPerView)}% - ${currentPostIndex * (gap / itemsPerView)}px)`,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
              {carouselItems.map((item, idx) => {
                const tweetId = typeof item === 'string' ? item : item.tweetId || item.id;
                return (
                  <div
                    key={`${tweetId}-${idx}`}
                    className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-26.666px)] flex-shrink-0"
                  >
                    <div className="bg-[#111] rounded-3xl p-4 min-h-[450px] lg:min-h-[550px] flex items-center justify-center relative group border border-white/5 hover:border-white/20 transition-colors duration-500">
                      {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                        </div>
                      )}
                      <div className="w-full h-full overflow-y-auto scrollbar-hide">
                        <blockquote className="twitter-tweet" data-theme="dark" data-chrome="noheader nofooter noborders transparent">
                          <a href={`https://twitter.com/x/status/${tweetId}`}></a>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCarousel;
