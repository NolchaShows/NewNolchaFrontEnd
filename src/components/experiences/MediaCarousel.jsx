import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MediaCarousel = ({ items }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
    ];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some((ext) => lowerUrl.includes(ext));
  };

  const nextItem = () => {
    if (currentItemIndex + 1 < items.length) {
      setCurrentItemIndex((prev) => prev + 1);
    }
  };

  const prevItem = () => {
    if (currentItemIndex - 1 >= 0) {
      setCurrentItemIndex((prev) => prev - 1);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="px-2 mb-12 overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="w-full">
          {isVideo(items[currentItemIndex]) ? (
            <video
              src={items[currentItemIndex]}
              controls
              className="w-full h-auto object-cover rounded-lg shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={items[currentItemIndex]}
              alt={`Media ${currentItemIndex + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          )}
        </div>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={prevItem}
            disabled={currentItemIndex === 0}
            aria-label="Previous item"
          >
            <motion.img
              src="/left_dark.png"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
          <button
            onClick={nextItem}
            disabled={currentItemIndex + 1 >= items.length}
            aria-label="Next item"
          >
            <motion.img
              src="/right_dark.png"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
