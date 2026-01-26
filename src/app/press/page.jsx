"use client";
import LogoSlider from "@/components/home/TextSlider";
import About from "@/components/landing/About";
import CardSlider from "@/components/press/CardSlider";
import React from "react";
import { usePressPageData } from "@/utils/pressPageUtils";
import VideoHeroSection from "@/components/common/VideoHeroSection";

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
  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";
  const dynamicLogos = (pressData?.logos && pressData.logos.length > 0) ? pressData.logos : logos;
  const cards = (pressData?.cards && pressData.cards.length > 0) ? pressData.cards : defaultCards;

  console.log('✅ Final logos to use:', dynamicLogos);
  const aboutSection = {
    title: "Media Coverage",
    paragraphText: "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
    link: "#",
    linkText: "Co-Host An Event With Us",
    image: "/press/press.png"
  };

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
        firstPart="Press"
        secondPart=""
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
      />
      <div className="relative z-10">
        <div className="bg-[#EBE2D7]">
          <LogoSlider logoSliderData={[]} loading={loading} />
        </div>

        <About
          title={aboutSection.title}
          paragraphText ={aboutSection.paragraphText}
          link={aboutSection.link}
          linkText={aboutSection.linkText}
          image={aboutSection.image}
          loading={loading}
          variant="press"
        />

        <section className="bg-black py-12 sm:py-16 lg:py-[100px]">
          <div className="w-full max-w-[1170px] mx-auto px-5 sm:px-8">
            <CardSlider cards={cards} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
