// Utility functions for experience page
import { useState, useEffect } from 'react';

/**
 * Transform Strapi experience page data to component props
 * @param {Object} data - Strapi experience page data
 * @returns {Object} - Transformed data for experience page components
 */
export const transformExperienceData = (data) => {
  console.log('🔄 Starting experience data transformation with:', data);
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

  // Transform conference images - Strapi v5 format
  console.log('📸 Conference image data:', data.conferenceImage);
  const conferenceImages = data.conferenceImage?.map(img => makeUrl(img)) || [];
  
  // Transform host description from Strapi blocks format if needed
  console.log('📝 Host description data:', data.hostDescription);
  let hostDescription = data.hostDescription || "Default experience description";
  
  // Handle different data formats that might come from Strapi
  if (Array.isArray(hostDescription)) {
    if (hostDescription.length > 0) {
      // Check if it's in Strapi blocks format
      if (hostDescription[0]?.text) {
        hostDescription = hostDescription.map(item => item.text).join('\n');
      } else if (hostDescription[0]?.children) {
        // Alternative Strapi blocks format
        hostDescription = hostDescription.map(block => 
          block.children.map(child => child.text).join('')
        ).join('\n');
      } else {
        // Simple array of strings
        hostDescription = hostDescription.join('\n');
      }
    } else {
      hostDescription = "Default experience description";
    }
  } else if (typeof hostDescription !== 'string') {
    hostDescription = "Default experience description";
  }

  // Transform videos - Strapi v5 format
  console.log('🎥 Videos data:', data.videos);
  const videos = data.videos?.map(video => makeUrl(video.videoUrl)) || [];

  // Transform posts - Strapi v5 format  
  console.log('📄 Posts data:', data.posts);
  const posts = (data.posts && data.posts.length > 0) ? data.posts.map((post, index) => {
    const imageUrl = makeUrl(post.image);
    // Return the full URL as a string (ImageCarousel expects strings or objects with image.url)
    return imageUrl || `/experiences/posts/${index + 1}.png`;
  }) : [];

  // Transform partners - check if we have actual partner data
  console.log('🤝 Partners data:', data.partners);
  const partners = (data.partners && data.partners.length > 0) ? data.partners.map((partner, index) => ({
    id: index + 1,
    imageWhite: makeUrl(partner.imageWhite) || `/experiences/partners/${index + 1}w.png`,
    imageBlack: makeUrl(partner.imageBlack) || `/experiences/partners/${index + 1}b.png`,
    altText: partner.altText || `Partner ${index + 1}`,
    backgroundColor: partner.backgroundColor || "bg-black"
  })) : [];

  // Transform press cards - check if we have actual press card data
  console.log('📰 Press cards data:', data.pressCards);
  const pressCards = (data.pressCards && data.pressCards.length > 0) ? data.pressCards.map((card, index) => ({
    id: index + 1,
    newsPaper: makeUrl(card.newsPaper) || `/press/card/${index + 1}n.png`,
    image: makeUrl(card.image) || `/press/card/${index + 1}.png`,
    title: card.title || "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
    link: card.link || "#"
  })) : [];

  // Transform gallery images - check if we have actual gallery image data
  console.log('🖼️ Gallery images data:', data.galleryImages);
  const galleryImages = (data.galleryImages && data.galleryImages.length > 0) ? data.galleryImages.map(img => makeUrl(img.image)) : [];

  // Get default data for this experience as fallback
  const defaultData = getDefaultExperienceData(data.page || 'vv_raching_with_jack_butcher');
  console.log('📋 Default data for comparison:', defaultData);
  
  // Merge Strapi data with defaults, preferring Strapi data when available
  // Determine if this experience type should have partners/press cards based on page identifier
  const shouldHavePartners = data.page === 'vv_raching_with_jack_butcher' || data.page === 'opening_night_consensus' || defaultData.id === 1 || defaultData.id === 3;
  const shouldHavePressCards = data.page === 'new_york_fashion_week' || defaultData.id === 5;
  
  const result = {
    id: data.id || defaultData.id,
    mainHeading: data.mainHeading || defaultData.mainHeading,
    subHeading: data.subHeading || defaultData.subHeading,
    conferenceImage: conferenceImages.length > 0 ? conferenceImages : defaultData.conferenceImage,
    hostImage: makeUrl(data.hostImage) || defaultData.hostImage,
    hostName: data.hostName || defaultData.hostName,
    hostDescription: hostDescription !== "Default experience description" ? hostDescription : defaultData.hostDescription,
    buttonText: data.buttonText || defaultData.buttonText,
    videos: videos.length > 0 ? videos : defaultData.videos,
    posts: posts.length > 0 ? posts : defaultData.posts,
    // Only use default partners if this experience should have partners AND no Strapi partners exist
    partners: partners.length > 0 ? partners : (shouldHavePartners ? (defaultData.partners || []) : []),
    // Only use default press cards if this experience should have press cards AND no Strapi press cards exist
    pressCards: pressCards.length > 0 ? pressCards : (shouldHavePressCards ? (defaultData.pressCards || []) : []),
    galleryImages: galleryImages.length > 0 ? galleryImages : defaultData.galleryImages,
    page: data.page || defaultData.page
  };
  
  console.log('🎯 Final merged result:', result);
  console.log('🔍 Partners debug info:');
  console.log('  - Strapi partners length:', partners.length);
  console.log('  - Should have partners?:', shouldHavePartners);
  console.log('  - Default partners length:', defaultData.partners?.length || 0);
  console.log('  - Final partners length:', result.partners?.length || 0);
  console.log('🏷️ Fields from Strapi vs defaults:');
  console.log('  - mainHeading:', data.mainHeading ? 'Strapi' : 'Default');
  console.log('  - subHeading:', data.subHeading ? 'Strapi' : 'Default');
  console.log('  - conferenceImage:', conferenceImages.length > 0 ? 'Strapi' : 'Default');
  console.log('  - hostImage:', makeUrl(data.hostImage) ? 'Strapi' : 'Default');
  console.log('  - videos:', videos.length > 0 ? 'Strapi' : 'Default');
  console.log('  - posts:', posts.length > 0 ? 'Strapi' : 'Default');
  console.log('  - partners:', partners.length > 0 ? 'Strapi' : (shouldHavePartners ? 'Default' : 'None'));
  console.log('  - pressCards:', pressCards.length > 0 ? 'Strapi' : (shouldHavePressCards ? 'Default' : 'None'));
  console.log('  - galleryImages:', galleryImages.length > 0 ? 'Strapi' : 'Default');
  
  return result;
};

