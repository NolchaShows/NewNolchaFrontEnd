import React, { useState } from "react";

function Stack() {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const images = [
    "/speakers/stack.png",
    "/speakers/stack.png",
    "/speakers/stack.png",
    "/speakers/stack.png",
  ];
  return (
    <div className="max-w-[1440px] mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px] flex flex-col gap-[40px] items-center">
      <div className="flex justify-between w-full">
        <div className="md:flex flex-col gap-[20px] pt-[30px] hidden ">
          {images1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] rounded-[8px] object-cover`}
            />
          ))}
        </div>

        <div className="flex flex-col lg:gap-[80px] gap-[20px] items-center md:justify-center max-w-[900px]">
          <h1 className="md:text-[32px] text-[24px] text-center font-medium text-[var(--primary-text-color)] uppercase">
            Featuring speakers who are shaping the future of Bitcoin, art, film,
            fashion, AI, and blockchain.
          </h1>
          <img
            src={images[currentIndex]}
            className="md:max-w-[671px] max-h-[600px] max-w-[400px] object-cover"
          />
        </div>
        <div className="md:flex flex-col gap-[20px] pt-[30px] hidden ">
          {images2.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} w-[92px] h-[132px] rounded-[8px] object-cover`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-[8px]">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-[74px] h-[8px] rounded-[999px] cursor-pointer ${
              currentIndex === idx ? "bg-[var(--secondary-text-color)]" : "bg-[var(--tertiary-text-color)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Stack;