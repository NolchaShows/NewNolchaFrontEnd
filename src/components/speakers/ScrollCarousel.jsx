import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

function ScrollCarousel() {
  const [sliderValue, setSliderValue] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const containerRef = useRef(null);

  const images = [
    "/speakers/9.png",
    "/speakers/10.png",
    "/speakers/11.png",
    "/speakers/9.png",
    "/speakers/10.png",
    "/speakers/11.png",
  ];

  // Responsive item width and gap
  const getItemDimensions = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) { // 2xl
        return { itemWidth: 600, gap: 60 };
      } else if (window.innerWidth >= 1280) { // xl
        return { itemWidth: 500, gap: 50 };
      } else if (window.innerWidth >= 1024) { // lg
        return { itemWidth: 400, gap: 43 };
      }
    }
    return { itemWidth: 400, gap: 43 }; // default
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const { itemWidth, gap } = getItemDimensions();
      const totalContentWidth = images.length * itemWidth + (images.length - 1) * gap;

      const maxScroll = Math.max(totalContentWidth - containerWidth, 0);
      setMaxOffset(maxScroll);
    }

    // Add resize listener to recalculate on window resize
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const { itemWidth, gap } = getItemDimensions();
        const totalContentWidth = images.length * itemWidth + (images.length - 1) * gap;
        const maxScroll = Math.max(totalContentWidth - containerWidth, 0);
        setMaxOffset(maxScroll);
        setSliderValue(0); // Reset position on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images.length]);

  const { gap } = getItemDimensions();

  return (
    <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto lg:py-[64px] xl:py-[80px] 2xl:py-[100px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[24px] px-[16px]">
      {/* Desktop carousel */}
      <div ref={containerRef} className="max-w-[1290px] xl:max-w-[1500px] 2xl:max-w-none overflow-hidden">
        <motion.div
          className="flex gap-[43px] xl:gap-[50px] 2xl:gap-[60px]"
          animate={{ x: -sliderValue }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className=" max-w-[340px] md:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[700px] 2xl:max-h-[650px] rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] flex-shrink-0 object-cover"
            />
          ))}
        </motion.div>
      </div>

      {/* Slider scroller */}
      <div className="flex justify-center mt-4 xl:mt-6 2xl:mt-8">
        <input
          type="range"
          min="0"
          max={maxOffset}
          value={sliderValue}
          step="1"
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="
            w-2/3 xl:w-3/4 2xl:w-4/5 h-2 xl:h-3 2xl:h-4 appearance-none cursor-pointer rounded-lg
            bg-gradient-to-r from-[#909090] to-[#E2E2E2]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4 xl:[&::-webkit-slider-thumb]:h-5 2xl:[&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:w-4 xl:[&::-webkit-slider-thumb]:w-5 2xl:[&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#909090]
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-moz-range-thumb]:h-4 xl:[&::-moz-range-thumb]:h-5 2xl:[&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:w-4 xl:[&::-moz-range-thumb]:w-5 2xl:[&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#909090]
            [&::-moz-range-thumb]:border-none
          "
          style={{
            background: `linear-gradient(to right, #909090 0%, #909090 ${
              maxOffset > 0 ? (sliderValue / maxOffset) * 100 : 0
            }%, #E2E2E2 ${maxOffset > 0 ? (sliderValue / maxOffset) * 100 : 0}%, #E2E2E2 100%)`,
          }}
        />
      </div>
    </div>
  );
}

export default ScrollCarousel;