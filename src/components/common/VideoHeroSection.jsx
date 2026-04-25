"use client";
import React from "react";
import StyledHeading from "./StyledHeading";

const VideoHeroSection = ({
    videoSrc,
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
    loop = undefined
}) => {
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
    const shouldMute = typeof muted === "boolean" ? muted : !showControls;
    const shouldLoop = typeof loop === "boolean" ? loop : !showControls;
  return (
    <div
      className={[
        "relative w-full overflow-hidden",
        isSticky ? "sticky top-0 z-0" : "",
        className || "h-screen"
      ].join(" ")}
    >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
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
                        key={embedUrl}
                        className="w-full h-full object-cover"
                        src={embedUrl}
                        autoPlay={shouldAutoPlay}
                        muted={shouldMute}
                        loop={shouldLoop}
                        controls={showControls}
                        playsInline
                        style={{ minWidth: "100%", minHeight: "100%" }}
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
                {/* Dark overlay for better text readability */}
                <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                ></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full page-container">
                <div className="text-center text-white">
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
