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
    /** "fullscreen" = edge-to-edge hero; "contained" = inset video (e.g. experience detail) */
    variant = "fullscreen",
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

    const soundToggleBottomClass =
        variant === "contained"
            ? "bottom-[max(0.75rem,calc(0.375rem+env(safe-area-inset-bottom)))] sm:bottom-[max(1.25rem,calc(0.75rem+env(safe-area-inset-bottom)))] md:bottom-[max(1.5rem,calc(1rem+env(safe-area-inset-bottom)))] lg:bottom-[calc(5rem+env(safe-area-inset-bottom))]"
            : showControls
              ? "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] sm:bottom-[calc(8rem+env(safe-area-inset-bottom))] md:bottom-[calc(8.5rem+env(safe-area-inset-bottom))] lg:bottom-[calc(6rem+env(safe-area-inset-bottom))]"
              : "bottom-[max(5rem,calc(4rem+env(safe-area-inset-bottom)))] sm:bottom-24 md:bottom-28 lg:bottom-16";

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
                        className={[
                            "absolute z-20 flex shrink-0 items-center justify-center",
                            "touch-manipulation transition-opacity hover:opacity-80 active:opacity-70",
                            "right-[max(2.75rem,calc(1.75rem+env(safe-area-inset-right)))] sm:right-14 md:right-16 lg:right-20",
                            soundToggleBottomClass,
                        ].join(" ")}
                        style={{
                            minHeight: "clamp(2.75rem, 8vw, 3.5rem)",
                            minWidth: "clamp(2.75rem, 8vw, 3.5rem)",
                        }}
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
                            sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 194px"
                            className="h-auto w-[clamp(5rem,20vw,12.125rem)] object-contain object-right"
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
