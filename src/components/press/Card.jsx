import React from "react";

function Card({ newsPaper, image, title, link }) {
  return (
    <div
      className="backdrop-blur-[4px] bg-[#1a1a1a] lg:py-[30px] py-[20px] xxl:py-[40px] 3xl:py-[60px] lg:px-[20px] px-[16px] xxl:px-[30px] 3xl:px-[45px] flex flex-col gap-[20px] xxl:gap-[30px] 3xl:gap-[45px] w-full rounded-[17px] 3xl:rounded-[34px] shadow-[0px_0.5px_10px_rgba(0,0,0,0.1),0px_20px_26px_rgba(0,0,0,0.4)] text-white transition-transform duration-300"
    >
      <div className="flex justify-center items-center h-[50px] xxl:h-[70px] 3xl:h-[100px]">
        <img
          src={newsPaper}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="overflow-hidden rounded-[4px] 3xl:rounded-[8px]">
        <img
          src={image}
          className="w-full h-[220px] sm:h-[258px] xxl:h-[350px] 3xl:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <h1 className="text-[16px] sm:text-[18px] xxl:text-[24px] 3xl:text-[36px] text-center leading-[1.5] tracking-[-0.54px]">
        {title}
      </h1>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-center cursor-pointer bg-primary py-[12px] sm:py-[16px] xxl:py-[20px] 3xl:py-[30px] px-[24px] w-full rounded-lg hover:opacity-90 transition-opacity text-[16px] lg:text-[18px] xxl:text-[24px] 3xl:text-[36px] text-black font-medium"
      >
        View Article
      </a>
    </div>
  );
}
// ilovedsa
export default Card;
