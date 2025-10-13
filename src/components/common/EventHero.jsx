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
    <section className="w-full py-[52px] lg:pt-[100px] lg:pb-[150px] px-[22px] lg:px-[102px] bg-[#F4F4F4]">
      {/* Logo */}
      {logoImage && (
        <div className="mb-[18px] lg:mb-[20px]">
          <img 
            src={logoImage} 
            alt="Event Logo" 
            className="h-[80px] lg:h-[152px] w-auto"
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
        className="mb-[10px] lg:mb-[40px]"
      />

      {/* Date and Location */}
      {dateLocation && (
        <p className="text-[#000000] text-[18px] lg:text-[40px] font-bold mb-[21px] md:mb-[60px]">
          {dateLocation}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-[5px] lg:gap-[10px]">
        <a 
          href={primaryButtonLink}
          className="text-[16px] lg:text-[25px] font-bold px-4 lg:px-10 py-2 lg:py-4 bg-white text-black border-1 border-black rounded-[6px] hover:bg-gray-100 transition-colors"
        >
          {primaryButtonText}
        </a>
        <a 
          href={secondaryButtonLink}
          className="text-[16px] lg:text-[25px] font-bold px-4 lg:px-10 py-2 lg:py-4 bg-[#FEF991] text-black border-1 border-[#F6F068] rounded-[6px] hover:bg-[#FEE871] transition-colors"
        >
          {secondaryButtonText}
        </a>
      </div>
    </section>
  );
};

export default EventHero;

