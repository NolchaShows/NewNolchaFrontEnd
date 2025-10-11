import React from 'react';
import StyledHeading from './StyledHeading';

const EventHero = ({ 
  logoImage, 
  firstHeadingPart, 
  secondHeadingPart, 
  dateLocation,
  primaryButtonText = "Partner With Us",
  secondaryButtonText = "Request Tickets",
  primaryButtonLink = "#",
  secondaryButtonLink = "#"
}) => {
  return (
    <section className="bg-white w-full py-[100px] lg:pt-[100px] lg:pb-[150px] sm:py-[60px] px-20 lg:px-20 sm:px-4">
      {/* Logo */}
      {logoImage && (
        <div className="mb-[10px]">
          <img 
            src={logoImage} 
            alt="Event Logo" 
            className="h-[60px] md:h-[80px] lg:h-[100px] 2xl:h-[120px] w-auto"
          />
        </div>
      )}

      {/* Main Heading */}
      <StyledHeading 
        firstPart={firstHeadingPart}
        secondPart={secondHeadingPart}
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#000000"
        className="mb-[30px] md:mb-[40px]"
      />

      {/* Date and Location */}
      {dateLocation && (
        <p className="text-[#000000] text-[18px] md:text-[24px] lg:text-[28px] 2xl:text-[32px] font-bold mb-[30px] md:mb-[40px]">
          {dateLocation}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-[16px] md:gap-[20px]">
        <a 
          href={primaryButtonLink}
          className="px-[24px] md:px-[32px] lg:px-[40px] py-[12px] md:py-[16px] text-[16px] md:text-[18px] lg:text-[20px] font-bold bg-white text-black border-1 border-black rounded-[8px] hover:bg-gray-100 transition-colors"
        >
          {primaryButtonText}
        </a>
        <a 
          href={secondaryButtonLink}
          className="px-[24px] md:px-[32px] lg:px-[40px] py-[12px] md:py-[16px] text-[16px] md:text-[18px] lg:text-[20px] font-bold bg-[#FEF991] text-black border-1 border-[#F6F068] rounded-[8px] hover:bg-[#FEE871] transition-colors"
        >
          {secondaryButtonText}
        </a>
      </div>
    </section>
  );
};

export default EventHero;

