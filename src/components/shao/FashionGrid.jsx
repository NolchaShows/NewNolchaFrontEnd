import React from "react";

const FashionGrid = ({ 
  leftVideo = "", 
  rightVideo = "", 
  images = [],
  leftMedia = null,
  rightMedia = null,
  mediaItems = null,
  background = "#FEF991" 
}) => {
  const resolvedLeft = leftMedia || (leftVideo ? { type: "video", url: leftVideo } : null);
  const resolvedRight = rightMedia || (rightVideo ? { type: "video", url: rightVideo } : null);
  const resolvedItems = mediaItems && mediaItems.length > 0 ? mediaItems : images;

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

  const renderSideMedia = (media) => {
    if (!media) return null;
    if (media.type === "image") {
      return <img src={media.url} alt="Side media" className="w-full h-full object-cover" />;
    }
    return (
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={media.url} type="video/mp4" />
      </video>
    );
  };
  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="">
        <div className="bg-[#FEF991]">
          <div className="grid grid-cols-1 md:grid-cols-5 bg-[#FEF991]">
            {/* Left Video */}
            <div className="hidden md:block relative h-[300px] lg:h-[1008px] 2xl:h-[1792px] bg-white">
              {renderSideMedia(resolvedLeft)}
            </div>

            {/* 5 Image Boxes - Arranged like the fashion collage */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-3 grid-rows-3 h-[438px] lg:h-[1008px] 2xl:h-[1792px]">
              {/* Top row - 2 horizontal rectangles */}
              <div className="col-span-3 row-span-1 bg-white">
                {renderItem(resolvedItems[0], "Fashion image 1")}
              </div>
              
              {/* Middle row - 3 squares */}
              <div className="col-span-1 row-span-1 bg-white">
                {renderItem(resolvedItems[1], "Fashion image 2")}
              </div>
              <div className="col-span-1 row-span-1 bg-white">
                {renderItem(resolvedItems[2], "Fashion image 3")}
              </div>
              <div className="col-span-1 row-span-1 bg-white">
                {renderItem(resolvedItems[3], "Fashion image 4")}
              </div>
              
              {/* Bottom row - 1 horizontal rectangle */}
              <div className="col-span-3 row-span-1 bg-white">
                {renderItem(resolvedItems[4], "Fashion image 5")}
              </div>
            </div>

            {/* Right Video */}
            <div className="hidden md:block relative h-[300px] lg:h-[1008px] 2xl:h-[1792px] bg-white">
              {renderSideMedia(resolvedRight)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionGrid;