/**
 * Get default experience data for fallback
 * @param {string} experiencePage - The experience page identifier
 * @returns {Object} - Default experience data
 */
export const getDefaultExperienceData = (experiencePage) => {
  const defaultData = {
    vv_raching_with_jack_butcher: {
      id: 1,
      mainHeading: "vv raching with jack butcher",
      subHeading: "Bitcoin conference nashville 2024",
      hostImage: "/experiences/jack/host.png",
      conferenceImage: ["/experiences/jack/conf.png", "/experiences/jack/galleryImages/1.png"],
      hostName: "HOSTED BY JACK BUTCHER",
      hostDescription: "During the Bitcoin Conference 2024, we held a vibrant gathering of founders and leaders from the BTC, Web3, and crypto ecosystems, providing a unique opportunity to network and connect.",
      buttonText: "Learn More",
      videos: [
        "/experiences/jack/videos/1.png",
        "/experiences/jack/videos/2.mp4",
      ],
      posts: [
        "/experiences/jack/posts/1.png",
        "/experiences/jack/posts/2.png",
        "/experiences/jack/posts/3.png",
        "/experiences/jack/posts/4.png",
        "/experiences/jack/posts/5.png"
      ],
      galleryImages: [
        "/experiences/jack/galleryImages/1.png",
        "/experiences/jack/galleryImages/2.png",
        "/experiences/jack/galleryImages/3.png",
        "/experiences/jack/galleryImages/4.png",
        "/experiences/jack/galleryImages/5.png",
        "/experiences/jack/galleryImages/6.png",
        "/experiences/jack/galleryImages/7.png",
        "/experiences/jack/galleryImages/8.png"
      ],
      partners: [
        {
          id: 1,
          imageWhite: "/experiences/partners/1w.png",
          imageBlack: "/experiences/partners/1b.png",
          altText: "Partner 1",
          backgroundColor: "bg-black",
        },
        {
          id: 2,
          imageWhite: "/experiences/partners/2w.png",
          imageBlack: "/experiences/partners/2b.png",
          altText: "Partner 2",
          backgroundColor: "bg-black",
        },
        {
          id: 3,
          imageWhite: "/experiences/partners/3w.png",
          imageBlack: "/experiences/partners/3b.png",
          altText: "Partner 3",
          backgroundColor: "bg-black",
        }
      ],
      pressCards: []
    },
    bitcoin_conferance: {
      id: 2,
      mainHeading: "Bitcoin Conference",
      subHeading: "Inscribing nashville x nolcha shows x gamma",
      hostImage: "/experiences/bitcoin/host.png",
      conferenceImage: ["/experiences/bitcoin/conf.png"],
      hostName: "Inscribing Nashville",
      hostDescription: "Trailblazers, creators, and visionaries united for an extraordinary event featuring insightful panel discussions and capped off by an unforgettable after-party. \n The night showcased captivating digital art on one of the world's largest immersive LED screens—a remarkable 120-foot-wide display boasting an impressive resolution of 12,600 x 2,016 pixels.",
      buttonText: "Learn More",
      videos: [
        "/experiences/bitcoin/videos/1.png",
        "/experiences/bitcoin/videos/2.png"
      ],
      posts: [
        "/experiences/bitcoin/posts/1.png",
        "/experiences/bitcoin/posts/2.png",
        "/experiences/bitcoin/posts/3.png",
        "/experiences/bitcoin/posts/4.png",
        "/experiences/bitcoin/posts/5.png"
      ],
      galleryImages: [
        "/experiences/bitcoin/galleryImages/1.png",
        "/experiences/bitcoin/galleryImages/2.png",
        "/experiences/bitcoin/galleryImages/3.png",
        "/experiences/bitcoin/galleryImages/4.png",
        "/experiences/bitcoin/galleryImages/5.png",
        "/experiences/bitcoin/galleryImages/6.png",
        "/experiences/bitcoin/galleryImages/7.png",
        "/experiences/bitcoin/galleryImages/8.png"
      ],
      partners: [],
      pressCards: []
    },
    opening_night_consensus: {
      id: 3,
      mainHeading: "Opening Night Consensus",
      subHeading: "2024",
      hostImage: "/experiences/opening/host.png",
      conferenceImage: ["/experiences/opening/conf.png"],
      hostName: "Opening Night of Consensus",
      hostDescription: "The event began with a dynamic conference focused on the latest innovations in AI x Blockchain. Followed by an unforgettable afterparty featuring world renowned DJs Meduza attracting over 2,000 guests from leading blockchain companies, projects, and protocols. It was a night of cutting-edge insights and vibrant celebration.",
      buttonText: "Learn More",
      videos: [
        "/experiences/opening/videos/1.png",
        "/experiences/opening/videos/2.png"
      ],
      posts: [
        "/experiences/opening/posts/1.png",
        "/experiences/opening/posts/2.png",
        "/experiences/opening/posts/3.png",
        "/experiences/opening/posts/4.png",
        "/experiences/opening/posts/5.png"
      ],
      galleryImages: [
        "/experiences/opening/galleryImages/1.png",
        "/experiences/opening/galleryImages/2.png",
        "/experiences/opening/galleryImages/3.png",
        "/experiences/opening/galleryImages/4.png",
        "/experiences/opening/galleryImages/5.png",
        "/experiences/opening/galleryImages/6.png",
        "/experiences/opening/galleryImages/7.png",
        "/experiences/opening/galleryImages/8.png"
      ],
      partners: [
        {
          id: 1,
          imageWhite: "/experiences/partners/1w.png",
          imageBlack: "/experiences/partners/1b.png",
          altText: "Partner 1",
          backgroundColor: "bg-black",
        },
        {
          id: 2,
          imageWhite: "/experiences/partners/2w.png",
          imageBlack: "/experiences/partners/2b.png",
          altText: "Partner 2",
          backgroundColor: "bg-black",
        },
        {
          id: 3,
          imageWhite: "/experiences/partners/3w.png",
          imageBlack: "/experiences/partners/3b.png",
          altText: "Partner 3",
          backgroundColor: "bg-black",
        }
      ],
      pressCards: []
    },
    ctrl_ordinals_collection_launch: {
      id: 4,
      mainHeading: "CTRL Ordinals Collection Launch",
      subHeading: "Bitcoin Conference",
      hostImage: "/experiences/ctrl/host.png",
      conferenceImage: ["/experiences/ctrl/conf.png"],
      hostName: "CTRL Ordinals Collection Launch",
      hostDescription: "Vision Accomplish \n Create a unique and fun experience for sponsors to connect in depth with our network of founders and leaders within BTC space.",
      buttonText: "Learn More",
      videos: [
        "/experiences/ctrl/videos/1.png",
        "/experiences/ctrl/videos/2.png"
      ],
      posts: [
        "/experiences/ctrl/posts/1.png",
        "/experiences/ctrl/posts/2.png",
        "/experiences/ctrl/posts/3.png",
        "/experiences/ctrl/posts/4.png",
        "/experiences/ctrl/posts/5.png"
      ],
      galleryImages: [
        "/experiences/ctrl/galleryImages/1.png",
        "/experiences/ctrl/galleryImages/2.png",
        "/experiences/ctrl/galleryImages/3.png",
        "/experiences/ctrl/galleryImages/4.png",
        "/experiences/ctrl/galleryImages/5.png",
        "/experiences/ctrl/galleryImages/6.png",
        "/experiences/ctrl/galleryImages/7.png",
        "/experiences/ctrl/galleryImages/8.png"
      ],
      partners: [],
      pressCards: []
    },
    new_york_fashion_week: {
      id: 5,
      mainHeading: "New York Fashion Week",
      subHeading: "World Trade Center 69th Floor",
      hostImage: "/experiences/newyork/host.png",
      conferenceImage: ["/experiences/newyork/conf.png"],
      hostName: "New York Fashion Week",
      hostDescription: "The future of fashion is now at NYFW — A Web3 experience. \n \n Held at the iconic World Trade Center 69th floor, this event garnered attention from major outlets like AdAge, Forbes, and Coindesk.  It showcased engaging panels, dynamic runway shows, & innovative AI/VR activations.",
      buttonText: "Learn More",
      videos: [
        "/experiences/newyork/videos/1.png",
        "/experiences/newyork/videos/2.png"
      ],
      posts: [
        "/experiences/newyork/posts/1.png",
        "/experiences/newyork/posts/2.png",
        "/experiences/newyork/posts/3.png",
        "/experiences/newyork/posts/4.png",
        "/experiences/newyork/posts/5.png"
      ],
      galleryImages: [
        "/experiences/newyork/galleryImages/1.png",
        "/experiences/newyork/galleryImages/2.png",
        "/experiences/newyork/galleryImages/3.png",
        "/experiences/newyork/galleryImages/4.png",
        "/experiences/newyork/galleryImages/5.png",
        "/experiences/newyork/galleryImages/6.png",
        "/experiences/newyork/galleryImages/7.png",
        "/experiences/newyork/galleryImages/8.png"
      ],
      partners: [],
      pressCards: [
        {
          id: 1,
          newsPaper: "/press/card/1n.png",
          image: "/press/card/1.png",
          title: "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
          link: "#",
        },
        {
          id: 2,
          newsPaper: "/press/card/2n.png",
          image: "/press/card/2.png",
          title: "Another Article Title Here",
          link: "#",
        },
        {
          id: 3,
          newsPaper: "/press/card/3n.png",
          image: "/press/card/3.png",
          title: "Another Article Title Here",
          link: "#",
        }
      ]
    }
  };

  return defaultData[experiencePage] || defaultData.vv_raching_with_jack_butcher;
};

