import Hero from '@/components/press/Hero'
import React from 'react'
import EventSlider from "@/components/gallery/EventSlider"

const Gallery = () => {
    const images = [
        "/gallery/2.png",
        "/gallery/3.png",
        "/gallery/4.png",
        "/gallery/5.png",
        "/gallery/6.png",
    ]
    return (
        <div className='bg-white'>
            <Hero heading='Gallery' images={["/gallery/1.png"]} />

            <div className="w-full px-4 mt-10">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    {/* Search Box */}
                    <div className="flex items-center border border-gray-300 ml-0 md:ml-10 px-3 py-2 2xl:px-6 2xl:py-4 2xl:text-xl bg-white w-full md:flex-[1.5]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none text-gray-700"
                        />
                        <span className="text-gray-500">🔍</span>
                    </div>
                    {/* Year Dropdown */}
                    <select className="border border-gray-300 px-3 py-2 2xl:px-6 2xl:py-4 2xl:text-xl bg-gray-100 flex-[0.7]">
                        <option>Year</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>

                    {/* Event Type Dropdown */}
                    <select className="border border-gray-300 px-3 py-2 2xl:px-6 2xl:py-4 2xl:text-xl bg-gray-100 flex-[0.7]">
                        <option>Event type</option>
                        <option>Conference</option>
                        <option>Workshop</option>
                        <option>Webinar</option>
                    </select>

                    {/* Location Dropdown */}
                    <select className="border border-gray-300 px-3 py-2 2xl:px-6 2xl:py-4 2xl:text-xl bg-gray-100 flex-[0.7]">
                        <option>Location</option>
                        <option>USA</option>
                        <option>Europe</option>
                        <option>Asia</option>
                    </select>

                    {/* Clear All */}
                    <button className="text-gray-500 hover:text-black text-sm 2xl:text-xl md:ml-2">
                        Clear all
                    </button>
                </div>
            </div>

            <EventSlider eventName='CONCENSUS 2025' images={images} />
        </div>
    )
}

export default Gallery