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

export function splitAboutHeadlineLines(text: unknown): string[] {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return [];

  const newlineParts = trimmed
    .split(/<br\s*\/?>|\r?\n+/gi)
    .map((line) => line.trim())
    .filter(Boolean);

  if (newlineParts.length > 1) return newlineParts;

  if (!trimmed.includes(".")) return [trimmed];

  return trimmed
    .split(/(?<=\.)\s*/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Shared typography for white-label / about statement headlines. */
export const ABOUT_HEADLINE_TEXT_CLASS =
  "m-0 p-0 text-[35px] font-normal uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] sm:text-[47px] md:text-[59px] lg:text-[82px]";

export const ABOUT_HEADLINE_WRAP_CLASS = `${ABOUT_HEADLINE_TEXT_CLASS} max-w-none [&_p]:m-0 [&_p]:block [&_strong]:font-normal [&_em]:not-italic`;
