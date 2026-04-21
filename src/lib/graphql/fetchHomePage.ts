import { fetchStructuredPageBySlug } from "@/lib/fetchStructuredPageBySlug";

export async function fetchHomePage() {
  return fetchStructuredPageBySlug("home", "");
}
