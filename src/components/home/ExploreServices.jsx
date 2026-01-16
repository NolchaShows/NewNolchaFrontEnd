"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";

const ExploreServices = ({ title, image, caption, items }) => {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default

  const toggleItem = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section className="page-container bg-white py-[60px] lg:py-[100px] 2xl:py-[140px]">
      <SectionTitle className="text-black text-left mb-[30px] lg:mb-[50px] 2xl:mb-[70px]">{title}</SectionTitle>

      <div className="flex flex-col lg:flex-row gap-[10px] lg:gap-[30px] 2xl:gap-[60px]">
        {/* Left image with overlay caption */}
        <div className="relative w-[300px] lg:w-[435px] 2xl:w-[580px]">
          <div className="rounded-[14px] lg:rounded-[22px] 2xl:rounded-[40px] overflow-hidden relative">
            <img src={image} alt="services" className="w-full h-[340px] lg:h-[570px] 2xl:h-[700px] object-cover" />
            {/* Overlay text box at bottom-left */}
            {/* {caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-[16px] lg:p-[24px] 2xl:p-[32px]">
                <p className="text-white text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed">
                  {caption}
                </p>
              </div>
            )} */}
          </div>
        </div>

        {/* Right accordion list */}
        <div className="flex-1 flex flex-col">
          {items.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const itemTitle = `${item.label}: ${item.text}`;
            const description = item.description || "Fluent in innovation, tech, and crypto culture — we bridge creative vision with operational precision. From concept to completion, our team delivers full-scale event strategy, talent and programming, logistics, venue sourcing, art direction, and guest list curation. We handle every detail so your brand can own the moment — seamlessly merging storytelling, design, and experience.";
            const seeOurWork = item.work || "";
            const tagColors = [
              "bg-green-200 text-green-800",
              "bg-blue-200 text-blue-800",
              "bg-yellow-200 text-yellow-800",
              "bg-pink-200 text-pink-800"
            ];

            return (
              <div key={idx} className="bg-[#F3F3F3] mb-[10px] py-4 px-6 rounded-[6px] lg:rounded-[12px] 2xl:rounded-[20px]">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex justify-between items-center text-left transition-colors"
                >
                  <h3 className="text-[18px] lg:text-[28px] 2xl:text-[40px] text-black leading-[1.2] pr-4">
                    <span className="font-bold">{item.label}:</span>{" "}
                    <span className="font-normal">{item.text}</span>
                  </h3>
                  {/* Toggle Icon */}
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <svg
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div>
                        {/* Description */}
                        <p className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed mb-[6px] lg:mb-[10px] 2xl:mb-[14px] mt-[10px] lg:mt-[20px] 2xl:mt-[30px]">
                          {description}
                        </p>

                        {/* Scope of work */}
                        {seeOurWork && (
                          <div className="mb-[10px] lg:mb-[20px] 2xl:mb-[30px]">
                            <h4 className="text-black text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold mb-[12px] lg:mb-[10px] 2xl:mb-[14px]">
                              See our Work
                            </h4>
                            <div className="flex flex-wrap gap-[8px] lg:gap-[12px] 2xl:gap-[16px]">
                              <p className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] leading-relaxed mb-[6px] lg:mb-[10px] 2xl:mb-[14px]">
                                {seeOurWork}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Lets Talk Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById("contact");
                            if (!el) return;
                            const nav = document.querySelector(".sticky.top-0");
                            const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset -
                              navHeight -
                              12;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }}
                          className="group flex items-center gap-2 px-[16px] lg:px-[24px] 2xl:px-[32px] py-[10px] lg:py-[12px] 2xl:py-[14px] bg-[#FF6813] hover:bg-[#FF9640] text-white font-medium rounded-full text-[14px] lg:text-[16px] 2xl:text-[18px] transition-all duration-300"
                        >
                          <span>Lets Talk</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;


