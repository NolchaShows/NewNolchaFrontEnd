import React from "react";

const FashionGrid3x3 = ({
  images = [],
  background = "#FEF991"
}) => {
  // Ensure we have exactly 9 images, pad with empty strings if needed
  const paddedImages = [...images];
  while (paddedImages.length < 9) {
    paddedImages.push("");
  }

  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="">
        <div className="bg-[#FEF991]">
          {/* Row 1: 3 images */}
          <div className="grid grid-cols-3 gap-1 lg:gap-2.5 2xl:gap-4.5 mb-1 lg:mb-2.5 2xl:mb-4.5">
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[0] ? (
                <img
                  src={paddedImages[0]}
                  alt="Fashion image 1"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[1] ? (
                <img
                  src={paddedImages[1]}
                  alt="Fashion image 2"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[2] ? (
                <img
                  src={paddedImages[2]}
                  alt="Fashion image 3"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: 2 images */}
          <div className="grid grid-cols-2 gap-1 lg:gap-2.5 2xl:gap-4.5 mb-1 lg:mb-2.5 2xl:mb-4.5">
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[3] ? (
                <img
                  src={paddedImages[3]}
                  alt="Fashion image 4"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[4] ? (
                <img
                  src={paddedImages[4]}
                  alt="Fashion image 5"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Row 3: 3 images */}
          <div className="grid grid-cols-3 gap-1 lg:gap-2.5 2xl:gap-4.5">
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[5] ? (
                <img
                  src={paddedImages[5]}
                  alt="Fashion image 6"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[6] ? (
                <img
                  src={paddedImages[6]}
                  alt="Fashion image 7"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="relative h-[166px] lg:h-[480px] 2xl:h-[854px] bg-white">
              {paddedImages[7] ? (
                <img
                  src={paddedImages[7]}
                  alt="Fashion image 8"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionGrid3x3;
