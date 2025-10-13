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
    <div className="pb-[52px] lg:pb-[150px] px-[22px] lg:px-[40px] max-w-none w-full mx-auto">
      {/* Top Section: Heading, Description, and Image */}
      <div className="flex flex-col lg:flex-row gap-[30px]">
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
            <p className="text-[#000000] text-[18px] lg:text-[25px] leading-[37.5px] mb-[25px] lg:mb-[50px] lg:tracking-[1px]">
              {descriptionText}
            </p>
          )}
        </div>
        
        {decorativeImage && (
          <div className="flex-shrink-0 flex justify-center lg:justify-end hidden lg:block">
            <img 
              src={decorativeImage} 
              alt="Decorative" 
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] object-contain"
            />
          </div>
        )}
      </div>

      {/* What to Expect Section */}
      <div className="flex flex-col lg:flex-row gap-[26pxpx] lg:gap-[46px]">
        {/* Left Side: Checklist */}
        <div className="flex-1">
          <h2 className="text-[30px] lg:text-[35px] font-bold text-black mb-[15px] lg:mb-[20px]">
            What to Expect
          </h2>
          
          <div className='pb-[10px] lg:pb-0'>
            {expectItems.map((item, index) => (
              <div key={index} className="flex items-center gap-[21px] lg:gap-[28px] mb-[15px] lg:mb-[20px]">
                <div className="flex-shrink-0">
                  <div className="w-[13px] h-[13px] lg:w-[20px] lg:h-[20px] border-1 border-black rounded-[4px]"></div>
                </div>
                <div>
                  <h3 className="text-[20px] lg:text-[26px] font-bold text-black">
                    {item.title}
                  </h3>
                  <p className="text-[16px] lg:text-[20px]">
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
            <div className="bg-[#FEF991] border-1 border-black rounded-[20px] px-[13px] py-[26px] lg:p-[43px] h-full flex flex-col justify-center">
              {quoteBox.logo && (
                <img 
                  src={quoteBox.logo} 
                  alt="Forbes" 
                  className="h-auto w-[105px] lg:w-[205px] mb-[20px] lg:mb-[40px]"
                />
              )}
              <p className="text-[18px] lg:text-[35px] font-bold text-black leading-tight">
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

