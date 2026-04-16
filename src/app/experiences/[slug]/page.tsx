// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchExperiencePage } from "@/lib/fetchExperiencePage";
import ExperienceDetailPageClient from "@/components/experience/ExperienceDetailPageClient";

export const revalidate = 60;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await fetchExperiencePage(resolvedParams.slug);

  if (!page) {
    return {
      title: "Experience not found",
    };
  }

  return {
    title: page.title || "Experience",
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const page = await fetchExperiencePage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <ExperienceDetailPageClient page={page} />;
}
