/**
 * Single source of truth for RSVP href from Strapi or mapped event objects.
 * Returns null when the CMS omitted the field or a placeholder was used upstream.
 */
export function pickRsvpUrl(source) {
  if (!source || typeof source !== "object") return null;
  const candidates = [
    source.rsvpLink,
    source.rsvp_url,
    source.rsvp_link,
  ];
  for (const raw of candidates) {
    if (typeof raw !== "string") continue;
    const s = raw.trim();
    if (!s || s === "#" || /^javascript:/i.test(s)) continue;
    return s;
  }
  return null;
}
