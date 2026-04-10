import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchExperiencePage(slug: string) {
  return fetchStructuredPageBySlug("experience", slug);
}

