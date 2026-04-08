"use client";

import React from "react";
import RoundedCtaButton from "../common/RoundedCtaButton";

const defaultCtaSection = {
  heading: "Let's Build Your Event.",
  description:
    "Tell us your vision - we'll handle everything else. Whether you're looking for an intimate gathering, full-scale conference, or 360 immersive experience activation for thousands, Nolcha produces it under your brand, at your standard.",
  ctaLabel: "Get Started",
  ctaUrl: "/contact-us",
  backgroundImage: "/white-label/cta-bg.jpg",
};

const WhiteLabelCtaSection = ({ sectionData }) => {
  const section = {
    ...defaultCtaSection,
    ...sectionData,
  };

  return (
    <section
      className="relative z-10 overflow-hidden px-5 py-[70px] sm:px-6 sm:py-[80px] lg:px-[140px] lg:py-[100px] 2xl:px-[180px] xxl:px-[250px] 3xl:px-[400px] 2xl:py-[140px] xxl:py-[180px] 3xl:py-[250px]"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${section.backgroundImage}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto flex max-w-[320px] flex-col items-center text-center text-white sm:max-w-[560px] lg:max-w-[768px] 2xl:max-w-[980px] xxl:max-w-[1200px] 3xl:max-w-[1800px]">
        <h2 className="font-['Tomorrow',sans-serif] text-[28px] font-extrabold leading-[1.08] tracking-[-0.84px] sm:text-[34px] sm:tracking-[-1.02px] md:text-[42px] md:tracking-[-1.26px] lg:text-[60px] lg:tracking-[-1.8px] 2xl:text-[78px] xxl:text-[96px] 3xl:text-[144px] 2xl:tracking-[-2.34px]">
          {section.heading}
        </h2>
        <p className="mt-4 font-['Tomorrow',sans-serif] text-[15px] leading-[1.5] tracking-[-0.45px] sm:mt-5 sm:text-[16px] sm:tracking-[-0.48px] md:max-w-[680px] md:text-[18px] md:tracking-[-0.54px] lg:text-[20px] lg:tracking-[-0.6px] 2xl:max-w-[880px] xxl:max-w-[1100px] 3xl:max-w-[1600px] 2xl:text-[28px] xxl:text-[36px] 3xl:text-[54px] 2xl:tracking-[-0.84px]">
          {section.description}
        </p>
        <RoundedCtaButton
          href={section.ctaUrl}
          label={section.ctaLabel}
          className="mt-6 self-center sm:mt-8 2xl:mt-10 xxl:mt-14 3xl:mt-20 mx-auto xxl:scale-125 3xl:scale-150"
        />
      </div>
    </section>
  );
};

export default WhiteLabelCtaSection;
