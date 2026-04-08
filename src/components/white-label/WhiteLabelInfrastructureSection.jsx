"use client";

import React from "react";

const infrastructureItems = [
  { title: "Creative Concept Experience Design", color: "#CEC2AF" },
  { title: "Venue Sourcing & Transformation", color: "#E2A1A3" },
  { title: "Entertainment & Costume Design", color: "#95DBC7" },
  { title: "Art Direction & Music Curation", color: "#5DF6D2" },
  { title: "Signature F&B Programming", color: "#009895" },
  { title: "Biz Dev & Strategic Introductions", color: "#DDFFBB" },
  { title: "Guest List Management", color: "#A3A9DC" },
  { title: "Budget Strategy & Oversight", color: "#E4F0D0" },
  { title: "VIP Experience & Guest Relations", color: "#72D5F6" },
  { title: "Showflow & Crew Operations", color: "#FFE8FF" },
];

const defaultInfrastructureSection = {
  heading: "360deg White-Label Event Infrastructure",
  items: infrastructureItems,
  paragraph:
    "<strong>Our 360 turnkey white-label events</strong> are custom, story-driven, and tailored to your mission, audience, and goals. <strong>From</strong> intimate gatherings, <strong>to summits</strong> to large-scale immersive experiences. We take care of every detail, from concept to execution, so you can focus on what matters most.",
};

const WhiteLabelInfrastructureSection = ({ sectionData }) => {
  const section = {
    ...defaultInfrastructureSection,
    ...sectionData,
    items: sectionData?.items?.length > 0 ? sectionData.items : defaultInfrastructureSection.items,
  };

  return (
    <section className="relative z-10 bg-white page-container">
      <div className="mx-auto flex max-w-[1280px] xxl:max-w-[1600px] 3xl:max-w-[2400px] flex-col items-center gap-[30px] sm:gap-10 lg:gap-[40px] 2xl:max-w-[1600px] 2xl:gap-[60px] xxl:gap-[80px] 3xl:gap-[120px]">
        <h2 className="text-center font-['Tomorrow',sans-serif] text-[28px] font-extrabold leading-[1.08] tracking-[-0.84px] text-black sm:text-[34px] sm:tracking-[-1.02px] md:text-[42px] md:tracking-[-1.26px] lg:text-[60px] lg:tracking-[-1.8px] 2xl:text-[78px] xxl:text-[96px] 3xl:text-[144px] 2xl:tracking-[-2.34px]">
          {section.heading}
        </h2>

        <div className="grid w-full items-stretch gap-6 md:gap-8 lg:grid-cols-[minmax(0,500px)_minmax(0,634px)] lg:gap-[30px] 2xl:grid-cols-[minmax(0,640px)_minmax(0,820px)] xxl:grid-cols-[minmax(0,800px)_minmax(0,1000px)] 3xl:grid-cols-[minmax(0,1200px)_minmax(0,1500px)] 2xl:gap-[48px] xxl:gap-[64px] 3xl:gap-[96px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 2xl:gap-5 xxl:gap-7 3xl:gap-10">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[88px] items-center justify-center rounded-[12px] border border-[#FFF9AB] px-4 py-3 text-center shadow-sm sm:min-h-[96px] sm:px-5 lg:min-h-[100px] lg:py-[10px] 2xl:min-h-[130px] xxl:min-h-[160px] 3xl:min-h-[240px] 2xl:rounded-[16px] 3xl:rounded-[32px] 2xl:px-6"
                style={{ backgroundColor: item.color }}
              >
                <p className="font-['Tomorrow',sans-serif] text-[16px] font-semibold leading-[1.2] tracking-[-0.48px] text-black whitespace-pre-line sm:text-[17px] sm:tracking-[-0.51px] lg:text-[20px] lg:tracking-[-0.6px] 2xl:text-[26px] xxl:text-[32px] 3xl:text-[48px] 2xl:tracking-[-0.78px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[18px] bg-[#1A1A1A] px-5 py-6 text-[#D1EDDF] shadow-[0_1px_10px_rgba(0,0,0,0.1),0_22px_28px_rgba(0,0,0,0.4)] sm:px-6 sm:py-8 lg:min-h-[564px] lg:px-9 lg:py-10 2xl:min-h-[720px] xxl:min-h-[900px] 3xl:min-h-[1300px] 2xl:rounded-[24px] 3xl:rounded-[48px] 2xl:px-12 xxl:px-16 3xl:px-24 2xl:py-14 xxl:py-20 3xl:py-32">
            <div className="flex h-full flex-col justify-center gap-5 font-['Tomorrow',sans-serif] text-[20px] font-semibold leading-[1.3] tracking-[-0.6px] sm:gap-6 sm:text-[22px] sm:tracking-[-0.66px] md:text-[24px] md:tracking-[-0.72px] lg:gap-8 lg:text-[30px] lg:tracking-[-0.9px] 2xl:gap-10 xxl:gap-14 3xl:gap-20 2xl:text-[40px] xxl:text-[50px] 3xl:text-[75px] 2xl:tracking-[-1.2px]">
              <div
                className="[&_p]:m-0 [&_p]:leading-[inherit] [&_strong]:text-[#FEF991]"
                dangerouslySetInnerHTML={{ __html: section.paragraph }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelInfrastructureSection;
