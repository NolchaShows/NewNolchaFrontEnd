"use client";
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
      
      <div className="bg-[var(--tertiary-color)] ">
        <div className="max-w-[1440px] mx-auto flex lg:gap-[32px] flex-wrap lg:py-[64px] lg:px-[40px] py-[24px] px-[16px] gap-[24px] items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`${image.css} lg:max-h-[480px] max-h-[398px] object-cover rounded-[8px]`}
            />
          ))}
          <Link
            href={"#"}
            className="py-[12px] text-center px-[24px] md:w-fit w-full rounded-[4px] bg-[var(--primary-color)]"
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
