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

export type ExperienceIndexItem = {
  id: string;
  title: string;
  href: string;
  image: string;
};

export type ExperienceCategoryGroup = {
  id: string;
  title: string;
  tags: string[];
  experiences: ExperienceIndexItem[];
};

export type ExperienceCategoryFilter = {
  id: string;
  label: string;
};

const collectComponentTagTexts = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return [];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const tag of tags) {
    const text =
      (tag as { text?: string })?.text ||
      (tag as { label?: string })?.label ||
      "";
    const trimmed = String(text).trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed.toUpperCase());
  }

  return result;
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

const mapExperienceEntity = (raw: unknown): ExperienceIndexItem | null => {
  const entity = flattenStrapiEntity(raw);
  if (!entity) return null;

  const slug = String(entity.slug ?? "").trim();
  const title = String(entity.title ?? "").trim();
  if (!slug || !title) return null;

  const images = extractListingImages(entity.gallery, entity.listingImage, 1);
  const image = images[0];
  if (!image) return null;

  return {
    id: slug,
    title,
    href: `/experiences/${slug}`,
    image,
  };
};

const mapCategoryEntity = (raw: unknown): ExperienceCategoryGroup | null => {
  const entity = flattenStrapiEntity(raw);
  if (!entity) return null;

  const slug = String(entity.slug ?? "").trim();
  const name = String(entity.name ?? "").trim();
  if (!slug || !name) return null;

  const experiencePages = entity.experience_pages;
  const experienceRows = Array.isArray(experiencePages)
    ? experiencePages
    : Array.isArray((experiencePages as { data?: unknown[] })?.data)
      ? (experiencePages as { data: unknown[] }).data
      : [];

  const experiences = experienceRows
    .map(mapExperienceEntity)
    .filter((item): item is ExperienceIndexItem => Boolean(item));

  if (!experiences.length) return null;

  return {
    id: slug,
    title: name,
    tags: collectComponentTagTexts(entity.tags),
    experiences,
  };
};

const buildFilterOptions = (
  categories: ExperienceCategoryGroup[]
): ExperienceCategoryFilter[] => {
  return [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category.id,
      label: category.title.toUpperCase(),
    })),
  ];
};

export async function getExperiencesIndexContent() {
  const populate = [
    "populate[tags]=true",
    "populate[experience_pages][populate][listingImage]=true",
    "populate[experience_pages][populate][gallery][populate][standard_media]=true",
    "populate[experience_pages][populate][gallery][populate][featured_media]=true",
    "sort[0]=sortOrder:asc",
    "sort[1]=name:asc",
    "pagination[pageSize]=100",
  ].join("&");

  try {
    const data = await fetchFromStrapi(`experience-categories?${populate}`);
    const rows = Array.isArray(data?.data) ? data.data : [];

    const categories = rows
      .map(mapCategoryEntity)
      .filter((item): item is ExperienceCategoryGroup => Boolean(item));

    return {
      ...EXPERIENCES_INDEX_DEFAULTS,
      categories,
      filterOptions: buildFilterOptions(categories),
    };
  } catch (error) {
    console.error("❌ Error fetching experiences index:", error);
    return {
      ...EXPERIENCES_INDEX_DEFAULTS,
      categories: [] as ExperienceCategoryGroup[],
      filterOptions: [{ id: "all", label: "ALL" }],
    };
  }
}
