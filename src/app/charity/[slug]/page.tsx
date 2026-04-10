// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCharityPage } from "@/lib/fetchCharityPage";
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
  const { slug } = resolvedParams;
  const page = await fetchCharityPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <HeroSection slug={slug} pageType="charity" />
      <ThreeImageRowSection slug={slug} pageType="charity" />
      <FashionGridSection slug={slug} pageType="charity" />
      <ImageTextSectionServer slug={slug} pageType="charity" />
      <EveningRecapSection slug={slug} pageType="charity" />
      <SharedTweetCarouselSection slug={slug} pageType="charity" />
      <GallerySection slug={slug} pageType="charity" />
    </>
  );
}
