// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/lib/graphql/apollo-client";
import { GET_EXPERIENCE_BY_SLUG } from "@/lib/graphql/queries/experience";
import HeroSection from "@/components/experience/HeroSection";
import ThreeImageRowSection from "@/components/experience/ThreeImageRowSection";
import FashionGridSection from "@/components/experience/FashionGridSection";
import ImageTextSectionServer from "@/components/experience/ImageTextSection";
import EveningRecapSection from "@/components/experience/EveningRecapSection";
import GallerySection from "@/components/experience/GallerySection";
import type {
  GetExperienceBySlugQuery,
  GetExperienceBySlugQueryVariables,
} from "@/lib/graphql/__generated__/graphql";

export const revalidate = 60;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams> | PageParams;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const { data } = await client().query<
      GetExperienceBySlugQuery,
      GetExperienceBySlugQueryVariables
    >({
      query: GET_EXPERIENCE_BY_SLUG,
      variables: { slug },
    });

    const page = data.experiencePageBySlug;

    if (!page) {
      return {
        title: "Experience not found",
      };
    }

    return {
      title: page.title || page.slug || "Experience",
    };
  } catch {
    return {
      title: "Experience",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const { data } = await client().query<
      GetExperienceBySlugQuery,
      GetExperienceBySlugQueryVariables
    >({
      query: GET_EXPERIENCE_BY_SLUG,
      variables: { slug },
    });

    const page = data.experiencePageBySlug;

    if (!page) {
      notFound();
    }

    // Compose page from section-level data fetchers
    return (
      <>
        <HeroSection slug={slug} />
        <ThreeImageRowSection slug={slug} />
        <FashionGridSection slug={slug} />
        <ImageTextSectionServer slug={slug} />
        <EveningRecapSection slug={slug} />
        <GallerySection slug={slug} />
      </>
    );
  } catch (e) {
    // On GraphQL errors (e.g. 400 from schema mismatch), behave like 404
    notFound();
  }
}

