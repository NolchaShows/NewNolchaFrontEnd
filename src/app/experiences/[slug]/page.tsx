// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchExperiencePage } from "@/lib/graphql/fetchExperiencePage";
import HeroSection from "@/components/experience/HeroSection";
import ThreeImageRowSection from "@/components/experience/ThreeImageRowSection";
import FashionGridSection from "@/components/experience/FashionGridSection";
import ImageTextSectionServer from "@/components/experience/ImageTextSection";
import EveningRecapSection from "@/components/experience/EveningRecapSection";
import GallerySection from "@/components/experience/GallerySection";
import SharedTweetCarouselSection from "@/components/experience/SharedTweetCarouselSection";

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

    // Compose page from section-level data fetchers
    return (
      <>
        <HeroSection slug={slug} />
        <ThreeImageRowSection slug={slug} />
        <FashionGridSection slug={slug} />
        <ImageTextSectionServer slug={slug} />
        <EveningRecapSection slug={slug} />
        <SharedTweetCarouselSection slug={slug} />
        <GallerySection slug={slug} />
      </>
    );
  } catch (e) {
    // On GraphQL errors (e.g. 400 from schema mismatch), behave like 404
    notFound();
  }
}

