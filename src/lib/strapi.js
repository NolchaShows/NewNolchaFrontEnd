const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {object} options - Additional fetch options
 * @returns {Promise} - The response data
 */
export async function fetchFromStrapi(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token is provided
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Fetch upcoming page data from Strapi
 * @returns {Promise} - The upcoming page data
 */
export async function getUpcomingPageData() {
  try {
    // Populate all nested components for upcoming events
    const data = await fetchFromStrapi('upcoming-pages?populate[0]=upcoming_events_section&populate[1]=upcoming_events_section.image&populate[2]=upcoming_events_section.tags&populate[3]=upcoming_events_section.event_modal&populate[4]=upcoming_events_section.event_modal.event_card&populate[5]=upcoming_events_section.event_modal.event_card.images&populate[6]=upcoming_events_section.event_modal.event_card.social_links&populate[7]=upcoming_events_section.event_modal.media_carousal&populate[8]=upcoming_events_section.event_modal.media_carousal.url&populate[9]=upcoming_events_section.event_modal.image_carousal&populate[10]=upcoming_events_section.event_modal.image_carousal.carousal_item&populate[11]=upcoming_events_section.event_modal.image_carousal.carousal_item.image&populate[12]=upcoming_events_section.event_modal.image_stack');
    return data;
  } catch (error) {
    console.error('Error fetching upcoming page data:', error);
    return null;
  }
}

/**
 * Fetch charity partner page data from Strapi
 * @param {string} key - The charity partner key (cerebral_palsy_foundation, make_a_wish, st_jude)
 * @returns {Promise} - The charity partner page data
 */
export async function getCharityPartnerPageData(key) {
  try {
    console.log('🔍 Fetching charity partner data for key:', key);
    
    // Try different population strategies
    let data;
    
    try {
      // Try with deep population for all nested components using correct Strapi v5 syntax
      data = await fetchFromStrapi(`charity-partner-pages?populate[0]=charity_partner_section&populate[1]=charity_partner_section.main_image&populate[2]=charity_partner_section.content_card&populate[3]=charity_partner_section.content_card.image&populate[4]=charity_partner_section.image_text_card&populate[5]=charity_partner_section.image_text_card.image&populate[6]=charity_partner_section.text_hero&populate[7]=charity_partner_section.text_hero.slides&populate[8]=charity_partner_section.text_hero.slides.main_image&populate[9]=charity_partner_section.text_hero.slides.second_image&populate[10]=charity_partner_section.gallery`);
      console.log('✅ Deep populate successful');
    } catch (deepError) {
      console.log('⚠️ Deep populate failed, trying simple populate:', deepError.message);
      try {
        // Fallback to simple populate
        data = await fetchFromStrapi('charity-partner-pages?populate=charity_partner_section');
        console.log('✅ Simple populate successful');
      } catch (simpleError) {
        console.log('⚠️ Simple populate failed, trying wildcard:', simpleError.message);
        // Last resort - wildcard populate
        data = await fetchFromStrapi('charity-partner-pages?populate=*');
        console.log('✅ Wildcard populate successful');
      }
    }
    
    console.log('📊 Raw API Response:', JSON.stringify(data, null, 2));
    
    // Validate response structure
    if (!data || !data.data) {
      console.log('❌ No data received from API');
      return null;
    }
    
    // Handle both array and single object responses
    const pages = Array.isArray(data.data) ? data.data : [data.data];
    console.log(`📄 Processing ${pages.length} page(s)`);
    
    // Search through all pages for matching key
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      console.log(`📄 Page ${i}:`, {
        id: page?.id,
        documentId: page?.documentId,
        directCharitySection: !!page?.charity_partner_section,
        attributesCharitySection: !!page?.attributes?.charity_partner_section
      });
      
      // Handle both Strapi v4 and v5 response formats
      let charitySection = page?.charity_partner_section || page?.attributes?.charity_partner_section;
      
      if (!charitySection) {
        console.log(`⚠️ Page ${i} has no charity_partner_section`);
        continue;
      }
      
      console.log(`🔍 Page ${i} charity_partner_section:`, {
        exists: !!charitySection,
        isArray: Array.isArray(charitySection),
        length: Array.isArray(charitySection) ? charitySection.length : 'Not array',
        type: typeof charitySection
      });
      
      // Handle both array and single object for charity_partner_section
      const sections = Array.isArray(charitySection) ? charitySection : [charitySection];
      
      for (let j = 0; j < sections.length; j++) {
        const section = sections[j];
        console.log(`🔍 Section ${j}:`, {
          hasKey: !!section?.key,
          key: section?.key,
          matchesTarget: section?.key === key,
          hasMainHeading: !!section?.mainHeading,
          hasSubHeading: !!section?.subHeading
        });
        
        if (section?.key === key) {
          console.log('✅ Found matching section for key:', key);
          console.log('📋 Section data:', section);
          
          // Return in a consistent format that our components expect
          return { 
            data: { 
              attributes: {
                charity_partner_section: section
              }
            } 
          };
        }
      }
    }
    
    console.log('❌ No matching section found for key:', key);
    return null;
    
  } catch (error) {
    console.error('💥 Error fetching charity partner page data:', error);
    return null;
  }
}

