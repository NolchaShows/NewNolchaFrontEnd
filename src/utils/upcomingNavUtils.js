import {
  getUpcomingEventHref,
  slugifyUpcomingEventTitle,
  upcomingListEvents,
} from "@/data/upcomingEvents";

/**
 * Map static fallback events (or Strapi-mapped home events) to mega menu child shape.
 * @param {Function} getMediaUrl - (media) => string | null; same as Navbar getMediaUrl
 */
export const mapUpcomingEventsToNavChildren = (events, getMediaUrl) => {
  if (!events || !Array.isArray(events) || events.length === 0) {
    return [];
  }

  return events.map((event) => {
    const title = event?.title || "";
    const externalHref = (
      event?.externalUrl ||
      event?.external_url ||
      event?.externalLink ||
      event?.external_link ||
      ""
    ).trim();
    const hasExternalHref = /^https?:\/\//i.test(externalHref);
    let imageSrc =
      (getMediaUrl && (getMediaUrl(event?.image) || getMediaUrl(event?.mainImage))) ||
      null;
    if (!imageSrc && typeof event?.image === "string") {
      imageSrc = event.image;
    }

    return {
      label: title,
      href: hasExternalHref ? externalHref : getUpcomingEventHref(title),
      upcomingSlug: hasExternalHref ? undefined : slugifyUpcomingEventTitle(title),
      imageSrc: imageSrc || event?.image || "",
      isExternal: hasExternalHref,
    };
  });
};

/**
 * Strapi `upcoming_events_section.events` (same shape as page.js after fetch).
 * Extract from home attributes root.
 */
export const extractUpcomingEventsFromHome = (home) => {
  if (!home) return [];
  const section = home.upcoming_events_section || home?.attributes?.upcoming_events_section;
  const events = section?.events;
  return Array.isArray(events) && events.length > 0 ? events : [];
};

export const getDefaultUpcomingNavChildren = (getMediaUrl) =>
  mapUpcomingEventsToNavChildren(upcomingListEvents, getMediaUrl);

/**
 * @param {Array<{ label: string, externalUrl: string, image?: any, slug?: string }>} entries
 * @param {Function} getMediaUrl
 */
export const mapExternalNavChildren = (entries, getMediaUrl) => {
  if (!entries?.length) return [];
  return entries
    .map((c) => {
      const href = (c?.externalUrl || "").trim();
      if (!href || !/^https?:\/\//i.test(href)) {
        return null;
      }
      return {
        label: c?.label || href,
        href,
        imageSrc: getMediaUrl ? getMediaUrl(c?.image) : null,
        upcomingSlug: undefined,
        isExternal: true,
        slug: c?.slug || "",
      };
    })
    .filter(Boolean);
};

export const isUpcomingNavItem = (item) => {
  if (!item) return false;
  if (item.key === "upcoming") return true;
  return String(item.label || "")
    .toLowerCase()
    .trim() === "upcoming";
};

/** Strapi `items[]` entry before `buildMenuKey` (label from CMS). */
export const isStrapiUpcomingItem = (item) =>
  String(item?.label || "")
    .toLowerCase()
    .trim() === "upcoming";
