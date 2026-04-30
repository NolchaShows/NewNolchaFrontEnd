"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <section className="w-full bg-[#F3F3F3] text-[#1A1A1A] py-8 lg:py-16 lg:px-11 px-5 flex items-center">
      <div className="mx-auto text-center w-full">
        {/* Heading */}
        <h2 className="text-[34px] lg:text-[60px] font-medium mb-11 lg:mb-22">
          {heading}
        </h2>

        {/* Paragraphs */}
        <div className="mx-auto mb-16 lg:mb-24 flex flex-col gap-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[20px] lg:text-[36px] text-[#1A1A1A]/80 font-normal"
            >
              {typeof paragraph === "string" ? paragraph : (paragraph.text || paragraph)}
            </p>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-10 lg:gap-8 mb-6 lg:mb-12 w-full">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-start lg:items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 lg:flex-1 lg:min-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
            >
              <div className="h-20 lg:h-24 2xl:h-36 flex items-center justify-start lg:justify-center w-full">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto max-w-[220px] 2xl:max-w-[340px] object-contain filter grayscale brightness-0 opacity-80"
                  />
                ) : (
                  <span className="text-[10px] sm:text-[11px] lg:text-[14px] font-bold uppercase tracking-wider text-left lg:text-center leading-tight">
                    {partner.name}
                  </span>
                )}
              </div>
              {partner.status && (
                <span className="text-[10px] lg:text-[12px] font-medium text-[#1A1A1A]/60 uppercase text-left lg:text-center leading-tight">
                  {partner.status}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildMomentumSection;
