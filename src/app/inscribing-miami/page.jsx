"use client";
import React from 'react';
import LogoSlider from "@/components/home/TextSlider";
import EveningRecap from "@/components/common/EveningRecap";
import PastSpeakers from "@/components/common/PastSpeakers";
import EventHero from "@/components/common/EventHero";
import WhatToExpect from "@/components/common/WhatToExpect";
import VenueSection from "@/components/common/VenueSection";
import TopicsSection from "@/components/common/TopicsSection";
import AgendaSection from "@/components/common/AgendaSection";
import ImageGallerySlider from "@/components/common/ImageGallerySlider";
import CommunityTrust from "@/components/common/CommunityTrust";
import PartnersTwo from '@/components/home/PartnersTwo';

// Data array for Inscribing Miami page
const inscribingMiamiData = {
  mainHeading: "Inscribing Miami",
  subHeading: "Art Week Experience",
  mainImage: "/inscribing_miami/header_image.jpg",
  eventHero: {
    logoImage: "/inscribing_miami/inscribing_miami_logo.png",
    firstHeadingPart: "Miami Art Week's Largest",
    secondHeadingPart: "Art + Tech Culture Convergence",
    dateLocation: "Thursday December 4th, 2025 / Miami Beach",
    primaryButtonText: "Partner With Us",
    secondaryButtonText: "Request Tickets",
    primaryButtonLink: "#partner",
    secondaryButtonLink: "#tickets"
  },
  logoSlider: {
    title: "AS SEEN IN",
    logos: [
      { name: "AdAge", url: "/home/slider1.png" },
      { name: "VOGUE", url: "/home/slider2.png" },
      { name: "Forbes", url: "/home/slider3.png" },
    ]
  },
  partners: {
    title: "Trusted By Global Brands ",
    press: [
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
    ]
  },
  posts: [
    "/experiences/jack/posts/1.png",
    "/experiences/jack/posts/2.png",
    "/experiences/jack/posts/3.png",
    "/experiences/jack/posts/4.png",
    "/experiences/jack/posts/5.png",
  ],
  contact: {
    bg: "/landing/background2.jpg",
    heading: "Lets Talk"
  },
  eveningRecap: {
    year: "2024",
    title: "Evening Recap",
    videoUrl: "/video2.mp4"
  },
  pastSpeakers: [
    { id: 1, image: '/past_speakers/1.png' },
    { id: 2, image: '/past_speakers/2.png'},
    { id: 3, image: '/past_speakers/3.png'},
    { id: 4, image: '/past_speakers/4.png'},
    { id: 5, image: '/past_speakers/5.png'},
    { id: 6, image: '/past_speakers/6.png'},
    { id: 7, image: '/past_speakers/7.png'},
    { id: 8, image: '/past_speakers/8.png'},
    { id: 9, image: '/past_speakers/9.png'},
    { id: 10, image: '/past_speakers/10.png'},
    { id: 11, image: '/past_speakers/11.png'},
    { id: 12, image: '/past_speakers/12.png'},
    { id: 13, image: '/past_speakers/13.png'},
  ],
  whatToExpect: {
    firstHeadingPart: "15+ Years of Pioneering",
    secondHeadingPart: "Cultural Experiences",
    descriptionText: "Join us as we transform 35,000 sq. ft. Miami beach landmark into one of Art Basel's most visually stunning and immersive cultural destinations.",
    decorativeImage: "/inscribing_miami/decorative_icon.png",
    expectItems: [
      {
        title: "Business",
        description: "Curated programming unites investors, innovators, and creators driving the future of Bitcoin, Web3, AI, and art."
      },
      {
        title: "Immersive",
        description: "The evening transforms with immersive digital art, live performances, aerial acts, and 50+ synchronized DJ booths for a next-level sensory experience."
      },
      {
        title: "Brand Exposure",
        description: "Position your brand at the center of it all with exclusive activations, premium integrations, and high-impact visibility across both day and night."
      }
    ],
    quoteBox: {
      logo: "/home/Forbes.png",
      text: "\" Nolcha Returns To Art Basel Miami Beach Featuring Leading Web3 Brands \""
    }
  },
  venue: {
    heading: "The Venue",
    description: "Built in 1934, this iconic Miami Beach theatre fuses timeless architecture with state-of-the-art tech capabilities, creating the perfect environment for immersive brand storytelling and immersive activations.",
    decorativeImage: "/inscribing_miami/venue_decorative_full.png",
    venueImages: [
      "/inscribing_miami/venue_1.png",
      "/inscribing_miami/venue_2.png"
    ],
    backgroundImage: "/inscribing_miami/venue_background.png"
  },
  topics: {
    heading: "Topics",
    backgroundImage: "/inscribing_miami/topics_background.png",
    topicGroups: [
      {
        topics: [
          "Bitcoin Ordinals & Inscriptions",
          "Bitcoin Layer 2 Innovation (Lightning, Rollups, Drivechains)",
          "Vibecoding with AI",
          "Archival NFTs & Cultural Preservation on-Chain",
          "Open Source Development"
        ]
      },
      {
        topics: [
          "Sovereignty in the Digital Age",
          "Hyperbitcoinization and Decentralization",
          "AI Art & Aesthetics",
          "Multi-chain Interoperability",
          "Memetics, Virality, and Internet Subcultures"
        ]
      }
    ]
  },
  agenda: {
    mainHeading: "Full-day brand exposure from first arrival to final Encore",
    dayAgenda: {
      firstPart: "Day",
      secondPart: "Agenda",
      items: [
        {
          time: "1:30pm-\n6:30pm",
          title: "Inscribing Miami",
          description: "Grand & intimate, high-caliber conference gathering leaders across blockchain, Bitcoin, and digital culture. Includes Master Crypto & Agentic AI panel discussions, and networking lounges.",
          stats: "400+ Industry leaders"
        },
        {
          time: "7:30pm-\n9:00pm",
          title: "Annual Bitcoin Art Awards",
          description: "Celebrating visionaries with curated networking.",
          stats: "600+ VIPs & creators"
        },
        {
          time: "9:00pm-\n2:00pm",
          title: "Immersive Art Adventure",
          description: "A 360° visual experience with 50 LED walls, live performances, aerialists, and surprise acts.",
          stats: "2,500+ guests across art, tech, fashion & crypto."
        }
      ],
      images: [
        "/inscribing_miami/day_agenda_1.png",
        "/inscribing_miami/day_agenda_2.png"
      ]
    },
    eveningHighlight: {
      firstPart: "Evening",
      secondPart: "Highlight",
      items: [
        {
          title: "World-Class Aerialists",
          description: "Thrilling aerial acts suspended mid-air, commanding the entire space."
        },
        {
          title: "Immersive Digital Art",
          description: "50+ synchronized LED walls transform the venue into a fully interactive, 360° visual experience."
        },
        {
          title: "Theatrical Showcases",
          description: "Dramatic performances designed to stir the senses"
        },
        {
          title: "Iconic Live Performances",
          description: "Music, art, and culture collide — the night's energy brought to life."
        }
      ],
      footer: "Your brand seamlessly integrated into a  high-energy, multi-sensory journey.",
      image: "/inscribing_miami/evening_highlight.png"
    },
    buttonText: "Partner With Us",
    buttonLink: "#partner"
  },
  imageGallery: {
    leftImages: [
      "/inscribing_miami/gallery_left_1.png",
      "/inscribing_miami/gallery_left_2.png",
      "/inscribing_miami/gallery_left_3.png"
    ],
    rightImage: "/inscribing_miami/gallery_right.png",
    arrowColor: "#FEF991"
  },
  communityTrust: {
    firstHeadingPart: "Community",
    secondHeadingPart: "Trust",
    description: "More than events, we've built a community of credibility—where leaders, creators, brands and partners come together to move culture, art and blockchain forward.",
    backgroundColor: "#FEF991",
    formSection: {
      backgroundImage: "/landing/background2.jpg",
      heading: "Be part of the most Influential Art, Tech & Culture Gathering During Art Basel.",
      sponsorshipInfo: {
        title: "For Sponsorship inquirers and speaking engagement",
        linkText: "View the full partnership deck here",
        link: "#partnership-deck"
      },
      contacts: [
        {
          name: "Arthur, head of partnership",
          email: "arthurm@nolcha.com",
          telegram: "@nolchashows"
        },
        {
          name: "Erin, Head of programming",
          email: "Erin@inscribingatlantis.com",
          telegram: "@realizingerin"
        }
      ]
    }
  }
};

