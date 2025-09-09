"use client";
import React, { useState } from "react";
import Hero from "../press/Hero";
import Gallery from "../experiences/Gallery";
import TextHero from "../charity_partners/TextHero";
import ContentCard from "../charity_partners/ContentCard";
import ImageTextCard from "../charity_partners/ImageTextCard";

const CharityPartner = ({
  mainHeading,
  subHeading,
  conferenceImages,
  contentCard,
  textCards,
  textImages,
  galleryImages,
}) => {
  const slideData = [
    {
      video: "/video.mp4",
      title: "/home/forbes.png",
      description:
        "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
    },
    {
      video: "/video.mp4",
      title: "/home/forbes.png",
      description: "lorem ipsum",
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="py-8 px-4 ml-5">
        <h1 className="font-neue text-[48px] 2xl:text-[80px] font-bold text-[#000000] mb-2">
          {mainHeading}
        </h1>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg 2xl:text-3xl font-medium">
          {subHeading} 
        </p>
      </div>
      <img src={"/experiences/jack/conf.png"} />

      <ContentCard {...contentCard} />
      <div className="mt-10">
        {textCards.map((card, index) => (
          <ImageTextCard
            key={index}
            image={card.image}
            text={card.text}
            imagePosition={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
      <TextHero images={slideData} />
      <Gallery images={galleryImages} />
    </div>
  );
};

export default CharityPartner;
