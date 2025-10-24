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
    children,
    isGoogleDrive = false
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

    const embedUrl = isGoogleDrive || videoSrc.includes('drive.google.com') 
        ? getGoogleDriveEmbedUrl(videoSrc) 
        : videoSrc;
    
    const isGoogleDriveVideo = embedUrl.includes('drive.google.com');
    return (
        <div className={`relative w-full overflow-hidden h-[300px] lg:h-[725px] 2xl:h-[1288px] ${className}`} >
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
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ minWidth: "100%", minHeight: "100%" }}
                    >
                        <source
                            src={videoSrc}
                            type="video/mp4"
                        />
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
            <div className="relative z-10 flex items-center justify-center h-full px-6">
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
