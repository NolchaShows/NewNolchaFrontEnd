import { cache } from "react";
import { fetchFromStrapi, getExperiencesPageData } from "@/lib/strapi";
import { flattenStrapiEntity } from "@/lib/strapiFlatten";
import {
  buildStructuredGalleryItems,
  getStructuredMediaUrl,
} from "@/lib/structuredPageMedia";
import { resolveStrapiImageUrlBestQuality } from "@/lib/strapiMediaUrl";
import { UNCATEGORIZED_CATEGORY_ID } from "@/lib/experienceCategoryNav";

export const EXPERIENCES_INDEX_DEFAULTS = {
  label: "[ EXPERIENCES ]",
  headline: "NOLCHA.",
  filterLabel: "SHOW FILTERS",
  uncategorizedTitle: "[ OTHER EXPERIENCES ]",
  seo: {
    metaTitle: "Experiences | Nolcha",
    metaDescription:
      "Explore Nolcha experiences — runway, events, and brand activations by category.",
    ogImage: null as string | null,
  },
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

export type ExperiencesIndexContent = {
  label: string;
  headline: string;
  filterLabel: string;
  uncategorizedTitle: string;
  categories: ExperienceCategoryGroup[];
  uncategorizedExperiences: ExperienceIndexItem[];
  filterOptions: ExperienceCategoryFilter[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string | null;
  };
};

const pickPageAttributes = (payload: unknown) => {
  const root = payload as { data?: { attributes?: unknown } | unknown } | null;
  if (!root?.data) return null;
  const data = root.data;
  if (data && typeof data === "object" && "attributes" in data) {
    return (data as { attributes: unknown }).attributes;
  }
  return data;
};

const mapPageSettings = (attrs: unknown) => {
  const entity = flattenStrapiEntity(attrs);
  if (!entity) return { ...EXPERIENCES_INDEX_DEFAULTS };

  const seoRaw = entity.seo as
    | { metaTitle?: string; metaDescription?: string; ogImage?: unknown }
    | undefined;

  const ogImage =
    resolveStrapiImageUrlBestQuality(seoRaw?.ogImage) ||
    getStructuredMediaUrl(seoRaw?.ogImage) ||
    null;

  return {
    label:
      String(entity.label ?? "").trim() || EXPERIENCES_INDEX_DEFAULTS.label,
    headline:
      String(entity.headline ?? "").trim() || EXPERIENCES_INDEX_DEFAULTS.headline,
    filterLabel:
      String(entity.filterLabel ?? "").trim() ||
      EXPERIENCES_INDEX_DEFAULTS.filterLabel,
    uncategorizedTitle:
      String(entity.uncategorizedTitle ?? "").trim() ||
      EXPERIENCES_INDEX_DEFAULTS.uncategorizedTitle,
    seo: {
      metaTitle:
        String(seoRaw?.metaTitle ?? "").trim() ||
        EXPERIENCES_INDEX_DEFAULTS.seo.metaTitle,
      metaDescription:
        String(seoRaw?.metaDescription ?? "").trim() ||
        EXPERIENCES_INDEX_DEFAULTS.seo.metaDescription,
      ogImage,
    },
  };
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

const getExperienceRows = (experiencePages: unknown): unknown[] => {
  if (Array.isArray(experiencePages)) return experiencePages;
  if (
    experiencePages &&
    typeof experiencePages === "object" &&
    Array.isArray((experiencePages as { data?: unknown[] }).data)
  ) {
    return (experiencePages as { data: unknown[] }).data;
  }
  return [];
};

const getExperienceSlug = (raw: unknown): string => {
  const entity = flattenStrapiEntity(raw);
  return String(entity?.slug ?? "").trim();
};

export const mapExperienceEntity = (
  raw: unknown
): ExperienceIndexItem | null => {
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

const parseCategoryRow = (
  raw: unknown
): { category: ExperienceCategoryGroup | null; linkedSlugs: string[] } => {
  const entity = flattenStrapiEntity(raw);
  if (!entity) return { category: null, linkedSlugs: [] };

  const slug = String(entity.slug ?? "").trim();
  const name = String(entity.name ?? "").trim();
  if (!slug || !name) return { category: null, linkedSlugs: [] };

  const experienceRows = getExperienceRows(entity.experience_pages);
  const linkedSlugs = experienceRows.map(getExperienceSlug).filter(Boolean);

  const experiences = experienceRows
    .map(mapExperienceEntity)
    .filter((item): item is ExperienceIndexItem => Boolean(item));

  if (!experiences.length) {
    return { category: null, linkedSlugs };
  }

  return {
    linkedSlugs,
    category: {
      id: slug,
      title: name,
      tags: collectComponentTagTexts(entity.tags),
      experiences,
    },
  };
};

const buildFilterOptions = (
  categories: ExperienceCategoryGroup[],
  uncategorizedExperiences: ExperienceIndexItem[]
): ExperienceCategoryFilter[] => {
  const options: ExperienceCategoryFilter[] = [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category.id,
      label: category.title.toUpperCase(),
    })),
  ];

  if (uncategorizedExperiences.length > 0) {
    options.push({
      id: UNCATEGORIZED_CATEGORY_ID,
      label: "OTHER",
    });
  }

  return options;
};

