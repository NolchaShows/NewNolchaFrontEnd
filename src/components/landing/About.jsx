import Link from "next/link";
import React from "react";

function About({ title, paragraphs = [], image, link,linkText,imageStyle }) {
  return (
    <div className="md:py-[75px] md:px-[45px] max-w-[1440px] mx-auto py-[20px] px-[16px] flex xl:flex-row flex-col gap-[20px] md:justify-between">
      
      {/* Text Section */}
      <div className="flex flex-col gap-[32px] text-[var(--secondary-text-color)] md:max-w-[562px]">
        <div className="flex flex-col md:gap-[20px] gap-[16px]">
          {title && (
            <h1 className="md:text-[48px] uppercase text-[24px] font-medium text-[var(--primary-text-color)]">
              {title}
            </h1>
          )}

          {/* Paragraphs */}
          <div className="flex flex-col gap-[12px] md:gap-[4px]">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        {/* Desktop Button */}
        {link && (
          <Link
            href={link}
            className="bg-[var(--primary-color)] py-[12px] px-[24px] rounded-[4px] w-fit hidden md:block"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Image */}
      {image && (
        <img
          src={image}
          className={` ${imageStyle} w-full rounded-[8px] max-h-[579px] object-cover mx-auto`}
          alt="About section"
        />
      )}

      {/* Mobile Button */}
      {link && (
        <Link
          href={link}
          className="bg-[var(--primary-color)] text-center py-[12px] px-[24px] rounded-[4px] w-full md:hidden"
        >
         {linkText}
        </Link>
      )}
    </div>
  );
}

export default About;
