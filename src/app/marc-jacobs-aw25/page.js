import React from "react";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";

const MarcJacobsAW25Page = () => {
  const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4";
  
  const metadata = [
    { label: "CLIENT", title: "MARC JACOBS" },
    { label: "YEAR", title: "2025" },
    { label: "TAGS", value: ["RUNWAY CAPTURE", "FASHION", "LUXURY"] },
    { 
      label: "THE CONTEXT", 
      title: "FOR THE FIFTH CONSECUTIVE SEASON",
      value: "MATTE brought a four-camera shoot to the library's storied Astor Hall, capturing dynamic coverage as 33 looks walked the length of a city block in Marc's signature sky high heels." 
    },
    { 
      label: "THE APPROACH", 
      title: "INSTANT TURNAROUND",
      value: "Overnight, we cut and color graded the show into a multicam edit and series of social videos for Marc and the brand to post next-day." 
    },
    { 
      label: "THE OUTCOME", 
      title: "VISUALIZING 'COURAGE'",
      value: "In under 24 hours, a live-action event is transformed into a digital experience for the brand's loyal following worldwide." 
    },
  ];

  const galleryItems = [
    { type: "image", url: "/shao_nyfw/image 21.png" },
    { type: "image", url: "/shao_nyfw/image 22.png" },
    { type: "image", url: "/shao_nyfw/image 23.png" },
    { type: "image", url: "/shao_nyfw/image 24.png" },
    { type: "image", url: "/shao_nyfw/image 25.png" },
    { type: "image", url: "/shao_nyfw/image 26.png" },
    { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
    { type: "image", url: "/shao_nyfw/image 27.png" },
    { type: "image", url: "/shao_nyfw/image 28.png" },
    { type: "image", url: "/shao_nyfw/image 21.png" },
    { type: "image", url: "/shao_nyfw/image 22.png" },
    { type: "image", url: "/shao_nyfw/image 23.png" },
    { type: "image", url: "/shao_nyfw/image 24.png" },
    { type: "video", url: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov" },
    { type: "image", url: "/shao_nyfw/image 25.png" },
    { type: "image", url: "/shao_nyfw/image 26.png" },
    { type: "image", url: "/shao_nyfw/image 27.png" },
    { type: "image", url: "/shao_nyfw/image 28.png" },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen" style={{ fontFamily: 'var(--font-rm-mono)' }}>
      {/* Hero Section */}
      <VideoHeroSection
        videoSrc={heroVideo}
        firstPart=""
        secondPart=""
        strokeColor="#000000"
        fillColor="#000000"
        textColor="#000000"
        size="large"
        overlayOpacity={0}
      />

      {/* Project Info Section */}
      <section className="px-6 py-12 lg:px-20 lg:py-24 max-w-[1400px]">
        <h1 
          className="text-5xl lg:text-[100px] mb-5 tracking-tight uppercase leading-none text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-helvetica)' }}
        >
          MARC JACOBS AW25
        </h1>
        
        <div className="flex flex-col gap-y-6">
          {metadata.map((item, index) => (
            <div key={index} className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-x-10 items-start">
              <span className="text-[16px] font-bold text-[#1d1d1d] uppercase" style={{ fontFamily: 'var(--font-rm-mono)' }}>
                {item.label}
              </span>
              <div className="flex flex-col gap-y-3">
                {Array.isArray(item.value) ? (
                  <div className="flex flex-wrap gap-3">
                    {item.value.map((tag, i) => (
                      <span key={i} className={`text-[12px] border border-black px-5 py-1.5 ${i !== 0 && 'rounded-full'}  uppercase`}  style={{ fontFamily: 'var(--font-rm-mono)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-1.5">
                    {item.title && (
                      <span className={`text-[15px] lg:text-[16px] font-bold ${item.value ? 'text-[#818181]' : 'text-[#1d1d1d]'} uppercase tracking-widest`}  style={{ fontFamily: 'var(--font-rm-mono)' }}>
                        {item.title}
                      </span>
                    )}
                    <p className="text-[15px] lg:text-[16px] text-[#4a4a4a] max-w-[900px]"  style={{ fontFamily: 'var(--font-schibsted-grotesk)' }}>
                      {item.value}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Gallery Grid */}
      <MediaGalleryGrid items={galleryItems} background="#F3F3F3" />
    </div>
  );
};

export default MarcJacobsAW25Page;
