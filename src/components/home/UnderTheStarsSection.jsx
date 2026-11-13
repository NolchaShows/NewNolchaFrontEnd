"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { underTheStarsData } from "@/data/underTheStarsData";
import { Play, Pause, Volume2, VolumeX, ArrowLeft, ExternalLink } from "lucide-react";

/**
 * Artist Card for the Masonry Grid (Page 2 & Page 4)
 * - Artwork first (natural proportions, no crop, thin border #E2E2DE)
 * - Artist Name second (bold, hover underline)
 * - 3-8 word description below
 * - Entire card opens profile
 */
function ArtistGridCard({ artist, onSelectArtist }) {
  const artwork = artist.featuredArtwork;
  const hasDimensions = artwork.width && artwork.height;
  const aspectRatioStyle = hasDimensions
    ? { aspectRatio: `${artwork.width} / ${artwork.height}` }
    : { aspectRatio: "4 / 3" };

  return (
    <button
      type="button"
      onClick={() => onSelectArtist(artist)}
      className="group flex flex-col p-[14px] md:p-[18px] border border-[#E2E2DE] hover:border-[#0B0B0C]/40 bg-white transition-all duration-200 text-left text-inherit cursor-pointer w-full focus:outline-2 focus:outline-[#0B0B0C]"
      aria-label={`View profile for ${artist.name}`}
    >
      {/* Artwork Image First */}
      <div
        className="-mx-[14px] -mt-[14px] mb-3 md:-mx-[18px] md:-mt-[18px] md:mb-3 overflow-hidden bg-[#F3F3F1] relative w-[calc(100%+28px)] md:w-[calc(100%+36px)]"
        style={aspectRatioStyle}
      >
        <Image
          src={artwork.image}
          alt={artwork.alt || `${artist.name} artwork`}
          fill
          sizes="(min-width: 1200px) 280px, (min-width: 768px) 45vw, 90vw"
          className="object-cover w-full h-full"
          loading="lazy"
          unoptimized
        />
      </div>

      {/* Artist Name Second */}
      <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#0B0B0C] group-hover:underline decoration-2 underline-offset-4">
        {artist.name}
      </h3>

      {/* 3-8 Word Description */}
      {artist.shortDescription && (
        <p className="mt-2 text-[14px] leading-[1.4] text-[#62625F]">
          {artist.shortDescription}
        </p>
      )}
    </button>
  );
}

/**
 * Artist Profile View (Page 3)
 * - Header with NOLCHA SHOWS, Artists / Event Invite
 * - < Back to artists
 * - Artist Portrait + Name + Medium/Location + 80-150 word Bio + [Visit Artist's Shop]
 * - Selected works grid with [Buy from Artist] external links
 */
