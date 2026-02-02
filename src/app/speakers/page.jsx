import PastSpeakers from "@/components/common/PastSpeakers";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import FashionGrid3x3 from "@/components/shao/FashionGrid3x3";
import React from "react";

function page() {

  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4";

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

  return (
    <div>
      <VideoHeroSection
        videoSrc={heroVideo}
        isSticky={true}
        className="-mt-[88px] 2xl:-mt-[120px]"
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
        <PastSpeakers speakers={pastSpeakers} />
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
      </div>
    </div>
  );
}

export default page;
