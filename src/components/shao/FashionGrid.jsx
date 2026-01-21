import React from "react";

const FashionGrid = ({ 
  leftVideo = "", 
  rightVideo = "", 
  images = [],
  background = "#FEF991" 
}) => {
  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="">
        <div className="bg-[#FEF991]">
          <div className="grid grid-cols-1 md:grid-cols-5 bg-[#FEF991]">
            {/* Left Video */}
            <div className="hidden md:block relative h-[300px] lg:h-[1008px] 2xl:h-[1792px] bg-white">
              {leftVideo ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={leftVideo} type="video/mp4" />
                </video>
              ) : null}
            </div>

            {/* 5 Image Boxes - Arranged like the fashion collage */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-3 grid-rows-3 h-[438px] lg:h-[1008px] 2xl:h-[1792px]">
              {/* Top row - 2 horizontal rectangles */}
              <div className="col-span-3 row-span-1 bg-white">
                <img
                  src={images[0]}
                  alt="Fashion image 1"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Middle row - 3 squares */}
              <div className="col-span-1 row-span-1 bg-white">
                <img
                  src={images[1]}
                  alt="Fashion image 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-1 bg-white">
                <img
                  src={images[2]}
                  alt="Fashion image 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-1 bg-white">
                <img
                  src={images[3]}
                  alt="Fashion image 4"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Bottom row - 1 horizontal rectangle */}
              <div className="col-span-3 row-span-1 bg-white">
                <img
                  src={images[4]}
                  alt="Fashion image 5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Video */}
            <div className="hidden md:block relative h-[300px] lg:h-[1008px] 2xl:h-[1792px] bg-white">
              {rightVideo ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={rightVideo} type="video/mp4" />
                </video>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionGrid;
