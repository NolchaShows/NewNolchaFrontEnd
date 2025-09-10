"use client";
import Artists from "@/components/landing/Artists";
import React from "react";
import Card from "@/components/artists/Card";
function page() {
  const videos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ];
  const cardData = [
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/1.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/2.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/3.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/4.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/5.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/6.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/7.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/8.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/9.png",
    },
    {
      title: "Crypto executive works smarter with Even G1.",
      image: "/artists/10.png",
    },
  ];
  return (
    <div className=" max-w-[1440px] 2xl:max-w-none mx-auto ">
      <h1 className="p-5 2xl:p-10 font-neue font-bold text-[24px] lg:text-[48px] 2xl:text-6xl text-[#000000]">
        Featured Artists
      </h1>
      <Artists
        textColor={"text-[#000000]"}
        isFade={false}
        backgroundColor={"bg-[#F4F4F4]"}
        videos={videos}
        isSlider={true}
      />
      <div className="flex lg:flex-wrap gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[18px] xl:py-[20px] 2xl:py-[60px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] flex-col lg:flex-row max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} image={card.image} />
        ))}
      </div>
    </div>
  );
}

export default page;
