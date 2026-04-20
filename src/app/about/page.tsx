import AboutStatementSection from "@/components/about/AboutStatementSection";
import AboutHeroVideo from "@/components/about/AboutHeroVideo.jsx";
import OurDifferentiators from "@/components/about/OurDifferentiators";
import OurServicesSection from "@/components/about/OurServicesSection";
import OurEcosystemSection from "@/components/about/OurEcosystemSection";
import OurClientsSection from "@/components/about/OurClientsSection";
import OurPressSection from "@/components/about/OurPressSection";

export const metadata = {
  title: "About Us | New Nolcha",
  description: "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
};

const heroVideo =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F4]">
      <AboutStatementSection />
      <AboutHeroVideo videoSrc={heroVideo} />
      <OurDifferentiators />
      <hr className="w-full border-t border-[#1D1D1D] my-4" />
      <OurServicesSection />
      <hr className="w-full border-t border-[#1D1D1D] mb-4" />
      <OurEcosystemSection />
      <hr className="w-full border-t border-[#1D1D1D] mb-4" />
      <OurClientsSection />
      <OurPressSection />
    </main>
  );
}
