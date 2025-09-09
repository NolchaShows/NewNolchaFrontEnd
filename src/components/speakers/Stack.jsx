"use client";
import React, { useRef, useState, useEffect } from "react";
import "./ShakingImages.css";

const AnimatedCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    "/speakers/stack.png",
    "/speakers/stack1.png", 
    "/speakers/stack2.png",
    "/speakers/stack3.png",
    "/speakers/stack3.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full font-sans relative">
      {/* Card Container */}
      <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[700px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[700px] mb-8">
        {testimonials.map((card, index) => {
          const offset = index - activeIndex;
          const zIndex = 100 - Math.abs(offset);

          let translateX = 0;
          let rotate = 0;
          let scale = 1;

          if (offset > 0) {
            // Cards after active → stack to the right
            translateX = offset * 12; // Fixed spacing in px
            rotate = offset * 0.3;
            scale = Math.max(0.88, 1 - offset * 0.02);
          } else if (offset < 0) {
            // Cards before active → stack to the left  
            translateX = offset * 12; // Fixed spacing in px
            rotate = offset * 0.3;
            scale = Math.max(0.88, 1 - Math.abs(offset) * 0.02);
          }

          return (
            <div
              key={index}
              className="absolute bg-white top-0 left-1/2 w-full h-full rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                transformOrigin: "bottom center",
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={card}
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Dots/Lines - Outside the card container */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              activeIndex === index
                ? "bg-black w-12 sm:w-16 md:w-20 2xl:w-24"
                : "bg-gray-400 w-6 sm:w-8 2xl:w-10"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

function Stack() {
  const images1 = [
    { url: "/speakers/1.jpg", css: "rotate-[-25deg]" },
    { url: "/speakers/2.png", css: "rotate-[10deg]" },
    { url: "/speakers/3.jpg", css: "rotate-[-5deg]" },
    { url: "/speakers/4.jpg", css: "rotate-[25deg]" },
  ];
  const images2 = [
    { url: "/speakers/5.jpg", css: "rotate-[10deg]" },
    { url: "/speakers/6.jpg", css: "rotate-[-10deg]" },
    { url: "/speakers/7.jpg", css: "rotate-[-5deg]" },
    { url: "/speakers/8.jpg", css: "rotate-[-15deg]" },
  ];
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
      className="w-full mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px] flex flex-col gap-[40px] items-center shake-container"
    >
      <div className="flex flex-wrap justify-center w-full">
        {/* Left side images */}
        <div className="flex flex-col gap-[20px] 2xl:gap-[50px] w-full md:w-1/4 justify-center items-center mt-[40px] md:mt-[120px] lg:mt-[150px] shake-left">
          {images1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[140px] 2xl:h-[220px] rounded-[8px] object-cover shake-image`}
            />
          ))}
        </div>

        {/* Central content */}
        <div className="flex flex-col items-center md:justify-center w-full md:w-1/2 px-4 gap-10">
          <h1 className="md:text-[32px] text-[24px] font-neue text-center font-bold text-[#000000] uppercase">
            Featuring speakers who are shaping the future of Bitcoin, art, film,
            fashion, AI, and blockchain.
          </h1>
          <AnimatedCards />
        </div>

        {/* Right side images */}
        <div className="flex flex-col gap-[20px] 2xl:gap-[50px] w-full md:w-1/4 justify-center items-center mt-[40px] md:mt-[120px] lg:mt-[150px] shake-right">
          {images2.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[140px] 2xl:h-[220px] rounded-[8px] object-cover shake-image`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stack;
