import React from "react";

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
        >
          <source src={item.url} type="video/mp4" />
        </video>
      );
    }
    return (
      <img
        src={item.url}
        alt="Gallery content"
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <section className="w-full px-2 py-4 lg:px-4 lg:py-8" style={{ backgroundColor: background }}>
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {items.map((item, index) => {
            let colSpan = "col-span-1";
            let height = "h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]";

            // Mimicking the specific layout from the image:
            // Row 1: 3 images (1/3 each)
            // Row 2: 3 images (1/3 each)
            // Row 3: 1 large image (full width)
            // Row 4: 3 images (1/3 each)
            // Row 5: 3 images (1/3 each)
            // Row 6: 1 large image (full width)
            // Row 7: 3 images (1/3 each)

            if (index === 6 || index === 13) {
              colSpan = "md:col-span-3";
              height = "h-[300px] md:h-[600px] lg:h-[800px] xl:h-[1000px]";
            }

            return (
              <div
                key={index}
                className={`${colSpan} ${height} relative overflow-hidden bg-white`}
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