/**
 * Fetch artist page data from Strapi
 * @returns {Promise} - The artist page data
 */
export async function getArtistPageData() {
  try {
    console.log('🎨 Fetching artist page data...');
    
    // Use deep population for all nested components
    const data = await fetchFromStrapi('artist-pages?populate[0]=artist_section&populate[1]=artist_section.carousal_item&populate[2]=artist_section.media&populate[3]=card&populate[4]=card.image');
    
    console.log('📊 Artist Page API Response:', JSON.stringify(data, null, 2));
    
    if (!data || !data.data) {
      console.log('❌ No artist page data received from API');
      return null;
    }
    
    // Return the first artist page data
    const artistPage = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log('✅ Artist page data processed successfully');
    
    return { data: { attributes: artistPage } };
    
  } catch (error) {
    console.error('💥 Error fetching artist page data:', error);
    return null;
  }
}

/**
 * Fetch landing page data from Strapi
 * @returns {Promise} - The landing page data
 */
export async function getLandingPageData() {
  try {
    // Use the most explicit population syntax for nested media and components
    const data = await fetchFromStrapi('landing-pages?populate[0]=hero_section&populate[1]=logo_slider&populate[2]=logo_slider.logos&populate[3]=about_section&populate[4]=about_section.image&populate[5]=about_section.paragraphs&populate[6]=recent_events&populate[7]=recent_events.events&populate[8]=service_section&populate[9]=service_section.services&populate[10]=service_section.services.images&populate[11]=partner_section&populate[12]=partner_section.partners&populate[13]=partner_section.partners.primary&populate[14]=partner_section.partners.secondary&populate[15]=speaker_section&populate[16]=speaker_section.speakers&populate[17]=speaker_section.speakers.image&populate[18]=texthero_section&populate[19]=texthero_section.slides&populate[20]=texthero_section.slides.main_image&populate[21]=texthero_section.slides.logo_image&populate[22]=nolcha_experience_section&populate[23]=nolcha_experience_section.main_image&populate[24]=nolcha_experience_section.accordion_sections&populate[25]=artist_section&populate[26]=artist_section.carousal_item&populate[27]=artist_section.media&populate[28]=carousal_section&populate[29]=carousal_section.carousal_item&populate[30]=carousal_section.carousal_item.image&populate[31]=contact_section&populate[32]=contact_section.background_image&populate[33]=partner_section_2&populate[34]=partner_section_2.partners&populate[35]=partner_section_2.partners.primary&populate[36]=partner_section_2.partners.secondary');
    return data;
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return null;
  }
}

/**
 * Fetch press page data from Strapi
 * @returns {Promise} - The press page data
 */
