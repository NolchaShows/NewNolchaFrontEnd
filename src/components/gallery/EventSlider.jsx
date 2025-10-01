"use client";
import React, { useState } from "react";

const EventSlider = ({ eventName = "CONCENSUS 2025", sectionTitle = "Featured Events", images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert relative URLs to absolute URLs for Strapi images, but keep local images as-is
  const processImages = (imageList) => {
    console.log('🔄 Processing images:', imageList);
    
    const processedImages = imageList.map((image, index) => {
      console.log(`🖼️ Processing image ${index}:`, image);
      
      if (typeof image === 'string') {
        // If it's a local Next.js public folder image, keep as-is
        if (image.startsWith('/gallery/') || image.startsWith('/speakers/') || image.startsWith('/public/')) {
          console.log(`✅ Local image ${index}:`, image);
          return image;
        }
        // If it's a Strapi upload path, convert to absolute URL
        if (image.startsWith('/uploads/')) {
          const absoluteUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image}`;
          console.log(`✅ Strapi upload ${index}:`, absoluteUrl);
          return absoluteUrl;
        }
        // If it's already an absolute URL, keep as-is
        if (image.startsWith('http')) {
          console.log(`✅ Absolute URL ${index}:`, image);
          return image;
        }
        // If it starts with / but is not a known local path, assume it's Strapi
        if (image.startsWith('/') && !image.startsWith('//')) {
          const absoluteUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image}`;
          console.log(`✅ Generic Strapi path ${index}:`, absoluteUrl);
          return absoluteUrl;
        }
        console.log(`✅ String image kept as-is ${index}:`, image);
        return image;
      }
      
      // Handle Strapi image objects
      let imageUrl = image?.url || image?.data?.attributes?.url || image;
      if (imageUrl && typeof imageUrl === 'string') {
        if (imageUrl.startsWith('/uploads/')) {
          imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
        }
        console.log(`✅ Object image ${index}:`, imageUrl);
        return imageUrl;
      }
      
      console.log(`❌ Could not process image ${index}:`, image);
      return null;
    });
    
    // Only filter out null/undefined, but keep empty strings for debugging
    const validImages = processedImages.filter(img => img !== null && img !== undefined);
    
    console.log('📊 Image processing result:', {
      original: imageList.length,
      processed: processedImages.length, 
      valid: validImages.length,
      validImages: validImages
    });
    
    return validImages;
  };

  const eventImages = processImages(images || []);
  const maxIndex = Math.max(0, Math.ceil(eventImages.length / 5) - 1);

  console.log('🎠 EventSlider setup:', { 
    eventName, 
    sectionTitle,
    originalImageCount: images?.length || 0,
    processedImageCount: eventImages.length,
    maxIndex: maxIndex,
    pagesAvailable: Math.ceil(eventImages.length / 5),
    currentIndex: currentIndex
  });

  const nextSlide = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    console.log('➡️ Next slide:', { from: currentIndex, to: newIndex, maxIndex });
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    console.log('⬅️ Previous slide:', { from: currentIndex, to: newIndex, maxIndex });
    setCurrentIndex(newIndex);
  };

  // Get current 5 images to display
  const getCurrentImages = () => {
    const startIndex = currentIndex * 5;
    const endIndex = startIndex + 5;
    const slicedImages = eventImages.slice(startIndex, endIndex);
    
    console.log('🖼️ Getting current images:', {
      currentIndex,
      startIndex,
      endIndex,
      totalImages: eventImages.length,
      slicedCount: slicedImages.length,
      slicedImages: slicedImages
    });
    
    return slicedImages;
  };

  const currentImages = getCurrentImages();

  return (
    <div className="w-full bg-[#EBE2D7] py-8 px-4 mt-10">
      <div className="max-w-none mx-auto">
        {/* Header */}
        <h2 className="text-[32px] lg:text-[52px] 2xl:text-5xl font-bold text-center text-[#000000] mb-8">
          {sectionTitle}
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {currentImages.length > 0 && (
            <div className="space-y-6">
              {/* First row - 3 images with w-1/3 each */}
              {currentImages.slice(0, 3).length > 0 && (
                <div className="flex gap-6">
                  {currentImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="w-1/3">
                      <div className="relative">
                        <img
                          src={image}
                          alt={`${eventName} ${currentIndex * 5 + index + 1}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                          onError={(e) => {
                            console.log('🖼️ Image load error:', image);
                            e.target.style.display = 'none'; // Hide broken images
                          }}
                        />
                      </div>
                      <p className="text-[20px] 2xl:text-[30px] 2xl:text-xl font-semibold text-[#000000] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Second row - 2 images: first w-2/3, second w-1/3 */}
              {currentImages.slice(3, 5).length > 0 && (
                <div className="flex gap-6">
                  {currentImages[3] && (
                    <div className="w-2/3">
                      <div className="relative">
                        <img
                          src={currentImages[3]}
                          alt={`${eventName} ${currentIndex * 5 + 4}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                          onError={(e) => {
                            console.log('🖼️ Image load error:', currentImages[3]);
                            e.target.style.display = 'none'; // Hide broken images
                          }}
                        />
                      </div>
                      <p className="text-[20px]  2xl:text-[30px] 2xl:text-xl font-semibold text-[#000000] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  )}
                  {currentImages[4] && (
                    <div className="w-1/3">
                      <div className="relative">
                        <img
                          src={currentImages[4]}
                          alt={`${eventName} ${currentIndex * 5 + 5}`}
                          className="w-full h-64 lg:h-80 xl:h-96 2xl:h-200 object-cover rounded-lg shadow-lg"
                          onError={(e) => {
                            console.log('🖼️ Image load error:', currentImages[4]);
                            e.target.style.display = 'none'; // Hide broken images
                          }}
                        />
                      </div>
                      <p className="text-[#000000] 2xl:text-xl font-semibold text-[20px] 2xl:text-[30px] mt-3 text-left">
                        {eventName}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden">
          {currentImages.length > 0 && (
            <div className="flex flex-col gap-4">
              {currentImages.map((image, index) => (
                <div key={index} className="w-full">
                  <div className="relative">
                    <img
                      src={image}
                      alt={`${eventName} ${currentIndex * 5 + index + 1}`}
                      className="w-full h-100 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        console.log('🖼️ Mobile image load error:', image);
                        e.target.style.display = 'none'; // Hide broken images
                      }}
                    />
                  </div>
                  <p className="text-[20px] font-semibold text-[#000000] mt-2 text-left">
                    {eventName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {eventImages.length > 5 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`cursor-pointer z-10 hover:opacity-80 transition-opacity ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/gallery/left.svg"
                alt="Previous"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`cursor-pointer z-10 hover:opacity-80 transition-opacity ${
                currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/gallery/right.svg"
                alt="Next"
                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSlider;
