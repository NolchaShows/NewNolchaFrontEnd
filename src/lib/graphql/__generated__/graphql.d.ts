declare module "@/lib/graphql/__generated__/graphql" {
  export type GetExperienceBySlugQuery = {
    experiencePageBySlug: {
      title?: string | null;
      slug?: string | null;
      hero?: {
        title?: string | null;
        subtitle?: string | null;
        video?: { url?: string | null } | null;
      } | null;
      blocks?: Array<Record<string, any> | null> | null;
    } | null;
  };

  export type GetExperienceBySlugQueryVariables = {
    slug: string;
  };
}

