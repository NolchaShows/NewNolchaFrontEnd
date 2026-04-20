import PastSpeakers from "@/components/common/PastSpeakers";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import { fetchHomePage } from "@/lib/graphql/fetchHomePage";

export const revalidate = 60;

async function SpeakersPage() {
  const homePage = await fetchHomePage("home");
  const speakerData = homePage?.speaker_section || null;

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  const galleryItems = [
    { type: "image", url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 22.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 23.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 24.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 25.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 26.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 27.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 28.png", width: 1200, height: 1500 },
    { type: "image", url: "/shao_nyfw/image 21.png", width: 1200, height: 1500 },
  ];

  const hasCompleteStrapiSpeakers = (speakerData?.speakers || []).every(
    (speaker) => speaker?.image?.url || speaker?.image?.data?.attributes?.url || speaker?.image
  );
  const speakersForSection =
    speakerData?.speakers?.length && hasCompleteStrapiSpeakers
      ? speakerData.speakers
      : undefined;

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px] h-screen"
        firstPart="Speakers"
        secondPart=""
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#FFFFFF"
        size="large"
        overlayOpacity={20}
        isGoogleDrive={false}
      />
      <div className="relative z-10">
        <PastSpeakers
          title={speakerData?.title || "Featured Speakers"}
          speakers={speakersForSection}
        />
        <div className="bg-[#f0eee6] px-5 pt-4 pb-8 lg:px-11 lg:pt-8 lg:pb-12">
          <MediaGalleryGrid items={galleryItems} />
        </div>
      </div>
    </div>
  );
}

export default SpeakersPage;
