"use client";
import React, { useState } from 'react';

const NolchaExperience = ({ nolchaExperienceData, loading }) => {
  const fallbackSections = [
    {
      id: 'creative',
      title: 'Creative: Innovation & creative',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'connect',
      title: 'Connect + Collaborate',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'leadership',
      title: 'Thought Leadership + Education',
      content: 'Gain insights from industry experts and thought leaders. Participate in educational sessions that cover the latest trends, technologies, and best practices in the Web3 and blockchain space.'
    }
  ];

  const heading = nolchaExperienceData?.heading || "Nolcha Shows experiences are the destination for brands & organizations to continue to build, engage & connect.";
  const imageCaption = nolchaExperienceData?.image_caption || "Image from Nolcha Shows x World Trade Center 69 Floor";

  const getImageUrl = () => {
    if (!nolchaExperienceData?.main_image?.url) return "/home/collaborate.png";

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    let imageUrl = nolchaExperienceData.main_image.url;

    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${baseUrl}${imageUrl}`;
    }

    return imageUrl;
  };

  const sections = nolchaExperienceData?.accordion_sections
    ? nolchaExperienceData.accordion_sections.map((section, index) => ({
      id: `section_${index}`,
      title: section.title || "Section Title",
      content: section.content || "Section content"
    }))
    : fallbackSections;

  const [expandedSection, setExpandedSection] = useState(sections.length > 0 ? sections[0].id : null); // First section expanded by default

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white page-container py-[60px] lg:py-[100px] 2xl:py-[140px]">
        <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[60px] 2xl:gap-[80px] items-start">
          {/* Left side - Image skeleton */}
          <div className="relative w-full lg:w-[435px] 2xl:w-[580px] flex-shrink-0">
            <div className="rounded-[20px] lg:rounded-[24px] 2xl:rounded-[30px] w-full h-[400px] lg:h-[570px] 2xl:h-[700px] bg-gray-300 animate-pulse"></div>
          </div>
          {/* Right side - Content skeleton */}
          <div className="flex-1 flex flex-col">
            <div className="h-[60px] lg:h-[80px] 2xl:h-[100px] bg-gray-300 animate-pulse rounded mb-[30px] lg:mb-[40px] 2xl:mb-[50px]"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-[#F3F3F3] rounded-[6px] lg:rounded-[12px] 2xl:rounded-[20px] p-4 mb-3">
                <div className="h-6 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white page-container py-[60px] lg:py-[100px] 2xl:py-[140px]">
      <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[50px] 2xl:gap-[80px] items-start">
        {/* Left side - Image with gradient overlay */}
        <div className="relative w-full lg:w-[513px] h-auto lg:h-[531px] flex-shrink-0">
          <div className="rounded-[12px] overflow-hidden relative w-full" style={{ aspectRatio: '513/531', maxHeight: '531px' }}>
            <img
              src={getImageUrl()}
              alt="Nolcha Shows collaboration event"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay (full image) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
              }}
            />

            {/* Caption text (no box overlay) */}
            {imageCaption && (
              <p className="absolute bottom-4 left-5 right-4 text-white text-[14px] lg:text-[18px] leading-relaxed">
                {imageCaption}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          {/* Main heading */}
          <h1 className="text-[28px] lg:text-[36px] 2xl:text-[48px] font-bold text-black leading-tight mb-[30px] lg:mb-[40px] 2xl:mb-[50px]">
            {heading}
          </h1>

          {/* Expandable accordion sections */}
          <div className="flex flex-col gap-[10px] lg:gap-[12px] 2xl:gap-[14px]">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              return (
                <div
                  key={section.id}
                  className="bg-[#F3F3F3] rounded-[6px] lg:rounded-[12px] 2xl:rounded-[20px] overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex justify-between items-center px-[16px] lg:px-[24px] 2xl:px-[32px] py-[16px] lg:py-[20px] 2xl:py-[24px] text-left transition-colors hover:bg-[#E8E8E8]"
                  >
                    <h2 className="text-[18px] lg:text-[24px] 2xl:text-[32px] font-bold text-black leading-tight pr-4">
                      {section.title}
                    </h2>
                    {/* Chevron Icon */}
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-black transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="px-[16px] lg:px-[24px] 2xl:px-[32px] pb-[16px] lg:pb-[20px] 2xl:pb-[24px]">
                      <p
                        className="text-black text-[14px] lg:text-[16px] 2xl:text-[18px] leading-relaxed font-normal"
                      >
                        {section.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NolchaExperience;