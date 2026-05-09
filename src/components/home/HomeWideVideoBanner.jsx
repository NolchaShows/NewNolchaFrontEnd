"use client";
import React, { useRef, useEffect, useState } from "react";

/**
 * Wide banner video that matches `/homepage/less_height_image/top-image.png` aspect ratio (2880×711).
 * Video src is deferred until the element enters the viewport to avoid
 * loading off-screen autoplay videos on page load.
 */
export default function HomeWideVideoBanner({
  src,
  className = "",
  poster,
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className} ref={containerRef}>
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: "2880 / 711" }}
      >
        <video
          className="h-full w-full object-cover"
          src={inView ? src : undefined}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    </div>
  );
}
