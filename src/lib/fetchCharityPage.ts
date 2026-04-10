import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchCharityPage(slug: string) {
  return fetchStructuredPageBySlug("charity", slug);
}