export async function getPressPageData() {
  try {
    console.log('📰 Fetching press page data...');
    
    // Use deep population for all nested components
    const data = await fetchFromStrapi('press-pages?populate[0]=heroVideo&populate[1]=logos&populate[2]=logos.image&populate[3]=aboutSection&populate[4]=aboutSection.image&populate[5]=companies&populate[6]=companies.logo&populate[7]=cards&populate[8]=cards.newsPaper&populate[9]=cards.image');
    
    console.log('📊 Press Page API Response:', JSON.stringify(data, null, 2));
    
    if (!data || !data.data) {
      console.log('❌ No press page data received from API');
      return null;
    }
    
    // Return the first press page data
    const pressPage = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log('✅ Press page data processed successfully');
    
    return { data: { attributes: pressPage } };
    
  } catch (error) {
    console.error('❌ Error fetching press page data:', error);
    return null;
  }
}

/**
 * Fetch experience page data from Strapi
 * @param {string} experiencePage - The experience page identifier
 * @returns {Promise} - The experience page data
 */
export async function getExperiencePageData(experiencePage) {
  try {
    console.log(`🏛️ Fetching experience page data for: ${experiencePage}`);
    
    // Use deep population for all nested components
    const populateQuery = [
      'populate[0]=conferenceImage',
      'populate[1]=hostImage', 
      'populate[2]=hostDescription',
      'populate[3]=videos',
      'populate[4]=videos.videoUrl',
      'populate[5]=posts',
      'populate[6]=posts.image',
      'populate[7]=partners',
      'populate[8]=partners.imageWhite',
      'populate[9]=partners.imageBlack',
      'populate[10]=pressCards',
      'populate[11]=pressCards.newsPaper',
      'populate[12]=pressCards.image',
      'populate[13]=galleryImages',
      'populate[14]=galleryImages.image'
    ].join('&');
    
    // Properly encode the filter parameter
    const filterParam = `filters[page][$eq]=${encodeURIComponent(experiencePage)}`;
    const data = await fetchFromStrapi(`experience-pages?${filterParam}&${populateQuery}`);
    
    console.log('📊 Experience Page API Response:', JSON.stringify(data, null, 2));
    
    if (!data || !data.data || data.data.length === 0) {
      console.log(`❌ No experience page data received for: ${experiencePage}`);
      return null;
    }
    
    // Return the first matching experience page data
    const experiencePageData = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log(`✅ Experience page data processed successfully for: ${experiencePage}`);
    console.log('📋 Raw experience page data:', JSON.stringify(experiencePageData, null, 2));
    
    // Handle Strapi v5 format - data is directly in the object, not in attributes
    return { data: { attributes: experiencePageData } };
    
  } catch (error) {
    console.error(`❌ Error fetching experience page data for ${experiencePage}:`, error);
    return null;
  }
}

/**
 * Fetch speakers page data from Strapi
 * @returns {Promise} - The speakers page data
 */
