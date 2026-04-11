import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchHomePage(slug = "home") {
  return fetchStructuredPageBySlug("home", slug);
}
