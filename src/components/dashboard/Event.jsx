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
        <div className="p-4 min-h-screen">
            <div className="flex items-center gap-2 mb-6">
                <img
                    src="/dashboard/opt_2.png"
                    alt="Calendar"
                    className="w-5 h-5"
                />
                <h1 className="font-semibold text-gray-800">Event Details</h1>
                <span className="text-gray-400">/</span>
                <h1 className="font-semibold text-gray-800">{title}</h1>
            </div>

            <div className="lg:flex lg:gap-6">
                <div className="lg:w-1/2 space-y-6">
                    <Direction />
                    <Countdown isButton={true}/>
                </div>

                <div className="lg:w-1/2 mt-6 lg:min-h-screen lg:mt-0">
                    <SpeakersLineup speakers={speakers} />
                </div>
            </div>
        </div>
    );
}

export default Event