// Utility functions for featured artist pages
import { useState, useEffect } from 'react';

/**
 * Helper function to make URLs from Strapi media
 */
const makeMediaUrl = (media) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  if (!media) return null;

  let url = null;

  if (media.data?.attributes?.url) {
    url = media.data.attributes.url;
  } else if (media.url) {
    url = media.url;
  } else if (typeof media === 'string') {
    url = media;
  }

  if (!url) return null;

  return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
};

/**
 * Transform Strapi featured artists list data for DynamicGallery
 * @param {Array} artists - Array of featured artists from Strapi
 * @returns {Array} - Transformed data for DynamicGallery component
 */
export const transformFeaturedArtistsListData = (artists) => {
  console.log('🎨 Transforming featured artists list data:', artists);

  if (!artists || !Array.isArray(artists)) {
    console.log('⚠️ No featured artists array provided');
    return [];
  }

  const transformed = artists.map((artist, index) => ({
    image: makeMediaUrl(artist.listingImage) || `/designers/${index + 6}.png`,
    text: artist.name || 'Artist',
    slug: artist.slug || `artist-${index + 1}`
  }));

  console.log('✅ Transformed featured artists list:', transformed);
  return transformed;
};

/**
 * Transform Strapi featured artist detail data for Designer component
 * @param {Object} artist - Single featured artist data from Strapi
 * @returns {Object} - Transformed data for detail component
 */
export const transformFeaturedArtistDetailData = (artist) => {
  console.log('🎨 Transforming featured artist detail data:', artist);

  if (!artist) {
    console.log('⚠️ No featured artist data provided');
    return getDefaultFeaturedArtistDetailData();
  }

  const paragraphs = (artist.paragraphs && Array.isArray(artist.paragraphs))
    ? artist.paragraphs.map(p => p.text || p).filter(Boolean)
    : [];

  const sliderImages = (artist.sliderImages && Array.isArray(artist.sliderImages))
    ? artist.sliderImages.map(item => makeMediaUrl(item.image) || makeMediaUrl(item)).filter(Boolean)
    : [];

  const socialImages = (artist.socialImages && Array.isArray(artist.socialImages))
    ? artist.socialImages.map(item => makeMediaUrl(item.image) || makeMediaUrl(item)).filter(Boolean)
    : [];

  const sections = (artist.sections && Array.isArray(artist.sections))
    ? artist.sections.map((section, index) => ({
        title: section.title || `Section ${index + 1}`,
        image: makeMediaUrl(section.image) || `/designers/jeremy/${index + 8}.png`,
        description: section.description || ''
      }))
    : [];

  const defaultData = getDefaultFeaturedArtistDetailData();

  const result = {
    name: artist.name || defaultData.name,
    slug: artist.slug || defaultData.slug,
    heading: artist.heading || defaultData.heading,
    heroImage: makeMediaUrl(artist.heroImage) || defaultData.heroImage,
    source: artist.source || defaultData.source,
    paragraphs: paragraphs.length > 0 ? paragraphs : defaultData.paragraphs,
    sliderImages: sliderImages.length > 0 ? sliderImages : defaultData.sliderImages,
    socialImages: socialImages.length > 0 ? socialImages : defaultData.socialImages,
    sections: sections.length > 0 ? sections : defaultData.sections
  };

  console.log('✅ Transformed featured artist detail:', result);
  return result;
};

/**
 * Get default featured artist detail data for fallback
 * @returns {Object} - Default featured artist detail data
 */
