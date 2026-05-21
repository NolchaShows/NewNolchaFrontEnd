"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import StyledHeading from "./StyledHeading";

const VideoHeroSection = ({
    videoSrc,
    poster = undefined,
    preload = "metadata",
    firstPart = "SHAO",
    secondPart = "NYFW",
    strokeColor = "#000000",
    fillColor = "#FEF991",
    textColor = "#FFFFFF",
    size = "large",
    overlayOpacity = 20,
    className = "",
    children = null,
    isGoogleDrive = false,
    showControls = false,
    isSticky = false,
    autoPlay = undefined,
    muted = undefined,
    loop = undefined,
    showSoundToggle = true,
}) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    // Helper function to convert Google Drive link to embed URL
    const getGoogleDriveEmbedUrl = (url) => {
        // Check if it's a Google Drive link
        if (url.includes('drive.google.com')) {
            // Extract file ID from various Google Drive URL formats
            let fileId = '';
            
            // Format: https://drive.google.com/file/d/FILE_ID/view
            if (url.includes('/file/d/')) {
                fileId = url.split('/file/d/')[1].split('/')[0];
            }
            // Format: https://drive.google.com/open?id=FILE_ID
            else if (url.includes('open?id=')) {
                fileId = url.split('open?id=')[1].split('&')[0];
            }
            
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return url;
    };

    const safeSrc = videoSrc || "";
    const embedUrl = isGoogleDrive || safeSrc.includes("drive.google.com")
        ? getGoogleDriveEmbedUrl(safeSrc)
        : safeSrc;
    
    const isGoogleDriveVideo = embedUrl.includes('drive.google.com');
    const shouldAutoPlay = typeof autoPlay === "boolean" ? autoPlay : !showControls;
    const shouldMute = showSoundToggle
        ? isMuted
        : typeof muted === "boolean"
          ? muted
          : !showControls;
    const shouldLoop = typeof loop === "boolean" ? loop : !showControls;

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        const nextMuted = !isMuted;
        video.muted = nextMuted;
        setIsMuted(nextMuted);
        if (!nextMuted) {
            video.play().catch(() => {});
        }
    };

  return (
    <div
      className={[
        "relative w-full overflow-hidden bg-black",
        isSticky ? "sticky top-0 z-0" : "",
        className || "h-screen"
      ].join(" ")}
    >
            {/* Video Background */}
            <div className="absolute inset-0 z-0 bg-black">
                {isGoogleDriveVideo ? (
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        style={{ minWidth: "100%", minHeight: "100%" }}
                        allow="autoplay"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <video
                        ref={videoRef}
                        key={embedUrl}
                        className="w-full h-full object-cover"
                        src={embedUrl}
                        poster={poster}
                        autoPlay={shouldAutoPlay}
                        muted={shouldMute}
                        loop={shouldLoop}
                        controls={showControls}
                        playsInline
                        preload={preload}
                        fetchPriority="high"
                        style={{ minWidth: "100%", minHeight: "100%" }}
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
                {/* Dark overlay for better text readability */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                ></div>

                {showSoundToggle && !isGoogleDriveVideo ? (
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="absolute bottom-14 right-10 z-20 transition-opacity hover:opacity-80 sm:bottom-16 sm:right-12 lg:bottom-20 lg:right-14"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        <Image
                            src={
                                isMuted
                                    ? "/icons/sound-off-icon.svg"
                                    : "/icons/sound-on-icon.svg"
                            }
                            alt=""
                            width={194}
                            height={39}
                            className="h-7 w-auto sm:h-8 lg:h-9"
                            priority
                        />
                    </button>
                ) : null}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full page-container pointer-events-none">
                <div className="text-center text-white pointer-events-auto">
                    {/* Main Heading */}
                    <StyledHeading
                        firstPart={firstPart}
                        secondPart={secondPart}
                        strokeColor={strokeColor}
                        fillColor={fillColor}
                        textColor={textColor}
                        size={size}
                    />
                    
                    {/* Additional content */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default VideoHeroSection;
