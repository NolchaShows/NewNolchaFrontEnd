import React from 'react'
import Direction from './Events/Direction'
import Countdown from './Home/Countdown'
import SpeakersLineup from './Events/Speakers'

const Event = ({ title }) => {
    const speakers = [
        {
            id: 1,
            name: "Jane Doe",
            title: "CEO at AI Future",
            time: "11:00",
            topic: "AI in 21st century",
            image: "/dashboard/events/10.png"
        },
        {
            id: 2,
            name: "Jane Doe",
            title: "CEO at AI Future",
            time: "11:00",
            topic: "AI in 21st century",
            image: "/dashboard/events/11.png"
        },
        {
            id: 3,
            name: "Jane Doe",
            title: "CEO at AI Future",
            time: "11:00",
            topic: "AI in 21st century",
            image: "/dashboard/events/12.png"
        },
        {
            id: 4,
            name: "Jane Doe",
            title: "CEO at AI Future",
            time: "11:00",
            topic: "AI in 21st century",
            image: "/dashboard/events/13.png"
        },
        {
            id: 5,
            name: "Jane Doe",
            title: "CEO at AI Future",
            time: "11:00",
            topic: "AI in 21st century",
            image: "/dashboard/events/14.png"
        }
    ];

    return (
        <div className="p-4 2xl:p-8 min-h-screen">
            <div className="flex items-center gap-2 2xl:gap-4 mb-6 2xl:mb-10">
                <img
                    src="/dashboard/opt_2.png"
                    alt="Calendar"
                    className="w-5 h-5 2xl:w-7 2xl:h-7"
                />
                <h1 className="font-semibold text-gray-800 2xl:text-xl">Event Details</h1>
                <span className="text-gray-400 2xl:text-lg">/</span>
                <h1 className="font-semibold text-gray-800 2xl:text-xl">{title}</h1>
            </div>

            <div className="lg:flex lg:gap-6 2xl:gap-12">
                <div className="lg:w-1/2 space-y-6 2xl:space-y-10">
                    <Direction />
                    <Countdown isButton={true}/>
                </div>

                <div className="lg:w-1/2 mt-6 lg:min-h-screen lg:mt-0 2xl:mt-0">
                    <SpeakersLineup speakers={speakers} />
                </div>
            </div>
        </div>
    );
}

export default Event