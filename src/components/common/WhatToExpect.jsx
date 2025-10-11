import React from 'react';
import StyledHeading from './StyledHeading';

const WhatToExpect = ({ 
  firstHeadingPart, 
  secondHeadingPart,
  descriptionText,
  decorativeImage,
  expectItems = [],
  quoteBox
}) => {
  return (
    <div className="py-[40px] md:py-[40px] lg:pt-[50px] lg:pb-[150px] px-[16px] md:px-[40px] max-w-none w-full mx-auto">
      {/* Top Section: Heading, Description, and Image */}
      <div className="flex flex-col lg:flex-row gap-[30px] md:gap-[40px] mb-[20px]">
        <div className="flex-1">
          <StyledHeading 
            firstPart={firstHeadingPart}
            secondPart={secondHeadingPart}
            strokeColor="#000000"
            fillColor="#FEF991"
            textColor="#000000"
            className="mb-[20px] md:mb-[30px]"
          />
          
          {descriptionText && (
            <p className="text-[#000000] text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] leading-relaxed">
              {descriptionText}
            </p>
          )}
        </div>
        
        {decorativeImage && (
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <img 
              src={decorativeImage} 
              alt="Decorative" 
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] object-contain"
            />
          </div>
        )}
      </div>

      {/* What to Expect Section */}
      <div className="flex flex-col lg:flex-row gap-[30px] md:gap-[40px] lg:gap-[60px]">
        {/* Left Side: Checklist */}
        <div className="flex-1">
          <h2 className="text-[#000000] text-[24px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-bold mb-[24px] md:mb-[32px]">
            What to Expect
          </h2>
          
          <div className="space-y-[20px] md:space-y-[24px]">
            {expectItems.map((item, index) => (
              <div key={index} className="flex gap-[16px]">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] border-2 border-black rounded-[4px]"></div>
                </div>
                <div>
                  <h3 className="text-[#000000] text-[18px] md:text-[20px] lg:text-[22px] 2xl:text-[24px] font-bold mb-[8px]">
                    {item.title}
                  </h3>
                  <p className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quote Box */}
        {quoteBox && (
          <div className="flex-1">
            <div className="bg-[#FEF991] border-1 border-black rounded-[16px] p-[24px] md:p-[32px] lg:p-[50px] h-full flex flex-col justify-center">
              {quoteBox.logo && (
                <img 
                  src={quoteBox.logo} 
                  alt="Forbes" 
                  className="h-auto w-[200px] mb-[20px] md:mb-[24px]"
                />
              )}
              <p className="text-[#000000] text-[18px] md:text-[20px] lg:text-[35px] 2xl:text-[35px] font-bold leading-tight">
                {quoteBox.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatToExpect;

