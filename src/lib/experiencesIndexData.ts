import { fetchFromStrapi } from "@/lib/strapi";
import { flattenStrapiEntity } from "@/lib/strapiFlatten";
import {
  buildStructuredGalleryItems,
  getStructuredMediaUrl,
} from "@/lib/structuredPageMedia";
import { resolveStrapiImageUrlBestQuality } from "@/lib/strapiMediaUrl";

export const EXPERIENCES_INDEX_DEFAULTS = {
  label: "[ EXPERIENCES ]",
  headline: "NOLCHA.",
  filterLabel: "SHOW FILTERS",
};

export const EXPERIENCE_CATEGORY_FILTERS = [
  { id: "all", label: "ALL" },
  { id: "fashion", label: "FASHION" },
  { id: "luxury", label: "LUXURY" },
  { id: "runway", label: "RUNWAY" },
  { id: "events", label: "EVENTS" },
  { id: "production", label: "PRODUCTION" },
  { id: "tech", label: "TECH" },
];

export type ExperienceCategoryFilter = (typeof EXPERIENCE_CATEGORY_FILTERS)[number];

const KNOWN_CATEGORY_IDS = new Set(
  EXPERIENCE_CATEGORY_FILTERS.map((f) => f.id).filter((id) => id !== "all")
);

export type ExperienceListItem = {
  id: string;
  title: string;
  tags: string[];
  href: string;
  images: string[];
  categories: string[];
};

const normalizeCategoryId = (value: string) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const collectTagTexts = (detailRows: unknown): string[] => {
  if (!Array.isArray(detailRows)) return [];

  const seen = new Set<string>();
  const tags: string[] = [];

  for (const row of detailRows) {
    const rowTags = (row as { tags?: unknown })?.tags;
    if (!Array.isArray(rowTags)) continue;

    for (const tag of rowTags) {
      const text =
        (tag as { text?: string })?.text ||
        (tag as { label?: string })?.label ||
        "";
      const trimmed = String(text).trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      tags.push(trimmed);
    }
  }

  return tags;
};

const extractCategories = (
  listingCategories: unknown,
  tagTexts: string[]
): string[] => {
  const fromCms: string[] = [];

  if (Array.isArray(listingCategories)) {
    for (const entry of listingCategories) {
      const id = normalizeCategoryId(String(entry));
      if (id && KNOWN_CATEGORY_IDS.has(id)) fromCms.push(id);
    }
  }

  if (fromCms.length > 0) {
    return [...new Set(fromCms)];
  }

  const fromTags = tagTexts
    .map((tag) => normalizeCategoryId(tag))
    .filter((id) => KNOWN_CATEGORY_IDS.has(id));

  return [...new Set(fromTags)];
};

const extractListingImages = (
  gallery: unknown,
  listingImage: unknown,
  limit = 6
): string[] => {
  const urls: string[] = [];

  const listingUrl =
    resolveStrapiImageUrlBestQuality(listingImage) ||
    getStructuredMediaUrl(listingImage);
  if (listingUrl) urls.push(listingUrl);

  const items = buildStructuredGalleryItems(gallery);
  for (const item of items) {
    if (item?.type !== "image" || !item.url) continue;
    if (!urls.includes(item.url)) urls.push(item.url);
    if (urls.length >= limit) break;
  }

  return urls;
};

const mapExperienceEntity = (raw: unknown): ExperienceListItem | null => {
  const entity = flattenStrapiEntity(raw);
  if (!entity) return null;

  const slug = String(entity.slug ?? "").trim();
  const title = String(entity.title ?? "").trim();
  if (!slug || !title) return null;

  const tagTexts = collectTagTexts(entity.detail_rows);
  const categories = extractCategories(entity.listingCategories, tagTexts);
  const images = extractListingImages(entity.gallery, entity.listingImage);

  return {
    id: slug,
    title,
    tags: tagTexts.map((t) => t.toUpperCase()),
    href: `/experiences/${slug}`,
    images,
    categories,
  };
};

export async function getExperiencesIndexContent() {
  const populate = [
    "populate[listingImage]=true",
    "populate[detail_rows][populate][tags]=true",
    "populate[gallery][populate][standard_media]=true",
    "populate[gallery][populate][featured_media]=true",
    "sort[0]=title:asc",
    "pagination[pageSize]=100",
  ].join("&");

  try {
    const data = await fetchFromStrapi(`experience-pages?${populate}`);
    const rows = Array.isArray(data?.data) ? data.data : [];

    const experiences = rows
      .map(mapExperienceEntity)
      .filter((item): item is ExperienceListItem => Boolean(item))
      .filter((item) => item.images.length > 0);

    return {
      ...EXPERIENCES_INDEX_DEFAULTS,
      experiences,
      filterOptions: EXPERIENCE_CATEGORY_FILTERS,
    };
  } catch (error) {
    console.error("❌ Error fetching experiences index:", error);
    return {
      ...EXPERIENCES_INDEX_DEFAULTS,
      experiences: [] as ExperienceListItem[],
      filterOptions: EXPERIENCE_CATEGORY_FILTERS,
    };
  }
}
