/** Slug for experiences not assigned to any Strapi category. */
export const UNCATEGORIZED_CATEGORY_ID = "uncategorized";

/** DOM id for a category block on /experiences (used with location.hash). */
export const getExperienceCategorySectionId = (categorySlug: string) =>
  `experience-category-${categorySlug}`;

/** Nav / CTA link that opens /experiences and scrolls to the category section. */
export const getExperienceCategoryPageHref = (categorySlug: string) =>
  `/experiences#${categorySlug}`;

export type ExperienceCategoryNavItem = {
  label: string;
  href: string;
  slug: string;
};
