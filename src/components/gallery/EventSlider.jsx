"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventSlider = ({ eventName = "CONCENSUS 2025", images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const eventImages = images.length > 0 ? images : defaultImages;
    const maxIndex = Math.max(0, Math.ceil(eventImages.length / 5) - 1);

    const nextSlide = () => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    return (
        <div className="w-full bg-[#EBE2D7] py-8 px-4 mt-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
                    FEATURED EVENTS
                </h2>

                <div className="hidden md:block relative">
                    <div className="overflow-hidden">
                        <div
                            className="transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(eventImages.length / 5) }).map((_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0" style={{ float: 'left', width: '100%' }}>
                                    <div className="flex justify-center gap-6 mb-6">
                                        {eventImages.slice(slideIndex * 5, slideIndex * 5 + 3).map((image, index) => (
                                            <div key={slideIndex * 5 + index} className="flex-shrink-0 w-64 md:w-72 lg:w-80 xl:w-96">
                                                <div className="relative">
                                                    <img
                                                        src={image}
                                                        alt={`${eventName} ${slideIndex * 5 + index + 1}`}
                                                        className="w-full h-100 object-cover rounded-lg shadow-lg"
                                                    />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700 mt-3 text-center">
                                                    {eventName}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {eventImages.slice(slideIndex * 5 + 3, slideIndex * 5 + 5).length > 0 && (
                                        <div className="flex justify-center gap-6">
                                            {eventImages.slice(slideIndex * 5 + 3, slideIndex * 5 + 5).map((image, index) => (
                                                <div key={slideIndex * 5 + 3 + index} className="flex-shrink-0 w-64 md:w-72 lg:w-80 xl:w-96">
                                                    <div className="relative">
                                                        <img
                                                            src={image}
                                                            alt={`${eventName} ${slideIndex * 5 + 3 + index + 1}`}
                                                            className="w-full h-100 object-cover rounded-lg shadow-lg"
                                                        />
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-700 mt-3 text-center">
                                                        {eventName}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className='cursor-pointer z-10 hover:opacity-80 transition-opacity'
                        >
                            <img
                                src="/gallery/left.svg"
                                alt="Previous"
                                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                            />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            className='cursor-pointer z-10 hover:opacity-80 transition-opacity'
                        >
                            <img
                                src="/gallery/right.svg"
                                alt="Next"
                                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                            />
                        </button>
                    </div>
                </div>

                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex flex-col gap-4 transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateY(-${currentIndex * 20}%)` }}
                        >
                            {eventImages.slice(currentIndex, currentIndex + 5).map((image, index) => (
                                <div key={currentIndex + index} className="w-full">
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt={`${eventName} ${currentIndex + index + 1}`}
                                            className="w-full h-110 object-cover rounded-lg shadow-lg"
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 mt-2 text-left">
                                        {eventName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className='cursor-pointer z-10 hover:opacity-80 transition-opacity'
                        >
                            <img
                                src="/press/left.svg"
                                alt="Previous"
                                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                            />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            className='cursor-pointer z-10 hover:opacity-80 transition-opacity'
                        >
                            <img
                                src="/press/right.svg"
                                alt="Next"
                                className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventSlider;