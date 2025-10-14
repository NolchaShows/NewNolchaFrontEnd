import React from 'react';
import StyledHeading from './StyledHeading';

const AgendaSection = ({
  mainHeading,
  dayAgenda,
  eveningHighlight,
  buttonText = "Partner With Us",
  buttonLink = "#"
}) => {
  return (
    <div className="pt-[52px] pb-[70px] lg:py-[150px] px-[22px] lg:px-12 max-w-none w-full mx-auto bg-[#F4F4F4]">
      {/* Main Heading */}
      {mainHeading && (
        <h1 className="text-[40px] lg:text-[87px] font-bold text-black mb-[26px] lg:mb-[62px] leading-tight">
          {mainHeading}
        </h1>
      )}

      {/* Day Agenda Section */}
      {dayAgenda && (
        <div className="mb-[70px] lg:mb-[100px]">
          <StyledHeading
            firstPart={dayAgenda.firstPart}
            secondPart={dayAgenda.secondPart}
            strokeColor="#000000"
            fillColor="#FEF991"
            textColor="#000000"
            className="mb-[22px] lg:mb-[40px]"
          />

          <div className="bg-[#1A1A1A] rounded-[13px] lg:rounded-[17px] py-[40px] lg:py-[60px] px-[20px] lg:px-[35px] flex flex-row lg:gap-[30px]">
            {/* Left Side - Schedule Items */}
            <div className="flex-1 space-y-[16px] lg:space-y-[38px]">
              {dayAgenda.items.map((item, index) => (
                <div key={index} className="flex gap-[11px] lg:gap-[20px]">
                  <div className="flex-shrink-0 text-white text-[12px] font-bold lg:text-[20px] w-[50px] lg:w-[90px]">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-[11px] lg:gap-[20px] mb-[9px] lg:mb-[16px]">
                      <div className="w-[8px] lg:w-[14px] h-[8px] lg:h-[14px] rounded-full bg-white mt-1 lg:mt-2 flex-shrink-0"></div>
                      <h3 className="text-white text-[17px] lg:text-[30px] font-bold leading-none">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-[14px] lg:text-[17px] leading-normal lg:leading-[24px] ml-[18px] lg:ml-[34px] mb-[9px] lg:mb-[16px]">
                      {item.description}
                    </p>
                    {item.stats && (
                      <p className="text-[#FEF991] text-[14px] lg:text-[16px] ml-[18px] lg:ml-[34px] leading-none">
                        {item.stats}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Images */}
            {dayAgenda.images && dayAgenda.images.length > 0 && (
              <div className="lg:w-[400px] xl:w-[450px] 2xl:w-[500px] space-y-[16px] lg:block hidden">
                {dayAgenda.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Day event ${index + 1}`}
                    className="w-full h-auto object-cover rounded-[12px]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Evening Highlight Section */}
      {eveningHighlight && (
        <div className="mb-[22px] lg:mb-[40px]">
          <StyledHeading
            firstPart={eveningHighlight.firstPart}
            secondPart={eveningHighlight.secondPart}
            strokeColor="#000000"
            fillColor="#FEF991"
            textColor="#000000"
            className="mb-[22px] lg:mb-[40px]"
          />

          <div className="bg-[#1A1A1A] rounded-[13px] lg:rounded-[17px] py-[40px] lg:py-[60px] px-[20px] lg:px-[35px] flex flex-row lg:gap-[30px]">
            {/* Left Side - Highlight Items */}
            <div className="flex-1 space-y-[15px] lg:space-y-[35px]">
              {eveningHighlight.items.map((item, index) => (
                <div key={index} className="flex gap-[11px] lg:gap-[20px]">
                  <div className="w-[8px] lg:w-[14px] h-[8px] lg:h-[14px] rounded-full bg-white mt-1 lg:mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white text-[17px] lg:text-[30px] font-bold leading-none mb-[9px] lg:mb-[16px]">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-[14px]lg:text-[17px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              {eveningHighlight.footer && (
                <p className="text-gray-300 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed mt-[24px]">
                  {eveningHighlight.footer}
                </p>
              )}
            </div>

            {/* Right Side - Image */}
            {eveningHighlight.image && (
              <div className="lg:w-[400px] xl:w-[450px] 2xl:w-[500px]">
                <img
                  src={eveningHighlight.image}
                  alt="Evening highlight"
                  className="w-full h-full object-cover rounded-[12px]"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Partner Button */}
      {buttonText && (
        <div className="flex justify-center">
          <a
            href={buttonLink}
            className="px-[24px] py-[9px] lg:py-[16px] text-[14px] lg:text-[20px] font-bold bg-[#FEF991] text-black rounded-[4px] lg:rounded-[6px] border-1 border-[#F6F068] hover:bg-[#FEE871] transition-colors"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
};

export default AgendaSection;

