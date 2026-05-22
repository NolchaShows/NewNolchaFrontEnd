"use client";
import React, { useEffect, useRef, useState } from "react";
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
    showControls = false,
    isSticky = false,
    autoPlay = undefined,
    muted = undefined,
    loop = undefined,
    showSoundToggle = true,
    /** "fullscreen" = edge-to-edge hero; "contained" = inset video (e.g. experience detail) */
    variant = "fullscreen",
    /** Paused until user taps play; starts unmuted on play */
    clickToPlay = false,
}) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const safeSrc = videoSrc || "";
    const shouldAutoPlay = clickToPlay
        ? false
        : typeof autoPlay === "boolean"
          ? autoPlay
          : !showControls;
    const shouldMute = showSoundToggle
        ? isMuted
        : clickToPlay
          ? typeof muted === "boolean"
            ? muted
            : false
          : typeof muted === "boolean"
            ? muted
            : !showControls;
    const shouldLoop = typeof loop === "boolean" ? loop : !showControls;

    useEffect(() => {
        if (!clickToPlay) return;
        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => {
            if (showSoundToggle) return;
            video.muted = false;
            setIsMuted(false);
        };

        video.addEventListener("play", onPlay);
        return () => video.removeEventListener("play", onPlay);
    }, [clickToPlay, showSoundToggle, safeSrc]);

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
                <video
                        ref={videoRef}
                        key={safeSrc}
                        className="w-full h-full object-cover"
                        src={safeSrc}
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
                {/* Dark overlay for better text readability */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                ></div>

                {showSoundToggle ? (
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
