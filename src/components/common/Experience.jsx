"use client";
import React from "react";
import ImageCarousel from "../experiences/ImageCarousel";
import Gallery from "../experiences/Gallery";
import MediaCarousel from "../experiences/MediaCarousel";
import Hero from "../press/Hero";
import FloatingHost from "../experiences/FloatingHost";
import Partners from "../home/Partners";
import CardSlider from "../press/CardSlider";
import HostCard from "../experiences/HostCard";

const Experience = ({
  id,
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
  const partners = [
    {
      id: 1,
      imageWhite: "/experiences/partners/1w.png",
      imageBlack: "/experiences/partners/1b.png",
      altText: "Partner 1",
      backgroundColor: "bg-black",
    },
    {
      id: 2,
      imageWhite: "/experiences/partners/2w.png",
      imageBlack: "/experiences/partners/2b.png",
      altText: "Partner 2",
      backgroundColor: "bg-black",
    },
    {
      id: 3,
      imageWhite: "/experiences/partners/3w.png",
      imageBlack: "/experiences/partners/3b.png",
      altText: "Partner 3",
      backgroundColor: "bg-black",
    },
    {
      id: 4,
      imageWhite: "/experiences/partners/4w.png",
      imageBlack: "/experiences/partners/4b.png",
      altText: "Partner 4",
      backgroundColor: "bg-black",
    },
    {
      id: 5,
      imageWhite: "/experiences/partners/5w.png",
      imageBlack: "/experiences/partners/5b.png",
      altText: "Partner 5",
      backgroundColor: "bg-black",
    },
    {
      id: 6,
      imageWhite: "/experiences/partners/6w.png",
      imageBlack: "/experiences/partners/6b.png",
      altText: "Partner 6",
      backgroundColor: "bg-black",
    },
    {
      id: 7,
      imageWhite: "/experiences/partners/7w.png",
      imageBlack: "/experiences/partners/7b.png",
      altText: "Partner 7",
      backgroundColor: "bg-black",
    },
    {
      id: 8,
      imageWhite: "/experiences/partners/8w.png",
      imageBlack: "/experiences/partners/8b.png",
      altText: "Partner 8",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 9,
      imageWhite: "/experiences/partners/9w.png",
      imageBlack: "/experiences/partners/9b.png",
      altText: "Partner 9",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 10,
      imageWhite: "/experiences/partners/10w.png",
      imageBlack: "/experiences/partners/10b.png",
      altText: "Partner 10",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 11,
      imageWhite: "/experiences/partners/11w.png",
      imageBlack: "/experiences/partners/11b.png",
      altText: "Partner 11",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 12,
      imageWhite: "/experiences/partners/12w.png",
      imageBlack: "/experiences/partners/12b.png",
      altText: "Partner 12",
      backgroundColor: "bg-[#E7F0D3]",
    },
  ];

  const cards = [
    {
      id: 1,
      newsPaper: "/press/card/1n.png",
      image: "/press/card/1.png",
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "#",
    },
    {
      id: 2,
      newsPaper: "/press/card/2n.png",
      image: "/press/card/2.png",
      title: "Another Article Title Here",
      link: "#",
    },
    {
      id: 3,
      newsPaper: "/press/card/3n.png",
      image: "/press/card/3.png",
      title: "Another Article Title Here",
      link: "#",
    },
  ];
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
      <img src={conferenceImage[0]} className="w-full" />

      {/* New York Fashion Week Section */}

      <HostCard
        hostDescription={hostDescription}
        hostImage={hostImage}
        hostName={hostName}
        buttonText={buttonText}
      />
      
      {/* Host Section */}
      {/* <div className="mt-10">
        <FloatingHost
          hostDescription={hostDescription}
          hostImage={hostImage}
          hostName={hostName}
          buttonText={buttonText}
        />
      </div> */}

      {id === 5 ? (
        <div>
          <p className="font-neue text-center font-bold text-[52px] 2xl:text-[70px]">
            Press
          </p>
          <div className="m-10">
            <CardSlider cards={cards} />
          </div>
        </div>
      ) : (
        // {/* Video Slider Section */}
        <MediaCarousel items={videos} />
      )}
      {id === 1 || id === 3 ? (
        <Partners
          logo={"/experiences/partners/logo.png"}
          description={"THE AI AGENT BASE LAYER"}
          partners={partners}
        />
      ) : (
        // {/* Posts Slider Section */}
        <ImageCarousel posts={posts} />
      )}

      {/* Gallery Section */}
      <Gallery images={galleryImages} />
    </div>
  );
};
export default Experience;
