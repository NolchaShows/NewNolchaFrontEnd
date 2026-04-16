// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCharityPage } from "@/lib/fetchCharityPage";
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
  const page = await fetchCharityPage(resolvedParams.slug);

  if (!page) {
    return {
      title: "Charity not found",
    };
  }

  return {
    title: page.title || "Charity",
  };
}

export default async function CharityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const page = await fetchCharityPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <ExperienceDetailPageClient page={page} />;
}
