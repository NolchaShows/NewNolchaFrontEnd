# Services Page Gallery Implementation

## Overview
The services page now includes a dynamic gallery component that fetches images from the Strapi `gallery` field (multiple media).

## Strapi Collection Structure Updated

### ServicesPage Collection Fields (Complete)

1. **videos** (Multiple Media) - Video slider content
2. **logo_slider** (Component) - Logo section with title and logos  
3. **header_section** (Component) - Header with title, description, and image
4. **service_section** (Component) - Services grid with repeatable service items
5. **gallery** (Multiple Media) - Gallery images for the image gallery section ✨ **NEW**

## Gallery Implementation

### `processGalleryFromStrapi()` Function
- Processes array of media objects from Strapi
- Generates full URLs for relative paths
- Provides ID, URL, and alt text for each image
- Filters out invalid/broken images
- Falls back to default gallery if no data

### Dynamic ImageGallery Component
- **Props**: `galleryData`, `loading`
- **Loading State**: Shows skeleton placeholders while data loads
- **Error Handling**: Falls back to default images if Strapi images fail to load
- **Responsive Layout**: Maintains original responsive grid layout
- **Flexible Structure**: Adapts to any number of gallery images

### Gallery Layout Structure
The gallery maintains a fixed layout pattern:
1. **Row 1**: 2 landscape images (aspect-ratio 1.38)
2. **Row 2**: 4 square images (aspect-ratio 0.89)  
3. **Banner 1**: 1 wide banner image (aspect-ratio 2.23)
4. **Row 3**: 2 landscape images (aspect-ratio 1.38)
5. **Row 4**: 4 square images (aspect-ratio 0.89)
6. **Banner 2**: 1 wide banner image (aspect-ratio 2.23)

**Total**: 14 images expected for full gallery

## Usage in Strapi Admin

1. **Create ServicesPage** entry
2. **Add Gallery Images** - Upload up to 14 images (or more)
3. **Image Order** - First image goes to first position, etc.
4. **Alt Text** - Use alternativeText or caption fields for accessibility

### Optimal Image Dimensions
- **Landscape**: ~1380×1000px (aspect 1.38)
- **Square**: ~890×1000px (aspect 0.89)
- **Banner**: ~2230×1000px (aspect 2.23)

## Fallback Behavior

### When Strapi Unavailable
- Uses default 14 gallery images from `/services/` folder
- Maintains full gallery layout and functionality

### When Some Images Missing
- Uses `getImage(index)` helper to provide fallbacks
- Individual image error handling with `onError` callbacks
- Graceful degradation for partial galleries

## File Updates Made

### `/src/lib/strapi.js`
```javascript
// Added gallery to populate query
'populate[8]=gallery'
```

### `/src/utils/servicesPageUtils.js`
```javascript
// New function
export function processGalleryFromStrapi(galleryData, fallbackData = [])

// Updated defaults
servicesPageDefaults.gallery = [/* 14 default images */]
```

### `/src/app/services/page.jsx`
```javascript
// Import gallery processor
import { processGalleryFromStrapi } from "@/utils/servicesPageUtils";

// Process gallery data
const galleryData = processGalleryFromStrapi(
  servicesData?.data?.attributes?.gallery,
  servicesPageDefaults.gallery
);

// Pass to component
<ImageGallery galleryData={galleryData} loading={loading} />
```

### `/src/components/services/ImageGallery.jsx`
```javascript
// Now accepts props and renders dynamically
function ImageGallery({ galleryData, loading })
```

## Testing

### Run Test File
```bash
node test-services-page.js
```

### Expected Output
- ✅ Gallery field detection in Strapi response
- ✅ Gallery array length and structure validation
- ✅ Individual image object inspection

### Debug Console Logs
- Gallery data processing information
- Image count and URL validation
- Fallback usage confirmation

## Development Tips

1. **Image Quality**: Use high-quality images for better visual impact
2. **Performance**: Consider image optimization for web delivery
3. **Accessibility**: Provide meaningful alt text in Strapi
4. **Responsive**: Images automatically adapt to screen sizes
5. **Order Matters**: First 14 images fill specific layout positions
6. **Extra Images**: Additional images beyond 14 are ignored in current layout

## Error Scenarios Handled

- ❌ Strapi server offline → Use defaults
- ❌ No gallery data → Use defaults  
- ❌ Empty gallery array → Use defaults
- ❌ Individual image load failure → Use specific fallback
- ❌ Invalid image URLs → Filter out during processing
- ❌ Missing alt text → Generate default alt text

The gallery is now fully dynamic and production-ready! 🎉