import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Carousel({isFade=true,textColor,backgroundColor="white"}) {
  // Dynamic data
  const artists = [
    "FCKENDER",
    "JENNI PASANEN",
    "BEEPLE",
    "DEGODS",
    "MADE BY OONA",
  ];
  const marqueeRef = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className={`relative max-w-[1320px] w-full mx-auto overflow-hidden md:py-[40px] py-[20px] rounded-b-[8px] ${backgroundColor}`}
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
function Artists({textColor,backgroundColor,isFade}) {
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
    <div className="lg:py-[64px] lg:px-[60px] py-[20px] px-[16px] max-w-[1440px] mx-auto flex flex-col">
      <Carousel textColor={textColor}
      backgroundColor={backgroundColor}
      isFade={isFade}
      />
      <div className="bg-[var(--secondary-color)] lg:p-[40px] py-[24px] px-[20px] rounded-[8px] flex flex-col gap-[30px]">
        <div className="flex w-full justify-between xl:flex-row flex-col gap-[20px] text-[var(--secondary-text-color)]">
          <div className="flex flex-col gap-[20px] font-medium">
            <h1 className=" text-[32px]  uppercase">and + 500 other artists</h1>
            <p className="text-[20px]">
              ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY
              <br /> COWART - LINDSAY KOKOSKA - NODEMONKES - KIRA BURSKY -
              VINCENT
              <br /> D’ONOFRIO - LATASHÁ - VAKSEEN - TALIA ZOREF - ROB PRIOR -
              <br /> LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA
              KRUESI -<br /> JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO
              CARSTENS -<br /> MOHSEN
              <br /> HAZRATI - RAGZY X - MUSKETON - TILLAVISION - MADE BY OONA -
              STACIE
              <br /> ANT - YOUNG & SICK
            </p>
          </div>
          <div className="w-full xl:w-fit">
            <Link
              href={"#"}
              className="w-fit py-[12px] px-[24px] rounded-[4px] bg-transparent border-[1px] border-[#141414] h-fit float-right"
            >
              View all artists
            </Link>
          </div>
        </div>
      {/* Dynamic image rendering */}
      <div className="flex gap-[16px] flex-wrap items-center justify-center">
        {artistImages.map((src, index) => (
          <div
            key={index}
            className=" py-[4px] px-[4px] border-[1px] border-[#141414] rounded-[4px]"
          >
            <img
              src={src}
              alt={`Artist ${index + 1}`}
              className="md:w-[380px] xl:w-[390px] md:h-[253px] w-[350px] h-[198px] object-cover rounded-[4px]"
            />
          </div>
        ))}
      </div>
      </div>

    </div>
  );
}

export default Artists;
