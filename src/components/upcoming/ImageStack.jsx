import React from 'react';

const ImageStack = ({ 
  images = []
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-yellow-50 p-4 rounded-lg">
      <div className="space-y-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-md border-4 border-black"
          >
            <img 
              src={image} 
              alt={`Image ${index + 1}`}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStack;