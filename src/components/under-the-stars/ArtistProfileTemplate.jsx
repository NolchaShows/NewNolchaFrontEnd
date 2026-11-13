"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

/**
 * Artist Profile Blueprint (Page 3)
 * One reusable page template for every artist:
 * - Minimal subheader: NOLCHA SHOWS | Artists / Event Invite
 * - < Back to artists
 * - Artist Portrait + Name + Medium/Location + 80-150 word Bio + [Visit Artist's Shop]
 * - Selected works grid with [Buy from Artist] external buttons
 */
export default function ArtistProfileTemplate({ artist }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/under-the-stars#artists");
    }
  };

  return (
    <article className="w-full bg-white text-[#0B0B0C] py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-11">
        {/* Minimal Subheader / Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-4 mb-8 sm:mb-10">
          <Link
            href="/under-the-stars"
            className="text-[14px] sm:text-[15px] font-extrabold tracking-wider uppercase text-[#0B0B0C] hover:opacity-80 transition-opacity"
          >
            NOLCHA SHOWS
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Under the Stars navigation">
            <Link
              href="/under-the-stars#artists"
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors"
            >
              Artists
            </Link>
            <Link
              href="/under-the-stars#event-invite"
              className="text-[14px] sm:text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] flex items-center transition-colors"
            >
              Event Invite
            </Link>
          </nav>
        </div>

        {/* < Back to artists Button */}
        <div className="mb-8 sm:mb-10">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-[15px] font-bold text-[#0B0B0C] hover:text-[#62625F] min-h-[44px] transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to artists</span>
          </button>
        </div>

        {/* Artist Bio & Top Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start border-b border-[#E2E2DE] pb-12 sm:pb-16">
          {/* Left: Artist Portrait */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative aspect-square w-full max-w-[280px] bg-[#F3F3F1] border border-[#E2E2DE] overflow-hidden">
              <Image
                src={artist.portrait}
                alt={artist.name}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 100vw"
                unoptimized
              />
            </div>
          </div>

          {/* Right: Artist Name, Medium / Location, Biography, Shop Link */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col items-start text-left">
            <h1 className="text-[34px] sm:text-[44px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#0B0B0C]">
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
                className="inline-flex items-center justify-center gap-2 mt-8 px-7 min-h-[44px] bg-[#0B0B0C] text-white text-[15px] font-bold hover:bg-[#2A2A29] transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#0B0B0C]"
              >
                <span>Visit Artist&apos;s Shop</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Selected works Section */}
        <section className="pt-12 sm:pt-16" aria-labelledby="selected-works-heading">
          <h2
            id="selected-works-heading"
            className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold tracking-[-0.03em] text-[#0B0B0C] mb-8 text-left"
          >
            Selected works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {artist.selectedWorks?.map((work) => (
              <div
                key={work.id}
                className="flex flex-col border border-[#E2E2DE] p-4 md:p-5 bg-white text-left"
              >
                {/* Artwork Image (shown whole, natural aspect ratio, no crop) */}
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

                {/* Artwork Title */}
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0B0B0C] leading-snug">
                  {work.title}
                </h3>

                {/* Medium / Dimensions / Year */}
                <p className="mt-1 text-[13px] md:text-[14px] text-[#62625F]">
                  {work.mediumDimensionsYear}
                </p>

                {/* Buy from Artist Button (opens external destination in a new tab) */}
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
        </section>
      </div>
    </article>
  );
}
