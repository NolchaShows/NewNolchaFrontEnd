"use client";

import React from "react";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import Partners from "@/components/home/Partners";
import WhiteLabelCtaSection from "@/components/white-label/WhiteLabelCtaSection";
import WhiteLabelInfrastructureSection from "@/components/white-label/WhiteLabelInfrastructureSection";
import WhiteLabelIntroSection from "@/components/white-label/WhiteLabelIntroSection";
import { useWhiteLabelPageData } from "@/utils/whiteLabelPageUtils";

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

export default function WhiteLabelPage() {
  const { whiteLabelData, loading } = useWhiteLabelPageData();
  const {
    heroSection,
    introSection,
    infrastructureSection,
    partnerSection,
    ctaSection,
  } = whiteLabelData;

  return (
    <div className="bg-[var(--surface-color2)]">
      <VideoHeroSection
        videoSrc={heroSection.videoSrc}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
        firstPart={heroSection.firstPart}
        secondPart={heroSection.secondPart}
        strokeColor={heroSection.strokeColor}
        fillColor={heroSection.fillColor}
        textColor={heroSection.textColor}
        size="large"
        overlayOpacity={heroSection.overlayOpacity}
        isGoogleDrive={heroSection.isGoogleDrive}
      />
      <WhiteLabelIntroSection introSection={introSection} />
      <WhiteLabelInfrastructureSection sectionData={infrastructureSection} />
      <div className="relative z-10">
        <Partners
          partnerData={partnerSection}
          loading={loading}
          title="Selected by global brands, protocols, and institutions to design high-impact industry experiences."
          description="From cutting-edge tech startups and rapidly expanding businesses to impactful charities"
          partners={partners}
          bg="bg-black"
          logo={null}
        />
      </div>
      <WhiteLabelCtaSection sectionData={ctaSection} />
    </div>
  );
}