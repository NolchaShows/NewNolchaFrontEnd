import { notFound } from "next/navigation";
import ExperienceDetailPageClient from "@/components/experience/ExperienceDetailPageClient";
import { fetchDesignerPage } from "@/lib/fetchDesignerPage";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = await fetchDesignerPage(resolvedParams.slug);

  if (!page) {
    return {
      title: "Designer not found",
    };
  }

  return {
    title: page.title || "Designer",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const page = await fetchDesignerPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <ExperienceDetailPageClient page={page} />;
}
