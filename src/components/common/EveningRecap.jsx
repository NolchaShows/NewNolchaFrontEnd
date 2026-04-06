"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StyledHeading from './StyledHeading';
import SectionTitle from './SectionTitle';

const EveningRecap = ({ year, title, videos = [], videoUrl, paddingTop, isGoogleDrive = false }) => {
    // Support both single video (backward compatibility) and multiple videos
    const videoList = videos && videos.length > 0 
        ? videos 
        : videoUrl 
            ? [{ url: videoUrl, isGoogleDrive: isGoogleDrive }]
            : [];

    const [currentIndex, setCurrentIndex] = useState(0);

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

    if (videoList.length === 0) {
        return null;
    }

    const currentVideo = videoList[currentIndex];
    const videoUrlToUse = typeof currentVideo === 'string' ? currentVideo : currentVideo.url;
    const isGoogleDriveForCurrent = typeof currentVideo === 'object' 
        ? (currentVideo.isGoogleDrive || videoUrlToUse.includes('drive.google.com'))
        : (isGoogleDrive || videoUrlToUse.includes('drive.google.com'));

    const embedUrl = isGoogleDriveForCurrent
        ? getGoogleDriveEmbedUrl(videoUrlToUse)
        : videoUrlToUse;

    const isGoogleDriveVideo = embedUrl.includes('drive.google.com');

    return (
        <div className="page-container-fluid bg-black">
            <SectionTitle className="text-white text-center">{title}</SectionTitle>
            
            {/* Video Container */}
            <div className="relative overflow-hidden mt-5 lg:mt-10 2xl:mt-15">
                <AnimatePresence mode="wait">
                    {isGoogleDriveVideo ? (
                        <motion.div
                            key={`iframe-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="w-full h-[400px] lg:h-[700px] 2xl:h-[1200px]"
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
                            className="w-full h-[400px] lg:h-[700px] 2xl:h-[1200px] object-cover"
                            controls
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </motion.video>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only show if multiple videos */}
            {videoList.length > 1 && (
                <div className="flex justify-center gap-3 lg:gap-4 2xl:gap-5 py-4 lg:py-6 2xl:py-8">
                    <button onClick={handlePrev} aria-label="Previous video">
                        <motion.img
                            src="/left.jpg"
                            className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px] rounded-[5px] lg:rounded-[10px] 2xl:rounded-[15px]"
                            whileTap={{ scale: 0.9 }}
                        />
                    </button>
                    <button onClick={handleNext} aria-label="Next video">
                        <motion.img
                            src="/right.jpg"
                            className="cursor-pointer w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] 2xl:h-[70px] 2xl:w-[70px] rounded-[5px] lg:rounded-[10px] 2xl:rounded-[15px]"
                            whileTap={{ scale: 0.9 }}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EveningRecap;

