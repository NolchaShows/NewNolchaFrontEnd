import React from 'react';

const ImageStack = ({ 
  images = []
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-[20px] lg:gap-[42px] 2xl:gap-[50px]">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="rounded-lg shadow-lg border-x-[14px] border-y-[14px] 2xl:border-[20px] border-[#171717]"
          >
            <div className="relative overflow-hidden shadow-md">
              <img 
                src={image} 
                alt={`Image ${index + 1}`}
                className="w-full h-[200px] md:h-[600px] 2xl:h-[1000px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStack;