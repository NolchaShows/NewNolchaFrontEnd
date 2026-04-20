import AboutStatementSection from "@/components/about/AboutStatementSection";
import AboutHeroVideo from "@/components/about/AboutHeroVideo.jsx";
import OurDifferentiators from "@/components/about/OurDifferentiators";
import OurServicesSection from "@/components/about/OurServicesSection";
import OurEcosystemSection from "@/components/about/OurEcosystemSection";
import OurClientsSection from "@/components/about/OurClientsSection";
import OurPressSection from "@/components/about/OurPressSection";
import { getAboutPageContent } from "@/lib/aboutPageData";

export const metadata = {
  title: "About Us | New Nolcha",
  description: "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
};

const defaultHeroVideo =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4";

export const revalidate = 60;

export default async function AboutPage() {
  const aboutPage = await getAboutPageContent();
  const heroVideo = aboutPage?.heroVideo || defaultHeroVideo;

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
      <OurEcosystemSection
        label={aboutPage.ecosystem.label}
        title={aboutPage.ecosystem.title}
        imageSrc={aboutPage.ecosystem.imageSrc}
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
        featureDate={aboutPage.press.featureDate}
        featureTitle={aboutPage.press.featureTitle}
        featureSource={aboutPage.press.featureSource}
        featureImage={aboutPage.press.featureImage}
      />
    </main>
  );
}
