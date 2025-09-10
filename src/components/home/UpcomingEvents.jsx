"use client";
import React from "react";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "After party Sept 16 2025 NYC",
      image: "/home/upcoming/1.png",
      tags: ["Concensus 2025", "Sept 16, 2025 NYC"]
    },
    {
      id: 2,
      title: "Nolcha X Art Basel",
      image: "home/upcoming/2.png",
      tags: ["Concensus 2025", "Dec 4 2025 Miami"]
    },
    {
      id: 3,
      title: "Dec 4 2025 Miami",
      image: "home/upcoming/3.png",
      tags: ["Concensus 2025", "Dec 4 2025 Miami"]
    }
  ];

  const ViewMoreButton = () => (
    <div className="flex items-center gap-2">
      <span className="text-black text-[24px] lg:text-[24px] md:text-[20px] sm:text-[18px] font-bold leading-[140%] tracking-[-0.72px] lg:tracking-[-0.72px] md:tracking-[-0.6px] sm:tracking-[-0.54px] font-['Inter_Tight',sans-serif]">
        View more
      </span>
      <div className="w-12 h-12">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <path d="M23.9922 19.5L26.9922 19.5L26.9922 22.5L23.9922 22.5L23.9922 19.5Z" fill="black" />
          <path d="M23.9922 25.5L26.9922 25.5L26.9922 28.5L23.9922 28.5L23.9922 25.5Z" fill="black" />
          <path d="M20.9922 16.5L23.9922 16.5L23.9922 19.5L20.9922 19.5L20.9922 16.5Z" fill="black" />
          <path d="M20.9922 28.5L23.9922 28.5L23.9922 31.5L20.9922 31.5L20.9922 28.5Z" fill="black" />
          <path d="M17.9922 31.5L20.9922 31.5L20.9922 34.5L17.9922 34.5L17.9922 31.5Z" fill="black" />
          <path d="M17.9922 13.5L20.9922 13.5L20.9922 16.5L17.9922 16.5L17.9922 13.5Z" fill="black" />
          <path d="M26.9922 22.5L29.9922 22.5L29.9922 25.5L26.9922 25.5L26.9922 22.5Z" fill="black" />
        </svg>
      </div>
    </div>
  );

  return (
    <section className="bg-white w-full py-[100px] lg:py-[100px] sm:py-[60px] px-8 lg:px-8 sm:px-4">
      <div className="max-w-none mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-[50px] lg:mb-[50px] sm:mb-8 gap-6 lg:gap-0">
          <h2 className="text-black text-[52px] lg:text-[52px] md:text-[40px] sm:text-[32px] font-bold leading-[120%] tracking-[-1.56px] lg:tracking-[-1.56px] md:tracking-[-1.2px] sm:tracking-[-0.96px] capitalize font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
            Upcoming Events
          </h2>
          
          {/* View More Button - Hidden on small screens, shown on lg+ */}
          <div className="hidden lg:flex">
            <ViewMoreButton />
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="flex flex-col lg:ml-10 md:mr-5 lg:flex-row lg:justify-between lg:mr-20 lg:gap-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="
                bg-black rounded-[17px] p-[14px] sm:p-3 flex flex-col
                lg:w-[391px] lg:h-[476px] 2xl:h-[700px] 2xl:w-[600px] w-full h-auto
                shadow-[0_0.8px_32px_0_rgba(227,222,255,0.05)_inset,0_3.19px_14.37px_0_rgba(154,146,210,0.05)_inset,0_78.26px_78.26px_-38.33px_rgba(202,172,255,0.05)_inset,0_-65.48px_54.3px_-51.11px_rgba(96,68,144,0.05)_inset,0_5.59px_8.78px_-3.25px_rgba(255,255,255,0.07)_inset,0_32px_40px_-2px_rgba(255,255,255,0.02)_inset,0_0.5px_10px_-6px_rgba(0,0,0,0.10),0_20px_26px_-5px_rgba(0,0,0,0.40)]
                backdrop-blur-[4px]
                transition-all duration-300 ease-in-out cursor-pointer
                transform-gpu origin-top
                md:hover:scale-100 lg:hover:scale-x-110 lg:hover:scale-y-120 2xl:hover:scale-x-115 hover:z-10
                mb-6 lg:mb-0
              "
            >
              {/* Card Image */}
              <div className="flex-1 mb-[20px] sm:mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>

              {/* Card Content */}
              <div className="px-5 pb-5 sm:px-4 sm:pb-4">
                <h3 className="text-white text-[26px] lg:text-[22px] md:text-[20px] sm:text-[18px] 2xl:text-[28px] font-bold leading-[120%] tracking-[-0.78px] lg:tracking-[-0.78px] md:tracking-[-0.72px] sm:tracking-[-0.6px] capitalize font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] mb-[10px] sm:mb-2">
                  {event.title}
                </h3>

                {/* Tags */}
                <div className="flex items-center gap-[14px] flex-grow">
                  {event.tags.map((tag, index) => (
                    <React.Fragment key={index}>
                      <span className="text-white text-[16px] lg:text-[16px] md:text-[14px] sm:text-[12px] 2xl:text-[20px] font-normal leading-[140%] tracking-[-0.48px] lg:tracking-[-0.48px] md:tracking-[-0.42px] sm:tracking-[-0.36px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                        {tag}
                      </span>
                      {index < event.tags.length - 1 && (
                        <div className="w-px h-[17px] sm:h-[14px] bg-white"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button - Shown on small screens, hidden on lg+ */}
        <div className="flex lg:hidden justify-center mt-8">
          <ViewMoreButton />
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;