"use client";
import Companies from "@/components/common/Companies";
import LogoSlider from "@/components/home/TextSlider";
import About from "@/components/landing/About";
import Card from "@/components/press/Card";
import CardSlider from "@/components/press/CardSlider";
import Hero from "@/components/press/Hero";
import React from "react";
import { usePressPageData } from "@/utils/pressPageUtils";

function page() {
  const { pressData, loading, error } = usePressPageData();
  const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
  ];
  const logos = [
    { name: "AdAge", url: "/home/slider1.png" },
    { name: "VOGUE", url: "/home/slider2.png" },
    { name: "Forbes", url: "/home/slider3.png" },
  ];

  const defaultCards = [
    {
      id: 1,
      newsPaper: "/press/card/1n.png",
      image: "/press/card/1.png",
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 2,
      newsPaper: "/press/card/2n.png",
      image: "/press/card/2.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 3,
      newsPaper: "/press/card/3n.png",
      image: "/press/card/3.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 4,
      newsPaper: "/press/card/4n.png",
      image: "/press/card/4.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 5,
      newsPaper: "/press/card/5n.png",
      image: "/press/card/5.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 6,
      newsPaper: "/press/card/6n.png",
      image: "/press/card/6.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 7,
      newsPaper: "/press/card/7n.png",
      image: "/press/card/7.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 8,
      newsPaper: "/press/card/8n.png",
      image: "/press/card/8.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
    {
      id: 9,
      newsPaper: "/press/card/9n.png",
      image: "/press/card/9.png",
      
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Use dynamic data if available, otherwise fall back to defaults
  console.log('🎯 Press data received:', pressData);
  console.log('🏷️ Logos from pressData:', pressData?.logos);
  console.log('📋 Default logos:', logos);
  
  const heroTitle = pressData?.heroTitle || "Press";
  const heroVideo = pressData?.heroVideo || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const dynamicLogos = (pressData?.logos && pressData.logos.length > 0) ? pressData.logos : logos;
  const cards = (pressData?.cards && pressData.cards.length > 0) ? pressData.cards : defaultCards;
  
  console.log('✅ Final logos to use:', dynamicLogos);
  const aboutSection = pressData?.aboutSection || {
    title: "Media Coverage",
    paragraphs: [
      "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
      "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto."
    ],
    link: "#",
    linkText: "Learn More",
    image: "/home/about.png"
  };

  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{ minWidth: "100%", minHeight: "100%" }}
          >
            <source
              src={heroVideo}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-opacity-50"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center text-white max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {heroTitle}
            </h1>
          </div>
        </div>
      </div>
      
      <LogoSlider logoSliderData={{ title: "AS SEEN IN", logos: dynamicLogos }} loading={loading} />
      
      <div className="bg-[#EBE2D7]">
        <About
          title={aboutSection.title}
          paragraphs={aboutSection.paragraphs}
          link={aboutSection.link}
          linkText={aboutSection.linkText}
          image={aboutSection.image}
          loading={loading}
        />
      </div>

      <div className="my-10">
        <CardSlider cards={cards} loading={loading} />
      </div>
    </div>
  );
}

export default page;
