import React, { useState, useEffect } from 'react';
import { DeckCard } from './Home/Card';
import Countdown from './Home/Countdown';

const Home = () => {
  return (
    <div className="p-4 lg:p-6 min-h-screen">
      <div className="hidden lg:block">
        <div className="flex gap-6">
          <DeckCard title={"Deck Name"} image={"/dashboard/home/1.png"} />

          <DeckCard title={"Next Key Date"} image={"/dashboard/home/2.png"} />

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex-1 max-h-[255px] w-full sm:max-w-sm md:max-w-md lg:max-w-sm">
            <div className="flex items-center mb-4">
              <img width="20" height="20" src="/dashboard/home/task.png" className="mr-2" />
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Top 3 Upcoming Tasks</h3>
            </div>
            <div className="space-y-0.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 truncate pr-2">
                  Finalize Guest List — <span className="font-medium text-gray-900">July 5</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 truncate pr-2">
                  Confirm Venue Layout — <span className="font-medium text-gray-900">July 8</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 truncate pr-2">
                  Send Press Invites — <span className="font-medium text-gray-900">July 10</span>
                </span>
              </div>
              <button className="text-blue-600 text-xs sm:text-sm cursor-pointer font-medium flex items-center mt-3 hover:text-blue-800">
                View full calendar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-1">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-1 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-600 truncate pr-2">
                  Sponsor's secured: <span className="font-medium text-gray-900">12</span>
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 truncate pr-2">
                  Guests RSVP'd: <span className="font-medium text-gray-900">230</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Countdown/>
      </div>

      <div className="lg:hidden mt-10">
        <Countdown/>
        <div>
          <DeckCard title="Deck Name" image="/dashboard/home/1.png" />
          <DeckCard title="Next Key Date" image="/dashboard/home/2.png" />
          <div className="border border-[#D5D5D5] bg-[#FFFFFF] rounded-2xl p-6 flex-1 max-h-[250px]">
            <div className="flex items-center mb-4">
              <img width="20" height="20" src="/dashboard/home/task.png" className="mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Top 3 Upcoming Tasks</h3>
            </div>
            <div className="space-y-0.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Finalize Guest List — <span className="font-medium text-gray-900">July 5</span>
                </span>
              </div>
              <div className="flex justify-betwe3.pen">
                <span className="text-gray-600">
                  Confirm Venue Layout — <span className="font-medium text-gray-900">July 8</span>
                </span>            </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Send Press Invites — <span className="font-medium text-gray-900">July 10</span>
                </span>
              </div>
              <button className="text-blue-600 text-sm cursor-pointer font-medium flex items-center mt-3 hover:text-blue-800">
                View full calendar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-1">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-1 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  Sponsor's secured: <span className="font-medium text-gray-900">12</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Guests RSVP'd: <span className="font-bold text-gray-900">230</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;