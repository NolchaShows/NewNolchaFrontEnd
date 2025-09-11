import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function VideoGridZigZag({ videos }) {
  return (
    <div className="w-full flex justify-center">
      {/* Desktop grid (zig-zag pattern - all 4 videos in one row) */}
      {videos && videos.length > 0 ? (
        <div className="hidden lg:flex lg:justify-center 2xl:gap-12 lg:h-[600px] 2xl:h-[900px] lg:items-end">
          {videos.map((src, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "items-start" : "items-end"} h-[600px] 2xl:h-[800px]`}
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-[275px] h-[491px] 2xl:w-[450px] 2xl:h-[650px] object-covers rounded-[20px]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden lg:flex lg:justify-center lg:gap-6 2xl:gap-20 lg:h-[600px] 2xl:h-[700px] lg:items-end">
          {Array.from({ length: 4 }).map(
            (
              _,
              i // show 4 empty cards
            ) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "items-start" : "items-end"}`}
                style={{ height: "600px" }}
              >
                <div className="w-[250px] h-[450px] 2xl:w-[400px] 2xl:h-[600px] border-6 2xl:border-8 border-black rounded-[16px] flex items-center justify-center text-gray-400 text-lg 2xl:text-xl bg-gray-100">
                  Empty
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Mobile + Tablet grid (2 columns zig-zag) */}
      <div className="flex justify-center gap-4 lg:hidden">
        {/* Left Column - Higher position */}
        <div className="flex flex-col gap-6">
          <img
            src={videos[0]}
            alt="Gallery image 1"
            className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] rounded-[12px]"
          />
          <img
            src={videos[2]}
            alt="Gallery image 3"
            className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] rounded-[12px]"
          />
        </div>

        {/* Right Column - Lower position (with top margin for offset) */}
        <div className="flex flex-col gap-6 mt-15">
          <img
            src={videos[1]}
            alt="Gallery image 2"
            className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] rounded-[12px]"
          />
          <img
            src={videos[3]}
            alt="Gallery image 4"
            className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] rounded-[12px]"
          />
        </div>
      </div>
    </div>
  );
}

function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No videos available</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto lg:py-[64px] lg:px-[40px] py-[24px] px-[16px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-full aspect-video border-4 border-black rounded-[16px] overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <video
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={video} type="video/mp4" />
              <source src={video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
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
function Artists({ textColor, backgroundColor, isFade, videos, isSlider }) {
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
    <div className="lg:py-[64px]flex flex-col">
      {isSlider && 
        <Carousel
          textColor={textColor}
          backgroundColor={backgroundColor}
          isFade={isFade}
        />
      }
      <div className="bg-[var(--secondary-color)] font-neue lg:p-[60px] 2xl:p-[100px] py-[24px] px-[20px] rounded-[8px] flex flex-col gap-[30px]">
        <div className="flex w-full justify-center xl:flex-row flex-col gap-[20px] text-[var(--secondary-text-color)]">
          <div className="flex flex-col gap-[20px] 2xl:gap-[30px] font-medium items-center text-center">
            <h1 className="font-neue text-[52px] font-bold 2xl:text-[80px] ">
              And + 500 Other Artists
            </h1>
            <p className="font-medium text-[20px] 2xl:text-4xl">
              ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART -
              LINDSAY <br /> KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT
              D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA <br /> ZOREF - ROB PRIOR -
              LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI -
              <br />
              JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS -
              MOHSEN HAZRATI - <br /> RAGZY X - MUSKETON - TILLAVISION - MADE BY
              OONA - STACIE ANT - YOUNG & SICK
            </p>
          </div>
        </div>
        {videos.length === 4 ? (
          <VideoGridZigZag videos={videos} />
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </div>
  );
}

export default Artists;
