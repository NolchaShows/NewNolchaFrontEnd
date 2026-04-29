"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_ASPECT_RATIO = "2 / 3";
const GRID_TILE_RATIO = 2 / 3;

const GalleryVideo = ({ item, className }) => {
  const [isReady, setIsReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef(null);
  const showControls = Boolean(item.fullWidth);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {item.poster && !isReady ? (
        <img
          src={item.poster}
          alt={item.alt || "Video thumbnail"}
          className={`absolute inset-0 h-full w-full ${className}`}
          width={item.width || undefined}
          height={item.height || undefined}
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <video
        src={shouldLoadVideo ? item.url : undefined}
        poster={item.poster || undefined}
        className={`${className} transition-opacity duration-300 ${
          item.poster ? (isReady ? "opacity-100" : "opacity-0") : "opacity-100"
        }`}
        autoPlay={shouldLoadVideo}
        muted
        loop
        controls={showControls}
        playsInline
        preload={shouldLoadVideo ? (showControls ? "metadata" : "none") : "none"}
        loading="lazy"
        onLoadedData={() => setIsReady(true)}
      >
        {shouldLoadVideo ? (
          <source src={item.url} type={item.mime || undefined} />
        ) : null}
      </video>
    </div>
  );
};

const MediaGalleryGrid = ({ items = [], background = "#F3F3F3" }) => {
  const getItemStyle = (item) => {
    if (item.fullWidth) {
      if (item.width && item.height) {
        return { aspectRatio: `${item.width} / ${item.height}` };
      }
      return { aspectRatio: "16 / 9" };
    }

    return { aspectRatio: DEFAULT_ASPECT_RATIO };
  };

  const getMediaClassName = (item) => {
    if (item.fullWidth) {
      return "w-full h-full object-cover";
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

  const renderMedia = (item, index) => {
    const mediaClassName = getMediaClassName(item);

    if (item.type === "video") {
      return <GalleryVideo item={item} className={mediaClassName} />;
    }

    return (
      <img
        src={item.url}
        alt={item.alt || "Gallery content"}
        className={mediaClassName}
        width={item.width || undefined}
        height={item.height || undefined}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={index < 2 ? "high" : "low"}
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
      className="w-full pb-4 lg:pb-8"
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
                {renderMedia(item, index)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaGalleryGrid;
