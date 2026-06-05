"use client";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";

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

const MobileGalleryCarousel = ({ items, renderMedia, getItemStyle }) => {
  if (!items.length) return null;

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
      aria-label="Gallery carousel"
    >
      {items.map((item, index) => {
        const isFullWidth = Boolean(item.fullWidth);
        const slideWidth = isFullWidth
          ? "w-[min(92vw,420px)]"
          : "w-[min(78vw,300px)]";

        return (
          <div
            key={`${item.url || item.type}-${index}`}
            className={`${slideWidth} shrink-0 snap-start overflow-hidden bg-white`}
            style={getItemStyle(item)}
          >
            <div className="relative h-full w-full">{renderMedia(item, index)}</div>
          </div>
        );
      })}
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
    // Skip Next optimization only for Render.com (Strapi) cold-start latency.
    const isSlowOrigin =
      typeof item.url === "string" && item.url.includes(".onrender.com");
    const sizes = isFullWidth
      ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
      : "(max-width: 768px) 85vw, (max-width: 1280px) 45vw, 420px";

    return (
      <NextImage
        src={item.url}
        alt={item.alt || "Gallery content"}
        fill
        className="object-cover"
        sizes={sizes}
        quality={100}
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
            <StrapiRichDescription
              value={item.description}
              variant="experience"
            />
          ) : null}
        </div>
      </div>
    </div>
  );

  const contentSections = items.filter((item) => item.type === "contentSection");
  const mediaItems = items.filter((item) => item.type !== "contentSection");

  const renderGridItems = () =>
    items.map((item, index) => {
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
    });

  return (
    <section className="w-full pb-4 lg:pb-8" style={{ background }}>
      <div className="w-full">
        <div className="flex flex-col gap-8 md:hidden">
          {contentSections.map((item, index) => (
            <InViewFadeUp
              key={`${item.label || "content"}-mobile-${index}`}
              delay={200}
            >
              {renderContentSection(item)}
            </InViewFadeUp>
          ))}
          {mediaItems.length > 0 ? (
            <MobileGalleryCarousel
              items={mediaItems}
              renderMedia={renderMedia}
              getItemStyle={getItemStyle}
            />
          ) : null}
        </div>

        <div className="hidden gap-8 md:grid md:grid-cols-3">
          {renderGridItems()}
        </div>
      </div>
    </section>
  );
};

export default MediaGalleryGrid;
