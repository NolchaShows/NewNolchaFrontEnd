"use client";

import React, { useEffect, useRef } from "react";
import {
  StrapiRichDescription,
  hasRenderableDescription,
} from "@/components/common/StrapiRichDescription";
import { navigateToContactLikeLetsTalk } from "@/lib/letsTalkNavigation";

const FadeInUp = ({ index, children, className }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 100}ms`;
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);
  return (
    <div ref={ref} className={`fade-in-up ${className ?? ""}`}>
      {children}
    </div>
  );
};

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://new-nolcha-strapi-uiai.onrender.com";

const resolveMediaUrl = (media) => {
  if (!media) return null;

  const rawUrl =
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url ||
    media?.url ||
    (typeof media === "string" ? media : null);

  if (!rawUrl) return null;
  return rawUrl.startsWith("http") ? rawUrl : `${STRAPI_BASE_URL}${rawUrl}`;
};

const DEFAULT_PARAGRAPHS = [
  "For Over 15 Years, Nolcha Has Been At The Forefront Of **Technology, Culture, And Immersive Experiences** Producing High-Impact Events, Summits, And Activations For Visionary Brands And The World's Leading Blockchain, AI, And Crypto Conferences.",
  "We Unite Communities, Spark Collaboration, And Create Business Through Creativity, Innovation, And Human Connection.",
];

const DEFAULT_PARTNER_LOGOS = [
  { name: "Mercedes-Benz", logo: "homepage/build_momentum_section/mercedes.png" },
  { name: "Bullish", logo: "homepage/build_momentum_section/bullish.png" },
  { name: "Galaxy", logo: "homepage/build_momentum_section/galaxy.png" },
  { name: "OKX", logo: "homepage/build_momentum_section/okx.png" },
  { name: "Coca Cola", logo: "homepage/build_momentum_section/cocacola.png" },
  { name: "CoinDesk", logo: "homepage/build_momentum_section/coindesk.png" },
];

const BuildMomentumSection = ({ buildMomentumData }) => {
  const eyebrow =
    buildMomentumData?.eyebrow?.trim() ||
    buildMomentumData?.label?.trim() ||
    "";
  const heading =
    buildMomentumData?.heading || "We Build Cultural Momentum";

  const ctaText =
    buildMomentumData?.ctaText == null
      ? "GET IN TOUCH"
      : String(buildMomentumData.ctaText).trim();
  const ctaUrl =
    (buildMomentumData?.ctaUrl == null
      ? "/#contact"
      : String(buildMomentumData.ctaUrl).trim()) || "/#contact";
  const isExternalCta =
    ctaUrl.startsWith("http://") || ctaUrl.startsWith("https://");

  const cmsParagraphs = (buildMomentumData?.paragraphs || []).filter((entry) =>
    hasRenderableDescription(entry?.text)
  );

  const partnerLogos =
    buildMomentumData?.logos?.length > 0
      ? buildMomentumData.logos
          .map((logo, index) => ({
            name:
              logo?.alternativeText ||
              logo?.name ||
              logo?.caption ||
              `Logo ${index + 1}`,
            logo: resolveMediaUrl(logo),
          }))
          .filter((entry) => entry.logo)
      : DEFAULT_PARTNER_LOGOS;

  return (
    <section className="w-full bg-[#F7F5EC] text-[#1A1A1A] py-8 lg:py-16 lg:px-11 px-5 flex items-center">
      <div className="mx-auto w-full text-left">
        {eyebrow ? (
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`text-[36px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1A1A1A] lg:text-[50px] mb-5 lg:mb-10 text-left ${
            eyebrow ? "mt-3" : ""
          }`}
        >
          {heading}
        </h2>

        <div className="flex w-full flex-col gap-6 text-left lg:w-[80%] lg:max-w-[80%]">
          {cmsParagraphs.length > 0
            ? cmsParagraphs.map((entry, index) => (
                <StrapiRichDescription
                  key={entry.id ?? index}
                  value={entry.text}
                  variant="buildMomentum"
                />
              ))
            : DEFAULT_PARAGRAPHS.map((text, index) => (
                <StrapiRichDescription
                  key={index}
                  value={text}
                  variant="buildMomentum"
                />
              ))}
        </div>

        {ctaText ? (
          isExternalCta ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 lg:mt-10 mb-8 lg:mb-12 inline-flex w-fit items-center gap-1 text-[10px] lg:text-[16px] font-normal uppercase tracking-[0.12em] text-[#1A1A1A] hover:text-[#1A1A1A]/70"
            >
              <span>{ctaText}</span>
              <span aria-hidden>↗</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => navigateToContactLikeLetsTalk()}
              className="mt-8 lg:mt-10 mb-8 lg:mb-12 inline-flex w-fit items-center gap-1 border-0 bg-transparent p-0 text-left text-[10px] lg:text-[16px] font-normal uppercase tracking-[0.12em] text-[#1A1A1A] hover:text-[#1A1A1A]/70 cursor-pointer"
            >
              <span>{ctaText}</span>
              <span aria-hidden>↗</span>
            </button>
          )
        ) : null}

        <div className="border-t border-[#1A1A1A]/15 pt-8 lg:pt-12 mb-6 lg:mb-12 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-10 lg:gap-8 w-full">
          {partnerLogos.map((partner, index) => (
            <FadeInUp
              key={index}
              index={index}
              className="flex flex-col items-start lg:items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 lg:flex-1 lg:min-w-[200px]"
            >
              <div className="h-16 lg:h-20 2xl:h-28 flex items-center justify-start lg:justify-center w-full">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto max-w-[180px] 2xl:max-w-[280px] object-contain filter grayscale brightness-0 opacity-80"
                  />
                ) : (
                  <span className="text-[10px] sm:text-[11px] lg:text-[14px] font-bold uppercase tracking-wider text-left lg:text-center leading-tight">
                    {partner.name}
                  </span>
                )}
              </div>
            </FadeInUp>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildMomentumSection;
