"use client"
import React, { useState } from "react";

const Gallery = ({ images }) => {
  const [visibleImagesCount, setVisibleImagesCount] = useState(9);

  const displayedImages = images.slice(0, visibleImagesCount);
  const hasMoreImages = visibleImagesCount < images.length;
  const showingAllImages = visibleImagesCount >= images.length && images.length > 9;

  const showMoreImages = () => {
    setVisibleImagesCount(prev => prev + 6);
  };

  const showLessImages = () => {
    setVisibleImagesCount(9);
  };

  return (
    <>
      {images && images.length > 0 && (
        <div className="rounded-2xl mb-10">

          <div className="px-4 py-10 md:px-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image || "/api/placeholder/300/300"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {(hasMoreImages || showingAllImages) && (
              <div className="text-center mt-6">
                {hasMoreImages ? (
                  <button
                    onClick={showMoreImages}
                    className="bg-[#e0ebd2] text-[#0d3d2d] px-8 py-3 font-medium cursor-pointer rounded-lg hover:bg-[#c5e6c5] transition-colors 2xl:text-2xl duration-200 w-full md:w-fit"
                  >
                    View more
                  </button>
                ) : (
                  <button
                    onClick={showLessImages}
                    className="bg-[#e0ebd2] text-[#0d3d2d] px-8 py-3 font-medium cursor-pointer rounded-lg hover:bg-[#c5e6c5] transition-colors 2xl:text-2xl duration-200 w-full md:w-fit"
                  >
                    View less
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery