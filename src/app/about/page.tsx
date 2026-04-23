import AboutStatementSection from "@/components/about/AboutStatementSection";
import AboutHeroVideo from "@/components/about/AboutHeroVideo.jsx";
import OurDifferentiators from "@/components/about/OurDifferentiators";
import OurServicesSection from "@/components/about/OurServicesSection";
import OurClientsSection from "@/components/about/OurClientsSection";
import OurPressSection from "@/components/about/OurPressSection";
import { getAboutPageContent } from "@/lib/aboutPageData";
import { getPressPageContent } from "@/lib/pressPageData";

export const metadata = {
  title: "About Us | New Nolcha",
  description: "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
};

const defaultHeroVideo =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4";

export const revalidate = 60;

export default async function AboutPage() {
  const [aboutPage, pressPage] = await Promise.all([
    getAboutPageContent(),
    getPressPageContent(),
  ]);
  const heroVideo = aboutPage?.heroVideo || defaultHeroVideo;
  const featuredPressPost = pressPage.cards?.[0];
  const pressFeatureTitle = featuredPressPost?.title || "Featured press post";
  const pressFeatureImage = featuredPressPost?.image || "/about/press.webp";
  const pressFeatureLink = featuredPressPost?.link || aboutPage.press.viewMoreHref;
  const pressFeatureSourceLogo = featuredPressPost?.newsPaper || "";

  return (
    <main className="min-h-screen bg-[#F4F4F4]">
      <AboutStatementSection {...aboutPage.statementSection} />
      <AboutHeroVideo videoSrc={heroVideo} />
      <OurDifferentiators
        label={aboutPage.differentiators.label}
        differentiators={aboutPage.differentiators.items}
      />
      <hr className="w-full border-t border-[#1D1D1D] my-4" />
      <OurServicesSection
        label={aboutPage.services.label}
        title={aboutPage.services.title}
        ctaText={aboutPage.services.ctaText}
        ctaHref={aboutPage.services.ctaHref}
        videoSrc={aboutPage.services.videoSrc}
        serviceStories={aboutPage.services.stories}
      />
      <hr className="w-full border-t border-[#1D1D1D] mb-4" />
      <OurClientsSection
        label={aboutPage.clients.label}
        title={aboutPage.clients.title}
        description={aboutPage.clients.description}
        ctaText={aboutPage.clients.ctaText}
        ctaHref={aboutPage.clients.ctaHref}
        clientLogos={aboutPage.clients.logos}
      />
      <OurPressSection
        label={aboutPage.press.label}
        title={aboutPage.press.title}
        viewMoreText={aboutPage.press.viewMoreText}
        viewMoreHref={aboutPage.press.viewMoreHref}
        featureTitle={pressFeatureTitle}
        featureImage={pressFeatureImage}
        featureLink={pressFeatureLink}
        featureSourceLogo={pressFeatureSourceLogo}
      />
    </main>
  );
}
