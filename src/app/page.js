"use client";
import React, { useState, useEffect } from "react";
import Artists from "@/components/landing/Artists";
import TextHero from "@/components/charity_partners/TextHero";
import ImageCarousel from "@/components/experiences/ImageCarousel";
import ContactForm from "@/components/common/ContactForm";
import LogoSlider from "@/components/home/TextSlider";
import Partners from "@/components/home/Partners";
import { getLandingPageData } from "@/lib/strapi";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import BuildMomentumSection from "@/components/home/BuildMomentumSection";
import ImageGallerySlider from "@/components/common/ImageGallerySlider";
import EveningRecap from "@/components/common/EveningRecap";
import PastSpeakers from "@/components/common/PastSpeakers";
import FashionGrid3x3 from "@/components/shao/FashionGrid3x3";
import UpcomingEventsList from "@/components/home/UpcomingEventsList";
import ExploreServices from "@/components/home/ExploreServices";
import TweetCarousel from "@/components/common/TweetCarousel";
import { tweetsData } from "@/data/tweetsData";
import PastExperiences from "@/components/common/PastExperiences";
import NolchaExperience from "@/components/home/Collaboration";
import HomeWideVideoBanner from "@/components/home/HomeWideVideoBanner";

export default function Home() {
  const [heroData, setHeroData] = useState(null);
  const [logoSliderData, setLogoSliderData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [recentEventsData, setRecentEventsData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const [partnerSection2Data, setPartnerSection2Data] = useState(null);
  const [speakerData, setSpeakerData] = useState(null);
  const [textHeroData, setTextHeroData] = useState(null);
  const [nolchaExperienceData, setNolchaExperienceData] = useState(null);
  const [artistData, setArtistData] = useState(null);
  const [carousalData, setCarousalData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getLandingPageData();

        // Extract hero_section data from the first landing page
        if (data?.data && data.data.length > 0) {
          console.log("Recent events data:", data.data[0].recent_events);
          console.log("Service section data:", data.data[0].service_section);
          console.log("Partner section data:", data.data[0].partner_section);
          console.log(
            "Partner section 2 data:",
            data.data[0].partner_section_2
          );
          console.log("Speaker section data:", data.data[0].speaker_section);
          console.log("TextHero section data:", data.data[0].texthero_section);
          console.log(
            "Nolcha Experience section data:",
            data.data[0].nolcha_experience_section
          );
          console.log("Artist section data:", data.data[0].artist_section);
          console.log("Carousel section data:", data.data[0].carousal_section);
          console.log("Contact section data:", data.data[0].contact_section);

          setHeroData(data.data[0].hero_section);
          setLogoSliderData(data.data[0].logo_slider);
          setAboutData(data.data[0].about_section);
          setRecentEventsData(data.data[0].recent_events);
          setServiceData(data.data[0].service_section);
          setPartnerData(data.data[0].partner_section);
          setPartnerSection2Data(data.data[0].partner_section_2);
          setSpeakerData(data.data[0].speaker_section);
          setTextHeroData(data.data[0].texthero_section);
          setNolchaExperienceData(data.data[0].nolcha_experience_section);
          setArtistData(data.data[0].artist_section);
          setCarousalData(data.data[0].carousal_section);
          setContactData(data.data[0].contact_section);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const buildParagraphs = (aboutData) => {
    if (!aboutData) return [];

    if (aboutData.paragraphs && Array.isArray(aboutData.paragraphs)) {
      return aboutData.paragraphs.map((para, index) => {
        if (para.text_before && para.highlight && para.text_after) {
          return (
            <React.Fragment key={index}>
              {para.text_before}
              <span className="font-bold">{para.highlight}</span>
              {para.text_after}
            </React.Fragment>
          );
        }
        // Fallback for plain text paragraphs
        return <React.Fragment key={index}>{para.text || para}</React.Fragment>;
      });
    }

    return [];
  };
  const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
  ];
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
  const posts = [
    "/experiences/jack/posts/1.png",
    "/experiences/jack/posts/2.png",
    "/experiences/jack/posts/3.png",
    "/experiences/jack/posts/4.png",
    "/experiences/jack/posts/5.png",
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
  const press = [
    {
      id: 1,
      imageWhite: "/home/press/1w.png",
      imageBlack: "/home/press/1b.png",
      altText: "Partner 1",
      backgroundColor: "bg-black",
    },
    {
      id: 2,
      imageWhite: "/home/press/2w.png",
      imageBlack: "/home/press/2b.png",
      altText: "Partner 2",
      backgroundColor: "bg-black",
    },
    {
      id: 3,
      imageWhite: "/home/press/3w.png",
      imageBlack: "/home/press/3b.png",
      altText: "Partner 3",
      backgroundColor: "bg-black",
    },
    {
      id: 4,
      imageWhite: "/home/press/4w.png",
      imageBlack: "/home/press/4b.png",
      altText: "Partner 4",
      backgroundColor: "bg-black",
    },
    {
      id: 5,
      imageWhite: "/home/press/5w.png",
      imageBlack: "/home/press/5b.png",
      altText: "Partner 5",
      backgroundColor: "bg-black",
    },
    {
      id: 6,
      imageWhite: "/home/press/6w.png",
      imageBlack: "/home/press/6b.png",
      altText: "Partner 6",
      backgroundColor: "bg-black",
    },
    {
      id: 7,
      imageWhite: "/home/press/7w.png",
      imageBlack: "/home/press/7b.png",
      altText: "Partner 7",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 8,
      imageWhite: "/home/press/8w.png",
      imageBlack: "/home/press/8b.png",
      altText: "Partner 8",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 9,
      imageWhite: "/home/press/9w.png",
      imageBlack: "/home/press/9b.png",
      altText: "Partner 9",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 10,
      imageWhite: "/home/press/10w.png",
      imageBlack: "/home/press/10b.png",
      altText: "Partner 10",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 11,
      imageWhite: "/home/press/11w.png",
      imageBlack: "/home/press/11b.png",
      altText: "Partner 11",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 12,
      imageWhite: "/home/press/12w.png",
      imageBlack: "/home/press/12b.png",
      altText: "Partner 12",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 13,
      imageWhite: "/home/press/13w.png",
      imageBlack: "/home/press/13b.png",
      altText: "Partner 13",
      backgroundColor: "bg-black",
    },
    {
      id: 14,
      imageWhite: "/home/press/14w.png",
      imageBlack: "/home/press/14b.png",
      altText: "Partner 14",
      backgroundColor: "bg-black",
    },
    {
      id: 15,
      imageWhite: "/home/press/15w.png",
      imageBlack: "/home/press/15b.png",
      altText: "Partner 15",
      backgroundColor: "bg-black",
    },
    {
      id: 16,
      imageWhite: "/home/press/16w.png",
      imageBlack: "/home/press/16b.png",
      altText: "Partner 16",
      backgroundColor: "bg-black",
    },
    {
      id: 17,
      imageWhite: "/home/press/10w.png",
      imageBlack: "/home/press/10b.png",
      altText: "Partner 17",
      backgroundColor: "bg-black",
    },
  ];

  const pastSpeakers = [
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

  // Upcoming events (accordion list style under EveningRecap)
  const upcomingListEvents = [
    {
      title: "Consensus Hong Kong",
      image: "/homepage/upcoming_events/upcoming1.jpg",
      date: "2.10-2.12.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { 
      title: "Bitcoin Conference Vegas",
      image: "/homepage/upcoming_events/upcoming2.jpg",
      date: "4.27.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
     },
    { title: "Consensus Miami",
      image: "/homepage/upcoming_events/upcoming3.jpg",
      date: "5.5 - 5.7.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { title: "Multichain Summer Series",
      image: "/homepage/upcoming_events/upcoming4.jpg",
      date: "7.15 - 9.25.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { title: "New York Fashion Week",
      image: "/homepage/upcoming_events/upcoming5.jpg",
      date: "9.10 - 9.14.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { title: "Token 2049 Singapore",
      image: "/homepage/upcoming_events/upcoming6.jpg",
      date: "10.7-10.8.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
    { title: "Art Basel Miami",
      image: "/homepage/upcoming_events/upcoming7.jpg",
      date: "12.3-12.4.2026",
      location: "22908 Houston Texas Usa",
      pastEventsLocation: "Houston Texas Usa",
      letsTalkLocation: "Location:",
      whiteLabelLocation: "Location:",
    },
  ];

  const exploreServices = {
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

  const pastExperiences = [
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
        <div className="relative z-10">
          <BuildMomentumSection />
          <ImageGallerySlider />
          <LogoSlider logoSliderData={logoSliderData} loading={loading} />
          <UpcomingEventsList title="Upcoming Events" events={upcomingListEvents} />
          <EveningRecap
            year={eveningRecap.year}
            title={eveningRecap.title}
            videos={eveningRecap.videos}
            videoUrl={eveningRecap.videoUrl}
          />
          <ExploreServices
            title={exploreServices.title}
            image={exploreServices.image}
            caption={exploreServices.caption}
            items={exploreServices.items}
          />
          <HomeWideVideoBanner
            className="hidden lg:block"
            src="https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-2.mp4"
          />
          <Partners
            partnerData={partnerData}
            loading={loading}
            title={"Trusted by Global Brands For Over 15 Years"}
            description={
              "From cutting-edge tech startups and rapidly expanding businesses to impactful charities"
            }
            partners={partners}
          />
          <NolchaExperience
            nolchaExperienceData={nolchaExperienceData}
            loading={loading}
          />
          <PastSpeakers speakers={pastSpeakers} />
        </div>
      </div>
      <TextHero
        textHeroData={textHeroData}
        loading={loading}
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
      <img src="/home/press-and-media-recognition/press-and-media-recognition.jpg" />
      <Artists
        artistData={artistData}
        loading={loading}
        textColor={"text-[var(--tertiary-text-color)]"}
        videos={videos}
        isDesktop={true}
      />
      <HomeWideVideoBanner
        className="hidden lg:block"
        src="https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-3.mp4"
      />
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
      <TweetCarousel
        posts={tweetsData}
        carousalData={null}
        padding=""
        title="Community Moments"
      />
      <PastExperiences experiences={pastExperiences} />
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
