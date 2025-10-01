// Utility functions for designer page
import { useState, useEffect } from 'react';

/**
 * Transform Strapi designer page data to component props
 * @param {Object} data - Strapi designer page data
 * @returns {Object} - Transformed data for designer page components
 */
export const transformDesignerData = (data) => {
  console.log('🎨 Starting designer data transformation with:', data);
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  const makeUrl = (media) => {
    if (!media) return null;
    
    // Handle different Strapi data formats
    let url = null;
    
    // Strapi v4 format with data.attributes
    if (media.data?.attributes?.url) {
      url = media.data.attributes.url;
    }
    // Strapi v5 format - direct object with url
    else if (media.url) {
      url = media.url;
    }
    // Simple string URL
    else if (typeof media === 'string') {
      url = media;
    }
    
    if (!url) return null;
    
    // Add base URL if it's a relative path
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  // Transform videos
  console.log('🎥 Videos data:', data.videos);
  const videos = (data.videos && data.videos.length > 0) ? data.videos.map((video, index) => {
    return makeUrl(video.media) || `/home/artists/${index + 1}.png`;
  }) : [];

  // Transform gallery images
  console.log('🖼️ Gallery images data:', data.galleryImages);
  const galleryImages = (data.galleryImages && data.galleryImages.length > 0) ? data.galleryImages.map((item, index) => ({
    image: makeUrl(item.image) || `/designers/${index + 6}.png`,
    text: item.text || "YUE MINJUN"
  })) : [];

  // Transform press partners - only use actual Strapi images, no hardcoded fallbacks
  console.log('📰 Press partners data:', data.pressPartners);
  const pressPartners = (data.pressPartners && data.pressPartners.length > 0) ? data.pressPartners.map((partner, index) => ({
    id: index + 1,
    imageWhite: makeUrl(partner.imageWhite) || makeUrl(partner.primary),
    imageBlack: makeUrl(partner.imageBlack) || makeUrl(partner.secondary) || makeUrl(partner.primary),
    altText: partner.altText || partner.alt_text || `Partner ${index + 1}`,
    backgroundColor: partner.backgroundColor || (partner.color === 'black' ? 'bg-black' : 'bg-[#E7F0D3]') || "bg-black"
  })).filter(partner => partner.imageWhite && partner.imageBlack) : []; // Only include partners with actual images

  // Transform artist description from repeatable component array
  console.log('🎨 Artist Description raw data:', data.artistdescription);
  let artistDescriptionText = "";
  if (data.artistdescription && Array.isArray(data.artistdescription) && data.artistdescription.length > 0) {
    // Map through the array and extract text values, then join with " - "
    artistDescriptionText = data.artistdescription
      .map(item => item.text || item.name || item.title || item)
      .filter(text => text && text.trim() !== "")
      .join(" - ");
  }
  console.log('🎨 Processed artist description:', artistDescriptionText);

  // Get default data for fallbacks
  const defaultData = getDefaultDesignerData();

  // Merge Strapi data with defaults, preferring Strapi data when available
  const result = {
    title: data.title || defaultData.title,
    subtitle: data.subtitle || defaultData.subtitle,
    heroImage: makeUrl(data.heroImage) || defaultData.heroImage,
    videos: videos.length > 0 ? videos : defaultData.videos,
    galleryImages: galleryImages.length > 0 ? galleryImages : defaultData.galleryImages,
    pressPartners: pressPartners, // Only use Strapi press partners, no default fallback
    companies: defaultData.companies, // Always use default companies for now
    // Artist data for the Artists component
    artistData: {
      title: data.artisttitle || "And +500 Other Artists",
      description: artistDescriptionText || "ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART - LINDSAY KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA ZOREF - ROB PRIOR - LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI - JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS - MOHSEN HAZRATI - RAGZY X - MUSKETON - TILLAVISION - MADE BY OONA - STACIE ANT - YOUNG & SICK"
    }
  };

  console.log('🎯 Final designer result:', result);
  console.log('🏷️ Fields from Strapi vs defaults:');
  console.log('  - title:', data.title ? 'Strapi' : 'Default');
  console.log('  - subtitle:', data.subtitle ? 'Strapi' : 'Default');
  console.log('  - heroImage:', makeUrl(data.heroImage) ? 'Strapi' : 'Default');
  console.log('  - videos:', videos.length > 0 ? 'Strapi' : 'Default');
  console.log('  - galleryImages:', galleryImages.length > 0 ? 'Strapi' : 'Default');
  console.log('  - pressPartners:', pressPartners.length > 0 ? 'Strapi' : 'Default');

  return result;
};

/**
 * Get default designer data for fallback
 * @returns {Object} - Default designer data
 */
export const getDefaultDesignerData = () => {
  return {
    title: "Designers",
    subtitle: "Fashion Runway",
    heroImage: "/designers/1.png",
    videos: [
      "/home/artists/1.png",
      "/home/artists/2.png",
      "/home/artists/3.png",
      "/home/artists/4.png",
    ],
    galleryImages: [
      { image: "/designers/6.png", text: "YUE MINJUN" },
      { image: "/designers/7.png", text: "YUE MINJUN" },
      { image: "/designers/8.png", text: "YUE MINJUN" },
      { image: "/designers/9.png", text: "YUE MINJUN" },
      { image: "/designers/10.png", text: "YUE MINJUN" },
      { image: "/designers/11.png", text: "YUE MINJUN" },
      { image: "/designers/12.png", text: "YUE MINJUN" },
      { image: "/designers/13.png", text: "YUE MINJUN" },
      { image: "/designers/14.png", text: "YUE MINJUN" },
      { image: "/designers/15.png", text: "YUE MINJUN" },
      { image: "/designers/16.png", text: "YUE MINJUN" },
      { image: "/designers/17.png", text: "YUE MINJUN" },
    ],
    pressPartners: [
      {
        id: 1,
        imageWhite: "/home/press/1w.png",
        imageBlack: "/home/press/1b.png",
        altText: "Partner 1",
        backgroundColor: "bg-black",
      },
      {
        id: 2,
        imageWhite: "/home/press/2w.png",
        imageBlack: "/home/press/2b.png",
        altText: "Partner 2",
        backgroundColor: "bg-black",
      },
      {
        id: 3,
        imageWhite: "/home/press/3w.png",
        imageBlack: "/home/press/3b.png",
        altText: "Partner 3",
        backgroundColor: "bg-black",
      },
      {
        id: 4,
        imageWhite: "/home/press/4w.png",
        imageBlack: "/home/press/4b.png",
        altText: "Partner 4",
        backgroundColor: "bg-black",
      },
      {
        id: 5,
        imageWhite: "/home/press/5w.png",
        imageBlack: "/home/press/5b.png",
        altText: "Partner 5",
        backgroundColor: "bg-black",
      },
      {
        id: 6,
        imageWhite: "/home/press/6w.png",
        imageBlack: "/home/press/6b.png",
        altText: "Partner 6",
        backgroundColor: "bg-black",
      },
      {
        id: 7,
        imageWhite: "/home/press/7w.png",
        imageBlack: "/home/press/7b.png",
        altText: "Partner 7",
        backgroundColor: "bg-black",
      },
      {
        id: 8,
        imageWhite: "/home/press/8w.png",
        imageBlack: "/home/press/8b.png",
        altText: "Partner 8",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 9,
        imageWhite: "/home/press/9w.png",
        imageBlack: "/home/press/9b.png",
        altText: "Partner 9",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 10,
        imageWhite: "/home/press/10w.png",
        imageBlack: "/home/press/10b.png",
        altText: "Partner 10",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 11,
        imageWhite: "/home/press/11w.png",
        imageBlack: "/home/press/11b.png",
        altText: "Partner 11",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 12,
        imageWhite: "/home/press/12w.png",
        imageBlack: "/home/press/12b.png",
        altText: "Partner 12",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 13,
        imageWhite: "/home/press/13w.png",
        imageBlack: "/home/press/13b.png",
        altText: "Partner 13",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 14,
        imageWhite: "/home/press/14w.png",
        imageBlack: "/home/press/14b.png",
        altText: "Partner 14",
        backgroundColor: "bg-[#E7F0D3]",
      },
      {
        id: 15,
        imageWhite: "/home/press/15w.png",
        imageBlack: "/home/press/15b.png",
        altText: "Partner 15",
        backgroundColor: "bg-black",
      },
      {
        id: 16,
        imageWhite: "/home/press/16w.png",
        imageBlack: "/home/press/16b.png",
        altText: "Partner 16",
        backgroundColor: "bg-black",
      },
      {
        id: 17,
        imageWhite: "/home/press/17w.png",
        imageBlack: "/home/press/17b.png",
        altText: "Partner 17",
        backgroundColor: "bg-black",
      },
    ],
    companies: [
      { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
      { name: "BNB", logo: "/landing/bnb.svg" },
      { name: "Stacks", logo: "/landing/stacks.svg" },
      { name: "Trust", logo: "/landing/trust.svg" },
      { name: "Alchemy", logo: "/landing/alchemy.svg" },
    ]
  };
};

/**
 * Custom hook for fetching designer page data
 * @returns {Object} - { designerData, loading, error }
 */
export const useDesignerPageData = () => {
  const [designerData, setDesignerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎨 useDesignerPageData fetching...');
        const { getDesignerPageData } = await import('@/lib/strapi');
        const data = await getDesignerPageData();
        
        console.log('📦 Received designer data in hook:', data);
        
        if (data?.data?.attributes) {
          console.log('✅ Transforming designer page data...');
          const transformedData = transformDesignerData(data.data.attributes);
          console.log('🔄 Transformed designer data:', transformedData);
          setDesignerData(transformedData);
        } else if (data?.data) {
          console.log('✅ Using direct designer data (no attributes wrapper)...');
          const transformedData = transformDesignerData(data.data);
          console.log('🔄 Transformed designer data:', transformedData);
          setDesignerData(transformedData);
        } else {
          console.log('⚠️ No valid designer data received, using fallback');
          console.log('📋 Full data object:', JSON.stringify(data, null, 2));
          // Return default data structure
          const defaultData = getDefaultDesignerData();
          setDesignerData(defaultData);
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching designer data:', err);
        console.error('📊 Error details:', err);
        setError(err.message);
        // Set default data on error
        const defaultData = getDefaultDesignerData();
        setDesignerData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { designerData, loading, error };
};