const Page = () => {
  const { mainHeading, mainImage, eventHero, logoSlider, partners, posts, contact, eveningRecap, pastSpeakers, whatToExpect, venue, topics, agenda, imageGallery, communityTrust } = inscribingMiamiData;

  return (
    <div className="w-full bg-white">
      {mainImage ? (
        <img src={mainImage} alt={mainHeading} className="w-full h-[153px] md:h-[308px] object-cover lg:mb-[50px] bg-white" />
      ) : (
        <img src={"/landing/hero.jpg"} alt="Inscribing Miami" className="w-full h-[153px] md:h-[308px] object-cover lg:mb-[50px] bg-white" />
      )}
      
      <EventHero 
        logoImage={eventHero.logoImage}
        firstHeadingPart={eventHero.firstHeadingPart}
        secondHeadingPart={eventHero.secondHeadingPart}
        dateLocation={eventHero.dateLocation}
        primaryButtonText={eventHero.primaryButtonText}
        secondaryButtonText={eventHero.secondaryButtonText}
        primaryButtonLink={eventHero.primaryButtonLink}
        secondaryButtonLink={eventHero.secondaryButtonLink}
      />
      
      <LogoSlider logoSliderData={logoSlider} loading={false} />

      <EveningRecap 
        videoUrl={eveningRecap.videoUrl}
        paddingTop={true}
      />

      <WhatToExpect 
        firstHeadingPart={whatToExpect.firstHeadingPart}
        secondHeadingPart={whatToExpect.secondHeadingPart}
        descriptionText={whatToExpect.descriptionText}
        decorativeImage={whatToExpect.decorativeImage}
        expectItems={whatToExpect.expectItems}
        quoteBox={whatToExpect.quoteBox}
      />

      <VenueSection 
        heading={venue.heading}
        description={venue.description}
        decorativeImage={venue.decorativeImage}
        venueImages={venue.venueImages}
        backgroundImage={venue.backgroundImage}
      />

      <TopicsSection 
        heading={topics.heading}
        topicGroups={topics.topicGroups}
        backgroundImage={topics.backgroundImage}
      />

      <AgendaSection 
        mainHeading={agenda.mainHeading}
        dayAgenda={agenda.dayAgenda}
        eveningHighlight={agenda.eveningHighlight}
        buttonText={agenda.buttonText}
        buttonLink={agenda.buttonLink}
      />

      <EveningRecap 
        year={eveningRecap.year}
        title={eveningRecap.title}
        videoUrl={eveningRecap.videoUrl}
      />

      <PastSpeakers speakers={pastSpeakers} />

      <PartnersTwo
        partnerData={null}
        loading={false}
        title={partners.title}
        partners={partners.press}
        bg={"bg-white"}
      />

      <ImageGallerySlider 
        leftImages={imageGallery.leftImages}
        rightImage={imageGallery.rightImage}
        arrowColor={imageGallery.arrowColor}
      />

      <CommunityTrust 
        firstHeadingPart={communityTrust.firstHeadingPart}
        secondHeadingPart={communityTrust.secondHeadingPart}
        description={communityTrust.description}
        socialPosts={posts}
        formSection={communityTrust.formSection}
        backgroundColor={communityTrust.backgroundColor}
      />

    </div>
  );
};

export default Page;

