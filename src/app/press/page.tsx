import LogoSlider from "@/components/home/TextSlider";
import PressStatementSection from "@/components/press/PressStatementSection";
import About from "@/components/landing/About";
import CardSlider from "@/components/press/CardSlider";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import { getPressPageContent } from "@/lib/pressPageData";

export const revalidate = 60;

export default async function PressPage() {
  const { aboutSection, cards, statementProps } = await getPressPageContent();

  const heroVideo =
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="h-screen"
        firstPart="Press"
        secondPart=""
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
      />
      <div className="relative z-10">
        <div className="bg-[#EBE2D7]">
          <LogoSlider logoSliderData={null} loading={false} />
        </div>

        <PressStatementSection {...statementProps} />

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

        <CardSlider cards={cards} loading={false} />
      </div>
    </div>
  );
}
