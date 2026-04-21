import { notFound } from "next/navigation";
import ExperienceDetailPageClient from "@/components/experience/ExperienceDetailPageClient";
import { fetchFeaturedArtistPage } from "@/lib/fetchFeaturedArtistPage";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = await fetchFeaturedArtistPage(resolvedParams.slug);

  if (!page) {
    return {
      title: "Featured Artist not found",
    };
  }

  return {
    title: page.title || "Featured Artist",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const page = await fetchFeaturedArtistPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <ExperienceDetailPageClient page={page} />;
}
