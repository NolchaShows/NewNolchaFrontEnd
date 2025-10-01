"use client";
import * as React from "react";

function Header({ headerData, loading }) {
  // Default values
  const defaultTitle = "We Partner With Innovative Brands, Organizations,";
  const defaultDescription = "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.\n\nWe harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.";
  const defaultImage = "/services/rotated.png";

  // Use data from props if available, otherwise use defaults
  const title = headerData?.title || defaultTitle;
  const description = headerData?.description || defaultDescription;
  const image = headerData?.image || defaultImage;

  // Format description to handle line breaks
  const formattedDescription = description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < description.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row overflow-hidden justify-center items-center lg:items-stretch py-12 md:py-16 lg:py-24 text-black bg-[#EBE2D7] min-h-screen lg:min-h-0">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-8 lg:pl-12 xl:pl-16 2xl:pl-20 lg:pr-8 xl:pr-12 2xl:pr-16 order-2 lg:order-1">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="w-full h-64 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden justify-center items-center lg:items-stretch py-12 md:py-16 lg:py-24 text-black bg-[#EBE2D7] min-h-screen lg:min-h-0"
      data-name="Header"
    >
      {/* Text Section - 50% width on large screens */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-8 lg:pl-12 xl:pl-16 2xl:pl-20 lg:pr-8 xl:pr-12 2xl:pr-16 order-2 lg:order-1">
        <div className="max-w-full">
          <div
            className="text-3xl md:text-[38px] lg:text-[44px] xl:text-[52px] 2xl:text-[80px] font-medium tracking-tighter leading-tight lg:leading-[1.1] xl:leading-[1.1] 2xl:leading-[1.1] mb-6 md:mb-8"
            data-name="Dynamic title from Strapi"
          >
            {title}
          </div>
          <div className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl tracking-tight leading-relaxed lg:leading-7 xl:leading-8 2xl:leading-9 max-w-none">
            <div data-name="Dynamic description from Strapi">
              {formattedDescription}
            </div>
          </div>
        </div>
      </div>

      {/* Image Section - 50% width on large screens */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 order-1 lg:order-2 mb-8 lg:mb-0">
        <img
          src={image}
          className="object-contain w-full h-auto aspect-[1.14]"
          alt={title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>
    </div>
  );
}

export default Header;