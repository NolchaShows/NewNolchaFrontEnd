import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const TweetCarousel = ({
  posts,
  carousalData,
  padding = "px-4 md:px-8 mb-6",
  title = "Trusted by",
}) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const screenSize = useScreenSize();

  // Use dynamic data from Strapi if available, otherwise fallback to posts prop
  const carouselTitle = carousalData?.title || title;
  const carouselItems = carousalData?.carousal_item || posts || [];

  console.log('TweetCarousel - carousalData:', carousalData);
  console.log('TweetCarousel - carouselItems:', carouselItems);

  const getPostsPerSlide = () => {
    switch (screenSize) {
      case "sm":
        return 1;
      case "md":
        return 2;
      case "lg":
        return 3;
      default:
        return 3;
    }
  };

  const postsPerSlide = getPostsPerSlide();

  // Load Twitter embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const nextPost = () => {
    if (currentPostIndex + postsPerSlide < carouselItems.length) {
      setCurrentPostIndex((prev) => prev + postsPerSlide);
    } else {
      // Fade animation when reaching the end - go back to first tweet
      const carouselElement = document.querySelector('.tweet-carousel');
      if (carouselElement) {
        carouselElement.style.opacity = '0';
        setTimeout(() => {
          setCurrentPostIndex(0);
          carouselElement.style.opacity = '1';
        }, 300);
      } else {
        setCurrentPostIndex(0);
      }
    }
  };

  const prevPost = () => {
    if (currentPostIndex - postsPerSlide >= 0) {
      setCurrentPostIndex((prev) => prev - postsPerSlide);
    } else {
      // Fade animation when reaching the beginning - go to last tweet
      const carouselElement = document.querySelector('.tweet-carousel');
      if (carouselElement) {
        carouselElement.style.opacity = '0';
        setTimeout(() => {
          setCurrentPostIndex(Math.max(0, carouselItems.length - postsPerSlide));
          carouselElement.style.opacity = '1';
        }, 300);
      } else {
        setCurrentPostIndex(Math.max(0, carouselItems.length - postsPerSlide));
      }
    }
  };

  // If no data available, don't render the component
  if (!carouselItems || carouselItems.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-hidden ${padding}`}>
      <div className="flex items-center justify-between mb-6">
        <h2
          className="
            text-[32px] md:text-[52px] 2xl:text-[60px]
            font-bold
            leading-[120%]
            tracking-[-0.03em]
            uppercase
            text-black
          "
        >
          {carouselTitle}
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 tweet-carousel"
          style={{
            transform: `translateX(-${(currentPostIndex / postsPerSlide) * 100
              }%)`,
            transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out'
          }}
        >
          {carouselItems.map((item, idx) => {
            // Handle tweet IDs for Twitter embeds
            const tweetId = typeof item === 'string' ? item : item.tweetId || item.id;

            return (
              <div
                key={idx}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2"
              >
                <div className="w-full max-h-[640px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  <blockquote className="twitter-tweet" data-theme="light">
                    <a href={`https://twitter.com/x/status/${tweetId}`}></a>
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex mt-6 gap-[17px] lg:gap-[30px] justify-center">
        <button
          onClick={prevPost}
          aria-label="Previous post"
        >
          <motion.img
            src="/left_white.png"
            className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
            whileTap={{ scale: 0.9 }}
          />
        </button>
        <button
          onClick={nextPost}
          aria-label="Next post"
        >
          <motion.img
            src="/right_white.png"
            className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
            whileTap={{ scale: 0.9 }}
          />
        </button>
      </div>
    </div>
  );
};

export default TweetCarousel;
