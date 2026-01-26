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

  export type GetPressPageQuery = {
    pressPage?: {
      mediaCoverage?: {
        title?: string | null;
        paragraphText?: string | null;
        linkText?: string | null;
        linkUrl?: string | null;
        image?: {
          url?: string | null;
          name?: string | null;
          mime?: string | null;
          width?: number | null;
          height?: number | null;
          formats?: Record<string, any> | null;
        } | null;
      } | null;
      pressCards?: Array<{
        title?: string | null;
        link?: string | null;
        newsPaperLogo?: {
          url?: string | null;
          name?: string | null;
          mime?: string | null;
          width?: number | null;
          height?: number | null;
          formats?: Record<string, any> | null;
        } | null;
        image?: {
          url?: string | null;
          name?: string | null;
          mime?: string | null;
          width?: number | null;
          height?: number | null;
          formats?: Record<string, any> | null;
        } | null;
      } | null> | null;
    } | null;
  };
}

