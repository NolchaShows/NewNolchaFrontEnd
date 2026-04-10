const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export type StructuredPageType = "experience" | "charity";

const RESOURCE_BY_TYPE: Record<StructuredPageType, string> = {
  experience: "experience-pages",
  charity: "charity-pages",
};

export async function fetchStructuredPageBySlug(
  pageType: StructuredPageType,
  slug: string
) {
  const resource = RESOURCE_BY_TYPE[pageType];
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/${resource}/by-slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json?.data?.attributes || json?.data || null;
}
