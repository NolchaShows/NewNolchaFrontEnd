import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState('lg');

    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth < 640) {
                setScreenSize('sm');
            } else if (window.innerWidth < 1024) {
                setScreenSize('md');
            } else {
                setScreenSize('lg'); 
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return screenSize;
};

const ImageCarousel = ({ posts }) => {
    const [currentPostIndex, setCurrentPostIndex] = useState(0);
    const screenSize = useScreenSize();

    const getPostsPerSlide = () => {
        switch (screenSize) {
            case 'sm': return 1;
            case 'md': return 2;
            case 'lg': return 3;
            default: return 3;
        }
    };

    const postsPerSlide = getPostsPerSlide();

    const nextPost = () => {
        if (currentPostIndex + postsPerSlide < posts.length) {
            setCurrentPostIndex((prev) => prev + postsPerSlide);
        }
    };

    const prevPost = () => {
        if (currentPostIndex - postsPerSlide >= 0) {
            setCurrentPostIndex((prev) => prev - postsPerSlide);
        }
    };

    return (
        <div className="px-4 md:px-8 mb-12 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-black">TRUSTED BY</h2>
                <div className="flex gap-2">
                    <button
                        onClick={prevPost}
                        disabled={currentPostIndex === 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous post"
                    >
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button
                        onClick={nextPost}
                        disabled={currentPostIndex + postsPerSlide >= posts.length}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next post"
                    >
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Slider wrapper */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${(currentPostIndex / postsPerSlide) * 100}%)`,
                    }}
                >
                    {posts.map((post, idx) => (
                        <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2">
                            <img
                                src={post}
                                alt={`Post ${idx + 1}`}
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
