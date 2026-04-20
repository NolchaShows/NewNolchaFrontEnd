"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutStatementSection() {
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
            [ WHO WE ARE ]
          </p>
        </motion.div>

        {/* Huge Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mb-10 lg:mb-20"
        >
          <h2 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[100px] leading-[0.95] tracking-[-0.04em] uppercase font-normal text-[#111111] m-0 p-0">
            MATTE IS A CREATIVE
            <br className="hidden sm:block" /> COMPANY FROM NEW YORK
          </h2>
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
            <p className="text-[20px] sm:text-[22px] lg:text-[28px] leading-[1.3] font-normal text-[#1D1D1D] max-w-[850px] m-0">
              At the intersection of entertainment and advertising. MATTE is a
              brand of 10 years—serving its own audience whilst offering
              multidisciplinary strategic, creative, and production services for
              brands and artists, and exposing the opportunities in between.
            </p>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 text-[10px] lg:text-[16px] uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors mt-auto"
            >
              <span>GET IN TOUCH</span>
              <span aria-hidden className="inline-block">
                ↗
              </span>
            </Link>
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
              <span>WE BUILD WORLDS</span>
              <span>WE CREATE CHARACTERS</span>
              <span>WE ENTERTAIN THEM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
