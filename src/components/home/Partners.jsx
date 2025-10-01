"use client";
import React, { useState, useEffect } from "react";

const Partners = ({ partnerData, loading, title, description, partners, bg, logo }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use dynamic data from Strapi if available, otherwise fall back to props
  const partnersTitle = partnerData?.title || title || "Partners That Trailblaze With Us";
  const partnersDescription = partnerData?.description || description || "From cutting-edge tech startups and rapidly expanding businesses to impactful charities";
  
  // Map Strapi partner data to expected format
  const mapStrapiPartners = (strapiPartners) => {
    if (!strapiPartners || !Array.isArray(strapiPartners)) return [];
    
    return strapiPartners.map((partner, index) => {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      
      // Get image URLs from Strapi
      let primaryImage = partner.primary?.url;
      let secondaryImage = partner.secondary?.url;
      
      // Add base URL if needed
      if (primaryImage && !primaryImage.startsWith('http')) {
        primaryImage = `${baseUrl}${primaryImage}`;
      }
      if (secondaryImage && !secondaryImage.startsWith('http')) {
        secondaryImage = `${baseUrl}${secondaryImage}`;
      }
      
      // Map color field to backgroundColor for compatibility with existing logic
      const bgColor = partner.color === 'black' ? 'bg-black' : 'bg-[#E7F0D3]';
      
      return {
        id: partner.id || index + 1,
        imageWhite: primaryImage || "/home/partners/1w.png", // Default/non-hover image (primary)
        imageBlack: secondaryImage || primaryImage || "/home/partners/1b.png", // Hover image (secondary, fallback to primary)
        altText: partner.alt_text || `Partner ${index + 1}`,
        backgroundColor: bgColor,
        color: partner.color || 'black' // Store original color value
      };
    });
  };
  
  const partnersList = partnerData?.partners ? mapStrapiPartners(partnerData.partners) : (partners || []);

  // Loading state
  if (loading) {
    return (
      <div className={`${bg || "bg-[#0A0A0F]"} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loading...</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-gray-700 animate-pulse h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getOptimalColumns = () => {
    if (!partnersList || partnersList.length === 0) return 1;

    const partnerCount = partnersList.length;

    if (windowWidth >= 1280) {
      return Math.min(Math.max(Math.ceil(partnerCount / 3), 3), 7);
    } else if (windowWidth >= 1024) {
      return Math.min(Math.max(Math.ceil(partnerCount / 4), 3), 5);
    } else if (windowWidth >= 768) {
      return Math.min(Math.max(Math.ceil(partnerCount / 5), 2), 4);
    } else {
      return Math.min(Math.max(Math.ceil(partnerCount / 5), 2), 4);
    }
  };

  const columnsCount = getOptimalColumns();

  const PartnerCard = ({ partner }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Use the color field from Strapi to determine default and hover backgrounds
    const isDefaultBlack = partner.color === 'black' || partner.backgroundColor === "bg-black";
    
    const currentBackgroundColor = isHovered
      ? isDefaultBlack
        ? "#E7F0D3" // If default is black, hover becomes light green/cream
        : "#000000" // If default is light green/cream, hover becomes black
      : isDefaultBlack
      ? "#000000" // Default black background
      : "#E7F0D3"; // Default light green/cream background
    
    // Simple hover logic: show primary image normally, secondary on hover
    const currentImage = currentBackgroundColor === "#E7F0D3" ? partner.imageBlack : partner.imageWhite;

    return (
      <div
        className="flex items-center justify-center w-full aspect-square min-w-[80px] min-h-[80px] sm:min-w-[100px] sm:min-h-[100px] md:min-w-[120px] md:min-h-[120px] lg:min-w-[140px] lg:min-h-[140px] xl:min-w-[145px] xl:min-h-[145px] 2xl:min-w-[180px] 2xl:min-h-[180px] rounded-[24px] xl:rounded-[16px] lg:rounded-lg md:rounded-lg sm:rounded-lg backdrop-blur-sm shadow-[0_0.8px_32px_0_rgba(227,222,255,0.05)_inset,0_3.19px_14.37px_0_rgba(154,146,210,0.05)_inset,0_78.26px_78.26px_-38.33px_rgba(202,172,255,0.05)_inset,0_-65.48px_54.3px_-51.11px_rgba(96,68,144,0.05)_inset,0_5.59px_8.78px_-3.25px_rgba(255,255,255,0.07)_inset,0_32px_40px_-2px_rgba(255,255,255,0.02)_inset,0_0.5px_10px_-6px_rgba(0,0,0,0.10),0_20px_26px_-5px_rgba(0,0,0,0.40)] bg-[#1A1A1A] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex items-center justify-center w-full h-full rounded-2xl xl:rounded-xl lg:rounded-lg md:rounded-lg sm:rounded-lg relative transition-all duration-300 ease-in-out p-2 sm:p-3 md:p-4"
          style={{ backgroundColor: currentBackgroundColor }}
        >
          <img
            src={currentImage}
            alt={partner.altText}
            className="w-full h-auto max-w-[75%] sm:max-w-[80%] 2xl:max-w-[90%] object-contain transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    );
  };

  // Distribute partners evenly across columns
  const getColumnPartners = (columnIndex) => {
    if (!partnersList || partnersList.length === 0) return [];

    return partnersList.filter((_, index) => index % columnsCount === columnIndex);
  };

  // Get responsive gap and container classes
  const getResponsiveClasses = () => {
    // Use consistent responsive classes for all breakpoints to ensure gaps always exist
    const baseClasses = {
      columnGap: "gap-2 sm:gap-3 md:gap-4 xl:gap-6 2xl:gap-12", // Always has gap on all screens
      cardGap: "gap-1.5 sm:gap-2 md:gap-2.5", // Cards gap
    };

    if (windowWidth >= 1800) {
      return {
        ...baseClasses,
        containerPadding: "px-[177px] 2xl:px-32 xl:px-16",
        maxColumnWidth: "max-w-[145px]",
        minHeight: "min-h-[400px]",
      };
    } else if (windowWidth >= 1280) {
      return {
        ...baseClasses,
        containerPadding: "px-[177px] 2xl:px-32 xl:px-16",
        maxColumnWidth: "max-w-[145px]",
        minHeight: "min-h-[400px]",
      };
    } else if (windowWidth >= 1024) {
      return {
        ...baseClasses,
        containerPadding: "lg:px-10",
        maxColumnWidth: "max-w-[180px]",
        minHeight: "min-h-[350px]",
      };
    } else if (windowWidth >= 768) {
      return {
        ...baseClasses,
        containerPadding: "md:px-6",
        maxColumnWidth: "max-w-[200px]",
        minHeight: "min-h-[300px]",
      };
    } else {
      return {
        ...baseClasses,
        containerPadding: "px-[50px] sm:px-[50px]",
        maxColumnWidth: "max-w-[30%]",
        minHeight: "min-h-[250px]",
      };
    }
  };

  const responsiveClasses = getResponsiveClasses();

  // Generate staggered margin tops for zigzag effect
  const getColumnMarginTop = (columnIndex) => {
    const patterns = {
      2: ["mt-2", "mt-6"],
      3: ["mt-2", "mt-6", "mt-2"],
      4: ["mt-2", "mt-6", "mt-2", "mt-6"],
      5: ["mt-2.5", "mt-8", "mt-2.5", "mt-8", "mt-2.5"],
      6: ["mt-2.5", "mt-10", "mt-2.5", "mt-10", "mt-2.5", "mt-10"],
      7: ["mt-2.5", "mt-12", "mt-2.5", "mt-12", "mt-2.5", "mt-12", "mt-2.5"],
    };

    const pattern = patterns[columnsCount] || patterns[3];
    return pattern[columnIndex % pattern.length];
  };

  // Don't render until window width is determined (prevents hydration mismatch)
  if (windowWidth === 0) {
    return <div className="w-full h-96"></div>; // Placeholder
  }

  return (
    <section
      className={`w-full ${
        bg ? bg : "bg-[var(--surface-color2)]"
      } py-[60px] xl:py-20 lg:py-16 md:py-12 sm:py-10 ${
        responsiveClasses.containerPadding
      } overflow-hidden`}
    >
      <div className="max-w-[1076px] mx-auto flex flex-col items-center gap-[50px] xl:gap-10 lg:gap-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2.5">
          {partnersTitle ? (
            <h2 className="uppercase text-[32px] lg:text-[52px] text-black font-bold text-center leading-[120%] -tracking-[1.56px]">
              {partnersTitle}
            </h2>
          ) : (
            <div>
              <img src={logo} alt="LOGO" className="h-20 2xl:h-30" />
            </div>
          )}
          {partnersDescription && (
            <p className="text-black font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-center font-normal text-[16px] 2xl:text-[28px] lg:text-[20px] leading-[140%] -tracking-[0.6px] 2xl:-tracking-[0.72px] xl:-tracking-[0.54px] lg:-tracking-[0.48px]">
              {partnersDescription}
            </p>
          )}
        </div>

        {/* Dynamic Partners Grid */}
        <div className="w-full">
          <div
            className={`flex justify-center items-start ${responsiveClasses.columnGap} w-full ${responsiveClasses.minHeight}`}
          >
            {Array.from({ length: columnsCount }, (_, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex flex-col items-center ${
                  responsiveClasses.cardGap
                } flex-1 ${
                  responsiveClasses.maxColumnWidth
                } ${getColumnMarginTop(columnIndex)}`}
              >
                {getColumnPartners(columnIndex).map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
