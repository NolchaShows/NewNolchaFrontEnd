import React, { useState, useEffect } from "react";
import { DeckCard } from "./Home/Card";
import Countdown from "./Home/Countdown";

const Home = () => {
  return (
    <div className="p-4 lg:p-6 xl:p-8 2xl:p-12">
      <div className="hidden lg:block">
        <div
          className="flex gap-6 xl:gap-8 2xl:gap-12"
          style={{
            gap: "clamp(16px, 1.5vw, 48px)",
          }}
        >
          <div className="flex-1 min-w-0">
            <DeckCard title={"Deck Name"} image={"/dashboard/home/1.png"} />
          </div>

          <div className="flex-1 min-w-0">
            <DeckCard title={"Next Key Date"} image={"/dashboard/home/2.png"} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 xl:p-8 2xl:p-10 flex-1 max-h-[255px] xl:max-h-[320px] 2xl:max-h-[400px] w-full sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-lg 2xl:max-w-xl">
              <div className="flex items-center mb-4 xl:mb-6 2xl:mb-8">
                <img
                  width="20"
                  height="20"
                  src="/dashboard/home/task.png"
                  className="mr-2 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 2xl:mr-3"
                />
                <h3 className="text-base sm:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-800">
                  Top 3 Upcoming Tasks
                </h3>
              </div>
              <div className="space-y-0.5 xl:space-y-1 2xl:space-y-2 text-xs sm:text-sm xl:text-base 2xl:text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600 truncate pr-2">
                    Finalize Guest List —{" "}
                    <span className="font-medium text-gray-900">July 5</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 truncate pr-2">
                    Confirm Venue Layout —{" "}
                    <span className="font-medium text-gray-900">July 8</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 truncate pr-2">
                    Send Press Invites —{" "}
                    <span className="font-medium text-gray-900">July 10</span>
                  </span>
                </div>
                <button className="text-blue-600 text-xs sm:text-sm xl:text-base 2xl:text-lg cursor-pointer font-medium flex items-center mt-3 xl:mt-4 2xl:mt-6 hover:text-blue-800">
                  View full calendar
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-1 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-1 xl:mt-2 2xl:mt-4 pt-4 xl:pt-6 2xl:pt-8 border-t border-gray-100">
                <div className="flex justify-between text-xs sm:text-sm xl:text-base 2xl:text-lg mb-1 xl:mb-2 2xl:mb-3">
                  <span className="text-gray-600 truncate pr-2">
                    Sponsor's secured:{" "}
                    <span className="font-medium text-gray-900">12</span>
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm xl:text-base 2xl:text-lg">
                  <span className="text-gray-600 truncate pr-2">
                    Guests RSVP'd:{" "}
                    <span className="font-medium text-gray-900">230</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:mt-8 2xl:mt-12">
          <Countdown />
        </div>
      </div>

      <div className="lg:hidden mt-10">
        <Countdown />
        <div className="space-y-6">
          <DeckCard title="Deck Name" image="/dashboard/home/1.png" />
          <DeckCard title="Next Key Date" image="/dashboard/home/2.png" />
          <div className="border border-[#D5D5D5] bg-[#FFFFFF] rounded-2xl p-6 flex-1 max-h-[250px]">
            <div className="flex items-center mb-4">
              <img
                width="20"
                height="20"
                src="/dashboard/home/task.png"
                className="mr-2"
              />
              <h3 className="text-lg font-medium text-gray-800">
                Top 3 Upcoming Tasks
              </h3>
            </div>
            <div className="space-y-0.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Finalize Guest List —{" "}
                  <span className="font-medium text-gray-900">July 5</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Confirm Venue Layout —{" "}
                  <span className="font-medium text-gray-900">July 8</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Send Press Invites —{" "}
                  <span className="font-medium text-gray-900">July 10</span>
                </span>
              </div>
              <button className="text-blue-600 text-sm cursor-pointer font-medium flex items-center mt-3 hover:text-blue-800">
                View full calendar
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-1 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  Sponsor's secured:{" "}
                  <span className="font-medium text-gray-900">12</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Guests RSVP'd:{" "}
                  <span className="font-bold text-gray-900">230</span>
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
