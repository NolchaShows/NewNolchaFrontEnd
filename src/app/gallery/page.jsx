import Hero from "@/components/press/Hero";
import React from "react";
import EventSlider from "@/components/gallery/EventSlider";
import GalleryFilters from "@/components/gallery/GalleryFilters";

const Gallery = () => {
  const images = [
    "/gallery/2.png",
    "/gallery/3.png",
    "/gallery/4.png",
    "/gallery/5.png",
    "/gallery/6.png",
    "/gallery/5.png",
    "/gallery/2.png",
    "/gallery/3.png",
    "/gallery/4.png",
    "/gallery/6.png",
  ];
  return (
    <div className="bg-white">
      <div className="py-8 px-4 ml-5">
        <h1 className="text-[48px] 2xl:text-[64px] font-bold text-[#000000] mb-2">
          Gallery
        </h1>
      </div>
      <img src="/gallery/1.png" alt="Gallery Image" className="w-full" />

      <GalleryFilters />

      <EventSlider eventName="CONCENSUS 2025" images={images} />
    </div>
  );
};

export default Gallery;
