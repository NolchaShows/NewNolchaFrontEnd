import LogoSlider from "@/components/home/TextSlider";
import About from "@/components/landing/About";
import CardSlider from "@/components/press/CardSlider";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import client from "@/lib/graphql/apollo-client";
import { GET_PRESS_PAGE } from "@/lib/graphql/queries/press";
import type { GetPressPageQuery } from "@/lib/graphql/__generated__/graphql";

export const revalidate = 60;

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi.onrender.com";

type PressMedia =
  | {
      url?: string | null;
      formats?: {
        [key: string]: { url?: string | null } | undefined;
      } | null;
    }
  | null
  | undefined;

const toAbsoluteUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE_URL}${url}`;
};

const getMediaUrl = (media: PressMedia) => {
  const formats = media?.formats ?? undefined;
  const formatUrl =
    formats?.large?.url ??
    formats?.medium?.url ??
    formats?.thumbnail?.url;

  return toAbsoluteUrl(media?.url ?? formatUrl ?? null);
};

export default async function PressPage() {
  const { data } = await client().query<GetPressPageQuery>({
    query: GET_PRESS_PAGE,
  });

  const pressPage = data?.pressPage ?? null;

  if (!pressPage) {
    return (
      <div className="page-container py-20 text-center text-gray-500">
        No press content available yet.
      </div>
    );
  }

  const mediaCoverage = pressPage.mediaCoverage ?? null;
  const aboutSection = mediaCoverage
    ? {
        title: mediaCoverage.title ?? "",
        paragraphText: mediaCoverage.paragraphText ?? "",
        link: mediaCoverage.linkUrl ?? "",
        linkText: mediaCoverage.linkText ?? "",
        image: getMediaUrl(mediaCoverage.image) ?? "",
      }
    : null;

  const cards = (pressPage.pressCards ?? []).flatMap((card, index) => {
    if (!card) return [];

    const newsPaper = getMediaUrl(card.newsPaperLogo) ?? "";
    const image = getMediaUrl(card.image) ?? "";

    if (!card.title && !card.link && !newsPaper && !image) {
      return [];
    }

    return [
      {
        id: index + 1,
        newsPaper,
        image,
        title: card.title ?? "",
        link: card.link ?? "",
      },
    ];
  });

  const heroVideo =
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
        firstPart="Press"
        secondPart=""
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
        children={null}
      />
      <div className="relative z-10">
        <div className="bg-[#EBE2D7]">
          <LogoSlider logoSliderData={null} loading={false} />
        </div>

        {aboutSection && (
          <About
            title={aboutSection.title}
            paragraphText={aboutSection.paragraphText}
            link={aboutSection.link}
            linkText={aboutSection.linkText}
            image={aboutSection.image}
            imageStyle=""
            loading={false}
            variant="press"
          />
        )}

        <CardSlider cards={cards} loading={false} />
      </div>
    </div>
  );
}
