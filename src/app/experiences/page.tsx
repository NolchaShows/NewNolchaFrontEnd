import type { Metadata } from "next";
import ExperiencesIndexPageClient from "@/components/experiences/ExperiencesIndexPageClient";
import { getExperiencesIndexContent } from "@/lib/experiencesIndexData";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getExperiencesIndexContent();
  const { metaTitle, metaDescription, ogImage } = content.seo;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ExperiencesIndexPage() {
  const content = await getExperiencesIndexContent();

  return <ExperiencesIndexPageClient {...content} />;
}
