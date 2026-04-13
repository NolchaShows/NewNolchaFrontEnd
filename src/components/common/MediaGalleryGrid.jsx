import React from "react";

const DEFAULT_ITEM_HEIGHT = "h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]";
const COMPACT_ITEM_HEIGHT = "h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px]";
const FULL_WIDTH_HEIGHT = "h-[320px] md:h-[560px] lg:h-[760px] xl:h-[960px]";

const MediaGalleryGrid = ({ items = [], background = "#F3F3F3" }) => {
  const renderMedia = (item) => {
    if (item.type === "video") {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={item.url} type={item.mime || "video/mp4"} />
        </video>
      );
    }

    return (
      <img
        src={item.url}
        alt={item.alt || "Gallery content"}
        className="w-full h-full object-cover"
        width={item.width || undefined}
        height={item.height || undefined}
      />
    );
  };

  return (
    <section
      className="w-full px-2 py-4 lg:px-4 lg:py-8"
      style={{ backgroundColor: background }}
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {items.map((item, index) => {
            const isCompact = index === 1 || index === 2;
            const isFullWidth = Boolean(item.fullWidth);

            const colSpan = isFullWidth ? "md:col-span-3" : "col-span-1";
            const height = isFullWidth
              ? FULL_WIDTH_HEIGHT
              : isCompact
              ? COMPACT_ITEM_HEIGHT
              : DEFAULT_ITEM_HEIGHT;

            return (
              <div
                key={`${item.url}-${index}`}
                className={`${colSpan} ${height} relative overflow-hidden bg-white`}
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
