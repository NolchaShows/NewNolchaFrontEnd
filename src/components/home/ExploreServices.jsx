import React from "react";
import SectionTitle from "../common/SectionTitle";

const ExploreServices = ({ title, image, caption, items }) => {
  return (
    <section className="page-container bg-white]">
      <SectionTitle className="text-black">{title}</SectionTitle>

      <div className="flex flex-col lg:flex-row gap-[14px] lg:gap-[36px] 2xl:gap-[64px]">
        {/* Left image and caption */}
        <div className="flex-1">
          <div className="rounded-[14px] lg:rounded-[22px] 2xl:rounded-[40px] overflow-hidden">
            <img src={image} alt="services" className="w-full h-[240px] lg:h-[358px] 2xl:h-[636px] object-cover" />
          </div>
          <p className="mt-[10px] lg:mt-[16px] 2xl:mt-[28px] text-black text-[16px] lg:text-[18px] 2xl:text-[32px] leading-relaxed">
            {caption}
          </p>
        </div>

        {/* Right list */}
        <div className="flex-1 flex flex-col">
          {items.map((item, idx) => (
            <div key={idx} className="px-[5px] py-[10px] lg:px-[8px] lg:py-[22px] 2xl:px-[15px] 2xl:py-[40px] border-b border-[#D9D9D9]">
              <p className="text-[#000] text-[18px] lg:text-[34px] 2xl:text-[56px] leading-[1.2]"> 
                <span className="font-bold">{item.label}: </span>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;


