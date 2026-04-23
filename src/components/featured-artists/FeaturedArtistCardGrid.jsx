"use client";

import React from "react";
import Link from "next/link";

const FeaturedArtistCardGrid = ({
  artists = [],
  loading = false,
  basePath = "/featured-artists",
  buttonLabel = "View Artist",
}) => {
  if (loading) {
    return (
      <section className="w-full bg-[#EEEEEE] px-5 py-8 lg:px-11 lg:py-20">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 gap-x-0 gap-y-6 md:grid-cols-2 md:gap-y-8 xl:grid-cols-4 xl:gap-y-20">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[420px] animate-pulse bg-[#E2E2E2] lg:min-h-[560px] xl:min-h-[590px] 2xl:min-h-[640px]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!artists.length) {
    return null;
  }

  return (
    <section className="w-full bg-[#EEEEEE] px-5 py-8 lg:px-11 lg:py-20">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-x-0 gap-y-6 md:grid-cols-2 md:gap-y-8 xl:grid-cols-4 xl:gap-y-20">
          {artists.map((artist, index) => (
            <div
              key={artist.slug || index}
              className="group border-r-0 md:border-r md:border-[#1D1D1D] md:[&:nth-child(2n):not(:last-child)]:border-r-0 xl:[&:nth-child(2n):not(:last-child)]:border-r xl:[&:nth-child(4n):not(:last-child)]:border-r-0 last:!border-r-0 hover:[&_.featured-artist-card-blur-target]:blur-[16px] focus-within:[&_.featured-artist-card-blur-target]:blur-[16px]"
            >
              <article className="relative isolate flex h-full min-h-[320px] w-full flex-col overflow-hidden lg:min-h-[440px] xl:min-h-[440px] 2xl:min-h-[560px]">
                <div className="featured-artist-card-blur-target relative flex min-h-0 flex-col px-0 transition-[filter] duration-300 ease-out will-change-[filter] md:px-3">
                  <div className="shrink-0 overflow-hidden bg-[#E7E7E7]">
                    <img
                      src={artist.image}
                      alt={artist.text || "Featured artist image"}
                      className="h-[260px] w-full object-cover sm:h-[300px] lg:h-[360px] xl:h-[420px] 2xl:h-[600px]"
                    />
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col bg-[#EEEEEE]">
                    <h3 className="mt-3 shrink-0 text-[14px] uppercase text-[#111111] lg:text-[20px]">
                      {artist.text}
                    </h3>

                    <div className="min-h-0 flex-1" aria-hidden />
                  </div>
                </div>

                {artist.slug ? (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <Link
                      href={`${basePath}/${artist.slug}`}
                      className="pointer-events-auto inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white"
                    >
                      {buttonLabel}
                    </Link>
                  </div>
                ) : null}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtistCardGrid;
