"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { underTheStarsData } from "@/data/underTheStarsData";
import ArtistCard from "@/components/under-the-stars/ArtistCard";
import EventInvite from "@/components/under-the-stars/EventInvite";

export default function UnderTheStarsSection({
  className = "",
  basePath = "/under-the-stars",
}) {
  const [columnCount, setColumnCount] = useState(4);

  const eventData = underTheStarsData.event;
  const artists = underTheStarsData.artists;

  // Responsive rules from Page 4:
  // Desktop: 4 columns at 1200 px and above
  // Tablet: 2 columns from 768-1199 px
  // Mobile: 1 column below 768 px
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumnCount(1);
      } else if (width < 1200) {
        setColumnCount(2);
      } else {
        setColumnCount(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute items into columns round-robin (k % columnCount)
  // Preserves natural left-to-right reading order across rows
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    artists.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols;
  }, [artists, columnCount]);

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="under-the-stars"
      className={`w-full bg-white text-[#0B0B0C] py-10 sm:py-14 lg:py-20 ${className}`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-11">
        {/* Minimal Subheader / Navigation Bar (Page 2 & Page 4) */}
        <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-4 mb-10 sm:mb-12">
          <Link
            href="/under-the-stars"
            className="text-[14px] sm:text-[15px] font-extrabold tracking-wider uppercase text-[#0B0B0C] hover:opacity-80 transition-opacity"
          >
            NOLCHA SHOWS
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Under the Stars navigation">
            <button
              type="button"
              onClick={() => scrollToAnchor("artists-section")}
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
            >
              Artists
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor("event-invite")}
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
            >
              Event Invite
            </button>
          </nav>
        </div>

        {/* 01 / Simple Compact Opening (Page 2) */}
        <div className="text-left mb-12 sm:mb-16">
          <h1 className="text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#0B0B0C]">
            {eventData.title}
          </h1>

          <p className="mt-3 text-[12px] sm:text-[13px] md:text-[14px] font-bold tracking-[0.08em] uppercase text-[#62625F]">
            {eventData.subtitle}
          </p>

          <p className="mt-5 text-[17px] sm:text-[19px] md:text-[21px] font-medium leading-[1.45] text-[#2A2A29] max-w-[60ch]">
            {eventData.intro}{" "}
            <strong className="font-extrabold text-[#0B0B0C]">
              {eventData.philanthropyHighlight}
            </strong>
          </p>
        </div>

        {/* Meet the artists Heading */}
        <div id="artists-section" className="mb-6 sm:mb-8 text-left">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold tracking-[-0.03em] text-[#0B0B0C]">
            Meet the artists
          </h2>
        </div>

        {/* 02 & 03 / True Masonry Grid (4 cols >=1200px, 2 cols 768-1199px, 1 col <768px, gap 20-24px) */}
        <div className="flex gap-[20px] lg:gap-[24px] items-start w-full">
          {columns.map((colCards, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 flex flex-col gap-[20px] lg:gap-[24px] min-w-0"
            >
              {colCards.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  basePath={basePath}
                />
              ))}
            </div>
          ))}
        </div>

        {/* 04 / Event Invite Section */}
        <EventInvite eventData={eventData} />
      </div>
    </section>
  );
}
