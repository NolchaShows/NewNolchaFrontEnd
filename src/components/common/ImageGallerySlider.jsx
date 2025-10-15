import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_IMAGES = [
  "/inscribing_miami/image_gallery/1.jpg",
  "/inscribing_miami/image_gallery/2.jpg",
  "/inscribing_miami/image_gallery/3.jpg",
  "/inscribing_miami/image_gallery/4.jpg",
  "/inscribing_miami/image_gallery/5.jpg",
  "/inscribing_miami/image_gallery/6.jpg",
  "/inscribing_miami/image_gallery/7.jpg",
  "/inscribing_miami/image_gallery/8.jpg",
  "/inscribing_miami/image_gallery/9.jpg",
  "/inscribing_miami/image_gallery/10.jpg",
  "/inscribing_miami/image_gallery/11.jpg",
  "/inscribing_miami/image_gallery/12.jpg"
];

const CLAMP = (num, min, max) => Math.min(Math.max(num, min), max);

const ImagePanel = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
};

const ImageGallerySlider = ({ images }) => {
  const items = useMemo(() => (Array.isArray(images) && images.length > 1 ? images : DEFAULT_IMAGES), [images]);

  const [smallIndex, setSmallIndex] = useState(0); // A (33%)
  const [largeIndex, setLargeIndex] = useState(1); // B (66%)
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 'next' | 'prev' | null

  const containerRef = useRef(null);

  const getNextIndex = (i) => (i + 1) % items.length;
  const getPrevIndex = (i) => (i - 1 + items.length) % items.length;

  const handleNext = () => {
    if (isAnimating || items.length < 2) return;
    setDirection('next');
    setIsAnimating(true);
    // After animation: A -> large, C (next after B) -> small
    const nextSmall = getNextIndex(largeIndex); // C
    const nextLarge = smallIndex; // A
    // Delay to let animation play before committing indices
    setTimeout(() => {
      setSmallIndex(nextSmall);
      setLargeIndex(nextLarge);
      setIsAnimating(false);
      setDirection(null);
    }, 450);
  };

  const handlePrev = () => {
    if (isAnimating || items.length < 2) return;
    setDirection('prev');
    setIsAnimating(true);
    // Reverse mapping: B should become the small panel, and previous of A (D) becomes large
    const oldSmall = smallIndex; // A
    const newSmall = largeIndex; // B
    const newLarge = getPrevIndex(oldSmall); // D
    setTimeout(() => {
      setSmallIndex(newSmall);
      setLargeIndex(newLarge);
      setIsAnimating(false);
      setDirection(null);
    }, 450);
  };

  // Layout sizes
  const SMALL_WIDTH = 33; // percent
  const LARGE_WIDTH = 67; // percent initially, expands to 77% during animate-in of next
  const EXPANDED_WIDTH = 77; // during transition target for expanding panel

  // Panel positions as percentages of container width
  // Left small panel starts at x = 0
  // Right large panel starts at x = 33%

  const transition = { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] };

  return (
    <div className="relative w-full py-[70px] lg:py-[150px] bg-[#F4F4F4]">
      <div ref={containerRef} className="relative w-full" style={{ height: 0, paddingBottom: "42%" }}>
        {/* Stage container maintains aspect by padding hack; inner absolute fills */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base panels (hidden during animation to prevent flicker) */}
          {!isAnimating && (
            <>
              <motion.div
                key={`small-${smallIndex}-base`}
                className="absolute top-0 h-full"
                initial={false}
                animate={{ left: "0%", width: `${SMALL_WIDTH}%` }}
                transition={transition}
                style={{ zIndex: 10 }}
              >
                <ImagePanel
                  src={items[smallIndex]}
                  alt={`image-${smallIndex}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                key={`large-${largeIndex}-base`}
                className="absolute top-0 h-full"
                initial={false}
                animate={{ left: `${SMALL_WIDTH}%`, width: `${LARGE_WIDTH}%` }}
                transition={transition}
                style={{ zIndex: 9 }}
              >
                <ImagePanel
                  src={items[largeIndex]}
                  alt={`image-${largeIndex}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </>
          )}

          {/* Animated overlays for smooth transitions */}
          <AnimatePresence initial={false}>
            {isAnimating && direction === 'next' && (
              <>
                {/* A overlay: move from left 0/33% to right 33/66% */}
                <motion.div
                  key={`overlay-a-next-${smallIndex}`}
                  className="absolute top-0 h-full"
                  initial={{ left: "0%", width: `${SMALL_WIDTH}%`, opacity: 1 }}
                  animate={{ left: `${SMALL_WIDTH}%`, width: `${LARGE_WIDTH}%`, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 12 }}
                >
                  <ImagePanel
                    src={items[smallIndex]}
                    alt={`image-${smallIndex}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* B overlay: slide out to the right */}
                <motion.div
                  key={`overlay-b-next-${largeIndex}`}
                  className="absolute top-0 h-full"
                  initial={{ left: `${SMALL_WIDTH}%`, width: `${LARGE_WIDTH}%`, opacity: 1 }}
                  animate={{ left: "100%", width: `${LARGE_WIDTH}%`, opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 8 }}
                >
                  <ImagePanel
                    src={items[largeIndex]}
                    alt={`image-${largeIndex}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* C overlay: slide in to the left slot */}
                <motion.div
                  key={`overlay-c-next-${getNextIndex(largeIndex)}`}
                  className="absolute top-0 h-full"
                  initial={{ left: "-40%", width: `${SMALL_WIDTH}%`, opacity: 0.001 }}
                  animate={{ left: "0%", width: `${SMALL_WIDTH}%`, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 11 }}
                >
                  <ImagePanel
                    src={items[getNextIndex(largeIndex)]}
                    alt={`image-${getNextIndex(largeIndex)}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </>
            )}
            {isAnimating && direction === 'prev' && (
              <>
                {/* B overlay: move from right 33/66% to left 0/33% */}
                <motion.div
                  key={`overlay-b-prev-${largeIndex}`}
                  className="absolute top-0 h-full"
                  initial={{ left: `${SMALL_WIDTH}%`, width: `${LARGE_WIDTH}%`, opacity: 1 }}
                  animate={{ left: "0%", width: `${SMALL_WIDTH}%`, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 12 }}
                >
                  <ImagePanel
                    src={items[largeIndex]}
                    alt={`image-${largeIndex}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* A overlay: slide out to the left */}
                <motion.div
                  key={`overlay-a-prev-${smallIndex}`}
                  className="absolute top-0 h-full"
                  initial={{ left: "0%", width: `${SMALL_WIDTH}%`, opacity: 1 }}
                  animate={{ left: "-40%", width: `${SMALL_WIDTH}%`, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 8 }}
                >
                  <ImagePanel
                    src={items[smallIndex]}
                    alt={`image-${smallIndex}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* D overlay: slide in from right to large slot */}
                <motion.div
                  key={`overlay-d-prev-${getPrevIndex(smallIndex)}`}
                  className="absolute top-0 h-full"
                  initial={{ left: "100%", width: `${LARGE_WIDTH}%`, opacity: 0.001 }}
                  animate={{ left: `${SMALL_WIDTH}%`, width: `${LARGE_WIDTH}%`, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  style={{ zIndex: 11 }}
                >
                  <ImagePanel
                    src={items[getPrevIndex(smallIndex)]}
                    alt={`image-${getPrevIndex(smallIndex)}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </>
            )}
           </AnimatePresence>

           {/* Navigation Arrows - Positioned at bottom center inside carousel */}
           {items.length > 1 && (
             <div className="absolute bottom-[18px] lg:bottom-[30px] left-1/2 transform -translate-x-1/2 flex gap-[16px] z-30">
               <button onClick={handlePrev} aria-label="Previous image">
                 <motion.img
                   src="/left_yellow.png"
                   className="cursor-pointer w-[30px] h-[30px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
                   whileTap={{ scale: 0.9 }}
                 />
               </button>
               <button onClick={handleNext} aria-label="Next image">
                 <motion.img
                   src="/right_yellow.png"
                   className="cursor-pointer w-[30px] h-[30px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
                   whileTap={{ scale: 0.9 }}
                 />
               </button>
             </div>
           )}
         </div>
       </div>
    </div>
  );
};

export default ImageGallerySlider;