function ArtistProfileView({ artist, onBack, onNavigateToInvite }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [artist]);

  return (
    <div className="w-full bg-white text-[#0B0B0C] animate-in fade-in duration-200">
      {/* Back Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to artists</span>
        </button>
      </div>

      {/* Artist Top Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-[#E2E2DE] pb-12 lg:pb-16">
        {/* Left: Artist Portrait */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="relative aspect-square w-full max-w-[280px] bg-[#F3F3F1] border border-[#E2E2DE] overflow-hidden">
            <Image
              src={artist.portrait}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 280px, 100vw"
              unoptimized
            />
          </div>
        </div>

        {/* Right: Bio & Info */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col items-start text-left">
          <h1 className="text-[32px] sm:text-[42px] lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0B0B0C]">
            {artist.name}
          </h1>

          {artist.mediumLocation && (
            <p className="mt-2 text-[15px] md:text-[16px] font-medium text-[#62625F]">
              {artist.mediumLocation}
            </p>
          )}

          <p className="mt-6 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.6] text-[#2A2A29] max-w-[65ch]">
            {artist.bio}
          </p>

          {artist.shopUrl && (
            <a
              href={artist.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-8 px-6 min-h-[44px] bg-[#0B0B0C] text-white text-[15px] font-bold hover:bg-[#2A2A29] transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#0B0B0C]"
            >
              <span>Visit Artist&apos;s Shop</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Selected Works Section */}
      <div className="pt-12 lg:pt-16">
        <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold tracking-[-0.03em] text-[#0B0B0C] mb-8 text-left">
          Selected works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {artist.selectedWorks?.map((work) => (
            <div
              key={work.id}
              className="flex flex-col border border-[#E2E2DE] p-4 md:p-5 bg-white text-left"
            >
              {/* Artwork Image */}
              <div
                className="-mx-4 -mt-4 mb-4 md:-mx-5 md:-mt-5 md:mb-5 bg-[#F3F3F1] overflow-hidden relative"
                style={{
                  aspectRatio: work.width && work.height
                    ? `${work.width} / ${work.height}`
                    : "4 / 3",
                }}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  unoptimized
                />
              </div>

              {/* Title */}
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0B0B0C] leading-snug">
                {work.title}
              </h3>

              {/* Medium / Dimensions / Year */}
              <p className="mt-1 text-[13px] md:text-[14px] text-[#62625F]">
                {work.mediumDimensionsYear}
              </p>

              {/* Buy from Artist Button */}
              <div className="mt-6 pt-2">
                <a
                  href={work.buyUrl || artist.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#0B0B0C] text-white text-[14px] font-bold hover:bg-[#2A2A29] transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#0B0B0C]"
                >
                  <span>Buy from Artist</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Event Invite Section (Page 2, 4, 7)
 * - Video with playback controls, poster frame, no autoplay sound
 * - Event story: About the Evening
 * - Schedule: 7-9 PM Art & Networking, 9 PM-1 AM After Party
 */
function EventInviteSection({ eventData }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div id="event-invite" className="mt-20 lg:mt-32 pt-12 border-t border-[#E2E2DE]">
      {/* Invite Header */}
      <div className="mb-8 text-left">
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] text-[#0B0B0C]">
          Event Invite
        </h2>
        <p className="mt-2 text-[15px] md:text-[16px] text-[#62625F]">
          Embedded video with playback controls
        </p>
      </div>

      {/* Video Container with poster & controls */}
      <div className="relative w-full aspect-video bg-black overflow-hidden border border-[#E2E2DE]">
        <video
          ref={videoRef}
          src={eventData.video.url}
          poster={eventData.video.poster}
          playsInline
          muted={isMuted}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Video Overlay Controls Bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-end p-4 sm:p-6">
          <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 min-h-[44px] bg-white text-[#0B0B0C] font-bold text-[14px] hover:bg-white/90 transition-colors"
                aria-label={isPlaying ? "Pause invitation video" : "Play invitation video"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? "Pause invitation" : "Play invitation"}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center justify-center w-11 h-11 bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <span className="hidden sm:inline-block text-[12px] uppercase font-semibold tracking-wider text-white/80">
              {eventData.video.caption}
            </span>
          </div>
        </div>
      </div>

      {/* About the Evening & Schedule (Page 7) */}
      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
        <div className="md:col-span-6 lg:col-span-7">
          <h3 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight text-[#0B0B0C] uppercase mb-4">
            {eventData.aboutHeading}
          </h3>
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#2A2A29]">
            {eventData.aboutDescription}
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
          {eventData.schedule.map((item, idx) => (
            <div key={idx} className="border-t-2 border-[#0B0B0C] pt-4">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#62625F]">
                {item.time} / {item.label}
              </p>
              <p className="mt-2 text-[15px] sm:text-[16px] text-[#2A2A29] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Main Under The Stars Section (Complete Blueprint)
 * - Navigation: Artists / Event Invite
 * - Simple Opening (Compact Hero)
 * - Responsive Masonry Grid (4 cols >=1200px, 2 cols 768-1199px, 1 col <768px)
 * - Event Invite Section with Video & Schedule
 * - In-place Artist Profile navigation with < Back to artists
 */
export default function UnderTheStarsSection({
  initialArtistSlug = null,
  className = "",
}) {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [columnCount, setColumnCount] = useState(4);

  const eventData = underTheStarsData.event;
  const artists = underTheStarsData.artists;

  // Handle initial artist selection if provided
  useEffect(() => {
    if (initialArtistSlug) {
      const match = artists.find((a) => a.id === initialArtistSlug);
      if (match) setSelectedArtist(match);
    }
  }, [initialArtistSlug, artists]);

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
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    artists.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols;
  }, [artists, columnCount]);

  const scrollToSection = (id) => {
    if (selectedArtist) {
      setSelectedArtist(null);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="under-the-stars"
      className={`w-full bg-white text-[#0B0B0C] py-10 sm:py-14 lg:py-20 ${className}`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-11">
        {/* Minimal Subheader / Navigation Bar (Page 2 & Page 3) */}
        <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-4 mb-10 sm:mb-12">
          <span className="text-[14px] sm:text-[15px] font-extrabold tracking-wider uppercase text-[#0B0B0C]">
            NOLCHA SHOWS
          </span>

          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Under the Stars navigation">
            <button
              type="button"
              onClick={() => scrollToSection("artists-section")}
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
            >
              Artists
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("event-invite")}
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
            >
              Event Invite
            </button>
          </nav>
        </div>

        {/* If an artist is currently selected, display the Artist Profile Blueprint (Page 3) */}
        {selectedArtist ? (
          <ArtistProfileView
            artist={selectedArtist}
            onBack={() => setSelectedArtist(null)}
            onNavigateToInvite={() => scrollToSection("event-invite")}
          />
        ) : (
          /* Otherwise display Gallery Homepage Blueprint (Page 2) */
          <>
            {/* Simple Compact Opening */}
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

            {/* Meet the artists Header */}
            <div id="artists-section" className="mb-6 sm:mb-8 text-left">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold tracking-[-0.03em] text-[#0B0B0C]">
                Meet the artists
              </h2>
            </div>

            {/* Masonry Grid (4 cols >=1200px, 2 cols 768-1199px, 1 col <768px, gap 20-24px) */}
            <div className="flex gap-[20px] lg:gap-[24px] items-start w-full">
              {columns.map((colCards, colIdx) => (
                <div
                  key={colIdx}
                  className="flex-1 flex flex-col gap-[20px] lg:gap-[24px] min-w-0"
                >
                  {colCards.map((artist) => (
                    <ArtistGridCard
                      key={artist.id}
                      artist={artist}
                      onSelectArtist={(a) => setSelectedArtist(a)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Event Invite Section */}
            <EventInviteSection eventData={eventData} />
          </>
        )}
      </div>
    </section>
  );
}
