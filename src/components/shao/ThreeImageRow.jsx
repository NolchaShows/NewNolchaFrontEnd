import React from "react";

const ThreeImageRow = ({
  images = [],
  mediaItems = [],
  line1 = "",
  line2 = "",
  background = "#FEF991",
}) => {
  const resolvedItems = (mediaItems.length > 0 ? mediaItems : images).filter(Boolean);
  const itemCount = resolvedItems.length;
  const overlayIndex = Math.floor((itemCount - 1) / 2);

  const gridCols =
    itemCount <= 1
      ? "grid-cols-1"
      : itemCount === 2
        ? "grid-cols-1 lg:grid-cols-2"
        : "grid-cols-1 lg:grid-cols-3";

  const renderItem = (item, fallbackAlt) => {
    if (!item) return null;
    if (typeof item === "string") {
      return <img src={item} alt={fallbackAlt} className="w-full h-full object-cover" />;
    }
    if (item.type === "video") {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={item.url} type="video/mp4" />
        </video>
      );
    }
    return <img src={item.url} alt={fallbackAlt} className="w-full h-full object-cover" />;
  };

  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="py-[5px]">
        <div>
          <div className={`grid ${gridCols} gap-[5px]`}>
            {resolvedItems.map((item, idx) => (
              <div
                key={idx}
                className="relative h-[375px] lg:h-[525px] 2xl:h-[933px] bg-white"
              >
                {renderItem(item, `Visual ${idx + 1}`)}
                {idx === overlayIndex && (line1 || line2) && (
                  <div className="absolute inset-0 flex items-end justify-center pb-[18px] lg:pb-[48px] 2xl:pb-[86px]">
                    <div className="text-white text-center">
                      {line1 && (
                        <div className="text-[18px] lg:text-[36px] 2xl:text-[65px] font-medium leading-tight">
                          {line1}
                        </div>
                      )}
                      {line2 && (
                        <div className="text-[18px] lg:text-[36px] 2xl:text-[65px] font-medium leading-tight">
                          {line2}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeImageRow;


