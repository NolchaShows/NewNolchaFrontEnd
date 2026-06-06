"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExperienceListRow from "@/components/experiences/ExperienceListRow";
import {
  getExperienceCategorySectionId,
  UNCATEGORIZED_CATEGORY_ID,
} from "@/lib/experienceCategoryNav";
import { EXPERIENCES_INDEX_DEFAULTS } from "@/lib/experiencesIndexData";

const normalizeHash = (hash) =>
  decodeURIComponent(String(hash || "").replace(/^#/, "").trim());

export default function ExperiencesIndexPageClient({
  label = EXPERIENCES_INDEX_DEFAULTS.label,
  filterLabel = "",
  uncategorizedTitle = EXPERIENCES_INDEX_DEFAULTS.uncategorizedTitle,
  categories = [],
  uncategorizedExperiences = [],
  filterOptions = [{ id: "all", label: "ALL" }],
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const scrollToCategory = useCallback(
    (categorySlug, behavior = "smooth") => {
      if (!categorySlug) return;
      const el = document.getElementById(
        getExperienceCategorySectionId(categorySlug)
      );
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
      }
    },
    []
  );

  const applyHashFromUrl = useCallback(
    (behavior = "smooth") => {
      if (typeof window === "undefined") return;
      const hashSlug = normalizeHash(window.location.hash);
      if (!hashSlug) return;

      if (hashSlug === UNCATEGORIZED_CATEGORY_ID) {
        if (!uncategorizedExperiences.length) return;
        setActiveFilter(UNCATEGORIZED_CATEGORY_ID);
        requestAnimationFrame(() => {
          requestAnimationFrame(() =>
            scrollToCategory(UNCATEGORIZED_CATEGORY_ID, behavior)
          );
        });
        return;
      }

      const matched = categories.find((category) => category.id === hashSlug);
      if (!matched) return;

      setActiveFilter(hashSlug);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToCategory(hashSlug, behavior));
      });
    },
    [categories, scrollToCategory, uncategorizedExperiences.length]
  );

  useEffect(() => {
    applyHashFromUrl("auto");
  }, [applyHashFromUrl]);

  useEffect(() => {
    const onHashChange = () => applyHashFromUrl("smooth");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [applyHashFromUrl]);

  const filteredCategories = useMemo(() => {
    if (activeFilter === "all") return categories;
    if (activeFilter === UNCATEGORIZED_CATEGORY_ID) return [];
    return categories.filter((category) => category.id === activeFilter);
  }, [activeFilter, categories]);

  const showUncategorized = useMemo(() => {
    if (!uncategorizedExperiences.length) return false;
    if (activeFilter === "all") return true;
    return activeFilter === UNCATEGORIZED_CATEGORY_ID;
  }, [activeFilter, uncategorizedExperiences.length]);

  const hasVisibleContent = filteredCategories.length > 0 || showUncategorized;

  const handleFilterClick = (optionId) => {
    setActiveFilter(optionId);
    if (optionId === "all") {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/experiences");
      }
      return;
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/experiences#${optionId}`);
      requestAnimationFrame(() => scrollToCategory(optionId, "smooth"));
    }
  };

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

            {filterLabel && filterOptions.length > 1 ? (
              <>
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
                          onClick={() => handleFilterClick(option.id)}
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
              </>
            ) : null}
          </motion.header>

          <div className="flex flex-col gap-12 lg:gap-16">
            {filteredCategories.map((category) => (
              <ExperienceListRow
                key={category.id}
                categoryId={category.id}
                title={category.title}
                experiences={category.experiences}
              />
            ))}

            {showUncategorized ? (
              <ExperienceListRow
                categoryId={UNCATEGORIZED_CATEGORY_ID}
                title={uncategorizedTitle}
                experiences={uncategorizedExperiences}
              />
            ) : null}

            {!hasVisibleContent ? (
              <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#333333] sm:text-[12px] lg:text-[13px]">
                No experiences to display yet.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