async function fetchExperienceCategories() {
  const populate = [
    "populate[tags]=true",
    "populate[experience_pages][populate][listingImage]=true",
    "populate[experience_pages][populate][gallery][populate][standard_media]=true",
    "populate[experience_pages][populate][gallery][populate][featured_media]=true",
    "sort[0]=sortOrder:asc",
    "sort[1]=name:asc",
    "pagination[pageSize]=100",
  ].join("&");

  const data = await fetchFromStrapi(`experience-categories?${populate}`);
  const rows = Array.isArray(data?.data) ? data.data : [];

  const categorizedSlugs = new Set<string>();
  const categories: ExperienceCategoryGroup[] = [];

  for (const row of rows) {
    const parsed = parseCategoryRow(row);
    parsed.linkedSlugs.forEach((s) => categorizedSlugs.add(s));
    if (parsed.category) categories.push(parsed.category);
  }

  return { categories, categorizedSlugs };
}

async function fetchAllExperiencePages() {
  const populate = [
    "populate[listingImage]=true",
    "populate[gallery][populate][standard_media]=true",
    "populate[gallery][populate][featured_media]=true",
    "sort[0]=title:asc",
    "pagination[pageSize]=100",
  ].join("&");

  const data = await fetchFromStrapi(`experience-pages?${populate}`);
  const rows = Array.isArray(data?.data) ? data.data : [];

  return rows
    .map(mapExperienceEntity)
    .filter((item): item is ExperienceIndexItem => Boolean(item));
}

function buildUncategorizedExperiences(
  allExperiences: ExperienceIndexItem[],
  categorizedSlugs: Set<string>
) {
  return allExperiences.filter((exp) => !categorizedSlugs.has(exp.id));
}

export const getExperiencesIndexContent = cache(
  async (): Promise<ExperiencesIndexContent> => {
    try {
      const [pageRes, categoryResult, allExperiences] = await Promise.all([
        getExperiencesPageData(),
        fetchExperienceCategories(),
        fetchAllExperiencePages(),
      ]);

      const pageSettings = mapPageSettings(pickPageAttributes(pageRes));
      const { categories, categorizedSlugs } = categoryResult;
      const uncategorizedExperiences = buildUncategorizedExperiences(
        allExperiences,
        categorizedSlugs
      );

      return {
        ...pageSettings,
        categories,
        uncategorizedExperiences,
        filterOptions: buildFilterOptions(categories, uncategorizedExperiences),
      };
    } catch (error) {
      console.error("❌ Error fetching experiences index:", error);
      return {
        ...EXPERIENCES_INDEX_DEFAULTS,
        categories: [],
        uncategorizedExperiences: [],
        filterOptions: [{ id: "all", label: "ALL" }],
      };
    }
  }
);

/** Header mega menu: categories (hash links) + uncategorized experiences (detail links). */
export async function getExperiencesNavDropdownItems() {
  const { categories, uncategorizedExperiences } =
    await getExperiencesIndexContent();

  const categoryItems = categories.map((category) => ({
    label: category.title,
    slug: category.id,
    href: `/experiences#${category.id}`,
  }));

  const uncategorizedItems = uncategorizedExperiences.map((experience) => ({
    label: experience.title,
    slug: experience.id,
    href: experience.href,
  }));

  return [...categoryItems, ...uncategorizedItems];
}
