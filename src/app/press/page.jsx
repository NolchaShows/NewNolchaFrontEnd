"use client";
import Companies from "@/components/common/Companies";
import LogoSlider from "@/components/home/TextSlider";
import About from "@/components/landing/About";
import Card from "@/components/press/Card";
import Hero from "@/components/press/Hero";
import React from "react";

function page() {
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
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
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
              Press
            </h1>
          </div>
        </div>
      </div>
      <LogoSlider logos={logos} />
      <div className="bg-[#EBE2D7]">
        <About
          title={"Media Coverage"}
          paragraphs={[
            "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
            "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
          ]}
          link={"#"}
          linkText={"Learn More"}
          image={"/home/about.png"}
          // imageStyle={"max-w-[667px]"}
        />
      </div>

      {/* <Companies companies={companies} />
      <div className="bg-[var(--secondary-color)]">
        <About
          title={"Media Coverage"}
          paragraphs={[
            "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
          ]}
          link={"#"}
          linkText={"Co-host an event with us"}
          image={"/press/about.jpg"}
          imageStyle={"max-w-[772px]"}
        />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] lg:py-[80px] xl:py-[100px] 2xl:py-[120px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] max-w-none mx-auto">
        {Array.from({ length: 9 }, (_, index) => (
          <Card
            key={index + 1}
            newsPaper={`/press/card/${index + 1}n.png`}
            image={`/press/card/${index + 1}.png`}
            title={
              "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
            }
            link={"#"}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
