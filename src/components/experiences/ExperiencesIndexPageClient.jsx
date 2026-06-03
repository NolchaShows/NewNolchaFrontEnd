"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExperienceListRow from "@/components/experiences/ExperienceListRow";
import {
  EXPERIENCES_INDEX_DEFAULTS,
  EXPERIENCE_CATEGORY_FILTERS,
} from "@/lib/experiencesIndexData";

/** Break headline into lines at each period (same as AboutStatementSection). */
const splitHeadlineLines = (text) => {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return [];
  if (!trimmed.includes(".")) return [trimmed];
  return trimmed
    .split(/(?<=\.)\s*/)
    .map((line) => line.trim())
    .filter(Boolean);
};

export default function ExperiencesIndexPageClient({
  label = EXPERIENCES_INDEX_DEFAULTS.label,
  headline = EXPERIENCES_INDEX_DEFAULTS.headline,
  filterLabel = EXPERIENCES_INDEX_DEFAULTS.filterLabel,
  experiences = [],
  filterOptions = EXPERIENCE_CATEGORY_FILTERS,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredExperiences = useMemo(() => {
    if (activeFilter === "all") return experiences;
    return experiences.filter((experience) =>
      (experience.categories || []).includes(activeFilter)
    );
  }, [activeFilter, experiences]);

  const headlineLines = splitHeadlineLines(headline);

  return (
    <main className="min-h-screen bg-[#F4F4F4] font-sans text-[#111111]">
      <section className="w-full overflow-hidden px-5 py-16 lg:px-11 lg:py-32">
        <div className="mx-auto max-w-[1800px]">
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 lg:mb-20"
          >
            {label ? (
              <p className="mb-2 text-[10px] font-mono font-medium uppercase tracking-wider text-[#333333] lg:mb-4 lg:text-[14px]">
                {label}
              </p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="mb-6 lg:mb-10"
            >
              <h1 className="m-0 p-0 text-[36px] font-normal uppercase leading-[0.95] tracking-[-0.04em] text-[#111111] sm:text-[48px] md:text-[60px] lg:text-[84px]">
                {headlineLines.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </motion.div>

            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#333333] transition-opacity hover:text-[#555555] lg:text-[14px]"
              aria-expanded={filtersOpen}
            >
              {filterLabel} {filtersOpen ? "−" : "+"}
            </button>

            {filtersOpen ? (
              <div className="mt-5 flex flex-wrap gap-2 lg:mt-6">
                {filterOptions.map((option) => {
                  const isActive = activeFilter === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setActiveFilter(option.id)}
                      className={`border border-[#111111] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors sm:text-[12px] lg:text-[13px] ${
                        isActive
                          ? "bg-[#111111] text-[#F4F4F4]"
                          : "bg-transparent text-[#111111] hover:opacity-70"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </motion.header>

          <div className="flex flex-col gap-12 lg:gap-16">
            {filteredExperiences.length > 0 ? (
              filteredExperiences.map((experience) => (
                <ExperienceListRow
                  key={experience.id}
                  title={experience.title}
                  tags={experience.tags}
                  href={experience.href}
                  images={experience.images}
                />
              ))
            ) : (
              <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#333333] sm:text-[12px] lg:text-[13px]">
                No experiences match this filter.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
