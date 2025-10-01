import React from 'react';

function ImageGallery({ galleryData, loading }) {
  // Default gallery images - only used when NO Strapi data is available
  const defaultGallery = [
    { id: 1, url: "/services/11.png", alt: "Gallery image 1" },
    { id: 2, url: "/services/12.png", alt: "Gallery image 2" },
    { id: 3, url: "/services/13.png", alt: "Gallery image 3" },
    { id: 4, url: "/services/14.png", alt: "Gallery image 4" },
    { id: 5, url: "/services/15.png", alt: "Gallery image 5" },
    { id: 6, url: "/services/16.png", alt: "Gallery image 6" },
    { id: 7, url: "/services/17.png", alt: "Banner image 1" },
    { id: 8, url: "/services/18.png", alt: "Gallery image 8" },
    { id: 9, url: "/services/19.png", alt: "Gallery image 9" },
    { id: 10, url: "/services/20.png", alt: "Gallery image 10" },
    { id: 11, url: "/services/21.png", alt: "Gallery image 11" },
    { id: 12, url: "/services/22.png", alt: "Gallery image 12" },
    { id: 13, url: "/services/23.png", alt: "Gallery image 13" },
    { id: 14, url: "/services/24.png", alt: "Banner image 2" }
  ];

  // Determine which data to use - ONLY Strapi data if available, otherwise defaults
  const isUsingStrapiData = galleryData && Array.isArray(galleryData) && galleryData.length > 0;
  const gallery = isUsingStrapiData ? galleryData : defaultGallery;
  
  console.log('ImageGallery - Received galleryData:', galleryData);
  console.log('ImageGallery - Is using Strapi data:', isUsingStrapiData);
  console.log('ImageGallery - Gallery to use:', gallery);
  console.log('ImageGallery - Gallery length:', gallery.length);

  // Helper function to get image by index - only from the selected gallery source
  const getImage = (index) => {
    if (index < gallery.length) {
      return gallery[index];
    }
    
    // If Strapi data doesn't have enough images, don't render anything for missing positions
    if (isUsingStrapiData) {
      return null; // Don't show default images when using Strapi data
    }
    
    // Only use placeholder when using default data and index is out of bounds
    return { url: "/services/placeholder.png", alt: `Gallery image ${index + 1}` };
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white p-16 lg:px-10 md:px-5 flex flex-col items-stretch justify-center overflow-hidden">
        <div className="animate-pulse space-y-8">
          <div className="flex gap-8">
            <div className="flex-1 h-64 bg-gray-300 rounded-[10px]"></div>
            <div className="flex-1 h-64 bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1 h-80 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-80 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-80 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-80 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="bg-white p-16 lg:px-10 md:px-5 flex flex-col items-stretch justify-center overflow-hidden">
      {/* First row - Two landscape images */}
      <div className="w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          {getImage(0) && (
            <img
              src={getImage(0).url}
              alt={getImage(0).alt}
              className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
              onError={(e) => {
                if (!isUsingStrapiData) e.target.src = "/services/11.png";
              }}
            />
          )}
          {getImage(1) && (
            <img
              src={getImage(1).url}
              alt={getImage(1).alt}
              className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
              onError={(e) => {
                if (!isUsingStrapiData) e.target.src = "/services/12.png";
              }}
            />
          )}
        </div>
      </div>

      {/* Second row - Four square images */}
      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        {getImage(2) && (
          <img
            src={getImage(2).url}
            alt={getImage(2).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/13.png"; }}
          />
        )}
        {getImage(3) && (
          <img
            src={getImage(3).url}
            alt={getImage(3).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/14.png"; }}
          />
        )}
        {getImage(4) && (
          <img
            src={getImage(4).url}
            alt={getImage(4).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/15.png"; }}
          />
        )}
        {getImage(5) && (
          <img
            src={getImage(5).url}
            alt={getImage(5).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/16.png"; }}
          />
        )}
      </div>

      {/* First banner image */}
      {getImage(6) && (
        <img
          src={getImage(6).url}
          alt={getImage(6).alt}
          className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
          onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/17.png"; }}
        />
      )}

      {/* Third row - Two landscape images */}
      <div className="mt-8 w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          {getImage(7) && (
            <img
              src={getImage(7).url}
              alt={getImage(7).alt}
              className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
              onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/18.png"; }}
            />
          )}
          {getImage(8) && (
            <img
              src={getImage(8).url}
              alt={getImage(8).alt}
              className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
              onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/19.png"; }}
            />
          )}
        </div>
      </div>

      {/* Fourth row - Four square images */}
      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        {getImage(9) && (
          <img
            src={getImage(9).url}
            alt={getImage(9).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/20.png"; }}
          />
        )}
        {getImage(10) && (
          <img
            src={getImage(10).url}
            alt={getImage(10).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/21.png"; }}
          />
        )}
        {getImage(11) && (
          <img
            src={getImage(11).url}
            alt={getImage(11).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/22.png"; }}
          />
        )}
        {getImage(12) && (
          <img
            src={getImage(12).url}
            alt={getImage(12).alt}
            className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
            onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/23.png"; }}
          />
        )}
      </div>

      {/* Second banner image */}
      {getImage(13) && (
        <img
          src={getImage(13).url}
          alt={getImage(13).alt}
          className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
          onError={(e) => { if (!isUsingStrapiData) e.target.src = "/services/24.png"; }}
        />
      )}
    </div>
  );
}

export default ImageGallery;
