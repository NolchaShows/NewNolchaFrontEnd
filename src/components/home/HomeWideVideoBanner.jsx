"use client";
import React from "react";

/**
 * Wide banner video that matches `/homepage/less_height_image/top-image.png` aspect ratio (2880×711).
 */
export default function HomeWideVideoBanner({
  src,
  className = "",
  poster,
}) {
  return (
    <div className={className}>
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: "2880 / 711" }}
      >
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}

