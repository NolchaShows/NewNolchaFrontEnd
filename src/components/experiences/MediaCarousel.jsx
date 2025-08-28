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
                        className="bg-[#E7F0D3] cursor-pointer flex items-center justify-center hover:bg-[#e0e0e0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                        style={{
                            width: 'clamp(40px, 3.5vw, 80px)',
                            height: 'clamp(40px, 3.5vw, 80px)'
                        }}
                        aria-label="Previous item"
                    >
                        <ChevronLeft 
                            className="text-gray-700" 
                            style={{
                                width: 'clamp(18px, 1.8vw, 36px)',
                                height: 'clamp(18px, 1.8vw, 36px)'
                            }}
                        />
                    </button>
                    <button
                        onClick={nextItem}
                        disabled={currentItemIndex + 1 >= items.length}
                        className="bg-[#E7F0D3] cursor-pointer flex items-center justify-center hover:bg-[#e0e0e0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                        style={{
                            width: 'clamp(40px, 3.5vw, 80px)',
                            height: 'clamp(40px, 3.5vw, 80px)'
                        }}
                        aria-label="Next item"
                    >
                        <ChevronRight 
                            className="text-gray-700"
                            style={{
                                width: 'clamp(18px, 1.8vw, 36px)',
                                height: 'clamp(18px, 1.8vw, 36px)'
                            }}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MediaCarousel;