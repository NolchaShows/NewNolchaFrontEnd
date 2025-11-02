"use client";
import React from "react";

const PressFeature = ({
  logo = "/landing/forbes.svg",
  quote = "Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.",
  video = "/video.mp4",
  bg = "#F5F7FA",
}) => {
  return (
    <section className={`w-full`} style={{ backgroundColor: bg }}>
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-6 lg:px-[60px] 2xl:px-[80px] py-10 lg:py-[72px] 2xl:py-[96px]">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Video */}
          <div className="w-full lg:w-[58%]">
            <div className="rounded-[18px] overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right: Logo and Quote */}
          <div className="w-full lg:flex-1 relative">
            {/* Decorative quotes */}
            <div className="absolute -left-2 lg:left-0 -top-6 opacity-10 select-none" aria-hidden>
              <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 120H10V70C10 47 23 28 49 14L59 30C41 40 32 55 32 75H60V120H40Z" fill="#000"/>
                <path d="M130 120H100V70C100 47 113 28 139 14L149 30C131 40 122 55 122 75H150V120H130Z" fill="#000"/>
              </svg>
            </div>

            <div className="relative">
              <img src={logo} alt="Press Logo" className="h-[72px] lg:h-[120px] 2xl:h-[140px] mb-4 lg:mb-6" />
              <p className="text-[#111] text-[16px] lg:text-[22px] 2xl:text-[28px] leading-[1.4] max-w-[720px]">
                “{quote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressFeature;