export async function getSpeakersPageData() {
  try {
    console.log('🎤 Fetching speakers page data...');
    
    // First, try a simple request to check if the endpoint exists
    try {
      console.log('🔍 Testing basic endpoint...');
      const basicData = await fetchFromStrapi('speakers-pages');
      console.log('✅ Basic endpoint works:', basicData);
    } catch (basicError) {
      console.log('❌ Basic endpoint failed:', basicError.message);
      
      // Try alternative endpoint names
      const alternativeEndpoints = [
        'speakers-page',
        'speaker-pages',
        'speaker-page',
        'speakerspage',
        'speakerpage'
      ];
      
      for (const endpoint of alternativeEndpoints) {
        try {
          console.log(`🔍 Trying alternative endpoint: ${endpoint}`);
          const altData = await fetchFromStrapi(endpoint);
          console.log(`✅ Found working endpoint: ${endpoint}`);
          return { data: { attributes: Array.isArray(altData.data) ? altData.data[0] : altData.data } };
        } catch (altError) {
          console.log(`❌ ${endpoint} failed:`, altError.message);
        }
      }
      
      console.log('❌ No working endpoints found');
      return null;
    }
    
    // If basic endpoint works, try with simple populate
    try {
      console.log('🔍 Trying with simple populate...');
      const simpleData = await fetchFromStrapi('speakers-pages?populate=*');
      console.log('✅ Simple populate works:', simpleData);
      
      if (!simpleData || !simpleData.data) {
        console.log('❌ No speakers page data received from API');
        return null;
      }
      
      // Now try to get component data with proper population
      try {
        console.log('🔍 Trying to populate repeatable components with images...');
        const componentPopulate = 'populate[carousal1][populate]=images&populate[carousal2][populate]=images&populate[carousal3][populate]=images&populate[gallery][populate]=images&populate[stack_section][populate][testimonials][populate]=images&populate[stack_section][populate][images_left][populate]=images&populate[stack_section][populate][images_right][populate]=images';
        
        const componentData = await fetchFromStrapi(`speakers-pages?${componentPopulate}`);
        console.log('✅ Component populate successful');
        
        if (componentData && componentData.data) {
          const speakersPage = Array.isArray(componentData.data) ? componentData.data[0] : componentData.data;
          
          // Manually add videos from simple data since it can't be populated together with components
          if (simpleData?.data?.[0]?.videos) {
            speakersPage.videos = simpleData.data[0].videos;
          }
          // stack_section is now properly populated with the component data, so no need to override it
          
          console.log('✅ Combined component and simple data successfully');
          console.log('📋 Final data structure:', {
            hasVideos: !!speakersPage.videos,
            hasStackSection: !!speakersPage.stack_section,
            stackSectionHasTitle: !!speakersPage.stack_section?.title,
            stackSectionTestimonials: speakersPage.stack_section?.testimonials?.length || 0,
            stackSectionImagesLeft: speakersPage.stack_section?.images_left?.length || 0,
            stackSectionImagesRight: speakersPage.stack_section?.images_right?.length || 0,
            carousal1Count: speakersPage.carousal1?.length || 0,
            carousal2Count: speakersPage.carousal2?.length || 0,
            carousal3Count: speakersPage.carousal3?.length || 0,
            galleryCount: speakersPage.gallery?.length || 0
          });
          
          return { data: { attributes: speakersPage } };
        }
      } catch (componentError) {
        console.log('❌ Component populate failed:', componentError.message);
      }
      
      // Fallback to simple data if component populate fails
      const speakersPage = Array.isArray(simpleData.data) ? simpleData.data[0] : simpleData.data;
      console.log('✅ Using simple data as fallback - speakers page data processed successfully');
      
      return { data: { attributes: speakersPage } };
      
    } catch (populateError) {
      console.log('❌ Simple populate failed:', populateError.message);
      
      // Since nested populate is complex, use the working simple populate
      // and handle component data fetching separately if needed
      console.log('🔍 Using simple populate (components will show IDs only)...');
      const speakersPage = Array.isArray(simpleData.data) ? simpleData.data[0] : simpleData.data;
      console.log('📋 Speakers page structure:', Object.keys(speakersPage));
      console.log('� Component IDs found:', {
        carousal1: speakersPage.carousal1?.length || 0,
        carousal2: speakersPage.carousal2?.length || 0,
        carousal3: speakersPage.carousal3?.length || 0,
        gallery: speakersPage.gallery?.length || 0,
        stack_section: speakersPage.stack_section ? 'present' : 'missing'
      });
      
      return { data: { attributes: speakersPage } };
    }
    
  } catch (error) {
    console.error('❌ Error fetching speakers page data:', error);
    return null;
  }
}

/**
 * Fetch designer page data from Strapi
 * @returns {Promise} - The designer page data
 */
