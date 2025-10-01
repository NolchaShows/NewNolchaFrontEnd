// Utility functions for charity partner pages
import { useState, useEffect } from 'react';

/**
 * Transform Strapi charity partner data to component props
 * @param {Object} data - Strapi charity partner section data
 * @param {string} defaultHeading - Default heading if not provided
 * @param {string} defaultSubHeading - Default sub heading if not provided
 * @returns {Object} - Transformed data for CharityPartner component
 */
export const transformCharityData = (data, defaultHeading = "Charity Partner", defaultSubHeading = "Supporting great causes...") => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  const makeUrl = (media) => {
    if (!media) return null;
    const url = media.data?.attributes?.url || media.url;
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  return {
    mainHeading: data.mainHeading || defaultHeading,
    subHeading: data.subHeading || defaultSubHeading,
    mainImage: makeUrl(data.main_image), // New field
    conferenceImages: [], // Not used currently but keeping for compatibility
    contentCard: data.content_card ? {
      title: data.content_card.title,
      description: data.content_card.description,
      image: makeUrl(data.content_card.image)
    } : null,
    textCards: data.image_text_card?.map(card => ({
      image: makeUrl(card.image),
      text: card.text,
      subtext: card.subtext || null, // New field
      imagePosition: card.image_position || 'left'
    })) || [],
    textImages: [], // Not used currently but keeping for compatibility
    galleryImages: data.gallery?.map(img => makeUrl(img)) || [],
    textHeroData: data.text_hero ? {
      slides: data.text_hero.slides?.map(slide => ({
        main_image: { url: makeUrl(slide.main_image) },
        second_image: { url: makeUrl(slide.second_image) }, // New field
        description: slide.description
      })) || []
    } : null
  };
};

/**
 * Custom hook for fetching charity partner data
 * @param {string} key - The charity partner key
 * @param {string} defaultHeading - Default heading
 * @param {string} defaultSubHeading - Default sub heading
 * @returns {Object} - { charityData, loading, error }
 */
export const useCharityPartnerData = (key, defaultHeading, defaultSubHeading) => {
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎯 useCharityPartnerData fetching for key:', key);
        const { getCharityPartnerPageData } = await import('@/lib/strapi');
        const data = await getCharityPartnerPageData(key);
        
        console.log('📦 Received data in hook:', data);
        
        if (data?.data?.attributes?.charity_partner_section) {
          console.log('✅ Data found, transforming...');
          const transformedData = transformCharityData(data.data.attributes.charity_partner_section, defaultHeading, defaultSubHeading);
          console.log('🔄 Transformed data:', transformedData);
          setCharityData(transformedData);
        } else {
          console.log('⚠️ No charity_partner_section found, using fallback content');
          console.log('Data structure:', {
            hasData: !!data,
            hasDataData: !!data?.data,
            hasAttributes: !!data?.data?.attributes,
            attributeKeys: data?.data?.attributes ? Object.keys(data.data.attributes) : 'No attributes'
          });
          
          // Provide fallback data so the page doesn't crash
          setCharityData({
            mainHeading: defaultHeading,
            subHeading: defaultSubHeading,
            mainImage: null,
            conferenceImages: [],
            contentCard: {
              title: "Content Coming Soon",
              description: "We're working on adding content for this charity partner. Please check back soon!",
              image: "/placeholder.svg"
            },
            textCards: [],
            textImages: [],
            galleryImages: [],
            textHeroData: {
              slides: []
            }
          });
        }
      } catch (err) {
        console.error('💥 Error fetching charity partner data:', err);
        // Provide fallback data even on error
        setCharityData({
          mainHeading: defaultHeading,
          subHeading: defaultSubHeading,
          mainImage: null,
          conferenceImages: [],
          contentCard: {
            title: "Unable to Load Content",
            description: "There was an issue loading the content. Please try again later or contact support.",
            image: "/placeholder.svg"
          },
          textCards: [],
          textImages: [],
          galleryImages: [],
          textHeroData: {
            slides: []
          }
        });
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, defaultHeading, defaultSubHeading]);

  return { charityData, loading, error };
};