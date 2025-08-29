"use client";
import Gallery from "@/components/experiences/Gallery";
import Hero from "@/components/press/Hero";
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
    ]
  return (
    <div className="bg-[var(--surface-color2)]">
      <Hero
        heading={"Speakers"}
        images={[
          "/speakers/hero.png",
          "/speakers/hero.png",
          "/speakers/hero.png",
        ]}
      />
      <div className="bg-[var(--secondary-color)]">
        <Stack />
      </div>
      <ScrollCarousel/>
      <ScrollCarousel/>
      <ScrollCarousel/>
      
      <Gallery images={galleryImages}/>
    </div>
  );
}

export default page;
