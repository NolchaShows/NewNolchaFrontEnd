import UnderTheStarsSection from "@/components/home/UnderTheStarsSection";

export const metadata = {
  title: "Under The Stars · Basel Edition | Nolcha Shows",
  description:
    "An evening of art, music and philanthropy with Nolcha, in support of St. Jude Children's Research Hospital. 50% of artist sales go to St. Jude Children's Research Hospital.",
};

export default function UnderTheStarsPage() {
  return (
    <main className="min-h-screen bg-white">
      <UnderTheStarsSection />
    </main>
  );
}
