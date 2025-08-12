import React from "react";

function Companies({ title, companies }) {
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto">
      <div className="text-center md:text-[48px] text-[24px] font-medium text-[var(--primary-text-color)] md:pt-[80px] pt-[20px] pb-[20px] uppercase">
       {title}
      </div>
      <div className="pt-[40px] pb-[60px]">
        <div className="flex lg:justify-between lg:max-w-[1100px] lg:flex-row flex-col gap-[24px] mx-auto items-center lg:items-start flex-wrap">
          {companies?.map((company, index) => (
            <img
              key={index}
              src={company.logo}
              alt={`Company ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;
