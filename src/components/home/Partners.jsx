"use client";
import React, { useState, useEffect } from "react";

const Partners = ({ title, description, partners, bg, logo }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic column calculation based on screen size and partner count
  const getOptimalColumns = () => {
    if (!partners || partners.length === 0) return 1;

    const partnerCount = partners.length;

    // Define breakpoints and max columns for each
    if (windowWidth >= 1280) {
      // xl and above
      return Math.min(Math.max(Math.ceil(partnerCount / 3), 3), 7);
    } else if (windowWidth >= 1024) {
      // lg to xl
      return Math.min(Math.max(Math.ceil(partnerCount / 4), 3), 5);
    } else if (windowWidth >= 768) {
      // md to lg
      return Math.min(Math.max(Math.ceil(partnerCount / 5), 2), 4);
    } else {
      // sm and below
      return Math.min(Math.max(Math.ceil(partnerCount / 7), 2), 3);
    }
  };

  const columnsCount = getOptimalColumns();

  const PartnerCard = ({ partner }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Determine current background and image based on hover state
    const isOriginallyBlack = partner.backgroundColor === "bg-black";
    const currentBackgroundColor = isHovered
      ? isOriginallyBlack
        ? "#E7F0D3"
        : "#000000"
      : isOriginallyBlack
      ? "#000000"
      : "#E7F0D3";

    const currentImage = isHovered
      ? partner.imageBlack
      : isOriginallyBlack
      ? partner.imageWhite
      : partner.imageBlack;

    return (
      <div
        className="flex items-center justify-center w-full aspect-square min-w-[80px] min-h-[80px] sm:min-w-[100px] sm:min-h-[100px] md:min-w-[120px] md:min-h-[120px] lg:min-w-[140px] lg:min-h-[140px] xl:min-w-[145px] xl:min-h-[145px] 2xl:min-w-[180px] 2xl:min-h-[180px] rounded-2xl xl:rounded-xl lg:rounded-lg md:rounded-lg sm:rounded-lg backdrop-blur-sm shadow-[0_0.8px_32px_0_rgba(227,222,255,0.05)_inset,0_3.19px_14.37px_0_rgba(154,146,210,0.05)_inset,0_78.26px_78.26px_-38.33px_rgba(202,172,255,0.05)_inset,0_-65.48px_54.3px_-51.11px_rgba(96,68,144,0.05)_inset,0_5.59px_8.78px_-3.25px_rgba(255,255,255,0.07)_inset,0_32px_40px_-2px_rgba(255,255,255,0.02)_inset,0_0.5px_10px_-6px_rgba(0,0,0,0.10),0_20px_26px_-5px_rgba(0,0,0,0.40)] bg-[#1A1A1A] cursor-pointer"
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
    if (!partners || partners.length === 0) return [];

    return partners.filter((_, index) => index % columnsCount === columnIndex);
  };

  // Get responsive gap and container classes
  const getResponsiveClasses = () => {
    if (windowWidth >= 1280) {
      // xl
      return {
        gap: "gap-3",
        containerPadding: "px-[177px] 2xl:px-32 xl:px-16",
        maxColumnWidth: "max-w-[145px]",
        minHeight: "min-h-[400px]",
      };
    } else if (windowWidth >= 1024) {
      // lg
      return {
        gap: "gap-3",
        containerPadding: "lg:px-10",
        maxColumnWidth: "max-w-[180px]",
        minHeight: "min-h-[350px]",
      };
    } else if (windowWidth >= 768) {
      // md
      return {
        gap: "gap-2.5",
        containerPadding: "md:px-6",
        maxColumnWidth: "max-w-[200px]",
        minHeight: "min-h-[300px]",
      };
    } else {
      // sm and below
      return {
        gap: "gap-1.5 sm:gap-2",
        containerPadding: "sm:px-4",
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
      } py-[100px] xl:py-20 lg:py-16 md:py-12 sm:py-10 ${
        responsiveClasses.containerPadding
      } overflow-hidden`}
    >
      <div className="max-w-[1076px] mx-auto flex flex-col items-center gap-[50px] xl:gap-10 lg:gap-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2.5">
          {title ? (
            <h2
              className="text-black text-center font-bold text-[52px] xl:text-[42px] lg:text-[36px] md:text-[32px] sm:text-[28px] leading-[120%] -tracking-[1.56px] xl:-tracking-[1.26px] lg:-tracking-[1.08px] md:-tracking-[0.96px] sm:-tracking-[0.84px] capitalize"
              style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
            >
              {title}
            </h2>
          ) : (
            <div >
              <img src={logo} alt="LOGO" className="h-20 2xl:h-30"/>
            </div>
          )}
          {description && (
            <p
              className="text-black text-center font-normal text-xl 2xl:text-2xl xl:text-lg lg:text-base md:text-base sm:text-sm leading-[140%] -tracking-[0.6px] 2xl:-tracking-[0.72px] xl:-tracking-[0.54px] lg:-tracking-[0.48px]"
              style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Dynamic Partners Grid */}
        <div className="w-full">
          <div
            className={`flex justify-center items-start ${responsiveClasses.gap} 2xl:gap-15 w-full ${responsiveClasses.minHeight}`}
          >
            {Array.from({ length: columnsCount }, (_, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex flex-col items-center ${
                  responsiveClasses.gap
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
