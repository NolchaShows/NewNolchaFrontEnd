import React from 'react';
import StyledHeading from './StyledHeading';
import ImageCarousel from '../experiences/ImageCarousel';
import TweetCarousel from './TweetCarousel';

const CommunityTrust = ({ 
  firstHeadingPart,
  secondHeadingPart,
  description,
  socialPosts = [],
  formSection,
  backgroundColor = "#FEF991"
}) => {
  return (
    <div className="pt-[40px] md:pt-[60px] lg:pt-[80px] px-[16px] md:px-[40px] max-w-none w-full mx-auto">
      {/* Top Section - Yellow Background with Social Cards */}
      <div 
        className="py-[40px] md:py-[70px] lg:pt-[70px] px-[16px] md:px-[40px] max-w-none w-full mx-auto rounded-t-[40px] overflow-hidden"
        style={{ backgroundColor: backgroundColor }}
      >
        <StyledHeading 
          firstPart={firstHeadingPart}
          secondPart={secondHeadingPart}
          strokeColor="#000000"
          fillColor="transparent"
          textColor="#000000"
          className="mb-[20px] md:mb-[30px]"
        />
        
        {description && (
          <p className="text-[#000000] text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] leading-relaxed mb-[40px] md:mb-[30px] max-w-[900px]">
            {description}
          </p>
        )}

        {/* Social Media Cards using ImageCarousel */}
        {socialPosts.length > 0 && (
          <TweetCarousel 
            posts={socialPosts}
            carousalData={null}
            padding=""
            title=""
          />
        )}
      </div>

      {/* Bottom Section - Contact Form with Sponsorship Details */}
      {formSection && (
        <div 
          className="relative py-[60px] md:py-[80px] lg:py-[100px] px-[16px] md:px-[40px] bg-cover bg-center rounded-b-[40px] overflow-hidden"
          style={{ 
            backgroundImage: `url(${formSection.backgroundImage})`,
          }}
        >
          {/* Dark Overlay */}
          {/* <div className="absolute inset-0 bg-black/70"></div> */}
          
          <div className="relative z-10 max-w-[900px] mx-auto p-[60px] bg-[#1a1a1acc] rounded-[18px] backdrop-blur-[4px] 
            shadow-[0_0.8px_32px_0_rgba(227,222,255,0.05)_inset,0_3.19px_14.37px_0_rgba(154,146,210,0.05)_inset,0_78.26px_78.26px_-38.33px_rgba(202,172,255,0.05)_inset,0_-65.48px_54.3px_-51.11px_rgba(96,68,144,0.05)_inset,0_5.59px_8.78px_-3.25px_rgba(255,255,255,0.07)_inset,0_32px_40px_-2px_rgba(255,255,255,0.02)_inset,0_0.5px_10px_-6px_rgba(0,0,0,0.10),0_20px_26px_-5px_rgba(0,0,0,0.40)] 
            p-6 rounded-2xl">
            {/* Form Heading */}
            <h2 className="text-white text-[24px] md:text-[32px] lg:text-[40px] 2xl:text-[48px] font-bold text-center mb-[40px] md:mb-[50px] leading-tight">
              {formSection.heading}
            </h2>

            {/* Form Inputs */}
            <div className="space-y-[16px] mb-[40px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                <input 
                  type="text"
                  placeholder="FULL NAME"
                  className="px-[20px] py-[16px] rounded-[8px] bg-[#D9D9D9] text-black placeholder-black/70 font-medium text-[14px] md:text-[16px]"
                />
                <input 
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="px-[20px] py-[16px] rounded-[8px] bg-[#D9D9D9] text-black placeholder-black/70 font-medium text-[14px] md:text-[16px]"
                />
              </div>
              <textarea 
                placeholder="MESSAGE"
                rows="5"
                className="w-full px-[20px] py-[16px] rounded-[8px] bg-[#D9D9D9] text-black placeholder-black/70 font-medium text-[14px] md:text-[16px] resize-none"
              ></textarea>
              <button 
                type="submit"
                className="w-full py-[16px] rounded-[8px] bg-[#FEF991] text-black font-bold text-[16px] md:text-[18px] hover:bg-[#FEE871] transition-colors"
              >
                SUMMIT
              </button>
            </div>

            {/* Sponsorship Info */}
            {formSection.sponsorshipInfo && (
              <div className="text-center mb-[40px]">
                <p className="text-white text-[16px] md:text-[18px] mb-[8px]">
                  {formSection.sponsorshipInfo.title}
                </p>
                <a 
                  href={formSection.sponsorshipInfo.link}
                  className="text-white text-[14px] md:text-[16px] underline hover:opacity-80"
                >
                  {formSection.sponsorshipInfo.linkText}
                </a>
              </div>
            )}

            {/* Contact Details */}
            {formSection.contacts && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] text-white">
                {formSection.contacts.map((contact, index) => (
                  <div key={index}>
                    <h3 className="text-[18px] md:text-[20px] font-bold mb-[12px]">
                      {contact.name}
                    </h3>
                    <p className="text-[14px] md:text-[16px] mb-[4px]">
                      <span className="font-medium">Email:</span> {contact.email}
                    </p>
                    <p className="text-[14px] md:text-[16px]">
                      <span className="font-medium">Telegram:</span> {contact.telegram}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTrust;
