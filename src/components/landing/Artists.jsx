import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function VideoGrid({ videos }) {
  return (
    <div className="w-full flex justify-center">
      {/* Desktop grid (zig-zag pattern - all 4 videos in one row) */}
      <div className="hidden lg:flex lg:justify-center lg:gap-6 lg:h-[600px] lg:items-end">
        {videos.map((src, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "items-start" : "items-end"}`}
            style={{ height: "600px" }}
          >
            <video
              src={src}
              className="w-[250px] h-[450px] object-cover border-4 border-black rounded-[20px] shadow-xl"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ))}
      </div>

      {/* Mobile + Tablet grid (2 columns zig-zag) */}
      <div className="flex justify-center gap-4 lg:hidden">
        {/* Left Column - Higher position */}
        <div className="flex flex-col gap-6 ">
          <video
            src={videos[0]}
            className="w-[200px] h-[280px] object-cover rounded-[12px] shadow-md"
            autoPlay
            muted
            loop
            playsInline
          />
          <video
            src={videos[2]}
            className="w-[200px] h-[280px] object-cover rounded-[12px] shadow-md"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Right Column - Lower position (with top margin for offset) */}
        <div className="flex flex-col gap-6 mt-15">
          <video
            src={videos[1]}
            className="w-[200px] h-[280px] object-cover rounded-[12px] shadow-md"
            autoPlay
            muted
            loop
            playsInline
          />
          <video
            src={videos[3]}
            className="w-[200px] h-[280px] object-cover rounded-[12px] shadow-md"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

export function Carousel({
  isFade = true,
  textColor,
  backgroundColor = "white",
}) {
  // Dynamic data
  const artists = [
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
      className={`relative max-w-none w-full mx-auto overflow-hidden md:py-[40px] py-[20px] rounded-b-[8px] ${backgroundColor}`}
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
        className={`flex whitespace-nowrap gap-[40px] py-[20px] lg:py-[0px] ${textColor} text-[32px] uppercase helvetica`}
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
function Artists({ textColor, backgroundColor, isFade, videos }) {
  // Dynamic image data
  const artistImages = [
    "/landing/artists/1.png",
    "/landing/artists/2.png",
    "/landing/artists/3.png",
    "/landing/artists/4.png",
    "/landing/artists/5.png",
    "/landing/artists/6.png",
  ];
  return (
    <div className="lg:py-[64px] py-[20px] flex flex-col">
      <Carousel
        textColor={textColor}
        backgroundColor={backgroundColor}
        isFade={isFade}
      />
      <div className="bg-[var(--secondary-color)] lg:p-[40px] py-[24px] px-[20px] rounded-[8px] flex flex-col gap-[30px]">
        <div className="flex w-full justify-center xl:flex-row flex-col gap-[20px] text-[var(--secondary-text-color)]">
          <div className="flex flex-col gap-[20px] 2xl:gap-[30px] font-medium items-center text-center">
            <h1 className="text-[32px] 2xl:text-4xl uppercase">
              and + 500 other artists
            </h1>
            <p className="text-lg 2xl:text-2xl">
              ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART -
              LINDSAY <br /> KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT
              D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA <br /> ZOREF - ROB PRIOR -
              LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI -
              <br />
              JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS -
              MOHSEN HAZRATI <br /> - RAGZY X - MUSKETON - TILLAVISION - MADE BY
              OONA - STACIE
              <br /> ANT - YOUNG & SICK
            </p>
          </div>
        </div>
        <VideoGrid videos={videos} />
      </div>
    </div>
  );
}

export default Artists;
