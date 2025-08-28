"use client";
import React from "react";
import ImageCarousel from "../experiences/ImageCarousel";
import Gallery from "../experiences/Gallery";
import MediaCarousel from "../experiences/MediaCarousel";
import Hero from "../press/Hero";

const Experience = ({
  mainHeading,
  subHeading,
  conferenceImage,
  hostImage,
  hostName,
  hostDescription,
  buttonText = "PARTNER WITH US",
  videos,
  posts,
  galleryImages,
}) => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="py-8 px-4 ml-5">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 tracking-wide">
          {mainHeading}
        </h1>
        <p className="text-gray-600 text-sm md:text-base font-medium">
          {subHeading}
        </p>
      </div>

      {/* Conference Image */}
      <Hero images={conferenceImage} />

      {/* Host Section */}
      <div className="px-4 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row bg-[#f6f1ea] rounded-2xl overflow-hidden">
          <div className="w-full md:w-2/3 p-6 md:p-30 flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0d3d2d] mb-4 uppercase">
              {hostName}
            </h2>
            <p className="text-[#0d3d2d] text-sm md:text-base leading-relaxed mb-6">
              {hostDescription}
            </p>
            <button className="bg-[#E7F0D3] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full md:w-fit">
              {buttonText}
            </button>
          </div>

          <div className="w-full md:w-1/3 order-2 md:order-1">
            <img
              src={hostImage || "/api/placeholder/300/400"}
              alt="Host"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Video Slider Section */}
      <MediaCarousel items={videos} />

      {/* Posts Slider Section */}
      <ImageCarousel posts={posts} />

      {/* Gallery Section */}
      <div className="mb-10">
        <Gallery images={galleryImages} />
      </div>
    </div>
  );
};
export default Experience;
