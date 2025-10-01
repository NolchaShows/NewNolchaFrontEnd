"use client";
import React, { useRef, useState, useEffect } from "react";
import "./ShakingImages.css";

const AnimatedCards = ({ testimonialImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full font-sans relative">
      {/* Card Container */}
      <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[700px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[700px] mb-8">
        {testimonialImages.map((card, index) => {
          const offset = index - activeIndex;
          const zIndex = 100 - Math.abs(offset);

          let translateX = 0;
          let rotate = 0;
          let scale = 1;

          // Only calculate window-dependent values on the client
          if (isClient) {
            if (offset > 0) {
              // Cards after active → stack to the right
              translateX = offset * (window.innerWidth >= 1536 ? 24 : 12);
              rotate = offset * 0.3;
              scale = Math.max(0.88, 1 - offset * 0.02);
            } else if (offset < 0) {
              // Cards before active → stack to the left  
              translateX = offset * (window.innerWidth >= 1536 ? 24 : 12);
              rotate = offset * 0.3;
              scale = Math.max(0.88, 1 - Math.abs(offset) * 0.02);
            }
          }

          return (
            <div
              key={index}
              className="absolute bg-white top-0 left-1/2 w-full h-full rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                transformOrigin: "bottom center",
                cursor: "pointer", // Explicitly ensure cursor is visible
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={card}
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                style={{ cursor: "pointer" }} // Ensure image also shows cursor
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Dots/Lines - Outside the card container */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        {testimonialImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              activeIndex === index
                ? "bg-black w-12 sm:w-16 md:w-20 2xl:w-24"
                : "bg-gray-400 w-6 sm:w-8 2xl:w-10"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to card ${index + 1}`}
            style={{ cursor: "pointer" }} // Explicitly ensure cursor is visible
          />
        ))}
      </div>
    </div>
  );
};

function Stack({ stackData }) {
  // Fallback data
  const fallbackImages1 = [
    { url: "/speakers/1.jpg", css: "rotate-[-25deg]" },
    { url: "/speakers/2.png", css: "rotate-[10deg]" },
    { url: "/speakers/3.jpg", css: "rotate-[-5deg]" },
    { url: "/speakers/4.jpg", css: "rotate-[25deg]" },
  ];
  const fallbackImages2 = [
    { url: "/speakers/5.jpg", css: "rotate-[10deg]" },
    { url: "/speakers/6.jpg", css: "rotate-[-10deg]" },
    { url: "/speakers/7.jpg", css: "rotate-[-5deg]" },
    { url: "/speakers/8.jpg", css: "rotate-[-15deg]" },
  ];

  // Helper function to extract image URL from Strapi media
  const extractImageUrl = (imageItem) => {
    if (typeof imageItem === 'string') return imageItem;
    
    let url = null;
    if (imageItem?.url) url = imageItem.url;
    else if (imageItem?.attributes?.url) url = imageItem.attributes.url;
    else if (Array.isArray(imageItem) && imageItem.length > 0) {
      return extractImageUrl(imageItem[0]);
    }
    
    // Convert relative URLs to absolute URLs
    if (url && typeof url === 'string' && url.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;
    }
    
    return url;
  };

  // Extract dynamic data or use fallbacks
  const title = stackData?.title || "Featuring speakers who are shaping the future of Bitcoin, art, film, fashion, AI, and blockchain.";
  
  const testimonialImages = stackData?.testimonials?.length > 0
    ? (() => {
        const images = stackData.testimonials.map(testimonial => {
          // Check if testimonial is just an ID object (not populated)
          if (testimonial && typeof testimonial === 'object' && testimonial.id && !testimonial.images) {
            console.log('⚠️ Testimonial not fully populated, using fallback');
            return null;
          }
          
          // Handle the new structure: testimonial.images is a single image object
          if (testimonial.images && typeof testimonial.images === 'object') {
            return extractImageUrl(testimonial.images);
          }
          
          // Legacy handling for arrays
          if (testimonial.images && Array.isArray(testimonial.images)) {
            return testimonial.images.map(img => extractImageUrl(img)).filter(Boolean);
          }
          return extractImageUrl(testimonial);
        }).flat().filter(Boolean);
        
        return images.length > 0 ? images : ["/speakers/stack.png", "/speakers/stack1.png", "/speakers/stack2.png", "/speakers/stack3.png", "/speakers/stack3.png"];
      })()
    : ["/speakers/stack.png", "/speakers/stack1.png", "/speakers/stack2.png", "/speakers/stack3.png", "/speakers/stack3.png"];

  const images1 = stackData?.images_left?.length > 0
    ? (() => {
        const processedImages = stackData.images_left.map((item, index) => {
          // Check if item is just an ID object (not populated)
          if (item && typeof item === 'object' && item.id && !item.images && !item.url) {
            console.log('⚠️ Left image component not fully populated, using fallback');
            return fallbackImages1[index] || null;
          }
          
          // Handle the new structure: item.images is a single image object
          let imageUrl;
          if (item.images && typeof item.images === 'object') {
            imageUrl = extractImageUrl(item.images);
          } else if (item.images && Array.isArray(item.images)) {
            imageUrl = extractImageUrl(item.images[0]);
          } else {
            imageUrl = extractImageUrl(item);
          }
          
          return {
            url: imageUrl || fallbackImages1[index]?.url,
            css: fallbackImages1[index]?.css || "rotate-[0deg]"
          };
        }).filter(item => item && item.url);
        
        return processedImages.length > 0 ? processedImages : fallbackImages1;
      })()
    : fallbackImages1;

  const images2 = stackData?.images_right?.length > 0
    ? (() => {
        const processedImages = stackData.images_right.map((item, index) => {
          // Check if item is just an ID object (not populated)
          if (item && typeof item === 'object' && item.id && !item.images && !item.url) {
            console.log('⚠️ Right image component not fully populated, using fallback');
            return fallbackImages2[index] || null;
          }
          
          // Handle the new structure: item.images is a single image object
          let imageUrl;
          if (item.images && typeof item.images === 'object') {
            imageUrl = extractImageUrl(item.images);
          } else if (item.images && Array.isArray(item.images)) {
            imageUrl = extractImageUrl(item.images[0]);
          } else {
            imageUrl = extractImageUrl(item);
          }
          
          return {
            url: imageUrl || fallbackImages2[index]?.url,
            css: fallbackImages2[index]?.css || "rotate-[0deg]"
          };
        }).filter(item => item && item.url);
        
        return processedImages.length > 0 ? processedImages : fallbackImages2;
      })()
    : fallbackImages2;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate movement intensity based on cursor position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / centerX; // -1 to 1
      const moveY = (y - centerY) / centerY; // -1 to 1

      // Apply movement to left images (opposite direction for natural feel)
      const leftImages = container.querySelectorAll(".shake-left .shake-image");
      leftImages.forEach((img, index) => {
        const intensity = 25 + index * 8; // Increased base intensity and progression
        const rotateIntensity = 5 + index * 2;
        img.style.transform = `translateX(${-moveX * intensity}px) translateY(${
          -moveY * intensity
        }px) rotate(${moveX * rotateIntensity}deg)`;
      });

      // Apply movement to right images
      const rightImages = container.querySelectorAll(
        ".shake-right .shake-image"
      );
      rightImages.forEach((img, index) => {
        const intensity = 25 + index * 8; // Increased base intensity and progression
        const rotateIntensity = 5 + index * 2;
        img.style.transform = `translateX(${moveX * intensity}px) translateY(${
          moveY * intensity
        }px) rotate(${-moveX * rotateIntensity}deg)`;
      });
    };

    const handleMouseLeave = () => {
      // Reset all images to original position
      const allImages = container.querySelectorAll(".shake-image");
      allImages.forEach((img) => {
        img.style.transform = "translateX(0) translateY(0) rotate(0deg)";
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px] flex flex-col gap-[40px] items-center"
      style={{ cursor: "default !important" }} // Override the CSS cursor: none
    >
      <div className="flex flex-wrap justify-center w-full">
        {/* Left side images */}
        <div className="flex flex-col gap-[20px] 2xl:gap-[50px] w-full md:w-1/4 justify-center items-center mt-[40px] md:mt-[120px] lg:mt-[150px] shake-left">
          {images1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[140px] 2xl:h-[220px] rounded-[8px] object-cover shake-image transition-transform duration-300`}
              style={{ cursor: "default" }} // Ensure images show default cursor
            />
          ))}
        </div>

        {/* Central content */}
        <div className="flex flex-col items-center md:justify-center w-full md:w-1/2 px-4 gap-10">
          <h1 className="md:text-[32px] text-[24px] font-neue text-center font-bold text-[#000000] uppercase">
            {title}
          </h1>
          <AnimatedCards testimonialImages={testimonialImages} />
        </div>

        {/* Right side images */}
        <div className="flex flex-col gap-[20px] 2xl:gap-[50px] w-full md:w-1/4 justify-center items-center mt-[40px] md:mt-[120px] lg:mt-[150px] shake-right">
          {images2.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[140px] 2xl:h-[220px] rounded-[8px] object-cover shake-image transition-transform duration-300`}
              style={{ cursor: "default" }} // Ensure images show default cursor
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stack;