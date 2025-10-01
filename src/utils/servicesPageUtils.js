/**
 * Utility functions for processing Services Page data from Strapi
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Process videos from Strapi data
 * @param {Array} videos - Array of video objects or URLs from Strapi
 * @param {Array} fallbackVideos - Fallback videos if no data from Strapi
 * @returns {Array} - Processed video URLs
 */
export function processVideosFromStrapi(videos, fallbackVideos = []) {
  if (!videos || !Array.isArray(videos)) {
    return fallbackVideos;
  }

  return videos.map(video => {
    // Handle different video formats from Strapi
    let videoUrl;
    
    if (typeof video === 'string') {
      // Direct URL string
      videoUrl = video;
    } else if (video?.url) {
      // Media object with url property
      videoUrl = video.url;
    } else if (video?.formats?.medium?.url) {
      // Media object with formats - prefer medium quality
      videoUrl = video.formats.medium.url;
    } else if (video?.formats?.small?.url) {
      // Fallback to small quality
      videoUrl = video.formats.small.url;
    } else if (video?.formats?.large?.url) {
      // Or large quality
      videoUrl = video.formats.large.url;
    } else {
      return null;
    }
    
    // If it's a relative path, make it absolute
    if (videoUrl && !videoUrl.startsWith('http')) {
      videoUrl = `${STRAPI_URL}${videoUrl}`;
    }
    
    return videoUrl;
  }).filter(Boolean); // Remove any undefined/null URLs
}

/**
 * Process logo slider data from Strapi
 * @param {Object} logoSliderData - Logo slider component data from Strapi
 * @param {Object} fallbackData - Fallback data structure
 * @returns {Object} - Processed logo slider data
 */
