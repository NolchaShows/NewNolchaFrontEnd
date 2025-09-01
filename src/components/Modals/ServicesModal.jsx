"use client"
import React from 'react'
import EventCard from '../upcoming/EventCard'
import MediaCarousel from '../experiences/MediaCarousel'
import { RxCross2 } from "react-icons/rx";
import Hero from '../services/Hero';
import Gallery from '../services/Gallery';


const ServicesModal = ({ setIsModalOpen, service }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#EBE2D7] rounded-2xl w-full max-w-none max-h-[90vh] m-10 relative shadow-lg overflow-hidden flex flex-col">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-7 top-3 text-gray-600 hover:text-gray-800 text-xl z-10 bg-white bg-opacity-80 cursor-pointer hover:bg-opacity-100 rounded-full w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center transition-all duration-200"
                    aria-label="Close modal"
                >
                    <RxCross2 />
                </button>

                <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className='py-10'>
                        <Hero {...service}/>
                    </div>
                    {
                        service.media && (
                            <MediaCarousel items={service.media} />
                        )
                    }
                    <div className='bg-white mb-10'>
                    <Gallery images={service.gallery}/>

                    </div>
                    {
                        service.media2 && (
                            <MediaCarousel items={service.media2} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ServicesModal