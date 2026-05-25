/**
 * Pure helpers for Strapi rich text (blocks / markdown). Safe for Server Components.
 */

export function normalizeStrapiRichText(raw: unknown): unknown {
  if (raw === null || raw === undefined) return null;

  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return null;
    if (t.startsWith("[") || t.startsWith("{")) {
      try {
        return normalizeStrapiRichText(JSON.parse(t) as unknown);
      } catch {
        return raw;
      }
    }
    return raw;
  }

  if (Array.isArray(raw)) {
    return raw.length ? raw : null;
  }

  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;

    if (Array.isArray(o.children)) {
      return o.children.length ? o.children : null;
    }

    const root = o.root;
    if (root && typeof root === "object") {
      const rc = (root as Record<string, unknown>).children;
      if (Array.isArray(rc)) {
        return rc.length ? rc : null;
      }
    }

    if (Array.isArray(o.document)) {
      return o.document.length ? o.document : null;
    }

    if (
      typeof o.type === "string" &&
      o.type !== "root" &&
      o.type !== "doc"
    ) {
      return [raw];
    }
  }

  return null;
}

export function isRenderableNormalized(normalized: unknown): boolean {
  if (normalized === null || normalized === undefined) return false;
  if (typeof normalized === "string") return normalized.trim().length > 0;
  if (Array.isArray(normalized)) return normalized.length > 0;
  return false;
}

export function hasRenderableDescription(value: unknown): boolean {
  return isRenderableNormalized(normalizeStrapiRichText(value));
}
