import React, { useState } from 'react';

const NolchaExperience = ({ nolchaExperienceData, loading }) => {
  const fallbackSections = [
    {
      id: 'connect',
      title: 'Connect + Collaborate',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'connect2',
      title: 'Connect + Collaborate',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'leadership',
      title: 'Thought Leadership + Education',
      content: 'Gain insights from industry experts and thought leaders. Participate in educational sessions that cover the latest trends, technologies, and best practices in the Web3 and blockchain space.'
    }
  ];

  const heading = nolchaExperienceData?.heading || "Nolcha Shows Experiences Are The Destination For Brands And Organizations To Continue To Build, Engage And Connect.";
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
      <div className="bg-[#F4F4F4] p-10">
        <div className="max-w-7xl 2xl:max-w-none mx-auto 2xl:mx-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left side - Image skeleton */}
            <div className="relative">
              <div className="w-full h-[400px] bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="mt-3 h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </div>
            {/* Right side - Content skeleton */}
            <div>
              <div className="border-b-1 border-[#000000B2] mb-6">
                <div className="h-8 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-8"></div>
              </div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border-b-1 border-[#000000B2] py-4">
                  <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F4F4] p-10">
      <div className="max-w-7xl 2xl:max-w-none mx-auto 2xl:mx-10 py-16">
        <div className=" grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left side - Image only */}
          <div className="relative flex flex-col h-full">
            <img
              src={getImageUrl()}
              alt="Nolcha Shows collaboration event"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col">
            {/* Main heading */}
            <div className="border-b-1 border-[#000000B2]">
              <h1 className="text-[20px] lg:text-[24px] 2xl:text-[32px] font-bold text-black leading-tight mb-8 uppercase">
                {heading}
              </h1>
            </div>

            {/* Expandable sections */}
            <div className="flex-1">
              {sections.map((section) => (
                <div key={section.id} className="border-b-1 border-[#000000B2]">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex justify-between items-center py-6 text-left transition-colors duration-200"
                  >
                    <h2 className="text-[20px] lg:text-[24px] 2xl:text-3xl font-bold text-black uppercase">
                      {section.title}
                    </h2>
                    <div className="ml-4 flex-shrink-0">
                      {expandedSection === section.id ? (
                        <svg
                          className="w-6 h-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection === section.id ? "max-h-96" : "max-h-0"
                      }`}
                  >
                    <div className="pb-6 font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-gray-700 text-[18px] lg:text-[20px] 2xl:text-xl leading-relaxed pr-8 font-normal">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Caption placed outside the grid, below the image */}
        <p className="mt-3 text-[20px] text-black font-[400] text-center lg:text-left">
          {imageCaption}
        </p>


      </div>
    </div>
  );
};

export default NolchaExperience;