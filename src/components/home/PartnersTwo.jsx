"use client";
import React, { useState, useEffect } from "react";

const PartnersTwo = ({ partnerData, loading, title, description, partners, bg, logo }) => {
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
            const bgColor = partner.color === 'black' ? 'bg-black' : 'bg-[#FBF499]';

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
            return Math.min(Math.max(Math.ceil(partnerCount / 4), 2), 3);
        } else {
            return Math.min(Math.max(Math.ceil(partnerCount / 4), 2), 3);
        }
    };

    const columnsCount = getOptimalColumns();

    const PartnerCard = ({ partner }) => {
        const [isHovered, setIsHovered] = React.useState(false);

        // Use the color field from Strapi to determine default and hover backgrounds
        const isDefaultBlack = partner.color === 'black' || partner.backgroundColor === "bg-black";

        const currentBackgroundColor = isHovered
            ? isDefaultBlack
                ? "#FBF499" // If default is black, hover becomes light yellow/green
                : "#222024" // If default is light yellow/green, hover becomes dark gray
            : isDefaultBlack
                ? "#222024" // Default dark gray background
                : "#FBF499"; // Default light yellow/green background

        // Simple hover logic: show primary image normally, secondary on hover
        const currentImage = currentBackgroundColor === "#FBF499" ? partner.imageBlack : partner.imageWhite;

        return (
            <div
                className="flex items-center justify-center w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[167px] lg:h-[170px] rounded-[12px] sm:rounded-[16px] lg:rounded-[24px] backdrop-blur-sm shadow-[0_0.8px_32px_0_rgba(227,222,255,0.05)_inset,0_3.19px_14.37px_0_rgba(154,146,210,0.05)_inset,0_78.26px_78.26px_-38.33px_rgba(202,172,255,0.05)_inset,0_-65.48px_54.3px_-51.11px_rgba(96,68,144,0.05)_inset,0_5.59px_8.78px_-3.25px_rgba(255,255,255,0.07)_inset,0_32px_40px_-2px_rgba(255,255,255,0.02)_inset,0_0.5px_10px_-6px_rgba(0,0,0,0.10),0_20px_26px_-5px_rgba(0,0,0,0.40)] bg-[#1A1A1A] cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="flex items-center justify-center w-full h-full rounded-[12px] sm:rounded-[16px] lg:rounded-[24px] relative transition-all duration-300 ease-in-out p-2 sm:p-3 md:p-4"
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
        // Responsive gap classes - smaller on mobile, larger on desktop
        const getGapClasses = () => {
            if (windowWidth >= 1024) {
                return {
                    columnGap: "gap-[5px]", // Desktop horizontal gap
                    cardGap: "gap-[7px]", // Desktop vertical gap
                };
            } else {
                return {
                    columnGap: "gap-[3px]", // Mobile horizontal gap
                    cardGap: "gap-[4px]", // Mobile vertical gap
                };
            }
        };

        const gapClasses = getGapClasses();

        if (windowWidth >= 1800) {
            return {
                ...gapClasses,
                containerPadding: "px-[177px] 2xl:px-32 xl:px-16",
                maxColumnWidth: "max-w-[145px]",
                minHeight: "min-h-[400px]",
            };
        } else if (windowWidth >= 1280) {
            return {
                ...gapClasses,
                containerPadding: "px-[177px] 2xl:px-32 xl:px-16",
                maxColumnWidth: "max-w-[145px]",
                minHeight: "min-h-[400px]",
            };
        } else if (windowWidth >= 1024) {
            return {
                ...gapClasses,
                containerPadding: "lg:px-10",
                maxColumnWidth: "max-w-[180px]",
                minHeight: "min-h-[350px]",
            };
        } else if (windowWidth >= 768) {
            return {
                ...gapClasses,
                containerPadding: "md:px-6",
                maxColumnWidth: "max-w-[200px]",
                minHeight: "min-h-[300px]",
            };
        } else {
            return {
                ...gapClasses,
                containerPadding: "px-[12px] sm:px-[22px]",
                maxColumnWidth: "",
                minHeight: "min-h-[200px]",
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
            className={`w-full py-[50px] sm:py-[70px] lg:py-[150px] bg-[#FFFFFF] ${
                responsiveClasses.containerPadding
              } overflow-hidden`}
        >
            <div>
                {/* Header Section - Overlapping the border */}
                <div className="relative z-10">
                    <h2 className="text-[40px] lg:text-[48px] text-black font-bold text-center leading-[120%] -tracking-[1.56px] px-8">
                        {partnersTitle}
                    </h2>
                </div>

                {/* Container with Bracket Borders */}
                <div className="relative bg-white px-[16px] py-[30px] sm:px-[30px] sm:py-[40px] lg:px-[60px] lg:py-[70px] mt-0 lg:mt-[-28px]">
                    {/* Left Bracket Border SVG - Hidden on mobile */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 h-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 481 736"
                            fill="none"
                            className="w-full h-full"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M480.5 734.707H16.5C7.66346 734.707 0.5 727.544 0.5 718.707V16.707C0.5 7.87048 7.65409 0.707031 16.4906 0.707031C102.37 0.707031 235.069 0.707031 314.5 0.707031"
                                stroke="url(#paint0_linear_left)"
                                strokeOpacity="0.5"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="paint0_linear_left" x1="0.499985" y1="367.707" x2="480.5" y2="367.707" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0F0F0F" />
                                    <stop offset="1" stopColor="#0F0F0F" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Right Bracket Border SVG - Hidden on mobile */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 h-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 481 736"
                            fill="none"
                            className="w-full h-full"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0.5 734.707H464.5C473.337 734.707 480.5 727.544 480.5 718.707V16.707C480.5 7.87048 473.337 0.707031 464.5 0.707031H154.5"
                                stroke="url(#paint0_linear_right)"
                                strokeOpacity="0.5"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="paint0_linear_right" x1="480.5" y1="367.707" x2="0.500015" y2="367.707" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0F0F0F" />
                                    <stop offset="1" stopColor="#0F0F0F" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Dynamic Partners Grid */}
                    <div className="w-full pt-[25px] sm:pt-[35px] lg:pt-[50px]">
                        <div
                            className={`flex flex-wrap md:flex-nowrap justify-center items-start ${responsiveClasses.columnGap} w-full ${responsiveClasses.minHeight}`}
                        >
                            {Array.from({ length: columnsCount }, (_, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`flex flex-col items-center ${responsiveClasses.cardGap} ${getColumnMarginTop(columnIndex)}`}
                                >
                                    {getColumnPartners(columnIndex).map((partner) => (
                                        <PartnerCard key={partner.id} partner={partner} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersTwo;
