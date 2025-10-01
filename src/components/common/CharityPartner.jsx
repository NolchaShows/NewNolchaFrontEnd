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
  mainImage,
  conferenceImages,
  contentCard,
  textCards,
  textImages,
  galleryImages,
  textHeroData,
  loading = false
}) => {
  const slideData = [
    {
      image: "/home/hero.png",
            video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

      title: "/home/forbes.png",
      description:
        "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
    },
    {
      image: "/home/hero.png",
            video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

      title: "/home/forbes.png",
      description: "lorem ipsum",
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="py-8 px-4 ml-5">
        <h1 className="font-neue text-[30px] sm:text-[32px] xl:text-[64px] 2xl:text-[72px] font-bold text-[#000000] mb-2">
          {mainHeading}
        </h1>
        <p className=" font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[#000000] text-[20px] md:text-[24px] 2xl:text-[36px] font-medium">
          {subHeading}
        </p>
      </div>
      {mainImage ? (
        <img src={mainImage} alt={mainHeading} className="w-full h-auto" />
      ) : (
        <img src={"/experiences/jack/conf.png"} alt="Default charity partner image" className="w-full h-auto" />
      )}
      {contentCard ? (
        <ContentCard {...contentCard} />
      ) : (
        <ContentCard
          title="Making a Difference Together"
          description="We're proud to support this incredible charity organization and their mission to create positive change in the world. Through our partnership, we're working together to make a meaningful impact in the lives of those who need it most."
          image="/experiences/jack/conf.png"
        />
      )}
      <div className="mt-10 2xl:mt-16">
        {textCards && textCards.length > 0 ? (
          textCards.map((card, index) => (
            <ImageTextCard
              cards={textCards}
              key={index}
              image={card.image}
              cardNumber={card.cardNumber}
              text={card.text}
              subtext={card.subtext}
              imagePosition={card.imagePosition || (index % 2 === 0 ? "left" : "right")}
              index={index}          
              total={textCards.length} 
            />
          ))
        ) : (
          <>
            <ImageTextCard
              image="/home/about.png"
              text="About Our Partnership\n\nWe're proud to partner with this amazing charity organization. Together, we're making a difference in the lives of those who need it most."
              subtext="Partnership details will be updated soon"
              imagePosition="left"
              index={0}
              total={2}
            />
            <ImageTextCard
              image="/home/collaborate.png"
              text="Our Impact\n\nThrough our collaborative efforts, we've been able to reach countless individuals and families, providing support, resources, and hope."
              subtext="Impact metrics coming soon"
              imagePosition="right"
              index={1}
              total={2}
            />
          </>
        )}
      </div>

      <TextHero
        textHeroData={textHeroData}
        images={slideData}
        loading={false}
      />
      {galleryImages && galleryImages.length > 0 ? (
        <Gallery images={galleryImages} />
      ) : (
        // Show default gallery images when no data
        <Gallery images={[
          "/gallery/1.png",
          "/gallery/2.png",
          "/gallery/3.png",
          "/gallery/4.png",
          "/gallery/5.png",
          "/gallery/6.png"
        ]} />
      )}
    </div>
  );
};
export default CharityPartner;