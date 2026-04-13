import React from "react";

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
      return (
        <video
          src={item.url}
          className={mediaClassName}
          autoPlay
          muted
          loop
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

  return (
    <section
      className="w-full px-0 py-4 md:px-1 lg:px-2 lg:py-8"
      style={{ backgroundColor: background }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {items.map((item, index) => {
            const isFullWidth = Boolean(item.fullWidth);

            const colSpan = isFullWidth ? "md:col-span-3" : "col-span-1";

            return (
              <div
                key={`${item.url}-${index}`}
                className={`${colSpan} relative overflow-hidden bg-white`}
                style={getItemStyle(item)}
                data-width={item.width || undefined}
                data-height={item.height || undefined}
              >
                {renderMedia(item)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaGalleryGrid;
