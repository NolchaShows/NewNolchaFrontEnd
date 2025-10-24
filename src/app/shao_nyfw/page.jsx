"use client";
import React from "react";
import { usePressPageData } from "@/utils/pressPageUtils";
import ThreeImageRow from "@/components/shao/ThreeImageRow";
import FashionGrid from "@/components/shao/FashionGrid";
import ImageTextSection from "@/components/shao/ImageTextSection";
import FashionGrid3x3 from "@/components/shao/FashionGrid3x3";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import EveningRecap from "@/components/common/EveningRecap";

function page() {
    const { pressData, loading, error } = usePressPageData();

    const eveningRecap = {
            year: "2024",
            title: "Watch the show",
            videoUrl: "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-middle-video.mov"
        }

    // Loading state
    if (loading) {
        return (
            <div className="w-full bg-white min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    const heroTitle = pressData?.heroTitle || "SHAO NYFW";
    // const heroVideo = pressData?.heroVideo || "https://drive.google.com/file/d/1KX65sLE6oBoFl-bT-TiQ5MqHxG7uIdaw/view?usp=sharing";

    const heroVideo = "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4"; // Updated URL without spaces


    return (
        <div>
            <VideoHeroSection
                videoSrc={heroVideo}
                firstPart="SHAO"
                secondPart="NYFW"
                strokeColor="#000000"
                fillColor="#FEF991"
                textColor="#FFFFFF"
                size="large"
                overlayOpacity={20}
                isGoogleDrive={false}
            />
            <ThreeImageRow
                images={["/shao_nyfw/image 1.jpg", "/shao_nyfw/image 2.jpg", "/shao_nyfw/image 3.jpg"]}
                line1="360 Projection"
                line2="Mapped Venue"
                background="#FEF991"
            />

            <FashionGrid
                leftVideo="https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/backstage-to-front-left.mp4"
                rightVideo="https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/backstage-to-front-right.mp4"
                images={[
                    "/shao_nyfw/Frame 1.jpg",
                    "/shao_nyfw/Frame 2.jpg",
                    "/shao_nyfw/Frame 3.jpg",
                    "/shao_nyfw/Frame 4.jpg",
                    "/shao_nyfw/Frame 5.jpg"
                ]}
                background="#FEF991"
            />

            <ImageTextSection
                image="/shao_nyfw/models_backstage.png"
                title="Beyond The Runway Nolcha X Shao New York"
                paragraphs={[
                    "This season, we went **beyond the traditional runway** — bringing our 15-year legacy of **immersive production** and **crypto-culture storytelling** into the fashion world.",
                    "At Artechouse New York, an interactive art museum in Chelsea, we produced Shao New York's Spring/Summer 2026 runway show, \"Futures of the Past: Chrome Legacy.\""
                ]}
                background="#FEF991"
            />

            <EveningRecap
                year={eveningRecap.year}
                title={eveningRecap.title}
                videoUrl={eveningRecap.videoUrl}
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
        </div>
    );
}

export default page;
