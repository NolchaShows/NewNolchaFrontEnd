"use client"
import React from "react";

function Hero({ heading, paragraphs, image, socialLinks }) {

  return (
    <div className="lg:px-[40px] px-[16px] max-w-full mx-auto mt-10">
      <div className="flex flex-col mx-auto bg-[#EBE2D7] rounded-[16px] overflow-hidden">

        {/* Image Section */}
        <div className="w-full">
          <img
            src={image || "/api/placeholder/400/500"}
            alt="Hero image"
            className="w-full object-cover h-[700px] md:h-[800px] 2xl:h-[1100px]"
          />
        </div>

        {/* Content Section */}
        <div className="p-[20px] lg:p-[32px] flex flex-col">
          {/* Social Media Icons */}
          <div className="flex gap-[10px] items-center mb-[16px] lg:mb-[20px]">
            <a
              href={socialLinks?.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary flex items-center justify-center w-[36px] h-[36px] 2xl:w-[48px] 2xl:h-[48px] rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="2xl:w-[26px] 2xl:h-[26px]">
                <path d="M6.9375 5.001C6.93724 5.53143 6.72627 6.04004 6.35101 6.41492C5.97575 6.78981 5.46693 7.00027 4.9365 7C4.40607 6.99974 3.89746 6.78877 3.52258 6.41351C3.14769 6.03825 2.93724 5.52943 2.9375 4.999C2.93777 4.46857 3.14873 3.95996 3.52399 3.58508C3.89925 3.21019 4.40807 2.99974 4.9385 3C5.46893 3.00027 5.97754 3.21123 6.35242 3.58649C6.72731 3.96175 6.93777 4.47057 6.9375 5.001ZM6.9975 8.481H2.9975V21.001H6.9975V8.481ZM13.3175 8.481H9.3375V21.001H13.2775V14.431C13.2775 10.771 18.0475 10.431 18.0475 14.431V21.001H21.9975V13.071C21.9975 6.901 14.9375 7.131 13.2775 10.161L13.3175 8.481Z" fill="#000000" />
              </svg>
            </a>
            <a
              href={socialLinks?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary flex items-center justify-center w-[36px] h-[36px] 2xl:w-[48px] 2xl:h-[48px] rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="2xl:w-[26px] 2xl:h-[26px]">
                <path d="M12 8.75C11.138 8.75 10.3114 9.09241 9.7019 9.7019C9.09241 10.3114 8.75 11.138 8.75 12C8.75 12.862 9.09241 13.6886 9.7019 14.2981C10.3114 14.9076 11.138 15.25 12 15.25C12.862 15.25 13.6886 14.9076 14.2981 14.2981C14.9076 13.6886 15.25 12.862 15.25 12C15.25 11.138 14.9076 10.3114 14.2981 9.7019C13.6886 9.09241 12.862 8.75 12 8.75Z" fill="#000000" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6.77451 3.08177C10.2505 2.6967 13.7585 2.6967 17.2345 3.08177C19.1335 3.29377 20.6645 4.78877 20.8875 6.69477C21.2995 10.2194 21.2995 13.7801 20.8875 17.3048C20.6645 19.2108 19.1335 20.7058 17.2355 20.9188C13.7591 21.3039 10.2509 21.3039 6.77451 20.9188C4.87551 20.7058 3.34451 19.2108 3.12151 17.3058C2.7095 13.7808 2.7095 10.2198 3.12151 6.69477C3.34451 4.78877 4.87551 3.29377 6.77451 3.08177ZM17.0045 5.99977C16.7393 5.99977 16.4849 6.10513 16.2974 6.29267C16.1099 6.4802 16.0045 6.73456 16.0045 6.99977C16.0045 7.26499 16.1099 7.51934 16.2974 7.70688C16.4849 7.89441 16.7393 7.99977 17.0045 7.99977C17.2697 7.99977 17.5241 7.89441 17.7116 7.70688C17.8992 7.51934 18.0045 7.26499 18.0045 6.99977C18.0045 6.73456 17.8992 6.4802 17.7116 6.29267C17.5241 6.10513 17.2697 5.99977 17.0045 5.99977ZM7.25451 11.9998C7.25451 10.74 7.75496 9.53181 8.64576 8.64102C9.53655 7.75022 10.7447 7.24977 12.0045 7.24977C13.2643 7.24977 14.4725 7.75022 15.3633 8.64102C16.2541 9.53181 16.7545 10.74 16.7545 11.9998C16.7545 13.2596 16.2541 14.4677 15.3633 15.3585C14.4725 16.2493 13.2643 16.7498 12.0045 16.7498C10.7447 16.7498 9.53655 16.2493 8.64576 15.3585C7.75496 14.4677 7.25451 13.2596 7.25451 11.9998Z" fill="#000000" />
              </svg>
            </a>
            <a
              href={socialLinks?.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary flex items-center justify-center w-[36px] h-[36px] 2xl:w-[48px] 2xl:h-[48px] rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="2xl:w-[26px] 2xl:h-[26px]">
                <path d="M10.488 14.651L15.25 21H22.25L14.392 10.522L20.93 3H18.28L13.163 8.886L8.75 3H1.75L9.26 13.015L2.32 21H4.97L10.488 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z" fill="#000000" />
              </svg>
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-h3 font-bold leading-tight text-black mb-[20px] lg:mb-[24px]">
            {heading || "Default Heading Text Goes Here"}
          </h1>

          {/* Paragraphs */}
          <div className="space-y-[16px] lg:space-y-[20px]">
            {paragraphs && paragraphs.length > 0 && (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="para-s text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;