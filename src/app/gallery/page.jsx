"use client";
import React, { useState, useEffect } from "react";
import EventSlider from "@/components/gallery/EventSlider";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import { getGalleryPageData } from "@/lib/strapi";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback data when no Strapi data is available
  const fallbackData = {
    title: "Gallery",
    image: "/gallery/1.png",
    event_slider: [
      {
        section_title: "Featured Events",
        event_name: "CONCENSUS 2025",
        items: [
          { image: "/gallery/2.png" },
          { image: "/gallery/3.png" },
          { image: "/gallery/4.png" },
          { image: "/gallery/5.png" },
          { image: "/gallery/6.png" },
          { image: "/gallery/5.png" },
          { image: "/gallery/2.png" },
          { image: "/gallery/3.png" },
          { image: "/gallery/4.png" },
          { image: "/gallery/6.png" }
        ]
      }
    ]
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('🖼️ Fetching gallery page data...');
        const data = await getGalleryPageData();
        
        if (data?.data?.attributes) {
          console.log('✅ Gallery data received:', data.data.attributes);
          setGalleryData(data.data.attributes);
        } else {
          console.log('⚠️ No Strapi data, using fallback data');
          setGalleryData(fallbackData);
        }
      } catch (error) {
        console.error('❌ Error fetching gallery data:', error);
        setGalleryData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Extract image URL from Strapi format
  const extractImageUrl = (imageField) => {
    if (!imageField) return null;
    
    // Handle different possible Strapi image formats
    let imageUrl = null;
    if (typeof imageField === 'string') {
      imageUrl = imageField;
    } else if (imageField?.url) {
      imageUrl = imageField.url;
    } else if (imageField?.data?.attributes?.url) {
      imageUrl = imageField.data.attributes.url;
    } else if (Array.isArray(imageField) && imageField.length > 0) {
      imageUrl = imageField[0]?.url || imageField[0]?.data?.attributes?.url;
    }
    
    // Convert relative URLs to absolute URLs
    if (imageUrl && imageUrl.startsWith('/')) {
      imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
    }
    
    return imageUrl;
  };

  // Merge Strapi data with fallback data to ensure all fields have values
  const mergeWithFallback = (strapiData, fallback) => {
    if (!strapiData) return fallback;
    
    return {
      title: strapiData.title || fallback.title,
      image: strapiData.image || fallback.image,
      event_slider: (strapiData.event_slider && Array.isArray(strapiData.event_slider) && strapiData.event_slider.length > 0) 
        ? strapiData.event_slider 
        : fallback.event_slider
    };
  };

  const displayData = mergeWithFallback(galleryData, fallbackData);
  const heroImageUrl = extractImageUrl(displayData.image) || "/gallery/1.png";

  console.log('🎯 Final display data:', {
    title: displayData.title,
    hasImage: !!displayData.image,
    eventSliderCount: displayData.event_slider?.length || 0,
    usingFallbackSliders: displayData.event_slider === fallbackData.event_slider
  });

  return (
    <div className="bg-white">
      <div className="py-8 px-4 ml-5">
        <h1 className="text-[32px] lg:text-[64px] 2xl:text-[72px] font-bold text-[#000000] mb-2">
          {displayData.title}
        </h1>
      </div>
      
      <img 
        src={heroImageUrl} 
        alt="Gallery Image" 
        className="w-full"
        onError={(e) => {
          e.target.src = "/gallery/1.png"; // Fallback to default image
        }}
      />

      <GalleryFilters />

      {/* Always render event sliders - either from Strapi or fallback */}
      {displayData.event_slider.map((slider, index) => {
        console.log(`🎠 Processing slider ${index}:`, {
          hasItems: !!slider.items,
          itemsType: typeof slider.items,
          itemsLength: Array.isArray(slider.items) ? slider.items.length : 'not array',
          sectionTitle: slider.section_title,
          eventName: slider.event_name
        });

        // Extract images from slider items with enhanced debugging
        const sliderImages = [];
        
        if (slider.items && Array.isArray(slider.items)) {
          slider.items.forEach((item, itemIndex) => {
            let imageUrl = null;
            
            // For fallback data, items have direct image property as string
            if (typeof item === 'object' && item.image && typeof item.image === 'string') {
              imageUrl = item.image; // Don't process fallback images through extractImageUrl
              console.log(`📷 Fallback image ${itemIndex}:`, imageUrl);
            }
            // For Strapi data, try different possible structures
            else if (item.image) {
              imageUrl = extractImageUrl(item.image);
              console.log(`📷 Strapi image ${itemIndex}:`, imageUrl);
            } else if (item.data?.attributes?.image) {
              imageUrl = extractImageUrl(item.data.attributes.image);
              console.log(`📷 Nested Strapi image ${itemIndex}:`, imageUrl);
            } else if (typeof item === 'string') {
              imageUrl = item;
              console.log(`📷 String image ${itemIndex}:`, imageUrl);
            }
            
            if (imageUrl) {
              sliderImages.push(imageUrl);
              console.log(`✅ Added image ${itemIndex}:`, imageUrl);
            } else {
              console.log(`⚠️ No image found in item ${itemIndex}:`, item);
            }
          });
        }

        // If no images found from processing, use fallback images for this slider
        const fallbackImages = fallbackData.event_slider[0].items.map(item => item.image);
        const finalImages = sliderImages.length > 0 ? sliderImages : fallbackImages;
        
        console.log(`🎯 Slider ${index} final decision:`, {
          strapiImagesFound: sliderImages.length,
          usingFallback: sliderImages.length === 0,
          fallbackImages: fallbackImages,
          finalImages: finalImages
        });

        console.log(`🎠 Final slider ${index} images (${finalImages.length}):`, finalImages);

        return (
          <EventSlider 
            key={index}
            eventName={slider.event_name || fallbackData.event_slider[0].event_name}
            sectionTitle={slider.section_title || fallbackData.event_slider[0].section_title}
            images={finalImages}
          />
        );
      })}
    </div>
  );
};

export default Gallery;