export const getDefaultFeaturedArtistDetailData = () => {
  return {
    name: "Jeremy Cowart",
    slug: "jeremy-cowart",
    heading: "Jeremy Cowart's Career Has Often Been Called A Forrest Gump Art Career.",
    heroImage: "/designers/jeremy/1.png",
    source: "Instagram",
    paragraphs: [
      "He Just Chases Ideas In Whichever Direction They Lead Him, Finding Himself In The Most Random Of New Situations, Moments Of Success And Failure All While Dealing With His Own Life's Hardships (Raising 4 Kids - One With Special Needs - And Managing His Own Neurological Disease).",
      "From Being Named The Internet's Most Influential Photographer At One Point To Speaking In Stadiums To Kickstarting A Hotel Chain To Launching A Worldwide Give-Back Initiative To Being Featured At An Art Auction Alongside The Greatest Artists That Have Ever Lived... It's Always Something Wildly Surprising, Even For Cowart Himself.",
      "\"I Don't Set Goals Or Plan Ahead And Money Never Motivates Me. It's Always About The Idea, Always Has Been And Always Will Be. Some Of The Ideas Fail Miserably But The Lessons Learned Are Invaluable So I Immediately Go Chase The Next One. I've Done It For 20 Years And I'll Do It For The Rest Of My Life. My Hope Is That The Public Sees My Love For Art And Love For People Throughout All Of It.\""
    ],
    sliderImages: [
      "/designers/jeremy/4.png",
      "/designers/jeremy/9.png",
      "/designers/jeremy/8.png",
      "/designers/jeremy/9.png"
    ],
    socialImages: ["/designers/jeremy/2.png"],
    sections: [
      {
        title: "Portraits / Celebrities",
        image: "/designers/jeremy/8.png",
        description: "Emma Stone, Taylor Swift, The Killers, Gwyneth Paltrow, Barack Obama, The Kardashians, Chris Stapleton, Britney Spears, Maggie Gyllenhaal, Sting, Ryan Seacrest, Zachary Levi, Garth Brooks, Hayden Panettiere, Miley Cyrus, Minnie Driver, Courtney Cox, Carrie Underwood, Taylor Swift, Tyler Perry, Denise Richards, Dolly Parton, Jewel, Luke Combs, Blake Shelton, Joel McHale, Nathan Fillion, Chelsea Handler, Brad Paisley, Hank Williams Jr., One Republic, Dierks Bentley, George Strait, Miranda Lambert, Switchfoot, Imogen Heap, Iron and Wine, Feist, Holly Williams, Brandi Carlile, Christopher Guest, Eugene Levy."
      },
      {
        title: "Clients",
        image: "/designers/jeremy/9.png",
        description: "Nike, Sports Illustrated, GAP, ABC, FOX, F/X, A&E, Discovery Channel, The Style Network, E!, CNN, The Travel Channel, CMT, MTV, ESPN, NFL, People Magazine, US Weekly, VIBE Magazine, Fortune Magazine, Fast Company, Paste Magazine, Relevant Magazine, CBS Records, EMI, Word Records, Warner Brothers Records, Universal Records, Interscope Records, Blue Note Records, Sony Music"
      }
    ]
  };
};

/**
 * Custom hook for fetching featured artists list (for DynamicGallery)
 * @returns {Object} - { featuredArtists, loading, error }
 */
export const useFeaturedArtistsList = () => {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎨 useFeaturedArtistsList fetching...');
        const { getFeaturedArtists } = await import('@/lib/strapi');
        const data = await getFeaturedArtists();

        console.log('📦 Received featured artists list in hook:', data);

        if (data?.data && Array.isArray(data.data)) {
          const transformedData = transformFeaturedArtistsListData(data.data);
          setFeaturedArtists(transformedData);
        } else {
          console.log('⚠️ No valid featured artists list received, using empty array');
          setFeaturedArtists([]);
        }

        setError(null);
      } catch (err) {
        console.error('❌ Error fetching featured artists list:', err);
        setError(err.message);
        setFeaturedArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { featuredArtists, loading, error };
};

/**
 * Custom hook for fetching single featured artist by slug (for detail page)
 * @param {string} slug - The featured artist's slug
 * @returns {Object} - { featuredArtistDetail, loading, error }
 */
export const useFeaturedArtistDetail = (slug) => {
  const [featuredArtistDetail, setFeaturedArtistDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        console.log(`🎨 useFeaturedArtistDetail fetching for slug: ${slug}`);
        const { getFeaturedArtistBySlug } = await import('@/lib/strapi');
        const data = await getFeaturedArtistBySlug(slug);

        console.log('📦 Received featured artist detail in hook:', data);

        if (data?.data) {
          const transformedData = transformFeaturedArtistDetailData(data.data);
          setFeaturedArtistDetail(transformedData);
        } else {
          console.log('⚠️ No valid featured artist detail received, using fallback');
          const defaultData = getDefaultFeaturedArtistDetailData();
          setFeaturedArtistDetail(defaultData);
        }

        setError(null);
      } catch (err) {
        console.error(`❌ Error fetching featured artist detail for ${slug}:`, err);
        setError(err.message);
        const defaultData = getDefaultFeaturedArtistDetailData();
        setFeaturedArtistDetail(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { featuredArtistDetail, loading, error };
};
