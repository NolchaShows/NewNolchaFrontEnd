// Utility functions for artist page
import { useState, useEffect } from 'react';

/**
 * Transform Strapi artist page data to component props
 * @param {Object} data - Strapi artist page data
 * @returns {Object} - Transformed data for Artists and Card components
 */
export const transformArtistPageData = (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  const makeUrl = (media) => {
    if (!media) return null;
    // Handle both Strapi v4 and v5 media structures
    const url = media.data?.attributes?.url || media.url;
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  return {
    mainHeading: data.main_heading || "Featured Artists",
    artistSection: data.artist_section ? {
      title: data.artist_section.title || "And +500 Other Artists",
      description: data.artist_section.description || "ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART - LINDSAY KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA ZOREF - ROB PRIOR - LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI - JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS - MOHSEN HAZRATI - RAGZY X - MUSKETON - TILLAVISION - MADE BY OONA - STACIE ANT - YOUNG & SICK",
      carousal_item: data.artist_section.carousal_item?.map(item => ({
        text: item.text
      })) || [],
      media: data.artist_section.media?.map(media => makeUrl(media)) || []
    } : null,
    cards: data.card?.map(card => ({
      title: card.title,
      image: makeUrl(card.image),
      link: card.link || "https://www.nolcha.com/artists-pages/janedao-db55d"
    })) || []
  };
};

/**
 * Custom hook for fetching artist page data
 * @returns {Object} - { artistPageData, loading, error }
 */
export const useArtistPageData = () => {
  const [artistPageData, setArtistPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎯 useArtistPageData fetching...');
        const { getArtistPageData } = await import('@/lib/strapi');
        const data = await getArtistPageData();
        
        console.log('📦 Received artist page data in hook:', data);
        
        if (data?.data?.attributes) {
          console.log('✅ Artist page data found, transforming...');
          const transformedData = transformArtistPageData(data.data.attributes);
          console.log('🔄 Transformed artist page data:', transformedData);
          setArtistPageData(transformedData);
        } else {
          console.log('⚠️ No artist page data found, using fallback content');
          console.log('Data structure:', {
            hasData: !!data,
            hasDataData: !!data?.data,
            hasAttributes: !!data?.data?.attributes,
            attributeKeys: data?.data?.attributes ? Object.keys(data.data.attributes) : 'No attributes'
          });
          
          // Provide fallback data so the page doesn't crash
          setArtistPageData({
            mainHeading: "Featured Artists",
            artistSection: {
              title: "And +500 Other Artists",
              description: "ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART - LINDSAY KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA ZOREF - ROB PRIOR - LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI - JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS - MOHSEN HAZRATI - RAGZY X - MUSKETON - TILLAVISION - MADE BY OONA - STACIE ANT - YOUNG & SICK",
              carousal_item: [
                { text: "FCKENDER" },
                { text: "JENNI PASANEN" },
                { text: "BEEPLE" },
                { text: "DEGODS" },
                { text: "MADE BY OONA" },
                { text: "ONCHAINMONKEY" },
                { text: "WORLD OF WOMEN" },
                { text: "RON ENGLISH" },
                { text: "JEREMY COWART" }
              ],
              media: [
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              ]
            },
            cards: [
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/1.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/2.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/3.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/4.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/5.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/6.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/7.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/8.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/9.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              },
              {
                title: "Crypto executive works smarter with Even G1.",
                image: "/artists/10.png",
                link: "https://www.nolcha.com/artists-pages/janedao-db55d"
              }
            ]
          });
        }
      } catch (err) {
        console.error('💥 Error fetching artist page data:', err);
        // Provide fallback data even on error
        setArtistPageData({
          mainHeading: "Featured Artists",
          artistSection: {
            title: "Unable to Load Content",
            description: "There was an issue loading the artist content. Please try again later.",
            carousal_item: [],
            media: []
          },
          cards: []
        });
        setError('Failed to load artist page content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { artistPageData, loading, error };
};