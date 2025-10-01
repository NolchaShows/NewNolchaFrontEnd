"use client";
import Gallery from "@/components/experiences/Gallery";
import Hero from "@/components/press/Hero";
import VideoSlider from "@/components/services/VideoSlider";
import ScrollCarousel from "@/components/speakers/ScrollCarousel";
import Stack from "@/components/speakers/Stack";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getSpeakersPageData } from "@/lib/strapi";

function page() {
  const [speakersData, setSpeakersData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackImages = [
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/1.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/3.png", css: " w-full lg:w-[811px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[517px]" },
    { url: "/landing/1.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
    { url: "/landing/2.png", css: " w-full lg:w-[432px]" },
  ];
  
  const fallbackGalleryImages = [
    "/experiences/jack/galleryImages/1.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/3.png",
    "/experiences/jack/galleryImages/4.png",
    "/experiences/jack/galleryImages/5.png",
    "/experiences/jack/galleryImages/6.png",
    "/experiences/jack/galleryImages/7.png",
    "/experiences/jack/galleryImages/8.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/2.png",
    "/experiences/jack/galleryImages/8.png",
  ];
  
  const fallbackVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ];

  useEffect(() => {
    const fetchSpeakersData = async () => {
      try {
        const data = await getSpeakersPageData();
        
        if (data?.data?.attributes) {
          console.log('✅ Speakers page data loaded successfully:', data.data.attributes);
          console.log('📊 Data structure check:', {
            hasVideos: !!data.data.attributes.videos,
            hasStackSection: !!data.data.attributes.stack_section,
            carousel1Count: data.data.attributes.carousal1?.length || 0,
            carousel2Count: data.data.attributes.carousal2?.length || 0,
            carousel3Count: data.data.attributes.carousal3?.length || 0,
            galleryCount: data.data.attributes.gallery?.length || 0
          });
          setSpeakersData(data.data.attributes);
        } else {
          console.log('ℹ️ No speakers page data found, using fallback data');
        }
      } catch (error) {
        console.error("❌ Failed to fetch speakers page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakersData();
  }, []);

  // Helper function to extract image URLs from Strapi repeatable components
  const extractImageUrls = (items) => {
    if (!items || !Array.isArray(items)) return [];
    
    return items.map(item => {
      // If item is just an ID object (not populated), return null
      if (item && typeof item === 'object' && item.id && !item.images && !item.url) {
        console.log('⚠️ Component not fully populated, has ID:', item.id);
        return null;
      }
      
      if (typeof item === 'string') return item;
      
      // Handle the new structure: each component has an 'images' field (singular)
      if (item.images && typeof item.images === 'object') {
        // images is a single image object
        const imageUrl = item.images.url || item.images.attributes?.url || item.images;
        // Convert relative URLs to absolute URLs
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
          return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
        }
        return imageUrl;
      }
      
      // Legacy handling for arrays
      if (item.images && Array.isArray(item.images)) {
        return item.images.map(img => {
          if (typeof img === 'string') return img;
          return img.url || img.attributes?.url || img;
        });
      }
      
      return item.url || item.attributes?.url || item;
    }).flat().filter(Boolean);
  };

  // Extract data from Strapi or use fallbacks
  const videos = speakersData?.videos?.length > 0 
    ? speakersData.videos.map(video => {
        if (typeof video === 'string') return video;
        const videoUrl = video.url || video.attributes?.url || video;
        // Convert relative URLs to absolute URLs
        if (videoUrl && videoUrl.startsWith('/')) {
          return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${videoUrl}`;
        }
        return videoUrl;
      }).filter(Boolean)
    : fallbackVideos;

  const stackSectionData = speakersData?.stack_section || null;

  const carousel1Images = extractImageUrls(speakersData?.carousal1);
  const carousel2Images = extractImageUrls(speakersData?.carousal2);  
  const carousel3Images = extractImageUrls(speakersData?.carousal3);
  const galleryImages = extractImageUrls(speakersData?.gallery).length > 0 
    ? extractImageUrls(speakersData?.gallery)
    : fallbackGalleryImages;

  // Debug carousel data
  console.log('🎠 Carousel data from Strapi:', {
    carousel1: { count: carousel1Images.length },
    carousel2: { count: carousel2Images.length },
    carousel3: { count: carousel3Images.length }
  });

  if (loading) {
    return (
      <div className="bg-[var(--surface-color2)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading speakers page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface-color2)]">
      <h1 className="p-5 font-neue font-bold text-[24px] lg:text-[48px] 2xl:text-[60px] text-[#000000]">
        Speakers
      </h1>
      <div className="mt-5">
        <VideoSlider videos={videos} />
      </div>
      <div className="bg-[var(--secondary-color)]">
        <Stack stackData={stackSectionData} />
      </div>
      
      {/* Only show carousels if there's data for them */}
        <ScrollCarousel images={carousel1Images} />        <ScrollCarousel images={carousel2Images} />        <ScrollCarousel images={carousel3Images} />      <Gallery images={galleryImages.map(img => {
        // Ensure we pass simple URL strings to Gallery component
        if (typeof img === 'string') return img;
        return img?.url || img?.attributes?.url || img;
      }).filter(Boolean)} />
    </div>
  );
}

export default page;
