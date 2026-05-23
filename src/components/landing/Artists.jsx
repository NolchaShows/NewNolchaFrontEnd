"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";

function VideoGridZigZag({ videos }) {
  const borderColors = ['#FF6813', '#BBD7FF', '#CAD533', '#E6C6C5'];
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      {/* Desktop/Large screens */}
      {videos && videos.length > 0 ? (
        <div className="hidden lg:flex lg:justify-center gap-4 xl:gap-6 2xl:gap-8 xxl:gap-12 3xl:gap-20 lg:h-[450px] xl:h-[600px] 2xl:h-[750px] xxl:h-[900px] 3xl:h-[1300px] lg:items-end">
          {videos.map((src, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "items-start" : "items-end"} h-[450px] xl:h-[600px] 2xl:h-[700px] xxl:h-[800px] 3xl:h-[1100px]`}
            >
              <video
                src={inView ? src : undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-[200px] h-[350px] xl:w-[275px] xl:h-[491px] 2xl:w-[350px] 2xl:h-[550px] xxl:w-[450px] xxl:h-[650px] 3xl:w-[600px] 3xl:h-[850px] object-cover rounded-[20px] 3xl:rounded-[40px] shadow-lg"
                style={{ border: `10px solid ${borderColors[i]}` }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden lg:flex lg:justify-center lg:gap-6 2xl:gap-20 lg:h-[600px] 2xl:h-[700px] lg:items-end">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "items-start" : "items-end"}`}
              style={{ height: "600px" }}
            >
              <div className="w-[250px] h-[450px] 2xl:w-[400px] 2xl:h-[600px] border-6 2xl:border-8 border-black rounded-[16px] flex items-center justify-center text-white text-lg 2xl:text-xl bg-gray-100">
                Empty
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile + Tablet zig-zag grid */}
      <div className="flex justify-center gap-4 lg:hidden">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {videos[0] && (
            <video
              src={inView ? videos[0] : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[0]}` }}
            />
          )}
          {videos[2] && (
            <video
              src={inView ? videos[2] : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[2]}` }}
            />
          )}
        </div>

        {/* Right column (offset) */}
        <div className="flex flex-col gap-6 mt-15">
          {videos[1] && (
            <video
              src={inView ? videos[1] : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-[175px] h-[260px] md:w-[230px] md:h-[350px] object-cover rounded-[12px]"
              style={{ border: `10px solid ${borderColors[1]}` }}
            />
          )}
          {videos[3] && (
            <video
              src={inView ? videos[3] : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
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
        <p className="text-white">No images available</p>
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
        className={`flex whitespace-nowrap font-medium gap-[40px] lg:gap-[60px] xl:gap-[80px] 2xl:gap-[120px] xxl:gap-[200px] 3xl:gap-[300px] py-[20px] lg:py-[0px] ${textColor} text-[20px] lg:text-[23px] xl:text-[26px] 2xl:text-[32px] xxl:text-[44px] 3xl:text-[64px] uppercase helvetica`}
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
function Artists({
  artistData,
  loading,
  textColor,
  backgroundColor,
  isFade,
  videos,
  isSlider,
  isTextLeft,
  isDesktop = false,
}) {
  const title =
    typeof artistData?.title === "string" ? artistData.title.trim() : "";
  const description =
    typeof artistData?.description === "string"
      ? artistData.description.trim()
      : "";
  const viewAllLabel =
    typeof artistData?.viewAllLabel === "string"
      ? artistData.viewAllLabel.trim()
      : "";
  const viewAllUrl =
    typeof artistData?.viewAllUrl === "string" ? artistData.viewAllUrl.trim() : "";
  const showViewAll = Boolean(viewAllLabel && viewAllUrl);
  const isExternalViewAll =
    viewAllUrl.startsWith("http://") || viewAllUrl.startsWith("https://");

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
      <div className="bg-black page-container flex flex-col gap-[30px] lg:gap-[35px] xl:gap-[40px] 2xl:gap-[0] 3xl:gap-[50px]">
        {(title || description) && (
          <div className="flex w-[90%] lg:w-[85%] xl:w-[80%] 3xl:w-[75%] mx-auto justify-center xl:flex-row flex-col gap-[20px] 3xl:gap-[40px] text-white">
            <div
              className={`flex flex-col gap-[20px] 2xl:gap-[30px] 3xl:gap-[50px] font-bold lg:items-center lg:text-center ${isTextLeft ? "text-left lg:text-center" : "text-center"}`}
            >
              {title ? (
                <SectionTitle disableTitleSpacing={true} className="text-white">
                  {title}
                </SectionTitle>
              ) : null}
              {description ? (
                <StrapiRichDescription
                  value={description}
                  className="font-normal text-[16px] text-white md:text-[18px] xl:text-[20px] 2xl:text-4xl 3xl:text-5xl [&_p]:m-0"
                />
              ) : null}
            </div>
          </div>
        )}
        {isDesktop && mediaItems.length === 4 ? (
          <VideoGridZigZag videos={mediaItems} />
        ) : (
          <VideoGrid videos={mediaItems} />
        )}

        {showViewAll && (
          <div className="bg-black flex w-full flex-col items-center pt-4 lg:pt-6 2xl:pt-8 3xl:pt-10">
            {isExternalViewAll ? (
              <a
                href={viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-[16px] lg:px-[24px] 2xl:px-[32px] py-[10px] lg:py-[12px] 2xl:py-[14px] bg-primary hover:bg-primary/80 text-black font-medium rounded-lg text-[14px] lg:text-[16px] 2xl:text-[18px] transition-all duration-300"
              >
                <span>{viewAllLabel}</span>
              </a>
            ) : (
              <Link
                href={viewAllUrl}
                className="group flex items-center gap-2 px-[16px] lg:px-[24px] 2xl:px-[32px] py-[10px] lg:py-[12px] 2xl:py-[14px] bg-primary hover:bg-primary/80 text-black font-medium rounded-lg text-[14px] lg:text-[16px] 2xl:text-[18px] transition-all duration-300"
              >
                <span>{viewAllLabel}</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Artists;
