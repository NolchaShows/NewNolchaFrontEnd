/**
 * Strapi REST (v4 + v5) — single shallow merge for document payloads.
 * Performance: O(number of keys), no deep recursion.
 */

/**
 * Strapi v5 often keeps scalars in `attributes` but puts **relations on the document root**
 * next to `attributes`. Patterns like `data.attributes || data` drop relations entirely.
 *
 * Spread order: root fields overwrite duplicate keys from `attributes` (relations win).
 */
export function flattenStrapiEntity(
  payload: unknown
): Record<string, unknown> | null {
  if (payload == null || typeof payload !== "object") {
    return null;
  }

  type Rec = Record<string, unknown>;

  if (Array.isArray(payload)) {
    const head = payload[0];
    if (head === null || typeof head !== "object" || Array.isArray(head)) {
      return null;
    }
    return flattenStrapiEntity(head);
  }

  const d = payload as Rec;
  const attrs =
    d.attributes !== undefined &&
    d.attributes !== null &&
    typeof d.attributes === "object" &&
    !Array.isArray(d.attributes)
      ? (d.attributes as Rec)
      : ({} as Rec);

  const { attributes: _a, ...rest } = d;

  return { ...attrs, ...rest };
}

/** Find relation regardless of key casing / minor API differences */
export function pickSharedTweetCarouselRaw(
  entity: Record<string, unknown> | null | undefined
): unknown {
  if (!entity || typeof entity !== "object") return null;

  const direct =
    entity.shared_tweet_carousel ?? entity.sharedTweetCarousel ?? null;
  if (direct != null) {
    return Array.isArray(direct) ? direct[0] : direct;
  }

  for (const [key, val] of Object.entries(entity)) {
    if (val == null || typeof val !== "object") continue;
    if (/shared.*tweet|tweet.*carousel/i.test(key)) {
      return Array.isArray(val) ? val[0] : val;
    }
  }

  return null;
}

export function parseTweetIdentifier(raw: string): string {
  if (!raw || typeof raw !== "string") return "";
  const s = raw.trim();
  if (/^\d+$/.test(s)) return s;
  const m =
    s.match(/status\/(\d+)/i) || s.match(/\/status(?:es)?\/(\d+)/i);
  return m ? m[1] : "";
}

/** Unwrap `{ data }` wrappers used on relations / repeatable components */
function unwrapNode(raw: unknown): unknown {
  if (raw == null || typeof raw !== "object") return raw;
  const r = raw as Record<string, unknown>;
  const hasEmbeddedItems = Array.isArray(r.items);

  if ("data" in r && r.data !== null && r.data !== undefined && !hasEmbeddedItems) {
    const inner = r.data as unknown;
    if (Array.isArray(inner)) {
      const first = inner[0];
      return unwrapNode(first ?? null);
    }
    return unwrapNode(inner);
  }

  return raw;
}

/** `{ title?, items[{ tweetId }] }` for TweetCarousel (`carousalData`) — null if unusable */
export function parseSharedTweetCarousel(raw: unknown): {
  title?: string;
  items: Array<{ tweetId: string }>;
} | null {
  if (raw == null) return null;

  let node = unwrapNode(raw);
  node = unwrapNode(node);
  const doc = flattenStrapiEntity(node);

  if (!doc || typeof doc !== "object") return null;

  const titleRaw = (doc as Record<string, unknown>).title;

  let itemsUnknown = (doc as Record<string, unknown>).items;
  itemsUnknown = unwrapNode(itemsUnknown);

  let arr: unknown[] = [];
  if (Array.isArray(itemsUnknown)) {
    arr = itemsUnknown;
  } else if (
    typeof itemsUnknown === "object" &&
    itemsUnknown !== null &&
    Array.isArray((itemsUnknown as { data?: unknown[] }).data)
  ) {
    arr = ((itemsUnknown as { data: unknown[] }).data ?? []).filter(Boolean);
  }

  const items: Array<{ tweetId: string }> = [];

  for (const row of arr) {
    if (typeof row === "string" || typeof row === "number") {
      const idStr = String(row).trim();
      const tweetId =
        parseTweetIdentifier(idStr) || (/^\d+$/.test(idStr) ? idStr : "");
      if (tweetId) items.push({ tweetId });
      continue;
    }

    const flatRow = flattenStrapiEntity(unwrapNode(row));
    const r = (flatRow || row) as Record<string, unknown>;
    const rawId = r.tweetId ?? r.tweet_id ?? r.id;
    if (
      rawId == null ||
      (typeof rawId !== "string" && typeof rawId !== "number")
    ) {
      continue;
    }
    const idStr = String(rawId).trim();
    const tweetId =
      parseTweetIdentifier(idStr) ||
      (/^\d+$/.test(idStr) ? idStr : "");
    if (!tweetId) continue;
    items.push({ tweetId });
  }

  if (!items.length) {
    const bulkRaw =
      (doc as Record<string, unknown>).bulkTweetIds ??
      (doc as Record<string, unknown>).bulk_tweet_ids;
    const bulk =
      typeof bulkRaw === "string"
        ? bulkRaw.trim()
        : bulkRaw != null
          ? String(bulkRaw).trim()
          : "";
    if (bulk) {
      for (const token of bulk.split(/[\s,;\n\r\t]+/)) {
        const match = token.trim().match(/(\d{8,})/);
        if (!match?.[1]) continue;
        const tweetId =
          parseTweetIdentifier(match[1]) ||
          (/^\d+$/.test(match[1]) ? match[1] : "");
        if (tweetId) items.push({ tweetId });
      }
    }
  }

  if (!items.length) return null;

  const title = typeof titleRaw === "string" ? titleRaw : undefined;

  return title !== undefined ? { title, items } : { items };
}
