"use client"
import React, { useState } from "react";

const AnimatedCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    "/speakers/stack.png",
    "/speakers/9.png",
    "/speakers/10.png",
    "/speakers/11.png",
    "/speakers/stack.png",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sans relative overflow-hidden">
      {/* Card Container */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-[300px] sm:h-[350px] md:h-[420px] lg:h-[500px] xl:h-[580px]">
        {testimonials.map((card, index) => {
          const offset = index - activeIndex;
          const zIndex = 100 - Math.abs(offset);

          // Use fixed minimal spacing for tight stacking effect
          const spacing = 10;
          const rotationFactor = 0.35;
          const scaleFactor = 0.02;

          let translateX = 0;
          let rotate = 0;
          let scale = 1;

          if (offset > 0) {
            // Cards after active → stack to the right
            translateX = spacing * offset;
            rotate = rotationFactor * offset;
            scale = 1 - offset * scaleFactor;
          } else if (offset < 0) {
            // Cards before active → stack to the left
            translateX = spacing * offset;
            rotate = rotationFactor * offset;
            scale = 1 - Math.abs(offset) * scaleFactor;
          }

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                transformOrigin: "bottom center",
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img 
                src={card} 
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Dots/Lines */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 flex space-x-1 sm:space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 sm:h-[8px] rounded-full cursor-pointer transition-all duration-300 ${
              activeIndex === index
                ? "bg-black w-12 sm:w-16 md:w-[74px]"
                : "bg-gray-400 w-6 sm:w-8 md:w-10"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Touch/Swipe indicators for mobile */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:hidden">
        {activeIndex > 0 && (
          <button
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-white"
            aria-label="Previous card"
          >
            ‹
          </button>
        )}
      </div>
      
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 sm:hidden">
        {activeIndex < testimonials.length - 1 && (
          <button
            onClick={() => setActiveIndex(activeIndex + 1)}
            className="w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-white"
            aria-label="Next card"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

// export default AnimatedCards;

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
  return (
    <div className="max-w-[1440px] mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px] flex flex-col gap-[40px] items-center">
      <div className="flex justify-center w-full">
        {/* Left side images */}
        <div className="md:flex flex-col gap-[20px] 2xl:gap-[50px] hidden mr-[40px] lg:mr-[80px] mt-[120px] lg:mt-[150px]">
          {images1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[175px] 2xl:h-[300px] rounded-[8px] object-cover`}
            />
          ))}
        </div>

        {/* Central content */}
        <div className="flex flex-col items-center md:justify-center max-w-[900px]">
          <h1 className="md:text-[32px] text-[24px] text-center font-medium text-[var(--primary-text-color)] uppercase">
            Featuring speakers who are shaping the future of Bitcoin, art, film,
            fashion, AI, and blockchain.
          </h1>
          <AnimatedCards />
        </div>

        {/* Right side images */}
        <div className="md:flex flex-col gap-[20px] 2xl:gap-[30px] hidden ml-[40px] lg:ml-[80px] mt-[120px] lg:mt-[150px]">
          {images2.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] 2xl:w-[175px] 2xl:h-[300px] rounded-[8px] object-cover`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stack;
