import Link from "next/link";
import React from "react";

function Card({ newsPaper, image, title, link }) {
  return (
    <div className="lg:py-[40px] py-[20px] lg:px-[26px] px-[16px] flex flex-col md:gap-[24px] gap-[20px] w-full lg:rounded-[8px] rounded-[17.04px] bg-[var(--surface-color2)] border border-[var(--surface-color)]">
      <div className="flex justify-center">
        <img
          src={newsPaper}
          className="max-w-[224px] xl:max-w-[240px] 2xl:max-w-[350px] object-cover"
        />
      </div>
      <img
        src={image}
        className="w-full max-h-[346px] xl:max-h-[420px] 2xl:max-h-[500px] rounded-[10px] object-cover"
      />
      <h1 className="font-medium text-[var(--secondary-text-color)] text-[18px] md:text-[14px] xl:text-[16px] 2xl:text-[28px] text-center leading-[1.2]">
        {title}
      </h1>
      <Link
        href={link}
        className="text-center bg-[var(--primary-color)] py-[12px] xl:py-[14px] 2xl:py-[16px] px-[24px] xl:px-[28px] 2xl:px-[36px] xl:text-lg 2xl:text-xl w-full border-1 border-[#B5BF9E] rounded-[16px] hover:opacity-90 transition-opacity"
      >
        View Article
      </Link>
    </div>
  );
}

export default Card;
