import Link from "next/link";
import React from "react";

function About({ title, paragraphs = [], image, link, linkText, imageStyle }) {
  return (
    <div className="
  font-neue 
  py-[20px] px-[16px] sm:py-[40px] sm:px-[24px] md:py-[60px] md:px-[35px] 
  lg:py-[75px] lg:px-[45px] xl:py-[80px] xl:px-[50px] 2xl:py-[100px] 2xl:px-[60px] 
  w-full max-w-none mx-auto 
  flex md:flex-row flex-col gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[50px] xl:gap-[120px] 2xl:gap-[160px] 
  md:justify-between md:items-center
">

      {/* Text Section */}
      <div className="flex flex-col gap-[32px] sm:gap-[36px] md:gap-[40px] lg:gap-[48px] xl:gap-[32px] 2xl:gap-[64px] 
  text-[#000000] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-20 2xl:mt-30 flex-1 md:max-w-[50%]">

        {/* Title */}
        {title && (
          <h1
            className="
        font-bold 
        text-[52px] 
        leading-[120%] 
        tracking-[-0.03em] 
        capitalize 
        text-black
      "
            style={{ fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif' }}
          >
            {title}
          </h1>
        )}

        {/* Paragraphs */}
        <div className="flex flex-col gap-[16px]">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className="text-[20px] leading-[150%] tracking-[-0.03em] text-black font-normal"
              style={{ fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif' }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Desktop Button */}
        {link && (
          <Link
            href={link}
            className="
        hidden md:flex items-center justify-center
        w-[136px] h-[44px]
        rounded-[10px]
        border border-[#B5BF9E]
        bg-[#E7F0D3]
        gap-[8px]
        pt-[3px] pr-[6px] pb-[3px] pl-[6px]
        text-[16px] leading-[126%] tracking-[0]
        text-black
        opacity-100
        hover:opacity-90 transition-opacity
        align-middle
      "
            style={{
              fontFamily: "Neue Haas Grotesk Text Pro, sans-serif",
              fontWeight: 600,
            }}
          >
            {linkText}
          </Link>
        )}
      </div>


      {/* Image */}
      {image && (
        <div className="flex-shrink-0 lg:flex-1 mx-auto lg:mx-0">
          <img
            src={image}
            className={`${imageStyle} w-[658px] h-[579px] rounded-[16px] object-cover opacity-100`}
            alt="About section"
          />
        </div>
      )}



      {/* Mobile Button */}
      {link && (
        <Link
          href={link}
          className="bg-[var(--primary-color)] text-center border-1 border-[#000000] py-[12px] px-[24px] rounded-[4px] w-full md:hidden hover:opacity-90 transition-opacity text-[14px] sm:text-[16px]"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default About;