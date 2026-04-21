import { fetchHomePage } from "@/lib/graphql/fetchHomePage";
import { fetchSpeakersPage } from "@/lib/fetchSpeakersPage";
import SpeakersPageClient from "@/components/speakers/SpeakersPageClient";

const FALLBACK_HERO_VIDEO =
  "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

const FALLBACK_GALLERY_MEDIA = [
  { url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 22.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 23.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 24.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 25.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 26.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 27.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 28.png", width: 1200, height: 1500 },
  { url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
];

export const revalidate = 60;

async function SpeakersPage() {
  const [speakersPage, homePage] = await Promise.all([
    fetchSpeakersPage("speakers"),
    fetchHomePage("home"),
  ]);
  const homeSpeakerSection = homePage?.shared_speaker_section || null;

  const page = {
    title: speakersPage?.title || "Speakers",
    hero: speakersPage?.hero || {
      video: { url: FALLBACK_HERO_VIDEO },
    },
    shared_speaker_section:
      speakersPage?.shared_speaker_section || homeSpeakerSection,
    gallery: speakersPage?.gallery || {
      standard_media: FALLBACK_GALLERY_MEDIA,
      featured_media: [],
      featured_content_sections: [],
      featured_interval: 6,
    },
  };

  return <SpeakersPageClient page={page} />;
}

export default SpeakersPage;
