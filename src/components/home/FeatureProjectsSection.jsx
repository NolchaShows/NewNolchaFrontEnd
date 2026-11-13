"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { featureProjectsData } from "@/data/featureProjectsData";
import { X, ExternalLink } from "lucide-react";

function FeatureCard({ project, onPreview }) {
  const isExternal =
    project.href &&
    (project.href.startsWith("http://") || project.href.startsWith("https://"));

  // Calculate natural aspect ratio to let cards have different heights (masonry effect)
  const hasDimensions = project.width && project.height;
  const aspectRatioStyle = project.isLogo
    ? { minHeight: "150px" }
    : hasDimensions
    ? { aspectRatio: `${project.width} / ${project.height}` }
    : { aspectRatio: "4 / 3" };

  return (
    <a
      href={project.href || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex flex-col p-[14px] md:p-[18px] border border-[#E2E2DE] hover:border-[#0B0B0C]/40 bg-white transition-colors duration-200 min-h-[168px] text-left text-inherit no-underline w-full"
    >
      {/* Photo frame: negative margins to touch borders, variable natural height */}
      <div
        className={`-mx-[14px] -mt-[14px] mb-2 md:-mx-[18px] md:-mt-[18px] md:mb-2 overflow-hidden bg-[#F3F3F1] relative ${
          project.isLogo ? "flex items-center justify-center p-6 min-h-[140px]" : "w-[calc(100%+28px)] md:w-[calc(100%+36px)]"
        }`}
        style={aspectRatioStyle}
      >
        {project.image ? (
          project.isLogo ? (
            <div className="relative w-full h-full flex items-center justify-center py-6">
              <Image
                src={project.image}
                alt={project.alt || project.title || "Project Logo"}
                width={project.width || 1297}
                height={project.height || 213}
                className="max-h-[50px] w-auto object-contain"
                unoptimized
              />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.alt || project.title || "Feature Project"}
              fill
              sizes="(min-width: 1240px) 290px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover w-full h-full"
              loading="lazy"
              unoptimized
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#62625F] text-[13px]">
            No image available
          </div>
        )}
      </div>

      {/* Card Title */}
      <h3 className="text-[19px] sm:text-[21px] md:text-[24px] lg:text-[26px] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#0B0B0C] break-words group-hover:underline decoration-2 underline-offset-4 mt-1">
        {project.title}
      </h3>

      {/* Presenter / Collaborator subtitle */}
      {project.presenter && (
        <p className="mt-auto pt-3 text-[14px] leading-[1.4] text-[#62625F]">
          {project.presenter}
        </p>
      )}
    </a>
  );
}

export default function FeatureProjectsSection({
  label = "Features",
  title = "Feature Projects",
  description = "Large-scale installations and site-specific works throughout the event.",
  projects = featureProjectsData,
  className = "",
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [columnCount, setColumnCount] = useState(4);

  const items = Array.isArray(projects) && projects.length > 0 ? projects : featureProjectsData;

  // Responsive column count matching InScope breakpoints:
  // <640px: 1 col, 640-767px: 2 cols, 768-1079px: 3 cols, >=1080px: 4 cols
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 768) {
        setColumnCount(2);
      } else if (width < 1080) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute items into columns round-robin (k % columnCount)
  // This preserves left-to-right reading order across rows while allowing
  // natural masonry stacking where each column independently sizes its items.
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols;
  }, [items, columnCount]);

  return (
    <section
      id="features"
      aria-labelledby="features-h"
      className={`w-full bg-white text-[#0B0B0C] py-14 sm:py-16 lg:py-24 ${className}`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-11">
        {/* Section Header (.sh) */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-8 sm:mb-10 lg:mb-12">
          <div className="max-w-[760px] text-left">
            {label && (
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#62625F] mb-3 leading-[1.35]">
                {label}
              </p>
            )}
            <h2
              id="features-h"
              className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#0B0B0C]"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-[17px] sm:text-[19px] md:text-[21px] font-medium leading-[1.45] text-[#2A2A29] max-w-[54ch]">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* True Masonry Grid: columns flex layout with independent heights */}
        <div id="feature-list" className="flex gap-[12px] items-start w-full">
          {columns.map((colCards, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-[12px] min-w-0">
              {colCards.map((project) => (
                <FeatureCard
                  key={project.id}
                  project={project}
                  onPreview={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white border border-[#E2E2DE] p-6 sm:p-8 shadow-2xl flex flex-col gap-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-[#62625F] hover:text-[#0B0B0C] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedProject.image && (
              <div
                className="relative w-full bg-[#F3F3F1] overflow-hidden"
                style={{
                  aspectRatio: selectedProject.width && selectedProject.height
                    ? `${selectedProject.width} / ${selectedProject.height}`
                    : "16 / 9",
                  maxHeight: "65vh"
                }}
              >
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.alt || selectedProject.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            <div>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#62625F] mb-1">
                Feature Project
              </p>
              <h3 className="text-[26px] font-extrabold text-[#0B0B0C] tracking-tight">
                {selectedProject.title}
              </h3>
              {selectedProject.presenter && (
                <p className="mt-2 text-[15px] text-[#62625F]">
                  {selectedProject.presenter}
                </p>
              )}
            </div>

            {selectedProject.href && selectedProject.href !== "#" && (
              <a
                href={selectedProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-[#0B0B0C] text-white text-[14px] font-semibold w-fit hover:bg-[#2A2A29] transition-colors"
              >
                <span>View Full Feature</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
