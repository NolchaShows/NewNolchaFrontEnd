"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';
import ArrowNavButtons from './ArrowNavButtons';

const EveningRecap = ({ year, title, videos = [], videoUrl, paddingTop, isGoogleDrive = false }) => {
    // Support both single video (backward compatibility) and multiple videos
    const videoList = videos && videos.length > 0
        ? videos
        : videoUrl
            ? [{ url: videoUrl, isGoogleDrive: isGoogleDrive }]
            : [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

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

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
    };

    const handleNext = () => {
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
            handleNext();
        } else if (deltaX < -swipeThreshold) {
            handlePrev();
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
    const isGoogleDriveForCurrent = typeof currentVideo === 'object'
        ? (currentVideo.isGoogleDrive || videoUrlToUse.includes('drive.google.com'))
        : (isGoogleDrive || videoUrlToUse.includes('drive.google.com'));

    const embedUrl = isGoogleDriveForCurrent
        ? getGoogleDriveEmbedUrl(videoUrlToUse)
        : videoUrlToUse;

    const isGoogleDriveVideo = embedUrl.includes('drive.google.com');

    return (
        <div className="page-container-fluid bg-black pb-10 lg:pb-16 2xl:pb-20 xxl:pb-24">
            {displayTitle ? (
                <SectionTitle
                    key={`evening-title-${currentIndex}-${displayTitle}`}
                    className="text-white px-5 lg:px-0 text-left lg:text-center"
                >
                    {displayTitle}
                </SectionTitle>
            ) : null}

            {/* Video Container */}
            <div
                className={`relative overflow-hidden mb-6 lg:mb-8 2xl:mb-10 ${displayTitle ? "mt-5 lg:mt-10 2xl:mt-12 xxl:mt-15 3xl:mt-24" : "mt-0"}`}
                onTouchStartCapture={handleTouchStartCapture}
                onTouchEndCapture={handleTouchEndCapture}
            >
                <AnimatePresence mode="wait">
                    {isGoogleDriveVideo ? (
                        <motion.div
                            key={`iframe-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="w-full h-[400px] lg:h-[700px] 2xl:h-[900px] xxl:h-[1200px] 3xl:h-[1800px]"
                        >
                            <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                allow="autoplay"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    ) : (
                        <motion.video
                            key={`video-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            src={videoUrlToUse}
                            className="w-full h-[400px] lg:h-[700px] 2xl:h-[900px] xxl:h-[1200px] 3xl:h-[1800px] object-cover"
                            autoPlay
                            muted
                            controls
                            loop
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </motion.video>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only show if multiple videos */}
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

