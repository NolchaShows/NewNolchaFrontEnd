// Test script to verify charity partner data structure
const testCharityData = async () => {
  try {
    console.log('🔍 Testing charity partner data structure...');
    
    // Test the API call
    const response = await fetch('http://localhost:1337/api/charity-partner-pages?populate[0]=charity_partner_section&populate[1]=charity_partner_section.main_image&populate[2]=charity_partner_section.content_card&populate[3]=charity_partner_section.content_card.image&populate[4]=charity_partner_section.image_text_card&populate[5]=charity_partner_section.image_text_card.image&populate[6]=charity_partner_section.text_hero&populate[7]=charity_partner_section.text_hero.slides&populate[8]=charity_partner_section.text_hero.slides.main_image&populate[9]=charity_partner_section.text_hero.slides.second_image&populate[10]=charity_partner_section.gallery');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API Response received');
    console.log('📊 Data structure:', JSON.stringify(data, null, 2));
    
    // Test data transformation
    const { transformCharityData } = await import('./src/utils/charityPartnerUtils.js');
    
    if (data.data && data.data.length > 0) {
      const pages = data.data;
      console.log(`📄 Found ${pages.length} page(s)`);
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`\n🔍 Testing page ${i + 1}:`);
        
        const charitySection = page.charity_partner_section;
        if (charitySection && Array.isArray(charitySection)) {
          for (let j = 0; j < charitySection.length; j++) {
            const section = charitySection[j];
            console.log(`  📋 Section ${j + 1}:`, {
              key: section.key,
              mainHeading: section.mainHeading,
              subHeading: section.subHeading,
              hasMainImage: !!section.main_image,
              hasContentCard: !!section.content_card,
              imageTextCardCount: section.image_text_card?.length || 0,
              hasTextHero: !!section.text_hero,
              textHeroSlidesCount: section.text_hero?.slides?.length || 0,
              galleryCount: section.gallery?.length || 0
            });
            
            // Test transformation
            const transformedData = transformCharityData(section, 'Test Heading', 'Test Subheading');
            console.log(`  🔄 Transformed data structure:`, {
              mainHeading: transformedData.mainHeading,
              subHeading: transformedData.subHeading,
              hasMainImage: !!transformedData.mainImage,
              hasContentCard: !!transformedData.contentCard,
              textCardsCount: transformedData.textCards?.length || 0,
              hasTextHeroData: !!transformedData.textHeroData,
              textHeroSlidesCount: transformedData.textHeroData?.slides?.length || 0,
              galleryImagesCount: transformedData.galleryImages?.length || 0
            });
          }
        }
      }
    } else {
      console.log('⚠️ No data found in API response');
    }
    
    console.log('\n✅ Test completed successfully');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
};

testCharityData();