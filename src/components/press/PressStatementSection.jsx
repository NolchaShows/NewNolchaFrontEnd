"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const defaultHeadline =
  "NOLCHA'S PROJECTS CONNECT STRATEGY, CREATIVITY, AND PRODUCTION IN A NEW PRACTICE TO CREATE WORLDS THAT INSPIRE, ENTERTAIN, AND ENRICH.";

/**
 * Editorial statement block (MATTE-style grid) — light surface,
 * label column + headline + CTA. Used on the press page below the logo slider.
 */
export default function PressStatementSection({
  label = "[ PROJECTS ]",
  headline = defaultHeadline,
  ctaText = "GET IN TOUCH",
  ctaHref = "/contact-us",
}) {
  return (
    <section className="w-full bg-[#F3F3F3] py-12 lg:py-30 px-5 lg:px-11">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-[10px] lg:text-[14px] font-normal uppercase text-[#1D1D1D]">
              {label}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-9 flex flex-col gap-8 lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <h2 className="text-[28px] lg:text-[50px] font-normal uppercase text-[#1A1A1A]">
              {headline}
            </h2>

            <Link
              href={ctaHref}
              className="inline-flex w-fit items-center gap-1 text-[10px] lg:text-[16px] font-normal uppercase text-[#1D1D1D] underline-offset-4 transition-colors hover:text-[#1A1A1A] hover:underline"
            >
              <span>{ctaText}</span>
              <span aria-hidden className="inline-block translate-y-px">
                ↗
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
