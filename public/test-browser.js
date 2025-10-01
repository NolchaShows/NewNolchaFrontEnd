// Simple browser test for Strapi connection
console.log('🧪 Testing Strapi from browser...');

// Test basic connectivity
fetch('http://localhost:1337/api/experience-pages')
  .then(response => {
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('✅ Successfully fetched data:', data);
    
    if (data.data && data.data.length > 0) {
      console.log('📋 First experience:', data.data[0]);
    }
  })
  .catch(error => {
    console.error('❌ Fetch failed:', error);
  });

// Test with populate query
const populateQuery = [
  'populate[0]=conferenceImage',
  'populate[1]=hostImage',
  'populate[2]=hostDescription',
  'populate[3]=videos',
  'populate[4]=videos.videoUrl'
].join('&');

const filterParam = 'filters[page][$eq]=vv_raching_with_jack_butcher';
const fullUrl = `http://localhost:1337/api/experience-pages?${filterParam}&${populateQuery}`;

console.log('🔗 Full URL:', fullUrl);

fetch(fullUrl)
  .then(response => response.json())
  .then(data => {
    console.log('✅ Populated data:', data);
  })
  .catch(error => {
    console.error('❌ Populated fetch failed:', error);
  });