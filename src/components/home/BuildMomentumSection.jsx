import React from "react";
import SectionTitle from "../common/SectionTitle";
import RoundedCtaButton from "../common/RoundedCtaButton";

const BuildMomentumSection = () => {
  // Partner logos data - update paths when logos are added
  // Based on the image: Mercedes-Benz, Bullish, Galaxy, OKX, Coca-Cola, CoinDesk
  const partnerLogos = [
    { name: "Mercedes-Benz", logo: 'homepage/build_momentum_section/mercedes.png' }, // Add logo path when available
    { name: "Bullish", logo: 'homepage/build_momentum_section/bullish.png' }, // Add logo path when available
    { name: "Galaxy", logo: 'homepage/build_momentum_section/galaxy.png' }, // Add logo path when available
    { name: "OKX", logo: 'homepage/build_momentum_section/okx.png' }, // Add logo path when available
    { name: "Coca Cola", logo: 'homepage/build_momentum_section/cocacola.png' },
    { name: "CoinDesk", logo: 'homepage/build_momentum_section/coindesk.png' }, // Add logo path when available
  ];

  return (
    <section className="w-full bg-black text-white page-container">
      {/* Heading */}
      <SectionTitle>We Build Cultural Momentum</SectionTitle>

      {/* Paragraphs */}
      <div className="flex flex-col gap-[10px] lg:gap-5 2xl:gap-[35px] mb-5 lg:mb-10 2xl:mb-[70px]">
        <p className="text-[16px] lg:text-[28px] 2xl:text-[48px] text-white leading-relaxed">
          For Over 15 Years, Nolcha Has Been At The Forefront Of{" "}
          <span className="font-bold">
            Technology, Culture, And Immersive Experiences
          </span>{" "}
          Producing High-Impact Events, Summits, And Activations For Visionary
          Brands And The World's Leading Blockchain, AI, And Crypto
          Conferences.
        </p>
        <p className="text-[16px] lg:text-[28px] 2xl:text-[48px] text-white leading-relaxed">
          We Unite Communities, Spark Collaboration, And Create Business
          Through Creativity, Innovation, And Human Connection.
        </p>
      </div>

      {/* Partner Logos */}
      <div className="flex flex-wrap items-center justify-start gap-6 lg:gap-[48px] 2xl:gap-16 mb-[30px] lg:mb-[60px] 2xl:mb-[100px]">
        {partnerLogos.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 md:h-14 lg:h-16 xl:h-20 2xl:h-24 opacity-80 hover:opacity-100 transition-opacity"
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto max-w-[140px] lg:max-w-[160px] 2xl:max-w-[200px] object-contain transition-all duration-300 filter brightness-0 invert opacity-90 hover:opacity-100"
              />
            ) : (
              <span className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Let's Talk Button */}
      <RoundedCtaButton
        label="Let's Talk"
        onClick={() => {
          const el = document.getElementById("contact");
          if (!el) return;
          const nav = document.querySelector(".sticky.top-0");
          const navHeight = nav ? nav.getBoundingClientRect().height : 0;
          const y =
            el.getBoundingClientRect().top +
            window.pageYOffset -
            navHeight -
            12;
          window.scrollTo({ top: y, behavior: "smooth" });
        }}
      />
    </section>
  );
};

export default BuildMomentumSection;
