import React from 'react';

const ImageStack = ({ 
  images = []
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="bg-[#E7F0D3] p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="relative overflow-hidden rounded-md shadow-md">
              <img 
                src={image} 
                alt={`Image ${index + 1}`}
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStack;