import Link from "next/link";
import React from "react";

function About({ title, paragraphs = [], image, link, linkText, imageStyle, loading }) {
  // Don't render until we have data or confirmed no data
  if (loading) {
    return (
      <div className="py-[20px] px-[16px] sm:py-[40px] sm:px-[24px] md:py-[60px] md:px-[35px] lg:py-[75px] lg:px-[45px] xl:py-[80px] xl:px-[50px] 2xl:py-[100px] 2xl:px-[60px] w-full max-w-none mx-auto flex items-center justify-center h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  return (
    <div className="py-[20px] px-[16px] sm:py-[40px] sm:px-[24px] md:py-[60px] md:px-[35px] lg:py-[75px] lg:px-[45px] xl:py-[80px] xl:px-[50px] 2xl:py-[100px] 2xl:px-[60px] w-full max-w-none mx-auto flex md:flex-row flex-col gap-[23px] md:gap-[32px] 2xl:gap-[45px] md:justify-between md:items-center">
      {/* Image */}
      {image && (
        <div className="flex-shrink-0 w-full md:w-[50%] xl:flex-1 mx-auto 2xl:ml-40 xl:mx-0 md:order-2">
          <img
            src={image}
            className={`max-w-[667px] 2xl:max-w-none w-full rounded-[8px] sm:rounded-[10px] md:rounded-[12px] lg:rounded-[14px] xl:rounded-[16px] 2xl:rounded-[20px] object-cover h-[400px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[1000px]`}
            alt="About section"
          />
        </div>
      )}

      {/* Text Section */}
      <div className="flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[40px] xl:gap-[48px] 2xl:gap-[64px] text-[#000000] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-20 2xl:mt-30 flex-1 md:max-w-[50%] md:order-1">
        <div className="flex flex-col gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[28px] xl:gap-[36px] 2xl:gap-[48px]">
          {title && (
            <h1
              className="text-[26px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[52px] 2xl:text-[66px] font-bold uppercase">
              {title}
            </h1>
          )}

          {/* Paragraphs */}
          <div className="flex flex-col gap-[12px] sm:gap-[8px] md:gap-[4px] lg:gap-[8px] xl:gap-[16px] 2xl:gap-[20px] md:mr-10">
            {paragraphs.map((text, i) => (
              <p
                key={i}

                className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[36px] leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-[1.65] xl:leading-[1.7]"
              >
                {text}
              </p>
            ))}
          </div>
        </div>


        {/* Desktop Button */}
        <Link
          href={link}
          className="bg-[#E7F0D3] w-[136px] h-[48px] 2xl:w-[300px] 2xl:h-[70px] border-1 border-[#B5BF9E] font-medium rounded-[10px] hidden md:flex items-center justify-center hover:opacity-90 transition-opacity text-[16px] 2xl:text-[30px] py-[3px] px-[6px] 2xl:py-[10px] 2xl:px-[20px]"
        >
          {linkText}
        </Link>
      </div>

      {/* Mobile Button */}
      <Link
        href={link}
        className="bg-[#E7F0D3] w-[123px] font-medium text-center border-1 border-[#B5BF9E] py-[12px] px-[6px] rounded-[10px] md:hidden hover:opacity-90 transition-opacity text-[14px] flex items-center justify-center"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default About;
