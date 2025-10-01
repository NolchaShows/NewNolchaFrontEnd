const fetch = require('node-fetch');

async function fetchArtistData() {
  try {
    const response = await fetch('http://localhost:1337/api/artist-pages?populate[0]=artist_section&populate[1]=artist_section.carousal_item&populate[2]=artist_section.media&populate[3]=card&populate[4]=card.image');
    const data = await response.json();
    console.log('Artist Page API Response:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching artist data:', error);
  }
}

fetchArtistData();