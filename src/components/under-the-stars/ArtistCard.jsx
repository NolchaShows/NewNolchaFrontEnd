"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Artist Card for the Masonry Grid (Page 2 & Page 4)
 * - Artwork first (natural image proportions, no crop, thin border #E2E2DE)
 * - Artist Name second (bold, hover underline)
 * - 3-8 word description below
 * - Entire card is a clickable Link opening the artist profile
 */
export default function ArtistCard({ artist, basePath = "/under-the-stars" }) {
  const artwork = artist.featuredArtwork;
  const hasDimensions = artwork.width && artwork.height;
  const aspectRatioStyle = hasDimensions
    ? { aspectRatio: `${artwork.width} / ${artwork.height}` }
    : { aspectRatio: "4 / 3" };

  const profileHref = `${basePath}/${artist.id}`;

  return (
    <Link
      href={profileHref}
      prefetch={true}
      className="group flex flex-col p-[14px] md:p-[18px] border border-[#E2E2DE] hover:border-[#0B0B0C]/40 bg-white transition-all duration-200 text-left text-inherit no-underline w-full cursor-pointer focus:outline-2 focus:outline-[#0B0B0C]"
      aria-label={`View profile and works of ${artist.name}`}
    >
      {/* Artwork Image First (natural proportions, no crop) */}
      <div
        className="-mx-[14px] -mt-[14px] mb-3 md:-mx-[18px] md:-mt-[18px] md:mb-3 overflow-hidden bg-[#F3F3F1] relative w-[calc(100%+28px)] md:w-[calc(100%+36px)]"
        style={aspectRatioStyle}
      >
        <Image
          src={artwork.image}
          alt={artwork.alt || `${artist.name} featured artwork`}
          fill
          sizes="(min-width: 1200px) 290px, (min-width: 768px) 45vw, 92vw"
          className="object-cover w-full h-full"
          loading="lazy"
          unoptimized
        />
      </div>

      {/* Artist Name Second */}
      <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#0B0B0C] group-hover:underline decoration-2 underline-offset-4">
        {artist.name}
      </h3>

      {/* 3-8 Word Description Below */}
      {artist.shortDescription && (
        <p className="mt-2 text-[14px] leading-[1.4] text-[#62625F]">
          {artist.shortDescription}
        </p>
      )}
    </Link>
  );
}
