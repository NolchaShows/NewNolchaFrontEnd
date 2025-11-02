import React from "react";
import SectionTitle from "../common/SectionTitle";

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
    <section className="w-full bg-[#FFF7E6] page-container">
      {/* Heading */}
      <SectionTitle>We Build Cultural Momentum</SectionTitle>

      {/* Paragraphs */}
      <div className="flex flex-col gap-[10px] lg:gap-5 2xl:gap-[35px] mb-5 lg:mb-10 2xl:mb-[70px]">
        <p className="text-[16px] lg:text-[28px] 2xl:text-[48px] text-[#000000] leading-relaxed">
          For Over 15 Years, Nolcha Has Been At The Forefront Of{" "}
          <span className="font-bold">
            Technology, Culture, And Immersive Experiences
          </span>{" "}
          Producing High-Impact Events, Summits, And Activations For Visionary
          Brands And The World's Leading Blockchain, AI, And Crypto
          Conferences.
        </p>
        <p className="text-[16px] lg:text-[28px] 2xl:text-[48px] text-[#000000] leading-relaxed">
          We Unite Communities, Spark Collaboration, And Create Business
          Through Creativity, Innovation, And Human Connection.
        </p>
      </div>

      {/* Partner Logos */}
      <div className="flex flex-wrap items-center justify-start gap-6 lg:gap-[48px] 2xl:gap-16 mb-[30px] lg:mb-[60px] 2xl:mb-[100px]">
        {partnerLogos.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 opacity-80 hover:opacity-100 transition-opacity"
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto max-w-[120px] lg:max-w-[120px] 2xl:max-w-[240px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-[#1A1A1A] text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Let's Talk Button */}
      <button
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
        className="group flex items-center gap-3 md:gap-4 pl-[16px] lg:pl-[27px] 2xl:pl-[48px] pr-[8px] lg:pr-2 2xl:pr-[12px] py-[9px] lg:py-2 2xl:py-[12px] bg-[#FF6813] hover:bg-[#FF9640] text-white font-medium rounded-full transition-all duration-300 text-[14px] lg:text-[20px] 2xl:text-[36px]"
      >
        <span>Let's Talk</span>
        <div className="flex items-center justify-center w-[23px] h-[23px] lg:w-[44px] lg:h-[44px] 2xl:w-[80px] 2xl:h-[80px] bg-[#fff] rounded-full group-hover:bg-[#fff] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 20 21"
            fill="none"
            className="w-4 h-4 lg:w-6 lg:h-6 2xl:w-12 2xl:h-12"
          >
            <path
              d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z"
              fill="#FF6813"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default BuildMomentumSection;
