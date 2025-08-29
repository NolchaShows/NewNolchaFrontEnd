import React, { useState } from "react";
import { motion } from "framer-motion";

function RecentEvents() {
  const events = [
    { id: 1, name: "Bitcoin Nashville 2024", image: "/landing/video.png" },
    { id: 2, name: "Crypto Summit Dubai 2024", image: "/landing/video.png" },
    { id: 3, name: "Blockchain Expo 2024", image: "/landing/video.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="md:py-[64px] md:px-[40px] py-[20px] px-[16px] max-w-none w-full mx-auto flex flex-col md:gap-[40px] gap-[20px]">
      <h1 className="text-[var(--primary-text-color)] text-center md:text-[48px] text-[24px] font-medium uppercase">
        Recent Events: {events[currentIndex].name}
      </h1>

      <motion.img
        key={events[currentIndex].id}
        src={events[currentIndex].image}
        alt={events[currentIndex].name}
        className="rounded-[17px] lg:max-w-[1360px] 2xl:max-w-none w-full lg:max-h-[726px] 2xl:max-h-[1000px] object-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex gap-[15px] justify-center">
        <motion.img
          src="/landing/left.svg"
          className="cursor-pointer 2xl:h-[70px] 2xl:w-[70px]"
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
        />
        <motion.img
          src="/landing/right.svg"
          className="cursor-pointer 2xl:h-[70px] 2xl:w-[70px]"
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default RecentEvents;
