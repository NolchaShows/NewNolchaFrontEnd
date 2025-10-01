"use client";
import React from "react";
import ImageCarousel from "../experiences/ImageCarousel";
import Gallery from "../experiences/Gallery";
import MediaCarousel from "../experiences/MediaCarousel";
import Hero from "../press/Hero";
import FloatingHost from "../experiences/FloatingHost";
import Partners from "../home/Partners";
import CardSlider from "../press/CardSlider";
import HostCard from "../experiences/HostCard";

const Experience = ({
  id,
  mainHeading,
  subHeading,
  conferenceImage,
  hostImage,
  hostName,
  hostDescription,
  buttonText = "PARTNER WITH US",
  videos,
  posts,
  galleryImages,
  partners: dynamicPartners,
  pressCards: dynamicPressCards,
  loading = false,
}) => {
  // Default partners data as fallback
  const defaultPartners = [
    {
      id: 1,
      imageWhite: "/experiences/partners/1w.png",
      imageBlack: "/experiences/partners/1b.png",
      altText: "Partner 1",
      backgroundColor: "bg-black",
    },
    {
      id: 2,
      imageWhite: "/experiences/partners/2w.png",
      imageBlack: "/experiences/partners/2b.png",
      altText: "Partner 2",
      backgroundColor: "bg-black",
    },
    {
      id: 3,
      imageWhite: "/experiences/partners/3w.png",
      imageBlack: "/experiences/partners/3b.png",
      altText: "Partner 3",
      backgroundColor: "bg-black",
    },
    {
      id: 4,
      imageWhite: "/experiences/partners/4w.png",
      imageBlack: "/experiences/partners/4b.png",
      altText: "Partner 4",
      backgroundColor: "bg-black",
    },
    {
      id: 5,
      imageWhite: "/experiences/partners/5w.png",
      imageBlack: "/experiences/partners/5b.png",
      altText: "Partner 5",
      backgroundColor: "bg-black",
    },
    {
      id: 6,
      imageWhite: "/experiences/partners/6w.png",
      imageBlack: "/experiences/partners/6b.png",
      altText: "Partner 6",
      backgroundColor: "bg-black",
    },
    {
      id: 7,
      imageWhite: "/experiences/partners/7w.png",
      imageBlack: "/experiences/partners/7b.png",
      altText: "Partner 7",
      backgroundColor: "bg-black",
    },
    {
      id: 8,
      imageWhite: "/experiences/partners/8w.png",
      imageBlack: "/experiences/partners/8b.png",
      altText: "Partner 8",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 9,
      imageWhite: "/experiences/partners/9w.png",
      imageBlack: "/experiences/partners/9b.png",
      altText: "Partner 9",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 10,
      imageWhite: "/experiences/partners/10w.png",
      imageBlack: "/experiences/partners/10b.png",
      altText: "Partner 10",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 11,
      imageWhite: "/experiences/partners/11w.png",
      imageBlack: "/experiences/partners/11b.png",
      altText: "Partner 11",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 12,
      imageWhite: "/experiences/partners/12w.png",
      imageBlack: "/experiences/partners/12b.png",
      altText: "Partner 12",
      backgroundColor: "bg-[#E7F0D3]",
    },
  ];

  // Default press cards data as fallback
  const defaultCards = [
    {
      id: 1,
      newsPaper: "/press/card/1n.png",
      image: "/press/card/1.png",
      title:
        "Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week",
      link: "#",
    },
    {
      id: 2,
      newsPaper: "/press/card/2n.png",
      image: "/press/card/2.png",
      title: "Another Article Title Here",
      link: "#",
    },
    {
      id: 3,
      newsPaper: "/press/card/3n.png",
      image: "/press/card/3.png",
      title: "Another Article Title Here",
      link: "#",
    },
  ];

  // Use dynamic data if available, otherwise fall back to defaults
  const partners = (dynamicPartners && dynamicPartners.length > 0) ? dynamicPartners : defaultPartners;
  const cards = (dynamicPressCards && dynamicPressCards.length > 0) ? dynamicPressCards : defaultCards;

  // Debug logging
  console.log('🎭 Experience component received props:', {
    id, mainHeading, subHeading, conferenceImage, hostImage, hostName, 
    videos: videos?.length, posts: posts?.length, galleryImages: galleryImages?.length,
    partners: partners?.length, pressCards: dynamicPressCards?.length
  });
  console.log('🤝 Partners array details:', partners);
  console.log('📄 Posts array details:', posts);
  console.log('🎯 Will render partners section?', partners && partners.length > 0);
  console.log('📄 Will render posts section?', posts && posts.length > 0);

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading experience...</div>
      </div>
    );
  }
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="py-8 px-4 ml-5">
        <h1 className="text-[32px] xl:text-[64px] 2xl:text-[72px] font-bold text-[#000000] mb-2">
          {mainHeading}
        </h1>
        <p className=" font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[#000000] text-[20px] md:text-[24px] 2xl:text-[36px] ">
          {subHeading}
        </p>
      </div>
      {conferenceImage && conferenceImage.length > 0 && (
        <img src={conferenceImage[0]} className="w-full" alt={mainHeading} />
      )}

      {/* New York Fashion Week Section */}

      <HostCard
        hostDescription={hostDescription}
        hostImage={hostImage}
        hostName={hostName}
        buttonText={buttonText}
      />

      {/* Host Section */}
      {/* <div className="mt-10">
        <FloatingHost
          hostDescription={hostDescription}
          hostImage={hostImage}
          hostName={hostName}
          buttonText={buttonText}
        />
      </div> */}

      {/* Render press section only for New York Fashion Week and if we have press cards */}
      {id === 5 && cards && cards.length > 0 && (
        <div>
          <p className="font-neue text-center font-bold text-[52px] 2xl:text-[70px]">
            Press
          </p>
          <div className="m-10">
            <CardSlider cards={cards} />
          </div>
        </div>
      )}
      
      {/* Render video section if not showing press section and we have videos */}
      {!(id === 5) && videos && videos.length > 0 && <MediaCarousel items={videos} />}
      
      {/* Show Posts section first if we have posts data */}
      {posts && posts.length > 0 && (
        <div className="bg-[#fdfdfd]">
          <ImageCarousel posts={posts} />
        </div>
      )}

      {/* Show Partners section if we have partners data */}
      {partners && partners.length > 0 && (
        <Partners
          logo={"/experiences/partners/logo.png"}
          description={"THE AI AGENT BASE LAYER"}
          partners={partners}
        />
      )}

      {/* Gallery Section - only render if we have gallery images */}
      {galleryImages && galleryImages.length > 0 && <Gallery images={galleryImages} />}
    </div>
  );
};
export default Experience;
