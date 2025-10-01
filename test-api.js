// Test script to check Strapi API
const fetch = require('node-fetch');

async function testCharityPartnerAPI() {
  try {
    console.log('========== TESTING WILDCARD POPULATE ==========');
    const response = await fetch('http://localhost:1337/api/charity-partner-pages?populate=*');
    const data = await response.json();
    
    console.log('Wildcard Populate Response:');
    console.log(JSON.stringify(data, null, 2));
    
    console.log('\n========== TESTING DEEP POPULATE ==========');
    const deepPopulateUrl = 'http://localhost:1337/api/charity-partner-pages?populate[0]=charity_partner_section&populate[1]=charity_partner_section.content_card&populate[2]=charity_partner_section.content_card.image&populate[3]=charity_partner_section.image_text_card&populate[4]=charity_partner_section.image_text_card.image&populate[5]=charity_partner_section.text_hero&populate[6]=charity_partner_section.text_hero.slides&populate[7]=charity_partner_section.text_hero.slides.main_image&populate[8]=charity_partner_section.gallery';

    const deepResponse = await fetch(deepPopulateUrl);
    const deepData = await deepResponse.json();
    console.log('Deep Populate Response:', JSON.stringify(deepData, null, 2));
    
    // Test our logic
    if (data && data.data && data.data.length > 0) {
      const page = data.data[0];
      const charitySection = page.charity_partner_section;
      
      console.log('\n========== EXTRACTED SECTION ==========');
      console.log('Extracted charity_partner_section:');
      console.log(JSON.stringify(charitySection, null, 2));
      
      if (Array.isArray(charitySection)) {
        console.log('\n========== LOOKING FOR SPECIFIC KEY ==========');
        const cerebrSection = charitySection.find(section => section.key === 'cerebral_palsy_foundation');
        console.log('Found cerebral_palsy_foundation section:', cerebrSection);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testCharityPartnerAPI();