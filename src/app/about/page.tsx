import AboutStatementSection from "@/components/about/AboutStatementSection";

export const metadata = {
  title: "About Us | New Nolcha",
  description: "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F4] pt-20">
      <AboutStatementSection />
    </main>
  );
}
