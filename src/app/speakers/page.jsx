"use client";
import Gallery from "@/components/experiences/Gallery";
import Hero from "@/components/press/Hero";
import VideoSlider from "@/components/services/VideoSlider";
import ScrollCarousel from "@/components/speakers/ScrollCarousel";
import Stack from "@/components/speakers/Stack";
import Link from "next/link";
import React from "react";

function page() {
  const images = [
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/1.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/3.png", css: " w-full lg:w-[811px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[517px]" },
    { url: "/landing/1.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
  ];
  const galleryImages = [
    "/experiences/jack/galleryImages/1.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/3.png",
    "/experiences/jack/galleryImages/4.png",
    "/experiences/jack/galleryImages/5.png",
    "/experiences/jack/galleryImages/6.png",
    "/experiences/jack/galleryImages/7.png",
    "/experiences/jack/galleryImages/8.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/8.png",
  ];
    const videos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ];
  return (
    <div className="bg-[var(--surface-color2)]">
      <h1 className="p-5 font-neue font-bold text-[24px] lg:text-[48px] 2xl:text-2xl text-[#000000]">
        Speakers
      </h1>
      <div className="mt-5">
      <VideoSlider videos={videos}/>

      </div>
      <div className="bg-[var(--secondary-color)]">
        <Stack />
      </div>
      <ScrollCarousel />
      <ScrollCarousel />
      <ScrollCarousel />

      <Gallery images={galleryImages} />
    </div>
  );
}

export default page;
