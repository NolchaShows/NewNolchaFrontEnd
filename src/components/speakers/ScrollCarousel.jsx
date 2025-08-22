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

  const itemWidth = 400;
  const gap = 43;

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalContentWidth = images.length * itemWidth + (images.length - 1) * gap;

      const maxScroll = Math.max(totalContentWidth - containerWidth, 0);
      setMaxOffset(maxScroll);
    }
  }, [images.length]);

  return (
    <div className="max-w-[1440px] mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px]">
      {/* Desktop carousel */}
      <div ref={containerRef} className="max-w-[1290px] overflow-hidden ">
        <motion.div
          className="flex gap-[43px]"
          animate={{ x: -sliderValue }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className="md:max-w-[400px] max-w-[340px] rounded-[8px] flex-shrink-0 object-cover"
            />
          ))}
        </motion.div>
      </div>

      {/* Slider scroller */}
      <div className="flex justify-center mt-4">
        <input
          type="range"
          min="0"
          max={maxOffset}
          value={sliderValue}
          step="1"
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="
    w-2/3 h-2 appearance-none cursor-pointer rounded-lg
    bg-gradient-to-r from-[#909090] to-[#E2E2E2]
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[#909090]
    [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:border-white
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-[#909090]
  "
          style={{
            background: `linear-gradient(to right, #909090 0%, #909090 ${(sliderValue / maxOffset) * 100
              }%, #E2E2E2 ${(sliderValue / maxOffset) * 100}%, #E2E2E2 100%)`,
          }}
        />

      </div>
    </div>
  );
}

export default ScrollCarousel;
