import React, { useState } from "react";

const FashionGrid = ({ 
  leftVideo = "", 
  rightVideo = "", 
  images = [],
  background = "#FEF991" 
}) => {
  const [leftVideoError, setLeftVideoError] = useState(false);
  const [rightVideoError, setRightVideoError] = useState(false);
  const [leftVideoLoading, setLeftVideoLoading] = useState(true);
  const [rightVideoLoading, setRightVideoLoading] = useState(true);
  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="">
        <div className="bg-[#FEF991]">
          <div className="grid grid-cols-1 md:grid-cols-5 bg-[#FEF991]">
            {/* Left Video */}
            <div className="hidden md:block relative h-[300px] lg:h-[1008px] 2xl:h-[1792px] bg-white">
              {leftVideo && !leftVideoError ? (
                <>
                  {leftVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  <video
                    src={leftVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadStart={() => setLeftVideoLoading(true)}
                    onCanPlay={() => setLeftVideoLoading(false)}
                    onError={() => {
                      setLeftVideoError(true);
                      setLeftVideoLoading(false);
                    }}
                    preload="metadata"
                  />
                </>
              ) : leftVideoError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500 text-sm">Video unavailable</p>
                </div>
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
              {rightVideo && !rightVideoError ? (
                <>
                  {rightVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  <video
                    src={rightVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadStart={() => setRightVideoLoading(true)}
                    onCanPlay={() => setRightVideoLoading(false)}
                    onError={() => {
                      setRightVideoError(true);
                      setRightVideoLoading(false);
                    }}
                    preload="metadata"
                  />
                </>
              ) : rightVideoError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500 text-sm">Video unavailable</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionGrid;
