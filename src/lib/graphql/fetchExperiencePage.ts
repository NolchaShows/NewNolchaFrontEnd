import client from "@/lib/graphql/apollo-client";
import { GET_EXPERIENCE_BY_SLUG } from "@/lib/graphql/queries/experience";
import type {
  GetExperienceBySlugQuery,
  GetExperienceBySlugQueryVariables,
} from "@/lib/graphql/__generated__/graphql";

export async function fetchExperiencePage(slug: string) {
  const { data } = await client().query<
    GetExperienceBySlugQuery,
    GetExperienceBySlugQueryVariables
  >({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: { slug },
  });

  return data.experiencePageBySlug;
}

