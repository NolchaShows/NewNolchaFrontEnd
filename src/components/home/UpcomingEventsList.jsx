"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionTitle from "../common/SectionTitle";
import SponsorshipDetailsModal from "../Modals/SponsorshipDetailsModal";
import EventDetailsModal from "../Modals/EventDetailsModal";
import { slugifyUpcomingEventTitle } from "@/data/upcomingEvents";

function resolveTweetCarouselForEvent(event, fallback) {
  const direct = event?.tweetCarousel || event?.tweet_carousel;
  if (direct?.items?.length) return direct;
  if (fallback?.items?.length) return fallback;
  return null;
}

const UpcomingEventsList = ({
  title = "Upcoming Events",
  events = [],
  openEventSlug = null,
  onOpenEventHandled,
  fallbackTweetCarousel = null,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState({ title: "", image: "" });
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [eventDetailsContext, setEventDetailsContext] = useState(null);
  const lastAutoOpenedSlugRef = useRef(null);

  const safeEvents = useMemo(
    () =>
      events && events.length > 0
        ? events
        : [
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
          ],
    [events]
  );

  // Defaults pulled from the first item so every opened card can render
  const defaults = useMemo(
    () => ({
      image: safeEvents[0]?.image || "/landing/recent_event.png",
      date: safeEvents[0]?.date || "--",
      location: safeEvents[0]?.location || "--",
      pastEventsLocation: safeEvents[0]?.pastEventsLocation || "--",
      letsTalkLocation: safeEvents[0]?.letsTalkLocation || "--",
      whiteLabelLocation: safeEvents[0]?.whiteLabelLocation || "--",
    }),
    [safeEvents]
  );

  useEffect(() => {
    if (!openEventSlug) return;
    if (lastAutoOpenedSlugRef.current === openEventSlug) return;

    const matchedIndex = safeEvents.findIndex(
      (event) => slugifyUpcomingEventTitle(event.title) === openEventSlug
    );

    if (matchedIndex === -1) {
      onOpenEventHandled?.();
      return;
    }

    lastAutoOpenedSlugRef.current = openEventSlug;

    const matchedEvent = {
      ...defaults,
      ...safeEvents[matchedIndex],
    };

    setActiveIndex(matchedIndex);
    setEventDetailsContext({
      title: matchedEvent.title || "",
      date: matchedEvent.date || "",
      venue: matchedEvent.venue || matchedEvent.location || "",
      whatToExpect:
        matchedEvent.whatToExpect || matchedEvent.description || "",
      rsvpLink: matchedEvent.rsvpLink || matchedEvent.rsvp_url || "#",
      logo: matchedEvent.logo || matchedEvent.logoUrl || "",
      mainImage: matchedEvent.mainImage || matchedEvent.image || "",
      galleryImages: matchedEvent.galleryImages || matchedEvent.gallery || [],
      tweetCarousel: resolveTweetCarouselForEvent(
        matchedEvent,
        fallbackTweetCarousel
      ),
      eveningRecap: matchedEvent.eveningRecap || null,
    });
    setIsEventDetailsModalOpen(true);
    onOpenEventHandled?.();
  }, [defaults, fallbackTweetCarousel, onOpenEventHandled, openEventSlug, safeEvents]);

  useEffect(() => {
    if (!openEventSlug) {
      lastAutoOpenedSlugRef.current = null;
    }
  }, [openEventSlug]);

  const getExternalEventLink = (event = {}) => {
    const href = (
      event?.externalUrl ||
      event?.external_url ||
      event?.externalLink ||
      event?.external_link ||
      ""
    ).trim();

    return /^https?:\/\//i.test(href) ? href : "";
  };

  const openExternalEventLink = (event) => {
    if (typeof window === "undefined") return false;
    const href = getExternalEventLink(event);
    if (!href) return false;
    window.open(href, "_blank", "noopener,noreferrer");
    return true;
  };

  return (
    <section id="upcoming-events" className="w-full bg-black page-container relative">
      <SectionTitle className="mb-[20px] lg:mb-[30px] 2xl:mb-[50px]">{title}</SectionTitle>

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
                <div className="bg-primary px-[16px] py-[18px] lg:px-[24px] lg:py-[28px] 2xl:px-[50px] 2xl:py-[50px] flex flex-col lg:flex-row gap-6 lg:gap-[30px] 2xl:gap-[50px] items-center lg:items-center text-black">
                  <div className="w-full lg:flex-1 flex flex-col sm:flex-row items-center gap-[15px] lg:gap-[30px] 2xl:gap-[50px]">
                    {/* Left */}
                    {display.image && (
                      <div className="w-full sm:w-[141px] lg:w-[211px] 2xl:w-[375px] flex-shrink-0">
                        <img
                          src={display.image}
                          alt={display.title || ev.title}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </div>
                    )}
                    {/* Middle title */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-[24px] lg:text-[32px] 2xl:text-[48px] font-bold text-black leading-tight">
                        {ev.title}
                      </h3>
                    </div>
                  </div>
                  {/* Right details */}
                  <div className="w-full lg:w-auto flex flex-col items-center lg:items-start gap-4 lg:gap-[10px] 2xl:gap-[20px]">
                    <p className="text-[18px] lg:text-[28px] 2xl:text-[40px] text-black text-center lg:text-left">
                      <span className="font-bold">Date:</span> {display.date}
                    </p>
                    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 lg:gap-4 2xl:gap-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (openExternalEventLink(display)) {
                            return;
                          }
                          setEventDetailsContext({
                            title: display.title || ev.title || "",
                            date: display.date || "",
                            venue: display.venue || display.location || "",
                            whatToExpect: display.whatToExpect || display.description || "",
                            rsvpLink: display.rsvpLink || display.rsvp_url || "#",
                            logo: display.logo || display.logoUrl || "",
                            mainImage: display.mainImage || display.image || "",
                            galleryImages: display.galleryImages || display.gallery || [],
                            tweetCarousel: resolveTweetCarouselForEvent(
                              display,
                              fallbackTweetCarousel
                            ),
                            eveningRecap: display.eveningRecap || null,
                          });
                          setIsEventDetailsModalOpen(true);
                        }}
                        className="w-full lg:w-auto px-[10px] lg:px-[18px] 2xl:px-[24px] py-[10px] lg:py-[10px] 2xl:py-[15px] bg-black text-white rounded-lg text-[16px] lg:text-[18px] 2xl:text-[22px] font-medium hover:bg-gray-800 transition-colors"
                      >
                        Learn more
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (openExternalEventLink(display)) {
                            return;
                          }
                          setModalContext({
                            title: display.title || ev.title || "",
                            image: display.image || "",
                          });
                          setIsModalOpen(true);
                        }}
                        className="w-full lg:w-auto px-[10px] lg:px-[18px] 2xl:px-[24px] py-[10px] lg:py-[10px] 2xl:py-[15px] bg-transparent border border-black text-black rounded-lg text-[16px] lg:text-[18px] 2xl:text-[22px] font-medium hover:bg-black hover:text-primary transition-colors"
                      >
                        Request details
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary hover:bg-primary px-[16px] py-[18px] lg:px-[24px] lg:py-[28px] 2xl:px-[50px] 2xl:py-[50px] group">
                  <h3 className="text-[20px] lg:text-[32px] 2xl:text-[48px] font-bold text-white group-hover:text-black transition-colors">
                    {ev.title}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sponsorship Details Modal */}
      <SponsorshipDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        headerImageSrc={modalContext.image}
        selectedEventTitle={modalContext.title}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isEventDetailsModalOpen}
        onClose={() => setIsEventDetailsModalOpen(false)}
        eventData={eventDetailsContext}
      />
    </section>
  );
};

export default UpcomingEventsList;


