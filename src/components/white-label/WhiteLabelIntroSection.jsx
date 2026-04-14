"use client";

import React from "react";

const defaultIntroSection = {
  image: "/white-label/white-label.jpg",
  heading: "Your Event. Your Brand. Our Infrastructure.",
  paragraph:
    "We don't just produce events. We design strategic environments that elevate brand positioning and facilitate real business outcomes, supported by the scale, network, and operational discipline developed across 280+ global events.",
};

const WhiteLabelIntroSection = ({ introSection }) => {
  const section = {
    ...defaultIntroSection,
    ...introSection,
  };

  return (
    <section className="relative z-10 bg-[#FFF7E6] page-container">
      <div className="mx-auto grid max-w-[1280px] xxl:max-w-[1600px] 3xl:max-w-[2400px] items-center gap-[30px] sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[50px] 2xl:gap-[70px] xxl:gap-[100px] 3xl:gap-[150px]">
        <div className="relative mx-auto w-full max-w-[593px] overflow-hidden rounded-[8px] sm:rounded-[10px] lg:mx-0 lg:rounded-[12px] 2xl:max-w-[760px] xxl:max-w-[1000px] 3xl:max-w-[1400px] 2xl:rounded-[16px] 3xl:rounded-[32px]">
          <img
            src={section.image}
            alt="White label event highlights"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mx-auto w-full max-w-[560px] text-black lg:mx-0 lg:max-w-[530px] 2xl:max-w-[680px] xxl:max-w-[850px] 3xl:max-w-[1200px]">
          <h2 className="max-w-[514px] text-[28px] font-bold leading-[1.08] tracking-[-0.84px] sm:text-[32px] sm:tracking-[-0.96px] md:text-[40px] md:tracking-[-1.2px] lg:text-[50px] lg:tracking-[-1.5px] 2xl:max-w-[680px] xxl:max-w-[850px] 2xl:text-[64px] xxl:text-[80px] 3xl:text-[120px] 2xl:tracking-[-1.92px]">
            {section.heading}
          </h2>
          <div className="mt-5 flex max-w-[485px] flex-col gap-4 text-[15px] leading-[1.5] tracking-[-0.45px] sm:mt-6 sm:text-[16px] sm:tracking-[-0.48px] md:gap-5 md:text-[18px] md:tracking-[-0.54px] lg:text-[20px] lg:tracking-[-0.6px] 2xl:max-w-[620px] xxl:max-w-[780px] 3xl:max-w-[1100px] 2xl:gap-7 xxl:gap-9 3xl:gap-14 2xl:text-[28px] xxl:text-[36px] 3xl:text-[54px] 2xl:tracking-[-0.84px]">
            <p>{section.paragraph}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelIntroSection;
