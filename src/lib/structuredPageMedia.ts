const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export const getStructuredMediaUrl = (media: any) => {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) {
    return media.url;
  }

  if (media.url.startsWith("/uploads")) {
    return `${STRAPI_BASE_URL}${media.url}`;
  }

  return media.url;
};

const isVideoMedia = (media: any) => {
  if (!media) return false;

  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();

  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const getMediaDimensions = (media: any) => {
  if (!media) {
    return { width: null, height: null };
  }

  return {
    width:
      media.width ||
      media.formats?.large?.width ||
      media.formats?.medium?.width ||
      media.formats?.small?.width ||
      null,
    height:
      media.height ||
      media.formats?.large?.height ||
      media.formats?.medium?.height ||
      media.formats?.small?.height ||
      null,
  };
};

const normalizeMediaItem = (
  media: any,
  options: { fullWidth?: boolean } = {}
) => {
  if (!media) return null;

  const url = getStructuredMediaUrl(media);
  if (!url) return null;

  const { width, height } = getMediaDimensions(media);

  return {
    type: isVideoMedia(media) ? "video" : "image",
    url,
    mime: media.mime || null,
    width,
    height,
    fullWidth: Boolean(options.fullWidth),
  };
};

const normalizeFeaturedContentSection = (section: any) => {
  if (!section) return null;

  const label = section.label || section.title || "";
  const description = section.description || section.body || "";

  if (!label && !description) {
    return null;
  }

  return {
    type: "contentSection",
    fullWidth: true,
    label,
    description,
  };
};

const interleaveGalleryMedia = (
  standardMedia: any[] = [],
  featuredMedia: any[] = [],
  featuredContentSections: any[] = [],
  featuredInterval = 6
) => {
  const result: any[] = [];
  const safeInterval = Math.max(1, featuredInterval || 6);
  let featuredIndex = 0;

  const appendFeaturedMediaWithContent = () => {
    if (featuredIndex >= featuredMedia.length) return;

    result.push({ ...featuredMedia[featuredIndex], fullWidth: true });

    if (featuredContentSections[featuredIndex]) {
      result.push(featuredContentSections[featuredIndex]);
    }

    featuredIndex += 1;
  };

  standardMedia.forEach((item, index) => {
    result.push(item);

    if ((index + 1) % safeInterval === 0 && featuredIndex < featuredMedia.length) {
      appendFeaturedMediaWithContent();
    }
  });

  while (featuredIndex < featuredMedia.length) {
    appendFeaturedMediaWithContent();
  }

  while (featuredIndex < featuredContentSections.length) {
    result.push(featuredContentSections[featuredIndex]);
    featuredIndex += 1;
  }

  return result;
};

export const buildStructuredGalleryItems = (gallery: any) => {
  const standardMedia = (gallery?.standard_media || [])
    .map((media: any) => normalizeMediaItem(media))
    .filter(Boolean);
  const featuredMedia = (gallery?.featured_media || [])
    .map((media: any) => normalizeMediaItem(media, { fullWidth: true }))
    .filter(Boolean);
  const featuredContentSections = (
    gallery?.featured_content_sections ||
    gallery?.featured_content_blocks ||
    []
  )
    .map((section: any) => normalizeFeaturedContentSection(section))
    .filter(Boolean);

  return interleaveGalleryMedia(
    standardMedia,
    featuredMedia,
    featuredContentSections,
    gallery?.featured_interval || 6
  );
};
