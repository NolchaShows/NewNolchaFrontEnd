// Test file for Services Page Strapi integration
const testServicesPageStrapi = async () => {
  try {
    console.log('🧪 Testing Services Page Strapi integration...');
    
    const STRAPI_URL = 'http://localhost:1337';
    
    // Test basic connection first
    console.log('🔍 Testing basic Strapi connection...');
    const basicResponse = await fetch(`${STRAPI_URL}/api`);
    console.log('✅ Basic connection status:', basicResponse.status);
    
    if (!basicResponse.ok) {
      throw new Error('Strapi server is not running or not accessible');
    }
    
    // Test services-pages endpoint without populate
    console.log('🔍 Testing services-pages endpoint (basic)...');
    const basicServicesResponse = await fetch(`${STRAPI_URL}/api/services-pages`);
    console.log('📊 Basic services-pages status:', basicServicesResponse.status);
    
    if (basicServicesResponse.ok) {
      const basicData = await basicServicesResponse.json();
      console.log('📋 Basic Services Pages Structure:', {
        dataExists: !!basicData.data,
        isArray: Array.isArray(basicData.data),
        count: Array.isArray(basicData.data) ? basicData.data.length : (basicData.data ? 1 : 0),
        firstItemFields: basicData.data?.[0] ? Object.keys(basicData.data[0]) : 'No data'
      });
      
      if (basicData.data && basicData.data.length > 0) {
        const firstItem = basicData.data[0];
        console.log('📋 First ServicesPage item structure:', {
          hasVideos: !!firstItem.videos,
          hasLogoSlider: !!firstItem.logo_slider,
          hasHeaderSection: !!firstItem.header_section,
          hasServiceSection: !!firstItem.service_section,
          hasGallery: !!firstItem.gallery,
          documentId: firstItem.documentId,
          createdAt: firstItem.createdAt
        });
      }
    }
    
    // Test services-pages endpoint with population
    console.log('🔍 Testing services-pages endpoint (with population)...');
    const populateQuery = 'populate[0]=videos&populate[1]=logo_slider&populate[2]=logo_slider.logos&populate[3]=header_section&populate[4]=header_section.image&populate[5]=service_section&populate[6]=service_section.services&populate[7]=service_section.services.images&populate[8]=gallery';
    const populatedResponse = await fetch(`${STRAPI_URL}/api/services-pages?${populateQuery}`);
    console.log('📊 Populated services-pages status:', populatedResponse.status);
    
    if (populatedResponse.ok) {
      const populatedData = await populatedResponse.json();
      console.log('📋 Populated Services Pages Data:', JSON.stringify(populatedData, null, 2));
      
      if (populatedData.data && populatedData.data.length > 0) {
        const servicesPage = populatedData.data[0];
        
        console.log('🎬 Videos Analysis:', {
          hasVideos: !!servicesPage.videos,
          videosIsArray: Array.isArray(servicesPage.videos),
          videosCount: Array.isArray(servicesPage.videos) ? servicesPage.videos.length : 0,
          firstVideoStructure: servicesPage.videos?.[0] ? Object.keys(servicesPage.videos[0]) : 'No videos'
        });
        
        console.log('🏷️ Logo Slider Analysis:', {
          hasLogoSlider: !!servicesPage.logo_slider,
          logoSliderStructure: servicesPage.logo_slider ? Object.keys(servicesPage.logo_slider) : 'No logo slider',
          hasTitle: !!servicesPage.logo_slider?.title,
          hasLogos: !!servicesPage.logo_slider?.logos,
          logosCount: Array.isArray(servicesPage.logo_slider?.logos) ? servicesPage.logo_slider.logos.length : 0
        });
        
        console.log('📝 Header Section Analysis:', {
          hasHeaderSection: !!servicesPage.header_section,
          headerSectionStructure: servicesPage.header_section ? Object.keys(servicesPage.header_section) : 'No header section',
          hasTitle: !!servicesPage.header_section?.title,
          hasDescription: !!servicesPage.header_section?.description,
          hasImage: !!servicesPage.header_section?.image
        });

        console.log('🛠️ Service Section Analysis:', {
          hasServiceSection: !!servicesPage.service_section,
          serviceSectionStructure: servicesPage.service_section ? Object.keys(servicesPage.service_section) : 'No service section',
          hasTitle: !!servicesPage.service_section?.title,
          hasServices: !!servicesPage.service_section?.services,
          servicesCount: Array.isArray(servicesPage.service_section?.services) ? servicesPage.service_section.services.length : 0,
          firstServiceStructure: servicesPage.service_section?.services?.[0] ? Object.keys(servicesPage.service_section.services[0]) : 'No services'
        });

        if (servicesPage.service_section?.services?.length > 0) {
          const firstService = servicesPage.service_section.services[0];
          console.log('🔍 First Service Details:', {
            hasServiceId: !!firstService.service_id,
            serviceId: firstService.service_id,
            hasTitle: !!firstService.title,
            title: firstService.title,
            hasDescription: !!firstService.description,
            hasImages: !!firstService.images,
            imagesCount: Array.isArray(firstService.images) ? firstService.images.length : 0,
            hasLayout: !!firstService.layout,
            layout: firstService.layout
          });
        }

        console.log('🖼️ Gallery Analysis:', {
          hasGallery: !!servicesPage.gallery,
          galleryIsArray: Array.isArray(servicesPage.gallery),
          galleryCount: Array.isArray(servicesPage.gallery) ? servicesPage.gallery.length : 0,
          firstImageStructure: servicesPage.gallery?.[0] ? Object.keys(servicesPage.gallery[0]) : 'No gallery images'
        });
      }
    } else {
      const errorText = await populatedResponse.text();
      console.log('❌ Populated services-pages failed:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Services Page test failed:', error.message);
    console.error('💡 Make sure:');
    console.error('  1. Strapi server is running (npm run develop in backend folder)');
    console.error('  2. ServicesPage collection exists in Strapi admin');
    console.error('  3. At least one ServicesPage entry exists with data');
    console.error('  4. Fields: videos (media), logo_slider (component), header_section (component), service_section (component), gallery (media)');
  }
};

// Run the test
testServicesPageStrapi();