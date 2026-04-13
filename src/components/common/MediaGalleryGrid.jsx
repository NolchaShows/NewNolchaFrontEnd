import React from "react";

const DEFAULT_ITEM_HEIGHT = "h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]";
const MediaGalleryGrid = ({ items = [], background = "#F3F3F3" }) => {
  const renderMedia = (item) => {
    const mediaClassName = item.fullWidth
      ? "w-full h-auto object-contain"
      : "w-full h-full object-cover";

    if (item.type === "video") {
      return (
        <video
          className={mediaClassName}
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
        className={mediaClassName}
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
            const isFullWidth = Boolean(item.fullWidth);

            const colSpan = isFullWidth ? "md:col-span-3" : "col-span-1";
            const height = isFullWidth ? "h-auto" : DEFAULT_ITEM_HEIGHT;

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