export async function getDesignerPageData() {
  try {
    console.log('🎨 Fetching designer page data...');
    
    // Use deep population for all nested components
    const populateQuery = [
      'populate[0]=heroImage',
      'populate[1]=videos',
      'populate[2]=videos.media',
      'populate[3]=galleryImages',
      'populate[4]=galleryImages.image',
      'populate[5]=pressPartners',
      'populate[6]=pressPartners.imageWhite',
      'populate[7]=pressPartners.imageBlack',
      'populate[8]=artistdescription'
    ].join('&');
    
    const data = await fetchFromStrapi(`designer-pages?${populateQuery}`);
    
    console.log('📊 Designer Page API Response:', JSON.stringify(data, null, 2));
    
    if (!data || !data.data || data.data.length === 0) {
      console.log('❌ No designer page data received from API');
      return null;
    }
    
    // Return the first designer page data
    const designerPageData = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log('✅ Designer page data processed successfully');
    console.log('📋 Raw designer page data:', JSON.stringify(designerPageData, null, 2));
    
    // Handle Strapi v5 format - data is directly in the object, not in attributes
    return { data: { attributes: designerPageData } };
    
  } catch (error) {
    console.error('❌ Error fetching designer page data:', error);
    return null;
  }
}

/**
 * Fetch all designers from Strapi (for listing page)
 * @returns {Promise} - Array of designers with listing image
 */
export async function getDesigners() {
  try {
    console.log('👗 Fetching all designers...');

    const populateQuery = 'populate[0]=listingImage';
    const data = await fetchFromStrapi(`designers?${populateQuery}`);

    console.log('📊 Designers API Response:', JSON.stringify(data, null, 2));

    if (!data || !data.data) {
      console.log('❌ No designers received from API');
      return null;
    }

    console.log(`✅ Found ${data.data.length} designers`);
    return data;

  } catch (error) {
    console.error('❌ Error fetching designers:', error);
    return null;
  }
}

/**
 * Fetch single designer by slug from Strapi (for detail page)
 * @param {string} slug - The designer's slug
 * @returns {Promise} - Full designer data with all relations
 */
