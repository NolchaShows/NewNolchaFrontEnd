// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchExperiencePage } from "@/lib/fetchExperiencePage";
import ExperienceDetailPageClient from "@/components/experience/ExperienceDetailPageClient";

export const revalidate = 60;
const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

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

  let nextExperienceHref: string | undefined;

  try {
    const query = new URLSearchParams();
    query.set("fields[0]", "slug");
    query.set("sort[0]", "title:asc");
    query.set("pagination[pageSize]", "200");

    const response = await fetch(
      `${STRAPI_BASE_URL}/api/experience-pages?${query.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (response.ok) {
      const json = (await response.json()) as { data?: Array<{ slug?: string }> };
      const slugs = (json?.data || [])
        .map((item) => item?.slug || "")
        .filter(Boolean);

      const currentIndex = slugs.indexOf(resolvedParams.slug);
      if (currentIndex >= 0 && slugs.length > 0) {
        const nextIndex = (currentIndex + 1) % slugs.length;
        nextExperienceHref = `/experiences/${slugs[nextIndex]}`;
      }
    }
  } catch {
    nextExperienceHref = undefined;
  }

  return (
    <ExperienceDetailPageClient
      page={page}
      nextExperienceHref={nextExperienceHref}
    />
  );
}
