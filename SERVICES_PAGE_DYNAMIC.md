# Services Page Dynamic Implementation

## Overview
The services page now supports dynamic content from Strapi for videos, logo slider, header section, and services section.

## Strapi Collection Structure

### ServicesPage Collection Fields

1. **videos** (Multiple Media)
   - Stores video files for the video slider

2. **logo_slider** (Component)
   - `title` (Text) - Title for the logo section (e.g., "AS SEEN IN")
   - `logos` (Multiple Media) - Logo images

3. **header_section** (Component) 
   - `title` (Text) - Main header title
   - `description` (Rich Text/Text) - Header description
   - `image` (Single Media) - Header image

4. **service_section** (Component)
   - `title` (Text) - Services section title (e.g., "Explore our services")
   - `services` (Repeatable Component) - Array of service items

### Services Repeatable Component Fields

Each service item has:
- `service_id` (Text) - Unique identifier (e.g., "01", "02", "03")
- `title` (Text) - Service title
- `description` (Text/Rich Text) - Service description  
- `images` (Multiple Media) - Service images
- `layout` (Enumeration) - Layout type: "single", "double", "stacked"

## Layout Types

### single
- Displays one large image
- Used for services with a single hero image
- Responsive: aspect ratio changes on mobile vs desktop

### double  
- Displays two images side by side on desktop
- Stacked on mobile/tablet
- Good for before/after or comparison images

### stacked
- Displays images vertically stacked
- Same behavior on all screen sizes
- Good for showcasing multiple related images

## File Structure

```
src/
├── app/services/page.jsx           # Main services page component
├── components/
│   ├── home/Services.jsx           # Services grid/slider component
│   ├── home/TextSlider.jsx         # Logo slider component  
│   └── services/Header.jsx         # Services page header
├── lib/strapi.js                   # Strapi API functions
└── utils/servicesPageUtils.js      # Processing utilities
```

## Key Functions

### `getServicesPageData()` 
- Fetches all services page data from Strapi
- Includes deep population for nested components and media

### `processServiceSectionFromStrapi()`
- Processes service section data
- Handles image URL generation
- Provides fallback data

### `processVideosFromStrapi()`
- Processes video media objects
- Converts relative URLs to absolute URLs
- Handles different video formats

## Usage Example

In Strapi admin, create a ServicesPage entry with:

```json
{
  "videos": [
    "video1.mp4", 
    "video2.mp4"
  ],
  "logo_slider": {
    "title": "AS FEATURED IN",
    "logos": [
      "logo1.png",
      "logo2.png" 
    ]
  },
  "header_section": {
    "title": "We Create Amazing Experiences",
    "description": "Our team specializes in innovative solutions...",
    "image": "header-bg.jpg"
  },
  "service_section": {
    "title": "Our Services",
    "services": [
      {
        "service_id": "01",
        "title": "Strategy & Consulting", 
        "description": "We help you develop...",
        "images": ["service1.jpg"],
        "layout": "single"
      },
      {
        "service_id": "02",
        "title": "Creative Design",
        "description": "Our creative team...", 
        "images": ["design1.jpg", "design2.jpg"],
        "layout": "double"
      }
    ]
  }
}
```

## Fallback Behavior

If Strapi is unavailable or data is missing:
- Default videos from external sources are used
- Default logo slider with static images
- Default header content and image
- Default service cards with static content

## Testing

Run the test file to verify Strapi connection:
```bash
node test-services-page.js
```

This will test:
- Strapi server connectivity  
- ServicesPage endpoint availability
- Data structure validation
- Population query success

## Environment Variables

Ensure `.env.local` contains:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_token_here
```

## Development Tips

1. **Adding New Services**: Add entries to the services repeatable component
2. **Layout Testing**: Test all three layout types (single, double, stacked) 
3. **Image Optimization**: Use appropriate image sizes for better performance
4. **Responsive Design**: Services component automatically handles mobile layout
5. **Loading States**: Components show loading indicators while fetching data