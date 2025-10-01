import React, { useState } from "react";
import { motion } from "framer-motion";

function RecentEvents({ recentEventsData, loading }) {
  // Default values in case data is not available
  const defaultTitle = "Recent Events";
  const defaultEvents = [
    {
      id: 1,
      name: "Bitcoin Nashville 2024",
      video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      name: "Bitcoin Nashville 2025", 
      video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  ];

  // Use data from props if available, otherwise use defaults
  const title = recentEventsData?.title || defaultTitle;
  const events = recentEventsData?.events?.length > 0 ? recentEventsData.events : defaultEvents;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Don't render until we have data or confirmed no data
  if (loading) {
    return (
      <div className="py-[60px] md:py-[100px] 2xl:py-[140px] max-w-none w-full mx-auto flex flex-col items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-[60px] md:py-[100px] 2xl:py-[140px] max-w-none w-full mx-auto flex flex-col gap-[30px] md:gap-[50px] 2xl:gap-[70px]">
      <h1 className="text-[#000000] text-center text-[32px] md:text-[52px] 2xl:text-[64px] font-bold uppercase">
        {title}: {events[currentIndex].name}
      </h1>

      <motion.video
        key={events[currentIndex].id}
        src={events[currentIndex].video_url || events[currentIndex].video}
        className="rounded-[17px] w-full h-[603px] object-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        autoPlay
        loop
        muted
        playsInline
        controls
      />


      <div className="flex gap-[15px] justify-center">
        <motion.img
          src="left_dark.png"
          className="cursor-pointer h-[36px] w-[36px] md:w-[48px] md:h-[48px] 2xl:h-[70px] 2xl:w-[70px]"
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
        />
        <motion.img
          src="right_dark.png"
          className="cursor-pointer h-[36px] w-[36px] md:h-[48px] md:w-[48px] 2xl:h-[70px] 2xl:w-[70px]"
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default RecentEvents;
