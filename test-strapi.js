// Test file to debug Strapi connection
const testStrapi = async () => {
  try {
    console.log('🧪 Testing Strapi connection...');
    
    const STRAPI_URL = 'http://localhost:1337';
    const endpoint = 'experience-pages?filters[page][$eq]=vv_raching_with_jack_butcher&populate[0]=conferenceImage&populate[1]=hostImage&populate[2]=hostDescription&populate[3]=videos&populate[4]=videos.videoUrl&populate[5]=posts&populate[6]=posts.image&populate[7]=partners&populate[8]=partners.imageWhite&populate[9]=partners.imageBlack&populate[10]=pressCards&populate[11]=pressCards.newsPaper&populate[12]=pressCards.image&populate[13]=galleryImages&populate[14]=galleryImages.image';
    
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    const data = await response.json();
    
    console.log('📊 Full API Response:', JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      const experienceData = data.data[0];
      console.log('📋 Experience Data:', experienceData);
      console.log('🏛️ Main Heading:', experienceData.mainHeading);
      console.log('📝 Sub Heading:', experienceData.subHeading);
      console.log('👤 Host Name:', experienceData.hostName);
      console.log('📸 Conference Images:', experienceData.conferenceImage);
      console.log('🎭 Host Image:', experienceData.hostImage);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Run the test
testStrapi();