export async function getDesignerBySlug(slug) {
  try {
    console.log(`👗 Fetching designer by slug: ${slug}`);

    // Use deep population for all nested components
    const populateQuery = [
      'populate[0]=heroImage',
      'populate[1]=listingImage',
      'populate[2]=paragraphs',
      'populate[3]=sliderImages',
      'populate[4]=sliderImages.image',
      'populate[5]=socialImages',
      'populate[6]=socialImages.image',
      'populate[7]=sections',
      'populate[8]=sections.image'
    ].join('&');

    // Try the custom by-slug endpoint first
    try {
      const data = await fetchFromStrapi(`designers/by-slug/${slug}?${populateQuery}`);

      console.log('📊 Designer by slug API Response:', JSON.stringify(data, null, 2));

      if (data?.data) {
        console.log(`✅ Found designer: ${data.data.name}`);
        return data;
      }
    } catch (customEndpointError) {
      console.log('⚠️ Custom by-slug endpoint not available, trying filter...');
    }

    // Fallback to filter by slug
    const filterQuery = `filters[slug][$eq]=${encodeURIComponent(slug)}`;
    const data = await fetchFromStrapi(`designers?${filterQuery}&${populateQuery}`);

    console.log('📊 Designer filter API Response:', JSON.stringify(data, null, 2));

    if (!data || !data.data || data.data.length === 0) {
      console.log(`❌ No designer found with slug: ${slug}`);
      return null;
    }

    // Return the first matching designer
    const designer = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log(`✅ Found designer: ${designer.name}`);

    return { data: designer };

  } catch (error) {
    console.error(`❌ Error fetching designer by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Fetch all featured artists from Strapi (for listing page)
 * @returns {Promise} - Array of featured artists with listing image
 */
export async function getFeaturedArtists() {
  try {
    console.log('🎨 Fetching all featured artists...');

    const populateQuery = 'populate[0]=listingImage';
    const data = await fetchFromStrapi(`featured-artists?${populateQuery}`);

    console.log('📊 Featured Artists API Response:', JSON.stringify(data, null, 2));

    if (!data || !data.data) {
      console.log('❌ No featured artists received from API');
      return null;
    }

    console.log(`✅ Found ${data.data.length} featured artists`);
    return data;

  } catch (error) {
    console.error('❌ Error fetching featured artists:', error);
    return null;
  }
}

/**
 * Fetch single featured artist by slug from Strapi (for detail page)
 * @param {string} slug - The featured artist's slug
 * @returns {Promise} - Full featured artist data with all relations
 */
export async function getFeaturedArtistBySlug(slug) {
  try {
    console.log(`🎨 Fetching featured artist by slug: ${slug}`);

    const populateQuery = [
      'populate[0]=heroImage',
      'populate[1]=listingImage',
      'populate[2]=paragraphs',
      'populate[3]=sliderImages',
      'populate[4]=sliderImages.image',
      'populate[5]=socialImages',
      'populate[6]=socialImages.image',
      'populate[7]=sections',
      'populate[8]=sections.image'
    ].join('&');

    // Try the custom by-slug endpoint first
    try {
      const data = await fetchFromStrapi(`featured-artists/by-slug/${slug}?${populateQuery}`);

      console.log('📊 Featured artist by slug API Response:', JSON.stringify(data, null, 2));

      if (data?.data) {
        console.log(`✅ Found featured artist: ${data.data.name}`);
        return data;
      }
    } catch (customEndpointError) {
      console.log('⚠️ Custom by-slug endpoint not available, trying filter...');
    }

    // Fallback to filter by slug
    const filterQuery = `filters[slug][$eq]=${encodeURIComponent(slug)}`;
    const data = await fetchFromStrapi(`featured-artists?${filterQuery}&${populateQuery}`);

    console.log('📊 Featured artist filter API Response:', JSON.stringify(data, null, 2));

    if (!data || !data.data || data.data.length === 0) {
      console.log(`❌ No featured artist found with slug: ${slug}`);
      return null;
    }

    const featuredArtist = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log(`✅ Found featured artist: ${featuredArtist.name}`);

    return { data: featuredArtist };

  } catch (error) {
    console.error(`❌ Error fetching featured artist by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Fetch gallery page data from Strapi
 * @returns {Promise} - The gallery page data
 */
export async function getGalleryPageData() {
  try {
    console.log('🖼️ Fetching gallery page data...');
    
    // First, try a simple request to check if the endpoint exists
    try {
      console.log('🔍 Testing basic endpoint...');
      const basicData = await fetchFromStrapi('gallery-pages');
      console.log('✅ Basic endpoint works:', basicData);
    } catch (basicError) {
      console.log('❌ Basic endpoint failed:', basicError.message);
      
      // Try alternative endpoint names
      const alternativeEndpoints = [
        'gallery-page',
        'gallerypage',
        'gallerypages'
      ];
      
      for (const endpoint of alternativeEndpoints) {
        try {
          console.log(`🔍 Trying alternative endpoint: ${endpoint}`);
          const altData = await fetchFromStrapi(endpoint);
          console.log(`✅ Found working endpoint: ${endpoint}`);
          return { data: { attributes: Array.isArray(altData.data) ? altData.data[0] : altData.data } };
        } catch (altError) {
          console.log(`❌ ${endpoint} failed:`, altError.message);
        }
      }
      
      console.log('❌ No working endpoints found');
      return null;
    }
    
    // If basic endpoint works, try with component population
    try {
      console.log('🔍 Trying to populate components...');
      
      // Use proper Strapi v5 populate syntax for nested repeatable components
      const componentPopulate = 'populate[event_slider][populate][items][populate]=image';
      
      const componentData = await fetchFromStrapi(`gallery-pages?${componentPopulate}`);
      console.log('✅ Component populate successful');
      console.log('📊 Gallery Page API Response:', JSON.stringify(componentData, null, 2));
      
      if (!componentData || !componentData.data) {
        console.log('❌ No gallery page data received from API');
        return null;
      }
      
      const galleryPage = Array.isArray(componentData.data) ? componentData.data[0] : componentData.data;
      
      console.log('📋 Gallery page structure:', {
        hasTitle: !!galleryPage.title,
        hasImage: !!galleryPage.image,
        hasEventSlider: !!galleryPage.event_slider,
        eventSliderCount: Array.isArray(galleryPage.event_slider) ? galleryPage.event_slider.length : (galleryPage.event_slider ? 1 : 0),
        eventSliderStructure: galleryPage.event_slider ? galleryPage.event_slider.map((slider, i) => ({
          index: i,
          hasItems: !!slider.items,
          itemsCount: Array.isArray(slider.items) ? slider.items.length : 0,
          sectionTitle: slider.section_title,
          eventName: slider.event_name
        })) : []
      });
      
      return { data: { attributes: galleryPage } };
      
    } catch (componentError) {
      console.log('❌ Component populate failed:', componentError.message);
      
      // Try alternative populate strategies
      const alternativePopulates = [
        'populate=event_slider.items.image',
        'populate[0]=event_slider&populate[1]=event_slider.items&populate[2]=event_slider.items.image',
        'populate=*'
      ];
      
      for (let i = 0; i < alternativePopulates.length; i++) {
        try {
          console.log(`🔍 Trying alternative populate strategy ${i + 1}: ${alternativePopulates[i]}`);
          const altData = await fetchFromStrapi(`gallery-pages?${alternativePopulates[i]}`);
          
          if (altData?.data) {
            const galleryPage = Array.isArray(altData.data) ? altData.data[0] : altData.data;
            console.log(`✅ Alternative populate strategy ${i + 1} successful`);
            
            // Log the structure we got
            console.log('📋 Alternative data structure:', {
              hasEventSlider: !!galleryPage.event_slider,
              eventSliderType: Array.isArray(galleryPage.event_slider) ? 'array' : typeof galleryPage.event_slider,
              eventSliderLength: Array.isArray(galleryPage.event_slider) ? galleryPage.event_slider.length : 'not array'
            });
            
            return { data: { attributes: galleryPage } };
          }
        } catch (altError) {
          console.log(`❌ Alternative populate ${i + 1} failed:`, altError.message);
          continue;
        }
      }
      
      console.log('❌ All populate strategies failed');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Error fetching gallery page data:', error);
    return null;
  }
}

/**
 * Fetch services page data from Strapi
 * @returns {Promise} - The services page data
 */
export async function getServicesPageData() {
  try {
    console.log('🛠️ Fetching services page data...');
    
    // Use deep population for videos, logo_slider component, header_section, service_section, and gallery
    const populateQuery = [
      'populate[0]=videos',
      'populate[1]=logo_slider',
      'populate[2]=logo_slider.logos',
      'populate[3]=header_section',
      'populate[4]=header_section.image',
      'populate[5]=service_section',
      'populate[6]=service_section.services',
      'populate[7]=service_section.services.images',
      'populate[8]=gallery'
    ].join('&');
    
    const data = await fetchFromStrapi(`services-pages?${populateQuery}`);
    
    console.log('📊 Services Page API Response:', JSON.stringify(data, null, 2));
    
    if (!data || !data.data || data.data.length === 0) {
      console.log('❌ No services page data received from API');
      return null;
    }
    
    // Return the first services page data
    const servicesPageData = Array.isArray(data.data) ? data.data[0] : data.data;
    console.log('✅ Services page data processed successfully');
    
    // Handle Strapi v5 format - data is directly in the object, not in attributes
    return { data: { attributes: servicesPageData } };
    
  } catch (error) {
    console.error('❌ Error fetching services page data:', error);
    
    // Check if it's a network error (Strapi not running)
    if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
      console.warn('� Strapi server appears to be offline');
      console.warn('💡 Start Strapi server with: npm run develop');
      console.warn('🔄 Using fallback data for now');
    }
    
    return null;
  }
}