import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchProjectPage(slug: string) {
  return fetchStructuredPageBySlug("project", slug);
}
