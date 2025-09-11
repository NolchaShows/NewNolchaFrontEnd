import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [hoveredCard, setHoveredCard] = useState(null);
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
    const isHovered = hoveredCard === cardIndex;

    return (
      <div
        className={`relative cursor-pointer ${className}`}
        onMouseEnter={() => setHoveredCard(cardIndex)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Front of card - Image */}
        <div
          className={`inset-0 w-full h-full transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={src}
            className="w-full h-full rounded-[8px] object-cover"
            alt={detail.name}
          />
        </div>

        {/* Back of card - Details */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[8px] p-6 flex flex-col justify-start items-start text-left transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(135deg, #7FFFD4 0%, #40E0D0 100%)",
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold 2xl:text-3xl text-black mb-4 uppercase tracking-wide">
            {detail.name}
          </h3>
          <p className="text-black text-base md:text-lg 2xl:text-xl font-semibold leading-relaxed px-2">
            {detail.description}
          </p>

          {/* X/Twitter icon at bottom */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <svg
              className="w-6 h-6 text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {detail.name}
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
              className="md:max-w-[400px] max-w-[358px] object-cover flex-shrink-0"
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
                className="max-w-[400px] 2xl:max-w-[580px] flex-shrink-0 object-cover"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Speakers;
