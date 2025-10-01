import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./flip-card.css"; // Import the CSS file

function Speakers({ speakerData, loading }) {
  // Fallback data for when Strapi data is not available
  const fallbackImages = [
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
    "/landing/speaker-1.jpg",
    "/landing/speaker-2.jpg",
    "/landing/speaker-3.jpg",
  ];

  const fallbackDetails = [
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

  const title = speakerData?.title || "Featured Speakers";
  
  const mapStrapiSpeakers = (strapiSpeakers) => {
    if (!strapiSpeakers || !Array.isArray(strapiSpeakers)) return { images: [], details: [] };
    
    console.log('Strapi speakers data:', strapiSpeakers);
    
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    const images = [];
    const details = [];
    
    strapiSpeakers.forEach((speaker, index) => {
      // Get image URL from Strapi
      console.log(`Speaker ${index} image data:`, speaker.image);
      
      let imageUrl = speaker.image?.url;
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}${imageUrl}`;
      }
      
      console.log(`Speaker ${index} final image URL:`, imageUrl);
      
      images.push(imageUrl || "/landing/speaker-1.jpg");
      details.push({
        name: speaker.name || "Speaker Name",
        description: speaker.description || "Speaker description",
        socialHandle: speaker.social_handle || speaker.name || "Speaker"
      });
    });
    
    console.log('Final images array:', images);
    console.log('Final details array:', details);
    
    return { images, details };
  };
  
  // Get final data
  const { images, details } = speakerData?.speakers 
    ? mapStrapiSpeakers(speakerData.speakers) 
    : { images: fallbackImages, details: fallbackDetails };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-none bg-[#EBE2D7] w-full mx-auto 2xl:py-[120px] 2xl:px-[60px] lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] overflow-hidden">
        <div className="flex flex-col p-[10px] gap-[40px]">
          <h1 className="text-[32px] lg:text-[52px] 2xl:text-[64px] font-bold text-[#000000] uppercase">
            Loading Speakers...
          </h1>
          <div className="flex gap-[20px] overflow-x-auto xl:hidden scrollbar-hide">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="md:w-[433px] w-[358px] h-[500px] 2xl:h-[700px] bg-gray-300 animate-pulse rounded-lg flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const handlePrev = () => {
    if (typeof window === "undefined") return; // ✅ prevent server crash

    if (window.innerWidth < 1280) {
      // xl breakpoint is 1280px
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = window.innerWidth >= 768 ? 433 + 20 : 358 + 20;
        container.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      setIndex((prev) => (prev === 0 ? images.length - 3 : prev - 1));
    }
  };

  const handleNext = () => {
    if (typeof window === "undefined") return; // ✅ prevent server crash

    if (window.innerWidth < 1280) {
      // xl breakpoint is 1280px
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = window.innerWidth >= 768 ? 433 + 20 : 358 + 20;
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      setIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
    }
  };

  const SpeakerCard = ({ src, detail, cardIndex, className }) => {
    return (
      <div className={`${className} h-[500px] 2xl:h-[700px]`}>
        <div className="square-flip w-full h-full">
          <div className="square-inner">
          {/* Front of card - Image */}
          <div className="square rounded-[8px]">
            <div className="align-center w-full h-full">
              <img
                src={src}
                className="w-full h-full object-cover rounded-[8px]"
                alt={detail.name}
                onError={(e) => {
                  console.log('Image failed to load:', src);
                  e.target.src = "/landing/speaker-1.jpg"; // fallback image
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', src);
                }}
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
                <p className="text-black text-base md:text-lg 2xl:text-xl font-semibold leading-relaxed font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                  {detail.description}
                </p>
              </div>

              {/* Bottom content - Social handle info */}
              <div className="flex items-center gap-2 mt-auto">
                <svg
                  className="w-6 h-6 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-black font-medium">{detail.socialHandle}</span>
              </div>
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
          <h1
            className="text-[32px] lg:text-[52px] 2xl:text-[64px] font-bold text-[#000000] uppercase"
          >
            {title}
          </h1>

          {/* Arrows - only visible on xl and up */}
          <div className="hidden xl:flex gap-[16px]">
            <motion.img
              src="/left_dark.png"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
            />
            <motion.img
              src="/right_dark.png"
              className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px]"
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
              className="md:w-[433px] w-[358px] flex-shrink-0" // Updated to 433px
            />
          ))}
        </div>

        {/* Arrows for mobile & md (below cards, centered) */}
        <div className="flex justify-center gap-3 xl:hidden">
          <button onClick={handlePrev} aria-label="Previous slide">
            <motion.img
              src="/left_dark.png"
              className="cursor-pointer w-[36px] h-[36px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>

          <button onClick={handleNext} aria-label="Next slide">
            <motion.img
              src="/right_dark.png"
              className="cursor-pointer w-[36px] h-[36px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>

        {/* Desktop slider */}
        <div className="relative overflow-hidden hidden xl:block">
          <motion.div
            className="md:flex gap-[43px] hidden"
            animate={{ x: `-${index * (433 + 43)}px` }} // Updated to 433px
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {images.map((src, i) => (
              <SpeakerCard
                key={i}
                src={src}
                detail={details[i]}
                cardIndex={`desktop-${i}`}
                className="w-[433px] 2xl:w-[580px] flex-shrink-0" // Updated to 433px
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Speakers;
