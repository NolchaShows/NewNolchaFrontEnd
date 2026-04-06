// Utility functions for designer page
import { useState, useEffect } from 'react';

/**
 * Resolve a public URL from Strapi media (v4/v5, nested data, formats).
 */
export const resolveStrapiMediaUrl = (
  media,
  baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
) => {
  if (!media) return null;
  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${baseUrl}${media}`;
  }
  if (media.url && typeof media.url === "string") {
    return media.url.startsWith("http") ? media.url : `${baseUrl}${media.url}`;
  }
  if (media.attributes?.url) {
    const u = media.attributes.url;
    return u.startsWith("http") ? u : `${baseUrl}${u}`;
  }
  if (media.data !== undefined && media.data !== null) {
    const inner = Array.isArray(media.data) ? media.data[0] : media.data;
    return resolveStrapiMediaUrl(inner, baseUrl);
  }
  return null;
};

/**
 * Transform Strapi designer page data to component props
 * @param {Object} data - Strapi designer page data
 * @returns {Object} - Transformed data for designer page components
 */
export const transformDesignerData = (data) => {
  console.log('🎨 Starting designer data transformation with:', data);
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  const makeUrl = (media) => resolveStrapiMediaUrl(media, baseUrl);

  // Transform videos
  console.log('🎥 Videos data:', data.videos);
  const videos = (data.videos && data.videos.length > 0) ? data.videos.map((video, index) => {
    return makeUrl(video.media) || `/home/artists/${index + 1}.png`;
  }) : [];

  // Transform gallery images
  console.log('🖼️ Gallery images data:', data.galleryImages);
  const galleryImages =
    data.galleryImages && data.galleryImages.length > 0
      ? data.galleryImages
          .map((item) => ({
            image: makeUrl(item.image),
            text: (item.text && String(item.text).trim()) || "",
          }))
          .filter((item) => item.image)
      : [];

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
    // Never fall back to bundled placeholder grid — that caused 12 duplicate cards on prod when CMS gallery was empty
    galleryImages: galleryImages.length > 0 ? galleryImages : [],
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
    galleryImages: [],
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

// ============================================
// DESIGNERS COLLECTION (List + Detail Pages)
// ============================================

/**
 * Helper function to make URLs from Strapi media
 */
const makeMediaUrl = (media) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return resolveStrapiMediaUrl(media, baseUrl);
};

/**
 * Transform Strapi designers list data for DynamicGallery
 * @param {Array} designers - Array of designers from Strapi
 * @returns {Array} - Transformed data for DynamicGallery component
 */
export const transformDesignersListData = (designers) => {
  console.log('👗 Transforming designers list data:', designers);

  if (!designers || !Array.isArray(designers)) {
    console.log('⚠️ No designers array provided');
    return [];
  }

  const seen = new Set();
  const transformed = designers
    .filter((designer) => {
      if (!designer || typeof designer !== "object") return false;
      const key =
        designer.documentId ||
        designer.id ||
        designer.slug ||
        JSON.stringify(designer);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((designer, index) => {
      const image =
        makeMediaUrl(designer.listingImage) ||
        makeMediaUrl(designer.image) ||
        makeMediaUrl(designer.coverImage);
      return {
        image,
        text: designer.name || "Designer",
        slug: designer.slug || `designer-${index + 1}`,
      };
    })
    .filter((row) => row.image);

  console.log('✅ Transformed designers list:', transformed);
  return transformed;
};

/**
 * Transform Strapi designer detail data for Designer component
 * @param {Object} designer - Single designer data from Strapi
 * @returns {Object} - Transformed data for Designer detail component
 */
export const transformDesignerDetailData = (designer) => {
  console.log('👗 Transforming designer detail data:', designer);

  if (!designer) {
    console.log('⚠️ No designer data provided');
    return getDefaultDesignerDetailData();
  }

  // Transform paragraphs
  const paragraphs = (designer.paragraphs && Array.isArray(designer.paragraphs))
    ? designer.paragraphs.map(p => p.text || p).filter(Boolean)
    : [];

  // Transform slider images
  const sliderImages = (designer.sliderImages && Array.isArray(designer.sliderImages))
    ? designer.sliderImages.map(item => makeMediaUrl(item.image) || makeMediaUrl(item)).filter(Boolean)
    : [];

  // Transform social images
  const socialImages = (designer.socialImages && Array.isArray(designer.socialImages))
    ? designer.socialImages.map(item => makeMediaUrl(item.image) || makeMediaUrl(item)).filter(Boolean)
    : [];

  // Transform sections (magazines)
  const sections = (designer.sections && Array.isArray(designer.sections))
    ? designer.sections.map((section, index) => ({
        title: section.title || `Section ${index + 1}`,
        image: makeMediaUrl(section.image) || `/designers/jeremy/${index + 8}.png`,
        description: section.description || ''
      }))
    : [];

  // Transform social links
  const socialLinks = {
    linkedin: designer.linkedin || "",
    instagram: designer.instagram || "",
    twitter: designer.twitter || ""
  };

  const defaultData = getDefaultDesignerDetailData();

  const result = {
    name: designer.name || defaultData.name,
    slug: designer.slug || defaultData.slug,
    heading: designer.heading || defaultData.heading,
    heroImage: makeMediaUrl(designer.heroImage) || defaultData.heroImage,
    socialLinks: (socialLinks.linkedin || socialLinks.instagram || socialLinks.twitter) ? socialLinks : defaultData.socialLinks,
    paragraphs: paragraphs.length > 0 ? paragraphs : defaultData.paragraphs,
    sliderImages: sliderImages.length > 0 ? sliderImages : defaultData.sliderImages,
    socialImages: socialImages.length > 0 ? socialImages : defaultData.socialImages,
    sections: sections.length > 0 ? sections : defaultData.sections
  };

  console.log('✅ Transformed designer detail:', result);
  return result;
};

/**
 * Get default designer detail data for fallback
 * @returns {Object} - Default designer detail data
 */
export const getDefaultDesignerDetailData = () => {
  return {
    name: "Jeremy Cowart",
    slug: "jeremy-cowart",
    heading: "Jeremy Cowart's Career Has Often Been Called A Forrest Gump Art Career.",
    heroImage: "/designers/jeremy/1.png",
    socialLinks: {
      linkedin: "#",
      instagram: "#",
      twitter: "#"
    },
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
 * Custom hook for fetching designers list (for DynamicGallery)
 * @returns {Object} - { designers, loading, error }
 */
export const useDesignersList = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('👗 useDesignersList fetching...');
        const { getDesigners } = await import('@/lib/strapi');
        const data = await getDesigners();

        console.log('📦 Received designers list in hook:', data);

        const rawList = data?.data;
        const list = Array.isArray(rawList)
          ? rawList
          : rawList && typeof rawList === "object"
            ? [rawList]
            : [];
        if (list.length > 0) {
          const transformedData = transformDesignersListData(list);
          setDesigners(transformedData);
        } else {
          console.log('⚠️ No valid designers list received, using empty array');
          setDesigners([]);
        }

        setError(null);
      } catch (err) {
        console.error('❌ Error fetching designers list:', err);
        setError(err.message);
        setDesigners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { designers, loading, error };
};

/**
 * Custom hook for fetching single designer by slug (for detail page)
 * @param {string} slug - The designer's slug
 * @returns {Object} - { designerDetail, loading, error }
 */
export const useDesignerDetail = (slug) => {
  const [designerDetail, setDesignerDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        console.log(`👗 useDesignerDetail fetching for slug: ${slug}`);
        const { getDesignerBySlug } = await import('@/lib/strapi');
        const data = await getDesignerBySlug(slug);

        console.log('📦 Received designer detail in hook:', data);

        if (data?.data) {
          const transformedData = transformDesignerDetailData(data.data);
          setDesignerDetail(transformedData);
        } else {
          console.log('⚠️ No valid designer detail received, using fallback');
          const defaultData = getDefaultDesignerDetailData();
          setDesignerDetail(defaultData);
        }

        setError(null);
      } catch (err) {
        console.error(`❌ Error fetching designer detail for ${slug}:`, err);
        setError(err.message);
        const defaultData = getDefaultDesignerDetailData();
        setDesignerDetail(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { designerDetail, loading, error };
};