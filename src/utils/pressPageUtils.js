// Utility functions for press page
import { useState, useEffect } from 'react';

/**
 * Transform Strapi press page data to component props
 * @param {Object} data - Strapi press page data
 * @returns {Object} - Transformed data for press page components
 */
export const transformPressData = (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  const makeUrl = (media) => {
    if (!media) return null;
    const url = media.data?.attributes?.url || media.url;
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  // Transform companies data for "AS SEEN IN" section
  console.log('🏢 Raw companies data:', data.companies);
  const transformedLogos = data.companies?.map((company, index) => ({
    name: company.name || `Logo ${index + 1}`,
    url: makeUrl(company.logo) || `/home/slider${index + 1}.png`
  })) || [];
  console.log('🔄 Transformed logos:', transformedLogos);

  // Transform cards data
  const transformedCards = data.cards?.map((card, index) => ({
    id: index + 1,
    newsPaper: makeUrl(card.newsPaper) || `/press/card/${index + 1}n.png`,
    image: makeUrl(card.image) || `/press/card/${index + 1}.png`,
    title: card.title || "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
    link: card.link || "https://www.forbes.com/sites/zengernews/2023/12/01/bitcoin-ordinals-take-center-stage-with-nolcha-shows-miami-art-week/"
  })) || [];

  // Transform about section data
  const aboutSection = data.aboutSection || {};
  
  // Handle paragraphs - convert from Strapi blocks to array of strings if needed
  let paragraphs = aboutSection.paragraphs || [
    "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
    "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto."
  ];

  // If paragraphs is from Strapi blocks format, convert it
  if (Array.isArray(paragraphs) && paragraphs.length > 0 && paragraphs[0]?.children) {
    paragraphs = paragraphs.map(block => 
      block.children.map(child => child.text).join('')
    );
  }

  return {
    heroTitle: data.heroTitle || "Press",
    heroVideo: makeUrl(data.heroVideo) || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    logos: transformedLogos,
    cards: transformedCards,
    aboutSection: {
      title: aboutSection.title || "Media Coverage",
      paragraphs: paragraphs,
      link: aboutSection.link || "#",
      linkText: aboutSection.linkText || "Learn More",
      image: makeUrl(aboutSection.image) || "/home/about.png"
    }
  };
};

/**
 * Custom hook for fetching press page data
 * @returns {Object} - { pressData, loading, error }
 */
export const usePressPageData = () => {
  const [pressData, setPressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎯 usePressPageData fetching...');
        const { getPressPageData } = await import('@/lib/strapi');
        const data = await getPressPageData();
        
        console.log('📦 Received data in hook:', data);
        
        if (data?.data?.attributes) {
          console.log('✅ Transforming press page data...');
          const transformedData = transformPressData(data.data.attributes);
          console.log('🔄 Transformed data:', transformedData);
          setPressData(transformedData);
        } else {
          console.log('⚠️ No valid data received, using fallback');
          // Return default data structure
          setPressData(transformPressData({}));
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching press data:', err);
        setError(err.message);
        // Set default data on error
        setPressData(transformPressData({}));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pressData, loading, error };
};