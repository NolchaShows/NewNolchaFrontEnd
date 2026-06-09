"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import ArrowNavButtons from './ArrowNavButtons';

const EveningRecap = ({
    year,
    title,
    videos = [],
    videoUrl,
    paddingTop,
    showSoundToggle = true,
    tone = "dark",
}) => {
    const videoList = videos && videos.length > 0
        ? videos
        : videoUrl
            ? [{ url: videoUrl }]
            : [];

    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = isMuted;
        if (!isMuted) {
            video.play().catch(() => {});
        }
    }, [currentIndex, isMuted]);

    const shouldAutoplayFirst = currentIndex === 0 && !hasNavigated;

    const handlePrev = () => {
        setHasNavigated(true);
        setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setHasNavigated(true);
        setCurrentIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStartCapture = (e) => {
        if (videoList.length <= 1) return;
        setTouchStartX(e.touches[0]?.clientX ?? null);
    };

    const handleTouchEndCapture = (e) => {
        if (videoList.length <= 1 || touchStartX === null) return;

        const touchEndX = e.changedTouches[0]?.clientX ?? null;
        if (touchEndX === null) {
            setTouchStartX(null);
            return;
        }

        const deltaX = touchStartX - touchEndX;
        const swipeThreshold = 50;

        if (deltaX > swipeThreshold) {
            setHasNavigated(true);
            setCurrentIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
        } else if (deltaX < -swipeThreshold) {
            setHasNavigated(true);
            setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
        }

        setTouchStartX(null);
    };

    if (videoList.length === 0) {
        return null;
    }

    const currentVideo = videoList[currentIndex];
    const videoUrlToUse = typeof currentVideo === 'string' ? currentVideo : currentVideo.url;
    const slideTitle =
        typeof currentVideo === 'object' && currentVideo != null && typeof currentVideo.title === 'string'
            ? currentVideo.title.trim()
            : '';
    const displayTitle = slideTitle || title;

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

    const isLight = tone === "light";

    return (
        <div className={`page-container-fluid pb-10 lg:pb-16 2xl:pb-20 xxl:pb-24 ${isLight ? "bg-home-surface" : "bg-black"}`}>
            {displayTitle ? (
                <SectionTitle
                    key={`evening-title-${currentIndex}-${displayTitle}`}
                    tone={tone}
                    className="px-5 lg:px-0 text-left lg:text-center"
                >
                    {displayTitle}
                </SectionTitle>
            ) : null}

            <div
                className={`relative overflow-hidden mb-6 lg:mb-8 2xl:mb-10 ${displayTitle ? "mt-5 lg:mt-10 2xl:mt-12 xxl:mt-15 3xl:mt-24" : "mt-0"}`}
                onTouchStartCapture={handleTouchStartCapture}
                onTouchEndCapture={handleTouchEndCapture}
            >
                <video
                    ref={videoRef}
                    key={`video-${currentIndex}`}
                    src={videoUrlToUse}
                    className="w-full h-[400px] lg:h-[700px] 2xl:h-[900px] xxl:h-[1200px] 3xl:h-[1800px] object-cover animate-fadeIn"
                    autoPlay={shouldAutoplayFirst}
                    muted={isMuted}
                    controls
                    loop
                    playsInline
                    preload={shouldAutoplayFirst ? "auto" : "metadata"}
                >
                    Your browser does not support the video tag.
                </video>

                {showSoundToggle ? (
                    <button
                        type="button"
                        onClick={toggleMute}
                        className={[
                            "absolute z-20 flex shrink-0 items-center justify-center",
                            "touch-manipulation transition-opacity hover:opacity-80 active:opacity-70",
                            "right-[max(2.75rem,calc(1.75rem+env(safe-area-inset-right)))] sm:right-14 md:right-16 lg:right-20",
                            "bottom-[max(0.75rem,calc(0.375rem+env(safe-area-inset-bottom)))] sm:bottom-[max(1.25rem,calc(0.75rem+env(safe-area-inset-bottom)))] md:bottom-[max(1.5rem,calc(1rem+env(safe-area-inset-bottom)))] lg:bottom-[calc(6rem+env(safe-area-inset-bottom))]",
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
                        />
                    </button>
                ) : null}
            </div>

            {videoList.length > 1 && (
                <ArrowNavButtons
                    onLeft={handlePrev}
                    onRight={handleNext}
                    className="flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 xxl:gap-10"
                    centerButtons={true}
                />
            )}
        </div>
    );
};

export default EveningRecap;
