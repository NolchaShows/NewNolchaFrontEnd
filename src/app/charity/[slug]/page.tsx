// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import ThreeImageRow from "@/components/shao/ThreeImageRow";
import FashionGrid from "@/components/shao/FashionGrid";
import ImageTextSection from "@/components/shao/ImageTextSection";
import EveningRecap from "@/components/common/EveningRecap";
import TweetCarousel from "@/components/common/TweetCarousel";
import ProgressiveFashionGridGallery from "@/components/experience/ProgressiveFashionGridGallery";
import { fetchCharityPage } from "@/lib/fetchCharityPage";

export const revalidate = 60;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

const splitTitle = (title?: string | null) => {
  if (!title) return { first: "CHARITY", second: "" };
  const parts = title.split(" ");
  if (parts.length === 1) return { first: parts[0], second: "" };
  return { first: parts[0], second: parts.slice(1).join(" ") };
};

const getBestImageUrl = (media: any): string | null => {
  if (!media) return null;
  const formats = media.formats || {};
  const large = formats.large;
  const medium = formats.medium;
  const small = formats.small;
  const thumbnail = formats.thumbnail;

  return (
    (large && large.url) ||
    media.url ||
    (medium && medium.url) ||
    (small && small.url) ||
    (thumbnail && thumbnail.url) ||
    null
  );
};

const getVideoUrl = (media: any): string | null => {
  if (!media) return null;
  return media.url ?? null;
};

const isVideoMedia = (media: any): boolean => {
  if (!media) return false;
  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();
  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const normalizeMedia = (media: any) => {
  if (!media) return null;
  if (isVideoMedia(media)) {
    return { type: "video", url: media.url };
  }
  const imageUrl = getBestImageUrl(media);
  return imageUrl ? { type: "image", url: imageUrl } : null;
};

const htmlToParagraphs = (html?: string | null): string[] => {
  if (!html) return [];
  const cleaned = html
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  return cleaned
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
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

  const blocks = page.blocks || [];
  const hero = page.hero || null;
  const threeImageRowBlock = blocks.find(
    (block: any) => block?.__typename === "ComponentBlocksThreeImageRow" || block?.__component === "blocks.three-image-row"
  );
  const fashionGridBlock = blocks.find(
    (block: any) => block?.__typename === "ComponentBlocksFashionGridSection" || block?.__component === "blocks.fashion-grid-section"
  );
  const imageTextBlock = blocks.find(
    (block: any) => block?.__typename === "ComponentBlocksImageTextSection" || block?.__component === "blocks.image-text-section"
  );
  const eveningRecapBlock = blocks.find(
    (block: any) => block?.__typename === "ComponentBlocksEveningRecapSection" || block?.__component === "blocks.evening-recap-section"
  );
  const galleryBlock = blocks.find(
    (block: any) => block?.__typename === "ComponentBlocksGallery" || block?.__component === "blocks.gallery"
  );
  const carousel = page?.shared_tweet_carousel || page?.sharedTweetCarousel || null;

  const titleParts = splitTitle(hero?.title || page?.title);
  const heroVideoSrc = getVideoUrl(hero?.video);
  const threeImageMediaItems = [
    normalizeMedia(threeImageRowBlock?.firstMedia),
    normalizeMedia(threeImageRowBlock?.secondMedia),
    normalizeMedia(threeImageRowBlock?.thirdMedia),
  ].filter(Boolean);
  const fashionGridMediaItems = [
    normalizeMedia(fashionGridBlock?.topMedia),
    normalizeMedia(fashionGridBlock?.middleMedia1),
    normalizeMedia(fashionGridBlock?.middleMedia2),
    normalizeMedia(fashionGridBlock?.middleMedia3),
    normalizeMedia(fashionGridBlock?.bottomMedia),
  ].filter(Boolean);
  const imageTextImageUrl = getBestImageUrl(imageTextBlock?.image) || "";
  const imageTextParagraphs = htmlToParagraphs(imageTextBlock?.description);
  const imageTextTags =
    (imageTextBlock?.tags || []).map((tag: any) => ({
      label: tag?.text || "",
      color: "#BDACFF",
    })) || [];
  const eveningRecapVideoUrl = getVideoUrl(eveningRecapBlock?.video) || "";
  const galleryImages = Array.from(
    new Set(
      (galleryBlock?.images || [])
        .map((image: any) => getBestImageUrl(image))
        .filter(Boolean)
    )
  );

  return (
    <>
      {heroVideoSrc ? (
        <VideoHeroSection
          videoSrc={heroVideoSrc}
          firstPart={titleParts.first}
          secondPart={titleParts.second}
          strokeColor="#000000"
          fillColor="#FFFFFF"
          textColor="#FFFFFF"
          size="large"
          overlayOpacity={20}
          className="-mt-[88px] 2xl:-mt-[120px]"
          isGoogleDrive={false}
        />
      ) : null}

      {threeImageMediaItems.length ? (
        <ThreeImageRow
          mediaItems={threeImageMediaItems}
          line1="360 Projection"
          line2="Mapped Venue"
          background="#D1FFE9"
        />
      ) : null}

      {fashionGridBlock ? (
        <FashionGrid
          leftMedia={normalizeMedia(fashionGridBlock.leftMedia)}
          rightMedia={normalizeMedia(fashionGridBlock.rightMedia)}
          mediaItems={fashionGridMediaItems}
          background="#FEF991"
        />
      ) : null}

      {imageTextBlock ? (
        <ImageTextSection
          image={imageTextImageUrl}
          title={imageTextBlock.title || ""}
          paragraphs={imageTextParagraphs}
          background="#FFF7E6"
          tags={imageTextTags}
        />
      ) : null}

      {eveningRecapVideoUrl ? (
        <EveningRecap
          year="2024"
          title={typeof eveningRecapBlock?.title === "string" ? eveningRecapBlock.title.trim() : ""}
          videoUrl={eveningRecapVideoUrl}
          paddingTop={undefined}
        />
      ) : null}

      {carousel?.items?.length ? (
        <TweetCarousel
          posts={[]}
          carousalData={carousel}
          padding=""
          title="Community Moments"
        />
      ) : null}

      {galleryImages.length ? (
        <ProgressiveFashionGridGallery images={galleryImages} background="#FEF991" />
      ) : null}
    </>
  );
}
