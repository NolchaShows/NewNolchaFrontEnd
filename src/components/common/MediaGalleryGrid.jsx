import React from "react";
import { motion } from "framer-motion";

const DEFAULT_ASPECT_RATIO = "2 / 3";
const GRID_TILE_RATIO = 2 / 3;

const MediaGalleryGrid = ({ items = [], background = "#F3F3F3" }) => {
  const getItemStyle = (item) => {
    if (item.fullWidth) {
      return undefined;
    }

    return { aspectRatio: DEFAULT_ASPECT_RATIO };
  };

  const getMediaClassName = (item) => {
    if (item.fullWidth) {
      return "w-full h-auto object-contain";
    }

    if (!item.width || !item.height) {
      return "w-full h-full object-cover";
    }

    const mediaRatio = item.width / item.height;

    if (mediaRatio < GRID_TILE_RATIO) {
      return "w-full h-full object-cover";
    }

    return "w-full h-full object-cover";
  };

  const renderMedia = (item) => {
    const mediaClassName = getMediaClassName(item);

    if (item.type === "video") {
      const showControls = Boolean(item.fullWidth);
      return (
        <video
          src={item.url}
          className={mediaClassName}
          autoPlay={!showControls}
          muted={!showControls}
          loop={!showControls}
          controls={showControls}
          playsInline
          preload="metadata"
        >
          <source src={item.url} />
        </video>
      );
    }

    return (
      <img
        src={item.url}
        alt={item.alt || "Gallery content"}
        className={mediaClassName}
        width={item.width || undefined}
        height={item.height || undefined}
      />
    );
  };

  const renderContentSection = (item) => (
    <div className="md:col-span-3">
      <div className="grid grid-cols-12 items-start gap-x-10 gap-y-4">
        <div className="col-span-12 md:col-span-5">
          {item.label ? (
            <span className="text-[16px] font-bold uppercase text-[#1d1d1d]">
              {item.label}
            </span>
          ) : null}
        </div>
        <div className="col-span-12 md:col-span-7">
          {item.description ? (
            <p
              className="max-w-[900px] text-[15px] text-[#4a4a4a] lg:text-[16px]"
              style={{ fontFamily: "var(--font-schibsted-grotesk)" }}
            >
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="w-full"
      style={{ backgroundColor: background }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => {
            if (item.type === "contentSection") {
              return (
                <motion.div
                  key={`${item.label || "content"}-${index}`}
                  className="md:col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {renderContentSection(item)}
                </motion.div>
              );
            }

            const isFullWidth = Boolean(item.fullWidth);
            const colSpan = isFullWidth ? "md:col-span-3" : "col-span-1";

            return (
              <motion.div
                key={`${item.url}-${index}`}
                className={`${colSpan} relative overflow-hidden bg-white`}
                style={getItemStyle(item)}
                data-width={item.width || undefined}
                data-height={item.height || undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: isFullWidth ? 0 : (index % 3) * 0.1,
                }}
              >
                {renderMedia(item)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaGalleryGrid;
