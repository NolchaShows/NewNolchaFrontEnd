"use client";

import React from "react";
import SectionTitle from "../common/SectionTitle";
import RoundedCtaButton from "../common/RoundedCtaButton";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

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

const renderParagraph = (paragraph, index) => {
  if (!paragraph) return null;

  if (typeof paragraph === "string") {
    return (
      <p
        key={index}
        className="text-[16px] lg:text-[22px] xl:text-[28px] 2xl:text-[36px] xxl:text-[48px] 3xl:text-[64px] text-white leading-relaxed"
      >
        {paragraph}
      </p>
    );
  }

  const fullText = paragraph.text || "";
  const hasHighlightedParts =
    paragraph.text_before || paragraph.highlight || paragraph.text_after;

  return (
    <p
      key={paragraph.id || index}
      className="text-[16px] lg:text-[22px] xl:text-[28px] 2xl:text-[36px] xxl:text-[48px] 3xl:text-[64px] text-white leading-relaxed"
    >
      {hasHighlightedParts ? (
        <>
          {paragraph.text_before}
          {paragraph.highlight ? (
            <span className="font-bold">{paragraph.highlight}</span>
          ) : null}
          {paragraph.text_after}
        </>
      ) : (
        fullText
      )}
    </p>
  );
};

const BuildMomentumSection = ({ buildMomentumData }) => {
  const defaultPartnerLogos = [
    { name: "Mercedes-Benz", logo: 'homepage/build_momentum_section/mercedes.png' },
    { name: "Bullish", logo: 'homepage/build_momentum_section/bullish.png' },
    { name: "Galaxy", logo: 'homepage/build_momentum_section/galaxy.png' },
    { name: "OKX", logo: 'homepage/build_momentum_section/okx.png' },
    { name: "Coca Cola", logo: 'homepage/build_momentum_section/cocacola.png' },
    { name: "CoinDesk", logo: 'homepage/build_momentum_section/coindesk.png' },
  ];

  const defaultParagraphs = [
    <>
      For Over 15 Years, Nolcha Has Been At The Forefront Of{" "}
      <span className="font-bold">
        Technology, Culture, And Immersive Experiences
      </span>{" "}
      Producing High-Impact Events, Summits, And Activations For Visionary
      Brands And The World's Leading Blockchain, AI, And Crypto Conferences.
    </>,
    "We Unite Communities, Spark Collaboration, And Create Business Through Creativity, Innovation, And Human Connection.",
  ];

  const heading =
    buildMomentumData?.heading || "We Build Cultural Momentum";

  const paragraphs =
    buildMomentumData?.paragraphs?.length > 0
      ? buildMomentumData.paragraphs
      : defaultParagraphs;

  const partnerLogos =
    buildMomentumData?.logos?.length > 0
      ? buildMomentumData.logos.map((logo, index) => ({
          name:
            logo?.name ||
            logo?.alternativeText ||
            logo?.caption ||
            `Logo ${index + 1}`,
          logo: resolveMediaUrl(logo?.image || logo),
          status: logo?.status || "",
        }))
      : defaultPartnerLogos;

  return (
    <section className="w-full min-h-screen bg-[#F3F3F3] text-[#1A1A1A] py-20 lg:py-32 px-6 lg:px-20 flex items-center">
      <div className="mx-auto text-center w-full">
        {/* Heading */}
        <h2 className="text-[32px] lg:text-[56px] font-bold mb-12 lg:mb-20">
          {heading}
        </h2>

        {/* Paragraphs */}
        <div className="mx-auto mb-16 lg:mb-24 flex flex-col gap-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[18px] lg:text-[24px] text-[#1A1A1A]/80 font-medium"
            >
              {typeof paragraph === "string" ? paragraph : (paragraph.text || paragraph)}
            </p>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="flex items-center justify-between gap-4 lg:gap-8 w-full overflow-x-auto scrollbar-hide">
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 flex-1 min-w-[100px]"
            >
              <div className="h-10 lg:h-14 flex items-center justify-center w-full">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full w-auto object-contain filter grayscale brightness-0 opacity-80"
                  />
                ) : (
                  <span className="text-[12px] lg:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {partner.name}
                  </span>
                )}
              </div>
              {partner.status && (
                <span className="text-[10px] lg:text-[12px] font-medium text-[#1A1A1A]/60 uppercase whitespace-nowrap">
                  {partner.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildMomentumSection;
