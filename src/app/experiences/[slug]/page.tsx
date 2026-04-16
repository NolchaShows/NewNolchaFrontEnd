// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchExperiencePage } from "@/lib/graphql/fetchExperiencePage";
import ExperienceDetailPageClient from "@/components/experience/ExperienceDetailPageClient";

export const revalidate = 60;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const page = await fetchExperiencePage(slug);

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
    const page = await fetchExperiencePage(slug);

    if (!page) {
      notFound();
    }

    return <ExperienceDetailPageClient page={page} />;
  } catch (e) {
    // On GraphQL errors (e.g. 400 from schema mismatch), behave like 404
    notFound();
  }
}

