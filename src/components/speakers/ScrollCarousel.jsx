import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
function ScrollCarousel({ images }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const containerRef = useRef(null);

  // Fallback images if no images provided from Strapi
  const fallbackImages = [
    "/speakers/9.png",
    "/speakers/10.png", 
    "/speakers/11.png",
    "/speakers/9.png",
    "/speakers/10.png",
    "/speakers/11.png",
  ];

  // Use Strapi images if available, otherwise use fallback images
  const displayImages = images && images.length > 0 ? images : fallbackImages;

  console.log('🎠 ScrollCarousel using images:', { 
    strapiCount: images?.length || 0, 
    fallbackCount: fallbackImages.length,
    usingFallback: !images || images.length === 0
  });

  // Responsive item width and gap - reduced sizes
  const getItemDimensions = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) { // 2xl
        return { itemWidth: 500, gap: 50 }; // reduced from 600, 60
      } else if (window.innerWidth >= 1280) { // xl
        return { itemWidth: 420, gap: 42 }; // reduced from 500, 50
      } else if (window.innerWidth >= 1024) { // lg
        return { itemWidth: 350, gap: 35 }; // reduced from 400, 43
      }
    }
    return { itemWidth: 350, gap: 35 }; // default reduced
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const { itemWidth, gap } = getItemDimensions();
      const totalContentWidth = displayImages.length * itemWidth + (displayImages.length - 1) * gap;

      const maxScroll = Math.max(totalContentWidth - containerWidth, 0);
      setMaxOffset(maxScroll);
    }

    // Add resize listener to recalculate on window resize
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const { itemWidth, gap } = getItemDimensions();
        const totalContentWidth = displayImages.length * itemWidth + (displayImages.length - 1) * gap;
        const maxScroll = Math.max(totalContentWidth - containerWidth, 0);
        setMaxOffset(maxScroll);
        setSliderValue(0); // Reset position on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayImages.length]);

  const { gap } = getItemDimensions();

  return (
    <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto lg:py-[64px] xl:py-[80px] 2xl:py-[100px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[24px] px-[16px]">
      {/* Desktop carousel */}
      <div ref={containerRef} className="max-w-[1290px] xl:max-w-[1500px] 2xl:max-w-none overflow-hidden">
        <motion.div
          className="flex gap-[35px] xl:gap-[42px] 2xl:gap-[50px]"
          animate={{ x: -sliderValue }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        >
          {displayImages.map((src, i) => {
            // Extract URL from Strapi media format
            let imageUrl = typeof src === 'string' 
              ? src 
              : src?.url || src?.attributes?.url || src;
            
            // Only convert to Strapi absolute URLs if this is actually a Strapi image
            // Fallback images (local public folder) should not be converted
            const isStrapiImage = images && images.length > 0; // We're using Strapi images
            if (isStrapiImage && imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
              imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
            }
            
            return (
              <img
                key={i}
                src={imageUrl}
                className="max-w-[300px] md:max-w-[350px] xl:max-w-[420px] 2xl:max-w-[500px] 2xl:max-h-[550px] rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] flex-shrink-0 object-cover"
                alt=""
                onError={(e) => {
                  console.log('🚨 Image failed to load:', imageUrl);
                  e.target.style.display = 'none'; // Hide broken images
                }}
              />
            );
          })}
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