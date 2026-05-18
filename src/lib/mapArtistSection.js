/**
 * Maps Strapi `home.artist-section` component fields for the Artists block.
 */
export function mapArtistSection(section) {
  if (!section || typeof section !== "object") {
    return {
      title: "",
      description: "",
      viewAllLabel: "",
      viewAllUrl: "",
      media: [],
    };
  }

  return {
    title: typeof section.title === "string" ? section.title : "",
    description: typeof section.description === "string" ? section.description : "",
    viewAllLabel:
      typeof section.viewAllLabel === "string" ? section.viewAllLabel : "",
    viewAllUrl: typeof section.viewAllUrl === "string" ? section.viewAllUrl : "",
    media: Array.isArray(section.media) ? section.media : [],
  };
}
