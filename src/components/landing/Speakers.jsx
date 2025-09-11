import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./flip-card.css"; // Import the CSS file

function Speakers() {
  const images = [
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
  ];

  const details = [
    {
      name: "ADAM MCBRIDE",
      description:
        "The Adam McBride Show is a podcast hosted by Adam McBride, who identifies as an NFT Archaeologist, exploring the past, present, and future of NFTs and blockchain technology",
    },
    {
      name: "BILLY RESTEY",
      description:
        "Billy is an abstract digital artist specializing in 3D, generative, and AI art. With a focus on expressing beauty in nature's randomness, his works combine cutting-edge technologies to create stunning pieces.",
    },
    {
      name: "BENJAMIN CHARBIT",
      description:
        "Benjamin Charbit is Co-founder & CEO at Darewise (Animoca Brands). Combining AAA Gaming, Web3 and Metaverse. Entrepreneur and Start-up Passionate. Preparing a new movement on Bitcoin with Sparks, and building Life Beyond Studios, AAA UE5 MMO.",
    },
    {
      name: "ADAM MCBRIDE",
      description:
        "The Adam McBride Show is a podcast hosted by Adam McBride, who identifies as an NFT Archaeologist, exploring the past, present, and future of NFTs and blockchain technology",
    },
    {
      name: "BILLY RESTEY",
      description:
        "Billy is an abstract digital artist specializing in 3D, generative, and AI art. With a focus on expressing beauty in nature's randomness, his works combine cutting-edge technologies to create stunning pieces.",
    },
    {
      name: "BENJAMIN CHARBIT",
      description:
        "Benjamin Charbit is Co-founder & CEO at Darewise (Animoca Brands). Combining AAA Gaming, Web3 and Metaverse. Entrepreneur and Start-up Passionate. Preparing a new movement on Bitcoin with Sparks, and building Life Beyond Studios, AAA UE5 MMO.",
    },
  ];

  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const handlePrev = () => {
    if (window.innerWidth < 1280) {
      // xl breakpoint is 1280px
      // For mobile/tablet - scroll the container
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = window.innerWidth >= 768 ? 400 + 20 : 358 + 20; // md:max-w-[400px] + gap, max-w-[358px] + gap
        container.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      // For desktop - use index state
      setIndex((prev) => (prev === 0 ? images.length - 3 : prev - 1));
    }
  };

  const handleNext = () => {
    if (window.innerWidth < 1280) {
      // xl breakpoint is 1280px
      // For mobile/tablet - scroll the container
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = window.innerWidth >= 768 ? 400 + 20 : 358 + 20; // md:max-w-[400px] + gap, max-w-[358px] + gap
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      // For desktop - use index state
      setIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
    }
  };

  const SpeakerCard = ({ src, detail, cardIndex, className }) => {
    return (
      <div className={`${className} h-[500px] 2xl:h-[700px]`}>
        {/* 3D Flip Container */}
        <div className="square-flip w-full h-full">
          {/* Front of card - Image */}
          <div className="square rounded-[8px]">
            <div className="align-center">
              <img
                src={src}
                className="w-full h-full object-cover rounded-[8px]"
                alt={detail.name}
              />
            </div>
            {/* Removed flip-overlay to fix dark issue */}
          </div>

          {/* Back of card - Details */}
          <div
            className="square2 rounded-[8px] relative"
            style={{
              background: "linear-gradient(135deg, #7FFFD4 0%, #40E0D0 100%)",
            }}
          >
            {/* Fixed container positioning and layout */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top content */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold 2xl:text-3xl text-black mb-4 uppercase tracking-wide">
                  {detail.name}
                </h3>
                <p className="text-black text-base md:text-lg 2xl:text-xl font-semibold leading-relaxed">
                  {detail.description}
                </p>
              </div>

              {/* Bottom content - Twitter info */}
              <div className="flex items-center gap-2 mt-auto">
                <svg
                  className="w-6 h-6 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-black font-medium">{detail.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-none bg-[#EBE2D7] w-full mx-auto 2xl:py-[120px] 2xl:px-[60px] lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] overflow-hidden">
      <div className="flex flex-col p-[10px] gap-[40px]">
        {/* Heading + arrows (desktop only) */}
        <div className="flex items-center justify-between">
          <h1 className="lg:text-[52px] 2xl:text-[64px] text-[40px] font-bold text-[#000000]">
            Featured Speakers
          </h1>

          {/* Arrows - only visible on xl and up */}
          <div className="hidden xl:flex gap-3">
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

        {/* Mobile horizontal scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-[20px] overflow-x-auto xl:hidden scrollbar-hide"
        >
          {images.map((src, i) => (
            <SpeakerCard
              key={i}
              src={src}
              detail={details[i]}
              cardIndex={`mobile-${i}`}
              className="md:w-[400px] [358px] flex-shrink-0"
            />
          ))}
        </div>

        {/* Arrows for mobile & md (below cards, centered) */}
        <div className="flex justify-center gap-3 xl:hidden">
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

        {/* Desktop slider */}
        <div className="relative overflow-hidden hidden xl:block">
          <motion.div
            className="md:flex gap-[43px] hidden"
            animate={{ x: `-${index * (400 + 43)}px` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {images.map((src, i) => (
              <SpeakerCard
                key={i}
                src={src}
                detail={details[i]}
                cardIndex={`desktop-${i}`}
                className="w-[400px] 2xl:w-[580px] flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Speakers;
