/**
 * Strapi v4/v5: normalize REST / document payloads so sections live on one object.
 */
export function unwrapStrapiEntry(raw) {
  if (raw == null) return null;
  if (raw.hero != null || raw.artist_section != null) {
    return raw;
  }
  if (raw.attributes && typeof raw.attributes === "object") {
    return { ...raw.attributes };
  }
  return raw;
}

const base = () => process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Resolves an upload (image or video) to an absolute URL.
 * Strapi v4: { data: { attributes: { url } } }; v5: { url, formats }; v5: wrapped relations.
 */
export function resolveStrapiFileUrl(media, depth = 0) {
  if (media == null || depth > 5) {
    return null;
  }
  if (typeof media === "number") {
    return null;
  }
  if (Array.isArray(media) && media.length) {
    return resolveStrapiFileUrl(media[0], depth + 1);
  }
  if (typeof media === "string") {
    if (media.startsWith("http") || media.startsWith("//")) {
      return media.startsWith("//") ? `https:${media}` : media;
    }
    const path = media.startsWith("/") ? media : `/${media}`;
    return `${base()}${path}`;
  }
  if (typeof media !== "object") {
    return null;
  }

  if (Array.isArray(media.data) && media.data.length) {
    return resolveStrapiFileUrl({ data: media.data[0] }, depth + 1);
  }
  if (media.data && typeof media.data === "object" && !media.url && !media.data.url && !media.data.attributes) {
    return resolveStrapiFileUrl(media.data, depth + 1);
  }

  const rawUrl =
    media.data?.attributes?.url ||
    media.data?.url ||
    media.attributes?.url ||
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.formats?.thumbnail?.url ||
    media.url ||
    null;

  if (!rawUrl) return null;
  if (rawUrl.startsWith("http") || rawUrl.startsWith("//")) {
    return rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
  }
  const path = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return `${base()}${path}`;
}

/**
 * Prefer the original upload URL over responsive formats so large UI (e.g. speaker cards)
 * stays sharp. Falls back to largest available format if the original path is missing.
 */
export function resolveStrapiImageUrlBestQuality(media, depth = 0) {
  if (media == null || depth > 5) {
    return null;
  }
  if (typeof media === "number") {
    return null;
  }
  if (Array.isArray(media) && media.length) {
    return resolveStrapiImageUrlBestQuality(media[0], depth + 1);
  }
  if (typeof media === "string") {
    return resolveStrapiFileUrl(media, depth + 1);
  }
  if (typeof media !== "object") {
    return null;
  }

  if (Array.isArray(media.data) && media.data.length) {
    return resolveStrapiImageUrlBestQuality({ data: media.data[0] }, depth + 1);
  }
  if (
    media.data &&
    typeof media.data === "object" &&
    !media.url &&
    !media.data.url &&
    !media.data.attributes
  ) {
    return resolveStrapiImageUrlBestQuality(media.data, depth + 1);
  }

  const formats =
    media.formats ||
    media.attributes?.formats ||
    media.data?.attributes?.formats ||
    {};

  const formatFallback =
    formats.xlarge?.url ||
    formats.large2x?.url ||
    formats.large?.url ||
    formats.medium?.url ||
    formats.small?.url ||
    formats.thumbnail?.url ||
    null;

  const rawUrl =
    media.data?.attributes?.url ||
    media.data?.url ||
    media.attributes?.url ||
    media.url ||
    formatFallback ||
    null;

  if (!rawUrl) return null;
  if (rawUrl.startsWith("http") || rawUrl.startsWith("//")) {
    return rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
  }
  const path = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return `${base()}${path}`;
}

/**
 * Gallery tiles: featured/full-width uses best available; grid cells prefer `large`
 * (~1000px) so sharp on retina without loading full originals on every tile.
 */
export function resolveStrapiGalleryImageUrl(media, options = {}) {
  const { fullWidth = false } = options;
  if (fullWidth) {
    return resolveStrapiImageUrlBestQuality(media);
  }

  if (media == null) return null;

  const unwrap = (entry) => {
    if (entry == null || typeof entry !== "object") return entry;
    if (Array.isArray(entry) && entry.length) return unwrap(entry[0]);
    if (entry.data?.attributes) return { ...entry.data.attributes, ...entry.data };
    if (entry.attributes) return entry.attributes;
    return entry;
  };

  const m = unwrap(media);
  if (!m || typeof m !== "object") {
    return resolveStrapiImageUrlBestQuality(media);
  }

  const formats = m.formats || {};
  const largeUrl =
    formats.large?.url ||
    formats.xlarge?.url ||
    formats.large2x?.url ||
    null;

  if (largeUrl) {
    return resolveStrapiFileUrl({ url: largeUrl });
  }

  return resolveStrapiImageUrlBestQuality(media);
}

/**
 * `experience.hero` may nest video oddly after serialization; also accept first entry if an array.
 */
export function pickHeroVideoUrl(hero) {
  if (hero == null) return null;
  const h = Array.isArray(hero) ? hero[0] : hero;
  if (!h || typeof h !== "object") return null;
  return (
    resolveStrapiFileUrl(h.video) ||
    resolveStrapiFileUrl(h.attributes?.video) ||
    resolveStrapiFileUrl(h.data?.attributes?.video) ||
    resolveStrapiFileUrl(h.media) ||
    null
  );
}
