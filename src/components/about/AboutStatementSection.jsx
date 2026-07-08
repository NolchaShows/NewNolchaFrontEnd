"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { navigateToContactLikeLetsTalk } from "@/lib/letsTalkNavigation";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";
import { hasRenderableDescription, splitAboutHeadlineLines, ABOUT_HEADLINE_TEXT_CLASS } from "@/lib/strapiRichText";

const defaultRightItems = [
  "WE BUILD WORLDS",
  "WE CREATE CHARACTERS",
  "WE ENTERTAIN THEM",
];

const isExternalHref = (href) =>
  typeof href === "string" &&
  (href.startsWith("http://") || href.startsWith("https://"));

/** Break headline into lines (newlines, <br>, or legacy period breaks). */
const splitHeadlineLines = (text) => splitAboutHeadlineLines(text);

export default function AboutStatementSection({
  label = "[ WHO WE ARE ]",
  headline = "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
  description = "At the intersection of entertainment and advertising. MATTE is a brand of 10 years-serving its own audience whilst offering multidisciplinary strategic, creative, and production services for brands and artists, and exposing the opportunities in between.",
  ctaText = "GET IN TOUCH",
  ctaHref = "/contact-us",
  rightItems = defaultRightItems,
}) {
  const router = useRouter();
  const href = ctaHref || "/contact-us";
  const ctaClassName =
    "inline-flex items-center gap-2 text-[10px] lg:text-[16px] uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors mt-auto cursor-pointer";

  const ctaInner = (
    <>
      <span>{ctaText}</span>
      <span aria-hidden className="inline-block">
        ↗
      </span>
    </>
  );

  return (
    <section className="w-full bg-[#F4F4F4] py-16 px-5 lg:py-32 lg:px-11 font-sans text-[#111111] overflow-hidden">
      <div className="mx-auto max-w-[1800px]">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-2 lg:mb-4"
        >
          <p className="text-[10px] lg:text-[14px] font-mono font-medium uppercase tracking-wider text-[#333333]">
            {label}
          </p>
        </motion.div>

        {/* Huge Headline — rich text from Strapi (blocks / markdown) or plain string fallback */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mb-8 lg:mb-17"
        >
          {hasRenderableDescription(headline) ? (
            <div className="m-0 p-0" role="heading" aria-level={2}>
              <StrapiRichDescription
                value={headline}
                variant="aboutHeadline"
              />
            </div>
          ) : (
            <h2 className={ABOUT_HEADLINE_TEXT_CLASS}>
              {splitHeadlineLines(headline).map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h2>
          )}
        </motion.div>

        {/* Bottom Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Paragraph and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col gap-4 lg:gap-8"
          >
            <StrapiRichDescription
              value={description}
              className="max-w-[850px] text-[16px] font-normal leading-[1.28] text-[#1D1D1D] sm:text-[18px] sm:leading-[1.32] lg:text-[22px] lg:leading-[1.4] [&_p]:m-0"
            />

            {isExternalHref(href) ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClassName}
              >
                {ctaInner}
              </a>
            ) : (
              <button
                type="button"
                className={`${ctaClassName} border-0 bg-transparent p-0 text-left`}
                onClick={() => navigateToContactLikeLetsTalk()}
              >
                {ctaInner}
              </button>
            )}
          </motion.div>

          {/* Right Column: Monospace List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="lg:col-span-5 xl:col-span-4 lg:col-start-9 flex lg:justify-end"
          >
            <div className="flex flex-col gap-[2px] text-[10px] sm:text-[12px] lg:text-[13px] uppercase tracking-wide text-[#111111] leading-[1.6]">
              {(rightItems || []).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