export function processLogoSliderFromStrapi(logoSliderData, fallbackData = {}) {
  if (!logoSliderData) {
    return {
      title: fallbackData.title || "AS SEEN IN",
      logos: fallbackData.logos || []
    };
  }

  const processedLogos = logoSliderData.logos?.map(logo => {
    let imageUrl = logo.url || (logo.formats?.medium?.url || logo.formats?.small?.url || logo.formats?.thumbnail?.url);
    
    // Ensure we use the full Strapi URL if it's a relative path
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${STRAPI_URL}${imageUrl}`;
    }
    
    return {
      name: logo.name || logo.alternativeText || logo.caption || 'Logo',
      url: imageUrl
    };
  }).filter(logo => logo.url) || fallbackData.logos || [];

  return {
    title: logoSliderData.title || fallbackData.title || "AS SEEN IN",
    logos: processedLogos,
    logoSliderData: logoSliderData
  };
}

/**
 * Get media URL from Strapi media object
 * @param {Object} media - Strapi media object
 * @param {string} preferredFormat - Preferred format (small, medium, large, thumbnail)
 * @returns {string|null} - Full URL to the media file
 */
export function getStrapiMediaUrl(media, preferredFormat = 'medium') {
  if (!media) return null;
  
  let url;
  
  // Direct URL
  if (typeof media === 'string') {
    url = media;
  } else if (media.url) {
    url = media.url;
  } else if (media.formats?.[preferredFormat]?.url) {
    url = media.formats[preferredFormat].url;
  } else if (media.formats?.medium?.url) {
    url = media.formats.medium.url;
  } else if (media.formats?.small?.url) {
    url = media.formats.small.url;
  } else if (media.formats?.thumbnail?.url) {
    url = media.formats.thumbnail.url;
  }
  
  // Make relative URLs absolute
  if (url && !url.startsWith('http')) {
    url = `${STRAPI_URL}${url}`;
  }
  
  return url;
}

/**
 * Process header section data from Strapi
 * @param {Object} headerSectionData - Header section component data from Strapi
 * @param {Object} fallbackData - Fallback data structure
 * @returns {Object} - Processed header section data
 */
export function processHeaderSectionFromStrapi(headerSectionData, fallbackData = {}) {
  if (!headerSectionData) {
    return {
      title: fallbackData.title || "We Partner With Innovative Brands, Organizations,",
      description: fallbackData.description || "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
      image: fallbackData.image || "/services/rotated.png"
    };
  }

  let imageUrl = fallbackData.image || "/services/rotated.png";
  
  if (headerSectionData.image) {
    imageUrl = getStrapiMediaUrl(headerSectionData.image) || imageUrl;
  }

  return {
    title: headerSectionData.title || fallbackData.title || "We Partner With Innovative Brands, Organizations,",
    description: headerSectionData.description || fallbackData.description || "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
    image: imageUrl
  };
}

/**
 * Process service section data from Strapi
 * @param {Object} serviceSectionData - Service section component data from Strapi
 * @param {Object} fallbackData - Fallback data structure
 * @returns {Object} - Processed service section data
 */
export function processServiceSectionFromStrapi(serviceSectionData, fallbackData = {}) {
  console.log('Processing service section data:', serviceSectionData);
  
  if (!serviceSectionData) {
    console.log('No service section data, using fallback');
    return {
      title: fallbackData.title || "Explore our services",
      services: fallbackData.services || []
    };
  }

  const processedServices = serviceSectionData.services?.map((service, index) => {
    if (!service) {
      console.warn(`Service at index ${index} is undefined`);
      return null;
    }

    // Process images for the service
    const processedImages = service.images?.map(image => {
      return getStrapiMediaUrl(image, 'medium');
    }).filter(Boolean) || [];

    const processedService = {
      id: service.service_id || service.id || `${index + 1}`.padStart(2, '0'),
      service_id: service.service_id || `${index + 1}`.padStart(2, '0'),
      title: service.title || 'Untitled Service',
      description: service.description || '',
      images: processedImages,
      layout: service.layout || 'single'
    };

    console.log(`Processed service ${index + 1}:`, processedService);
    return processedService;
  }).filter(Boolean) || fallbackData.services || []; // Filter out null/undefined services

  const result = {
    title: serviceSectionData.title || fallbackData.title || "Explore our services",
    services: processedServices
  };

  console.log('Final processed service section:', result);
  return result;
}

/**
 * Process gallery data from Strapi
 * @param {Array} galleryData - Gallery images array from Strapi
 * @param {Array} fallbackData - Fallback gallery images
 * @returns {Array} - Processed gallery images
 */
export function processGalleryFromStrapi(galleryData, fallbackData = []) {
  console.log('Processing gallery data:', galleryData);
  
  if (!galleryData || !Array.isArray(galleryData) || galleryData.length === 0) {
    console.log('No gallery data, using fallback');
    return null; // Return null instead of fallback to let component decide
  }

  const processedImages = galleryData.map((image, index) => {
    const imageUrl = getStrapiMediaUrl(image, 'medium');
    
    if (!imageUrl) {
      console.warn(`Gallery image at index ${index} has no valid URL`);
      return null;
    }

    return {
      id: index + 1,
      url: imageUrl,
      alt: image.alternativeText || image.caption || `Gallery image ${index + 1}`
    };
  }).filter(Boolean); // Remove any null/invalid images

  console.log('Processed gallery images from Strapi:', processedImages);
  
  // Only return Strapi data if we have valid processed images
  return processedImages.length > 0 ? processedImages : null;
}

/**
 * Default fallback data for services page
 */
export const servicesPageDefaults = {
  videos: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ],
  logoSlider: {
    title: "AS SEEN IN",
    logos: [
      { name: "AdAge", url: "/home/slider1.png" },
      { name: "VOGUE", url: "/home/slider2.png" },
      { name: "Forbes", url: "/home/slider3.png" },
    ]
  },
  headerSection: {
    title: "We Partner With Innovative Brands, Organizations,",
    description: "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.\n\nWe harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
    image: "/services/rotated.png"
  },
  serviceSection: {
    title: "Explore our services",
    services: [
      {
        id: "01",
        service_id: "01",
        title: "Strategy & Event Production",
        description: "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
        images: ["/home/services/1.png"],
        layout: "single",
      },
      {
        id: "02", 
        service_id: "02",
        title: "Creative & Immersive",
        description: "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
        images: ["/home/services/2.png", "/home/services/3.png"],
        layout: "double",
      },
      {
        id: "03",
        service_id: "03", 
        title: "Sponsorship Sales and Partner",
        description: "We connect innovative brands with the world's most influential events - from blockchain summits",
        images: ["/home/services/4.png", "/home/services/5.png"],
        layout: "stacked",
      },
      {
        id: "04",
        service_id: "04",
        title: "Experience Technology", 
        description: "From large-scale projection mapping to fully immersive real-world environments, we bring ideas to life with",
        images: ["/home/services/6.png", "/home/services/7.png"],
        layout: "stacked",
      },
      {
        id: "05",
        service_id: "05",
        title: "Sponsorship Sales and Partner",
        description: "We connect innovative brands with the world's most influential events — from blockchain summits and tech conferences",
        images: ["/home/services/8.png", "/home/services/9.png"], 
        layout: "stacked",
      },
    ]
  },
  gallery: [
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
  ]
};