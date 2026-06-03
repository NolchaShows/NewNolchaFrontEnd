import ExperiencesIndexPageClient from "@/components/experiences/ExperiencesIndexPageClient";
import { getExperiencesIndexContent } from "@/lib/experiencesIndexData";

export const metadata = {
  title: "Experiences | Nolcha",
  description:
    "Explore Nolcha experiences — runway, events, and brand activations by category.",
};

export const revalidate = 60;

export default async function ExperiencesIndexPage() {
  const content = await getExperiencesIndexContent();

  return <ExperiencesIndexPageClient {...content} />;
}
