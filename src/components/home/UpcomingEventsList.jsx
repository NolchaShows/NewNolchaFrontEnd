"use client";
import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
const UpcomingEventsList = ({
  title = "Upcoming Events",
  events = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeEvents = events && events.length > 0 ? events : [
    {
      title: "Art Basel",
      image: "/landing/recent_event.png",
      date: "07-07-2025",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { title: "Consensus HK" },
    { title: "Bitcoin Vegas" },
    { title: "Consensus Miami" },
  ];

  // Defaults pulled from the first item so every opened card can render
  const defaults = {
    image: safeEvents[0]?.image || "/landing/recent_event.png",
    date: safeEvents[0]?.date || "--",
    location: safeEvents[0]?.location || "--",
    pastEventsLocation: safeEvents[0]?.pastEventsLocation || "--",
    letsTalkLocation: safeEvents[0]?.letsTalkLocation || "--",
    whiteLabelLocation: safeEvents[0]?.whiteLabelLocation || "--",
  };

  return (
    <section className="w-full bg-[#FFF7E6] page-container relative">
      <SectionTitle>{title}</SectionTitle>

      <div className="flex flex-col gap-[6px] lg:gap-[10px] 2xl:gap-[18px]">
        {safeEvents.map((ev, idx) => {
          const isOpen = idx === activeIndex;
          const display = {
            ...defaults,
            ...ev,
          };
          return (
            <div
              key={`${ev.title}-${idx}`}
              className={`rounded-[8px] lg:rounded-[12px] 2xl:rounded-[20px] overflow-hidden cursor-pointer transition-shadow relative z-10 pointer-events-auto ${isOpen ? "shadow" : ""
                }`}
              onClick={() => setActiveIndex((prev) => (prev === idx ? -1 : idx))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev === idx ? -1 : idx));
                }
              }}
            >
              {isOpen ? (
                <div className="bg-[#E6C6C5] px-[16px] py-[18px] lg:px-[24px] lg:py-[28px] 2xl:px-[50px] 2xl:py-[50px] flex flex-col lg:flex-row gap-5 lg:gap-[30px] 2xl:gap-[50px] items-start">
                  <div className="flex-1 flex flex-row items-center gap-[10px] lg:gap-[20px] 2xl:gap-[30px]">
                    {/* Left */}
                    {display.image && (
                      <img
                        src={display.image}
                        alt={display.title || ev.title}
                        className="w-[141px] lg:w-[211px] 2xl:w-[375px] object-cover"
                      />
                    )}
                    {/* Middle title */}
                    <div className="flex-1">
                      <h3 className="text-h3 text-black">
                        {ev.title}
                      </h3>
                    </div>
                  </div>
                  {/* Right details */}
                  <div className="text-[16px] lg:text-[18px] 2xl:text-[32px] text-black mr-[20px] lg:mr-[60px] 2xl:mr-[100px]">
                    <p><span className="font-bold">Date:</span> {display.date}</p>
                    <p><span className="font-bold">Location:</span> {display.location}</p>
                    <p><span className="font-bold">View Past Events:</span> {display.pastEventsLocation}</p>
                    <p><span className="font-bold">Lets Talk:</span> {display.letsTalkLocation}</p>
                    <p><span className="font-bold">Turn White-label:</span> {display.whiteLabelLocation}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white px-[16px] py-[18px] lg:px-[24px] lg:py-[28px] 2xl:px-[50px] 2xl:py-[50px]">
                  <h3 className="text-h3 text-black">
                    {ev.title}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingEventsList;


