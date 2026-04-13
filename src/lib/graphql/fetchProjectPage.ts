const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

export async function fetchProjectPage() {
  const response = await fetch(`${STRAPI_BASE_URL}/api/project-page`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json?.data?.attributes || json?.data || null;
}
