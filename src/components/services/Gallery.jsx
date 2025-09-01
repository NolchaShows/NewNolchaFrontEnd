import React from 'react';

const Gallery = ({ images = [] }) => {
  // Function to get the layout pattern for each row
  const getRowLayout = (rowIndex) => {
    const patterns = [
      { type: '2-unequal', classes: ['col-span-1', 'col-span-2'] },
      { type: '3-equal', classes: ['col-span-1', 'col-span-1', 'col-span-1'] }, 
      { type: '2-unequal-reverse', classes: ['col-span-2', 'col-span-1'] } 
    ];
    
    return patterns[rowIndex % 3];
  };

  // Group images into rows based on the pattern
  const groupImagesIntoRows = () => {
    const rows = [];
    let imageIndex = 0;
    let rowIndex = 0;

    while (imageIndex < images.length) {
      const layout = getRowLayout(rowIndex);
      const imagesInRow = layout.classes.length;
      const rowImages = images.slice(imageIndex, imageIndex + imagesInRow);
      
      if (rowImages.length > 0) {
        rows.push({
          images: rowImages,
          layout: layout,
          startIndex: imageIndex
        });
      }
      
      imageIndex += imagesInRow;
      rowIndex++;
    }

    return rows;
  };

  const rows = groupImagesIntoRows();

  return (
    <div className="w-full max-w-7xl 2xl:max-w-none mx-auto p-4 lg:p-6 2xl:p-8">
      <div className="space-y-4 lg:space-y-6 2xl:space-y-8">
        <div className="block md:hidden space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <img
                src={image.src || image}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Optional overlay for hover effect */}
              <div className="absolute transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                    <svg 
                      className="w-6 h-6 text-gray-800" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="grid grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 mb-4 lg:mb-6 2xl:mb-8"
            >
              {row.images.map((image, imageIndex) => {
                const actualImageIndex = row.startIndex + imageIndex;
                const colSpanClass = row.layout.classes[imageIndex];
                
                return (
                  <div
                    key={actualImageIndex}
                    className={`${colSpanClass} relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group`}
                  >
                  <img
                    src={image.src || image}
                    alt={image.alt || `Gallery image ${actualImageIndex + 1}`}
                    className="w-full h-48 md:h-56 lg:h-100 2xl:h-120 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Optional overlay for hover effect */}
                  <div className="absolute flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <svg 
                          className="w-6 h-6 2xl:w-8 2xl:h-8 text-gray-800" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery