import Artists from "@/components/landing/Artists";
import TextHero from "@/components/charity_partners/TextHero";
import ContactForm from "@/components/common/ContactForm";
import LogoSlider from "@/components/home/TextSlider";
import Partners from "@/components/home/Partners";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import BuildMomentumSection from "@/components/home/BuildMomentumSection";
import ImageGallerySlider from "@/components/common/ImageGallerySlider";
import EveningRecap from "@/components/common/EveningRecap";
import PastSpeakers from "@/components/common/PastSpeakers";
import FashionGrid3x3 from "@/components/shao/FashionGrid3x3";
import ExploreServices from "@/components/home/ExploreServices";
import TweetCarousel from "@/components/common/TweetCarousel";
import { tweetsData } from "@/data/tweetsData";
import PastExperiences from "@/components/common/PastExperiences";
import NolchaExperience from "@/components/home/Collaboration";
import HomeWideVideoBanner from "@/components/home/HomeWideVideoBanner";
import Image from "next/image";
import HeroSection from "@/components/experience/HeroSection";
import EveningRecapSection from "@/components/experience/EveningRecapSection";
import GallerySection from "@/components/experience/GallerySection";
import SharedTweetCarouselSection from "@/components/experience/SharedTweetCarouselSection";
import HomeUpcomingEventsSection from "@/components/home/HomeUpcomingEventsSection";
import { fetchHomePage } from "@/lib/graphql/fetchHomePage";
import { upcomingListEvents } from "@/data/upcomingEvents";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://new-nolcha-strapi-uiai.onrender.com";

const getBlockByType = (blocks = [], componentName) =>
  blocks.find(
    (block) =>
      block?.__component === componentName ||
      block?.__typename ===
        `Component${componentName
          .split(".")
          .map((part) =>
            part
              .split("-")
              .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
              .join("")
          )
          .join("")}`
  );

const getBestImageUrl = (media) => {
  if (!media) return null;

  const rawUrl =
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.formats?.thumbnail?.url ||
    media.url ||
    null;

  if (!rawUrl) return null;

  return rawUrl.startsWith("http") ? rawUrl : `${STRAPI_BASE_URL}${rawUrl}`;
};

const getMediaUrl = (media) => {
  if (!media) return null;

  const rawUrl = media?.url || getBestImageUrl(media);
  if (!rawUrl) return null;

  return rawUrl.startsWith("http") ? rawUrl : `${STRAPI_BASE_URL}${rawUrl}`;
};

const isVideoMedia = (media) => {
  if (!media) return false;

  const mime = media.mime || "";
  const ext = (media.ext || "").toLowerCase();

  return mime.startsWith("video/") || [".mp4", ".mov", ".webm"].includes(ext);
};

const pickFirstImageUrl = (...mediaItems) => {
  for (const media of mediaItems) {
    if (!media || isVideoMedia(media)) continue;

    const url = getBestImageUrl(media);
    if (url) return url;
  }

  return null;
};

const getExperienceCardImage = (experience) => {
  if (!experience) return null;

  const galleryBlock = getBlockByType(experience.blocks, "blocks.gallery");
  const galleryImage =
    pickFirstImageUrl(galleryBlock?.images?.[0], galleryBlock?.items?.[0]?.image) ||
    null;

  if (galleryImage) return galleryImage;

  const threeImageRowBlock = getBlockByType(
    experience.blocks,
    "blocks.three-image-row"
  );
  const threeImageRowImage = pickFirstImageUrl(
    threeImageRowBlock?.firstMedia,
    threeImageRowBlock?.secondMedia,
    threeImageRowBlock?.thirdMedia
  );

  if (threeImageRowImage) return threeImageRowImage;

  const fashionGridBlock = getBlockByType(
    experience.blocks,
    "blocks.fashion-grid-section"
  );

  return pickFirstImageUrl(
    fashionGridBlock?.leftMedia,
    fashionGridBlock?.rightMedia,
    fashionGridBlock?.topMedia,
    fashionGridBlock?.middleMedia1,
    fashionGridBlock?.middleMedia2,
    fashionGridBlock?.middleMedia3,
    fashionGridBlock?.bottomMedia
  );
};

const buildPastExperiences = (featuredExperiences = []) =>
  (featuredExperiences || [])
    .map((experience) => ({
      image: getExperienceCardImage(experience),
      text: experience?.title || "",
    }))
    .filter((experience) => experience.image && experience.text);

const mapUpcomingEvents = (upcomingSection) => {
  if (!upcomingSection?.events?.length) return upcomingListEvents;

  return upcomingSection.events.map((event) => ({
    title: event?.title || "",
    image: getMediaUrl(event?.image) || "",
    date: event?.date || "",
    location: event?.location || "",
    pastEventsLocation: event?.pastEventsLocation || "",
    letsTalkLocation: event?.letsTalkLocation || "",
    whiteLabelLocation: event?.whiteLabelLocation || "",
    venue: event?.venue || event?.location || "",
    whatToExpect: event?.whatToExpect || "",
    rsvpLink: event?.rsvpLink || "#",
    logo: getMediaUrl(event?.logo) || "",
    mainImage: getMediaUrl(event?.mainImage) || getMediaUrl(event?.image) || "",
    galleryImages: (event?.galleryImages || []).map((image) => getMediaUrl(image)).filter(Boolean),
  }));
};

const mapImageGallerySliderImages = (imageGallerySlider) =>
  (imageGallerySlider?.images || []).map((image) => getMediaUrl(image)).filter(Boolean);

export default async function Home() {
  const homePage = await fetchHomePage("home");
  const buildMomentumData = homePage?.build_momentum_section || null;
  const imageGallerySliderImages = mapImageGallerySliderImages(
    homePage?.image_gallery_slider
  );
  const logoSliderData = homePage?.logo_slider || null;
  const upcomingEvents = mapUpcomingEvents(homePage?.upcoming_events_section);
  const serviceData = homePage?.service_section || null;
  const speakerData = homePage?.speaker_section || null;
  const textHeroData = homePage?.texthero_section || null;
  const homePartnerSection = homePage?.shared_partner_section || null;
  const featureBannerOne = getMediaUrl(homePage?.feature_banner_one);
  const nolchaExperienceData = homePage?.nolcha_experience_section || null;
  const pressMediaImage = getMediaUrl(homePage?.press_media_image);
  const artistData = homePage?.artist_section || null;
  const featureBannerTwo = getMediaUrl(homePage?.feature_banner_two);
  const homeTweetCarousel = homePage?.shared_tweet_carousel || null;
  const pastExperiences = buildPastExperiences(homePage?.featured_experiences);
  const contactData = homePage?.contact_section || null;
  const slideData = [
    {
      image: "/home/hero.png",
      video: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4",
      title: "/home/forbes/Forbes.png",
      description:
        "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
    },
    {
      image: "/home/hero.png",
      video: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4",

      title: "/home/forbes/Forbes.png",
      description: "lorem ipsum",
    },
  ];
  const videos = [
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-4.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-5.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-6.mp4",
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-7.mp4",
  ];
  const partners = [
    {
      id: 1,
      imageWhite: "/home/partners/1w.png",
      imageBlack: "/home/partners/1b.png",
      altText: "Partner 1",
      backgroundColor: "bg-black",
    },
    {
      id: 2,
      imageWhite: "/home/partners/2w.png",
      imageBlack: "/home/partners/2b.png",
      altText: "Partner 2",
      backgroundColor: "bg-black",
    },
    {
      id: 3,
      imageWhite: "/home/partners/3w.png",
      imageBlack: "/home/partners/3b.png",
      altText: "Partner 3",
      backgroundColor: "bg-black",
    },
    {
      id: 4,
      imageWhite: "/home/partners/4w.png",
      imageBlack: "/home/partners/4b.png",
      altText: "Partner 4",
      backgroundColor: "bg-black",
    },
    {
      id: 5,
      imageWhite: "/home/partners/5w.png",
      imageBlack: "/home/partners/5b.png",
      altText: "Partner 5",
      backgroundColor: "bg-black",
    },
    {
      id: 6,
      imageWhite: "/home/partners/6w.png",
      imageBlack: "/home/partners/6b.png",
      altText: "Partner 6",
      backgroundColor: "bg-black",
    },
    {
      id: 7,
      imageWhite: "/home/partners/7w.png",
      imageBlack: "/home/partners/7b.png",
      altText: "Partner 7",
      backgroundColor: "bg-black",
    },
    {
      id: 8,
      imageWhite: "/home/partners/8w.png",
      imageBlack: "/home/partners/8b.png",
      altText: "Partner 8",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 9,
      imageWhite: "/home/partners/9w.png",
      imageBlack: "/home/partners/9b.png",
      altText: "Partner 9",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 10,
      imageWhite: "/home/partners/10w.png",
      imageBlack: "/home/partners/10b.png",
      altText: "Partner 10",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 11,
      imageWhite: "/home/partners/11w.png",
      imageBlack: "/home/partners/11b.png",
      altText: "Partner 11",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 12,
      imageWhite: "/home/partners/12w.png",
      imageBlack: "/home/partners/12b.png",
      altText: "Partner 12",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 13,
      imageWhite: "/home/partners/13w.png",
      imageBlack: "/home/partners/13b.png",
      altText: "Partner 13",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 14,
      imageWhite: "/home/partners/14w.png",
      imageBlack: "/home/partners/14b.png",
      altText: "Partner 14",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 15,
      imageWhite: "/home/partners/15w.png",
      imageBlack: "/home/partners/15b.png",
      altText: "Partner 15",
      backgroundColor: "bg-black",
    },
    {
      id: 16,
      imageWhite: "/home/partners/16w.png",
      imageBlack: "/home/partners/16b.png",
      altText: "Partner 16",
      backgroundColor: "bg-black",
    },
    {
      id: 17,
      imageWhite: "/home/partners/17w.png",
      imageBlack: "/home/partners/17b.png",
      altText: "Partner 17",
      backgroundColor: "bg-black",
    },
    {
      id: 18,
      imageWhite: "/home/partners/18w.png",
      imageBlack: "/home/partners/18b.png",
      altText: "Partner 18",
      backgroundColor: "bg-black",
    },
    {
      id: 19,
      imageWhite: "/home/partners/19w.png",
      imageBlack: "/home/partners/19b.png",
      altText: "Partner 19",
      backgroundColor: "bg-black",
    },
    {
      id: 20,
      imageWhite: "/home/partners/20w.png",
      imageBlack: "/home/partners/20b.png",
      altText: "Partner 20",
      backgroundColor: "bg-black",
    },
  ];
  const fallbackPastSpeakers = [
    { id: 1, image: '/homepage/past_speakers/1.png' },
    { id: 2, image: '/homepage/past_speakers/2.png' },
    { id: 3, image: '/homepage/past_speakers/3.png' },
    { id: 4, image: '/homepage/past_speakers/4.png' },
    { id: 5, image: '/homepage/past_speakers/5.png' },
    { id: 6, image: '/homepage/past_speakers/6.png' },
    { id: 7, image: '/homepage/past_speakers/7.png' },
    { id: 8, image: '/homepage/past_speakers/8.png' },
    { id: 9, image: '/homepage/past_speakers/9.png' },
    { id: 10, image: '/homepage/past_speakers/10.png' },
    { id: 11, image: '/homepage/past_speakers/11.png' },
    { id: 12, image: '/homepage/past_speakers/12.png' },
    { id: 13, image: '/homepage/past_speakers/13.png' },
  ]

  const eveningRecap = {
    year: "2024",
    title: "Recent Events: Bitcoin Nashville 2024",
    videos: [
      {
        url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov",
        isGoogleDrive: false
      },
      {
        url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov",
        isGoogleDrive: false
      },
      {
        url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov",
        isGoogleDrive: false
      }
    ],
    // Keep videoUrl for backward compatibility
    videoUrl: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov"
  }

  const fallbackExploreServices = {
    title: "How Brands Work With Nolcha",
    image: "/homepage/explore_services/explore-services.png",
    caption: "Our commitment to building websites and apps that last means focusing on sustainable experiences rather than chasing the latest",
    items: [
      { label: "Events", text: "Strategy. Story. Experience", description: "Fluent in innovation, tech, and crypto culture — we bridge creative vision with operational precision. From concept to completion, our team delivers full-scale event strategy, talent and programming, logistics, venue sourcing, art direction, and guest list curation. <br/> We handle every detail so your brand can own the moment.", work: "Bitcoin Conference, ETHDenver, Art Basel, Oh Polly, Consensus Official Opening Night." },
      { label: "Creative", text: "Innovation & Creative", description: "From large-scale projection mapping to multi sensory installations and interactive environments, we produce immersive creative that enhances live events. <br /> Every activation supports the narrative of the event while delivering visually striking, technically precise experiences designed for both audience engagement and brand impact.", work: "Bitcoin Conference Nashville, Bitcoin Conference Vegas, Fvkrender, SHAO New York." },
      { label: "Business", text: "Biz Dev & Fundraising", description: "Connecting Capital to Culture. <br /> Through our network of investors, family offices, and strategic partners, we help founders and brands build the right relationships and access aligned capital for growth. We support ventures shaping the future of technology, art, and culture.", work: "" },
      { label: "Agentic AI Solutions", text: "Biz Dev And Fundraising", description: "From large-scale projection mapping to multi sensory installations and interactive environments, we produce immersive creative that enhances live events. <br /> Every activation supports the narrative of the event while delivering visually striking, technically precise experiences designed for both audience engagement and brand impact.", work: "Bitcoin Conference Nashville, Bitcoin Conference Vegas, Fvkrender, SHAO New York." },
    ],
  }

  const fallbackPastExperiences = [
    { image: "homepage/past_experiences/event-1.png", text: "Bitcoin Conference" },
    { image: "homepage/past_experiences/event-2.png", text: "Opening Night Consensus" },
    { image: "homepage/past_experiences/event-3.png", text: "NYFW Immersive" },
    { image: "homepage/past_experiences/event-4.png", text: "BTC Nashville" },
    { image: "homepage/past_experiences/event-5.png", text: "NYFW OH POLLY" },
    { image: "homepage/past_experiences/event-6.png", text: "JACK BUTCHER RACE" },
    { image: "homepage/past_experiences/event-7.png", text: "UPCOMING" },
  ]

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

  return (
    <div className="">
      <div className="bg-[var(--surface-color2)]">
        {homePage?.hero?.video?.url ? (
          <HeroSection slug="home" pageType="home" page={homePage} />
        ) : (
          <VideoHeroSection
            videoSrc={heroVideo}
            isSticky={true}
            className="-mt-[88px] 2xl:-mt-[120px]"
            firstPart="Curated connections for leaders in AI, Web3 & Crypto."
            secondPart=""
            strokeColor="#000000"
            fillColor="#FEF991"
            textColor="#FFFFFF"
            size="large"
            overlayOpacity={20}
            isGoogleDrive={false}
          />
        )}
        <div className="relative z-10">
          <BuildMomentumSection buildMomentumData={buildMomentumData} />
          <ImageGallerySlider
            images={imageGallerySliderImages.length ? imageGallerySliderImages : undefined}
          />
          <LogoSlider logoSliderData={logoSliderData} loading={false} />
          <HomeUpcomingEventsSection
            title={homePage?.upcoming_events_section?.title || "Upcoming Events"}
            events={upcomingEvents}
          />
          {homePage?.evening_recap_section ? (
            <EveningRecapSection slug="home" pageType="home" page={homePage} />
          ) : (
            <EveningRecap
              year={eveningRecap.year}
              title={eveningRecap.title}
              videos={eveningRecap.videos}
              videoUrl={eveningRecap.videoUrl}
            />
          )}
          <ExploreServices
            title={serviceData?.title || fallbackExploreServices.title}
            image={getMediaUrl(serviceData?.image) || fallbackExploreServices.image}
            caption={serviceData?.caption || fallbackExploreServices.caption}
            items={
              serviceData?.services?.length
                ? serviceData.services.map((service) => ({
                    label: service?.label || "",
                    text: service?.text || "",
                    description: service?.description || "",
                    work: service?.work || "",
                  }))
                : fallbackExploreServices.items
            }
          />
          <HomeWideVideoBanner
            className="hidden lg:block"
            src={
              featureBannerOne ||
              "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-2.mp4"
            }
          />
          <Partners
            partnerData={homePartnerSection}
            loading={false}
            title={"Trusted by Global Brands For Over 15 Years"}
            description={
              "From cutting-edge tech startups and rapidly expanding businesses to impactful charities"
            }
            partners={partners}
          />
          <NolchaExperience
            nolchaExperienceData={nolchaExperienceData}
            loading={false}
          />
          <PastSpeakers
            title={speakerData?.title || "Featured Speakers"}
            speakers={speakerData?.speakers?.length ? speakerData.speakers : undefined}
          />
        </div>
      </div>
      <TextHero
        textHeroData={textHeroData}
        loading={false}
        images={slideData}
      />
      {/* <div className="bg-[var(--secondary-color)]">
        <RecentEvents recentEventsData={recentEventsData} loading={loading} />
      </div> */}
      {/* <Partners
        partnerData={partnerSection2Data}
        loading={loading}
        title={"Press and Media Recognition"}
        partners={press}
        bg={"bg-white"}
      /> */}
      {pressMediaImage ? (
        <img
          src={pressMediaImage}
          alt="Press and media recognition"
          className="w-full h-auto"
        />
      ) : (
        <Image
          src="/home/press-and-media-recognition/press-and-media-recognition.jpg"
          alt="Press and media recognition"
          width={4309}
          height={2224}
          sizes="100vw"
          className="w-full h-auto"
        />
      )}
      <Artists
        artistData={artistData}
        loading={false}
        textColor={"text-[var(--tertiary-text-color)]"}
        videos={videos}
        isDesktop={true}
      />
      <HomeWideVideoBanner
        className="hidden lg:block"
        src={
          featureBannerTwo ||
          "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-3.mp4"
        }
      />
      {homePage?.gallery_section ? (
        <GallerySection slug="home" pageType="home" page={homePage} />
      ) : (
        <FashionGrid3x3
          images={[
            "/shao_nyfw/image 21.png",
            "/shao_nyfw/image 22.png",
            "/shao_nyfw/image 23.png",
            "/shao_nyfw/image 24.png",
            "/shao_nyfw/image 25.png",
            "/shao_nyfw/image 26.png",
            "/shao_nyfw/image 27.png",
            "/shao_nyfw/image 28.png",
          ]}
          background="#FEF991"
        />
      )}
      {homeTweetCarousel?.items?.length ? (
        <SharedTweetCarouselSection slug="home" pageType="home" page={homePage} />
      ) : (
        <TweetCarousel
          posts={tweetsData}
          padding=""
          title="Community Moments"
        />
      )}
      <PastExperiences
        experiences={pastExperiences.length ? pastExperiences : fallbackPastExperiences}
      />
      <ContactForm
        bg={"/landing/background2.jpg"}
        heading={"Contact us"}
        contactData={contactData}
        desc={
          "For over 15 years, Nolcha has operated at the intersection of technology and culture, producing high-impact events, summits, and activations for leading blockchain, AI, and emerging-tech brands."
        }
        videoSrc="https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-8.mp4"
      />
    </div>
  );
}
