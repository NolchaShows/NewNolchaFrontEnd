import Link from "next/link";
import React from "react";

function About({ title, paragraphs = [], image, link, linkText, imageStyle }) {
  return (
    <div className="font-neue py-[20px] px-[16px] sm:py-[40px] sm:px-[24px] md:py-[60px] md:px-[35px] lg:py-[75px] lg:px-[45px] xl:py-[80px] xl:px-[50px] 2xl:py-[100px] 2xl:px-[60px] w-full max-w-none mx-auto flex xl:flex-row flex-col gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[50px] xl:gap-[120px] 2xl:gap-[160px] md:justify-between">
      
      {/* Text Section */}
      <div className="flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[40px] xl:gap-[48px] 2xl:gap-[64px] text-[#000000] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-20 2xl:mt-30 flex-1 xl:max-w-[600px] 2xl:max-w-[800px]">
        
        <div className="flex flex-col gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[28px] xl:gap-[36px] 2xl:gap-[48px]">
          {title && (
            <h1 className="text-[24px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[48px] 2xl:text-[60] uppercase font-bold text-[var(--primary-text-color)] leading-tight">
              {title}
            </h1>
          )}

          {/* Paragraphs */}
          <div className="flex flex-col gap-[12px] sm:gap-[8px] md:gap-[4px] lg:gap-[8px] xl:gap-[16px] 2xl:gap-[20px]">
            {paragraphs.map((text, i) => (
              <p key={i} 
                 className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[28px] leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-[1.65] xl:leading-[1.7] 2xl:leading-[1.8]">
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Desktop Button */}
        {link && (
          <Link
            href={link}
            className="bg-[var(--primary-color)] rounded-[4px] w-fit hidden md:block hover:opacity-90 transition-opacity text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] py-[12px] px-[24px] sm:py-[14px] sm:px-[28px] md:py-[16px] md:px-[32px] lg:py-[18px] lg:px-[36px] xl:py-[20px] xl:px-[40px] 2xl:py-[24px] 2xl:px-[48px]"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="flex-shrink-0 xl:flex-1 w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[2000px] mx-auto 2xl:ml-60 xl:mx-0">
          <img
            src={image}
            className={`${imageStyle} w-full rounded-[8px] sm:rounded-[10px] md:rounded-[12px] lg:rounded-[14px] xl:rounded-[16px] 2xl:rounded-[20px] object-cover h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[900px]`}
            alt="About section"
          />
        </div>
      )}

      {/* Mobile Button */}
      {link && (
        <Link
          href={link}
          className="bg-[var(--primary-color)] text-center py-[12px] px-[24px] rounded-[4px] w-full md:hidden hover:opacity-90 transition-opacity text-[14px] sm:text-[16px]"
        >
         {linkText}
        </Link>
      )}
    </div>
  );
}

export default About;