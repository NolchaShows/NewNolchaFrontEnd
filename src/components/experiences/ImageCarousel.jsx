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

const ImageCarousel = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const screenSize = useScreenSize();

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

  const nextPost = () => {
    if (currentPostIndex + postsPerSlide < posts.length) {
      setCurrentPostIndex((prev) => prev + postsPerSlide);
    }
  };

  const prevPost = () => {
    if (currentPostIndex - postsPerSlide >= 0) {
      setCurrentPostIndex((prev) => prev - postsPerSlide);
    }
  };

  return (
    <div className="px-4 md:px-8 mb-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-3xl md:text-4xl 2xl:text-6xl font-neue font-bold text-black mt-10"
        >
          WE ARE TRUSTED BY
        </h2>
        <div className="flex gap-[15px] mt-6">
          <button
            onClick={prevPost}
            disabled={currentPostIndex === 0}
            aria-label="Previous post"
          >
            <motion.img
              src="/landing/left.svg"
              className="cursor-pointer 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
          <button
            onClick={nextPost}
            disabled={currentPostIndex + postsPerSlide >= posts.length}
            aria-label="Next post"
          >
            <motion.img
              src="/landing/right.svg"
              className="cursor-pointer 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${
              (currentPostIndex / postsPerSlide) * 100
            }%)`,
          }}
        >
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2"
            >
              <img
                src={post}
                alt={`Post ${idx + 1}`}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
