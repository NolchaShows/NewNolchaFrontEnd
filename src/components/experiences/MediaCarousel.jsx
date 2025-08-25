import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MediaCarousel = ({ items }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const isVideo = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerUrl.includes(ext));
    };

    const nextItem = () => {
        if (currentItemIndex + 1 < items.length) {
            setCurrentItemIndex((prev) => prev + 1);
        }
    };

    const prevItem = () => {
        if (currentItemIndex - 1 >= 0) {
            setCurrentItemIndex((prev) => prev - 1);
        }
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="px-4 md:px-8 mb-12 overflow-hidden">

            <div className="relative overflow-hidden">
                <div className="w-full">
                    {isVideo(items[currentItemIndex]) ? (
                        <video
                            src={items[currentItemIndex]}
                            controls
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={items[currentItemIndex]}
                            alt={`Media ${currentItemIndex + 1}`}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    )}
                </div>
            </div>

            {items.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={prevItem}
                        disabled={currentItemIndex === 0}
                        className="w-10 h-10 bg-[#f0e4d3] cursor-pointer flex items-center justify-center hover:bg-[#e0e0e0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous item"
                    >
                        <ChevronLeft size={18} className="text-gray-700" />
                    </button>
                    <button
                        onClick={nextItem}
                        disabled={currentItemIndex + 1 >= items.length}
                        className="w-10 h-10 bg-[#f0e4d3] cursor-pointer flex items-center justify-center hover:bg-[#e0e0e0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next item"
                    >
                        <ChevronRight size={18} className="text-gray-700" />
                    </button>
                </div>
            )}

        </div>
    );
};

export default MediaCarousel;