/**
 * Custom hook for fetching experience page data
 * @param {string} experiencePage - The experience page identifier
 * @returns {Object} - { experienceData, loading, error }
 */
export const useExperiencePageData = (experiencePage) => {
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`🎯 useExperiencePageData fetching for: ${experiencePage}`);
        const { getExperiencePageData } = await import('@/lib/strapi');
        const data = await getExperiencePageData(experiencePage);
        
        console.log('📦 Received experience data in hook:', data);
        
        if (data?.data?.attributes) {
          console.log('✅ Transforming experience page data...');
          const transformedData = transformExperienceData(data.data.attributes);
          console.log('🔄 Transformed experience data:', transformedData);
          setExperienceData(transformedData);
        } else if (data?.data) {
          console.log('✅ Using direct data (no attributes wrapper)...');
          const transformedData = transformExperienceData(data.data);
          console.log('🔄 Transformed experience data:', transformedData);
          setExperienceData(transformedData);
        } else {
          console.log('⚠️ No valid experience data received, using fallback');
          console.log('📋 Full data object:', JSON.stringify(data, null, 2));
          // Return default data structure
          const defaultData = getDefaultExperienceData(experiencePage);
          setExperienceData(defaultData);
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching experience data:', err);
        setError(err.message);
        // Set default data on error
        const defaultData = getDefaultExperienceData(experiencePage);
        setExperienceData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    if (experiencePage) {
      fetchData();
    }
  }, [experiencePage]);

  return { experienceData, loading, error };
};