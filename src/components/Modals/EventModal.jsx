"use client"
import React from 'react'
import EventCard from '../upcoming/EventCard'
import MediaCarousel from '../experiences/MediaCarousel'
import ImageCarousel from '../experiences/ImageCarousel'
import ImageStack from '../upcoming/ImageStack'
import { RxCross2 } from "react-icons/rx";


const EventModal = ({ setIsUpcomingModalOpen }) => {
    const posts = [
        "/experiences/jack/posts/1.png",
        "/experiences/jack/posts/2.png",
        "/experiences/jack/posts/3.png",
        "/experiences/jack/posts/4.png",
        "/experiences/jack/posts/5.png"
    ]
    const media = [
        "/experiences/jack/videos/2.mp4",
    ]
    const images = [
        "/upcoming/4.png",
        "/upcoming/5.png",
        "/upcoming/6.png",
        "/upcoming/7.png",
    ]
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#EBE2D7] rounded-2xl max-w-5xl w-full max-h-[90vh] relative shadow-lg overflow-hidden flex flex-col">
                <button
                    onClick={() => setIsUpcomingModalOpen(false)}
                    className="absolute right-7 top-3 text-gray-600 hover:text-gray-800 text-xl z-10 bg-white bg-opacity-80 cursor-pointer hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                    aria-label="Close modal"
                >
                    <RxCross2 />
                </button>

                <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className='py-6'>
                        <EventCard />
                    </div>
                    <MediaCarousel items={media} />
                    <div className='py-8 mt-5 bg-[#F4F4F4] max-w-4xl mx-auto'>
                        <ImageCarousel posts={posts} />
                    </div>
                    <div className='py-8 mt-5 bg-white max-w-4xl mx-auto'>
                        <ImageStack images={images} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventModal