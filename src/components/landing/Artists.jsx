import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";

// "use client";

function VideoGridZigZag({ videos }) {
  const borderColors = ['#FF6813', '#BBD7FF', '#CAD533', '#E6C6C5'];
  
  return (
    <div className="w-full flex justify-center">
      {/* 🖥️ Desktop/Large screens */}
      {videos && videos.length > 0 ? (
        <div className="hidden lg:flex lg:justify-center gap-6 2xl:gap-12 lg:h-[600px] 2xl:h-[900px] lg:items-end">
          {videos.map((src, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "items-start" : "items-end"} h-[600px] 2xl:h-[800px]`}
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-[275px] h-[491px] 2xl:w-[450px] 2xl:h-[650px] object-cover rounded-[20px] shadow-lg"
                style={{ border: `10px solid ${borderColors[i]}` }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Fallback empty state if no videos
        <div className="hidden lg:flex lg:justify-center lg:gap-6 2xl:gap-20 lg:h-[600px] 2xl:h-[700px] lg:items-end">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "items-start" : "items-end"}`}
              style={{ height: "600px" }}
            >
              <div className="w-[250px] h-[450px] 2xl:w-[400px] 2xl:h-[600px] border-6 2xl:border-8 border-black rounded-[16px] flex items-center justify-center text-gray-400 text-lg 2xl:text-xl bg-gray-100">
                Empty
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📱 Mobile + Tablet zig-zag grid */}
      <div className="flex justify-center gap-4 lg:hidden">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {videos[0] && (
            <video
              src={videos[0]}
              autoPlay
              muted
              loop
              playsInline
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[0]}` }}
            />
          )}
          {videos[2] && (
            <video
              src={videos[2]}
              autoPlay
              muted
              loop
              playsInline
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[2]}` }}
            />
          )}
        </div>

        {/* Right column (offset) */}
        <div className="flex flex-col gap-6 mt-15">
          {videos[1] && (
            <video
              src={videos[1]}
              autoPlay
              muted
              loop
              playsInline
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[1]}` }}
            />
          )}
          {videos[3] && (
            <video
              src={videos[3]}
              autoPlay
              muted
              loop
              playsInline
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[3]}` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}


function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {videos.map((image, index) => (
          <div
            key={index}
            className="w-full aspect-video border-4 border-black rounded-[16px] overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Carousel({
  isFade = true,
  textColor,
  backgroundColor = "white",
  carouselArtists = []
}) {
  // Use dynamic data or fallback to default
  const artists = carouselArtists.length > 0 ? carouselArtists : [
    "FCKENDER",
    "JENNI PASANEN",
    "BEEPLE",
    "DEGODS",
    "MADE BY OONA",
    "ONCHAINMONKEY",
    "WORLD OF WOMEN",
    "RON ENGLISH",
    "JEREMY COWART",
  ];
  const marqueeRef = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div
      className={`relative max-w-none w-full mx-auto overflow-hidden py-[10px] lg:py-[20px]  rounded-b-[8px] ${backgroundColor}`}
    //   style={{
    //   border: "1px solid",
    //   borderImageSource:
    //     "linear-gradient(90deg, #FFFFFF 0%, #A09C99 25%, #FFFFFF 35%, #A09C99 52%, #FFFFFF 62%, #A09C99 81%)",
    //   borderImageSlice: 1,
    // }}
    >
      {/* Conditionally render fade divs */}
      {isFade && (
        <>
          {/* Fade left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[100px] bg-gradient-to-r from-white to-transparent z-10"></div>
          {/* Fade right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[100px] bg-gradient-to-l from-white to-transparent z-10"></div>
        </>
      )}
      <motion.div
        ref={marqueeRef}
        className={`flex whitespace-nowrap font-medium gap-[80px] 2xl:gap-[200px] py-[20px] lg:py-[0px] ${textColor} text-[26px] 2xl:text-[44px] uppercase helvetica`}
        animate={{ x: [0, -width] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {artists.map((artist, index) => (
          <h1 key={index}>{artist}</h1>
        ))}
        {/* duplicate for seamless loop */}
        {artists.map((artist, index) => (
          <h1 key={`dup-${index}`}>{artist}</h1>
        ))}
      </motion.div>
    </div>
  );
}
function Artists({ artistData, loading, textColor, backgroundColor, isFade, videos, isSlider, isTextLeft, isDesktop = false }) {
  // Use dynamic data from Strapi if available, otherwise fall back to defaults
  const title = artistData?.title || "And +500 Other Artists";
  const description = artistData?.description || "Onchainmonkey - World Of Women - Ron English - Jeremy Cowart - Lindsay Kokoska - Nodemonkes - Kira  Bursky - Vincent D’onofrio - Latashá - Vakseen - Talia Zoref - Rob Prior - Laurence Fuller - Janedao - Izzy  Weissgerber - Gretta Kruesi - Janedao -yiyang Lu - Skye Nicolas  - Aeforia  - Arno Carstens - Mohsen  Hazrati - Ragzy X - Musketon - Tillavision - Made By Oona - Stacie Ant - Young & Sick";

  // Map carousel artists from Strapi data
  const carouselArtists = artistData?.carousal_item?.map(item => item.text) || [];

  // Map videos/media from Strapi data
  let mediaItems = videos || []; // Use the passed videos as fallback

  if (artistData?.media && artistData.media.length > 0) {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    mediaItems = artistData.media.map(media => {
      let url = media.url;
      if (url && !url.startsWith('http')) {
        url = `${strapiUrl}${url}`;
      }
      return url;
    });
  }

  // Dynamic image data (keeping as fallback for now)
  const artistImages = [
    "/landing/artists/1.png",
    "/landing/artists/2.png",
    "/landing/artists/3.png",
    "/landing/artists/4.png",
    "/landing/artists/5.png",
    "/landing/artists/6.png",
  ];
  return (
    <div className="flex flex-col">
      {isSlider && (
        <Carousel
          textColor={textColor}
          backgroundColor={backgroundColor}
          isFade={isFade}
          carouselArtists={carouselArtists}
        />
      )}
      <div className="bg-[#D1FFE9] page-container rounded-[8px] flex flex-col gap-[30px] lg:gap-[40px] 2xl:gap-[0]">
        <div className="flex w-full justify-center xl:flex-row flex-col gap-[20px] text-[var(--secondary-text-color)]">
          <div className={`flex flex-col gap-[20px] 2xl:gap-[30px] font-bold lg:items-center lg:text-center ${isTextLeft ? 'text-lefwt lg:text-center' : 'text-center'}`}>
            <SectionTitle disableTitleSpacing={true}>{title}</SectionTitle>
            <p className="font-normal text-[16px] md:text-[20px] 2xl:text-4xl text-black">
              {description}
            </p>
          </div>
        </div>
        {isDesktop && mediaItems.length === 4 ? (
          <VideoGridZigZag videos={mediaItems} />
        ) : (
          <VideoGrid videos={mediaItems} />
        )}

      </div>
    </div>
  );
}

export default Artists;
