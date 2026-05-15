"use client";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

const InViewFadeUp = ({ children, className, style, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`fade-in-up ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
};

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
    if (item.type === "video") {
      return <GalleryVideo item={item} className={getMediaClassName(item)} />;
    }

    const isFullWidth = Boolean(item.fullWidth);
    // Skip optimization only for Render.com (Strapi) origins which can have
    // cold-start latency. R2 CDN is fast — let Next.js serve WebP/AVIF.
    const isSlowOrigin =
      typeof item.url === "string" && item.url.includes(".onrender.com");
    const sizes = isFullWidth
      ? "100vw"
      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

    return (
      <NextImage
        src={item.url}
        alt={item.alt || "Gallery content"}
        fill
        className="object-cover"
        sizes={sizes}
        priority={index < 2}
        loading={index < 2 ? "eager" : "lazy"}
        unoptimized={isSlowOrigin}
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
                <InViewFadeUp
                  key={`${item.label || "content"}-${index}`}
                  className="md:col-span-3"
                  delay={200}
                >
                  {renderContentSection(item)}
                </InViewFadeUp>
              );
            }

            const isFullWidth = Boolean(item.fullWidth);
            const colSpan = isFullWidth ? "md:col-span-3" : "col-span-1";

            return (
              <InViewFadeUp
                key={`${item.url}-${index}`}
                className={`${colSpan} relative overflow-hidden bg-white`}
                style={getItemStyle(item)}
                delay={isFullWidth ? 0 : (index % 3) * 100}
              >
                {renderMedia(item, index)}
              </InViewFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaGalleryGrid;
