"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

function GalleryFilters() {
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedEventType, setSelectedEventType] = useState("Event type");
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [searchValue, setSearchValue] = useState("");

  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const years = ["2025", "2024", "2023", "2022"];
  const eventTypes = ["Conference", "Workshop", "Seminar", "Exhibition"];
  const locations = ["New York", "Los Angeles", "Chicago", "Miami"];

  const handleClearAll = () => {
    setSelectedYear("Year");
    setSelectedEventType("Event type");
    setSelectedLocation("Location");
    setSearchValue("");
    setIsYearOpen(false);
    setIsEventTypeOpen(false);
    setIsLocationOpen(false);
  };

  return (
    <div className="max-w-screen flex relative flex-col gap-6 justify-center items-start self-stretch md:px-10 lg:px-20 py-10 max-md:px-6 max-sm:px-4">
      <div className="flex relative gap-6 items-center self-stretch max-md:flex-col max-md:gap-4 max-sm:gap-3">
        {/* Search Input */}
        <div className="flex relative gap-1 items-center py-5 pr-3 pl-3.5 rounded-[4px] border border-solid border-neutral-300 w-1/3 max-md:w-full max-sm:gap-3 max-sm:px-3 max-sm:py-4">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="overflow-hidden relative text-xl  2xl:text-2xl  tracking-tight leading-7 text-black flex-[1_0_0] bg-transparent outline-none placeholder:text-black max-sm:text-lg"
          />
          <div>
            <Search className="w-6 h-6 text-[#003233]" />
          </div>
        </div>

        {/* Filter Dropdowns Container */}
        <div className="flex gap-6 w-2/3 max-md:flex-col max-md:w-full max-md:gap-4 max-sm:gap-3">
          {/* Year Dropdown */}
          <div className="relative w-2/7 max-md:w-full min-w-0">
            <div
              className="flex relative gap-1 items-center px-3 py-5 2xl:px-6 rounded-[4px] border border-solid bg-zinc-100 border-neutral-300 w-full max-sm:gap-3 max-sm:px-3 max-sm:py-4 cursor-pointer"
              onClick={() => setIsYearOpen(!isYearOpen)}
            >
              <div className="overflow-hidden relative text-xl 2xl:text-2xl tracking-tight leading-7 text-black flex-[1_0_0] text-ellipsis max-sm:text-lg">
                {selectedYear}
              </div>
              <div className="flex relative gap-2.5 justify-center items-center p-1 w-6 h-6 rounded border border-solid aspect-[1/1] border-teal-950">
                <ChevronDown className="w-3.5 h-3.5 text-[#003233]" />
              </div>
            </div>
            {isYearOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-[4px] shadow-lg z-10">
                {years.map((year) => (
                  <div
                    key={year}
                    className="px-3 py-3 text-xl tracking-tight 2xl:text-2xl  leading-7 text-black cursor-pointer hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl max-sm:text-lg"
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearOpen(false);
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Event Type Dropdown */}
          <div className="relative w-2/7 max-md:w-full min-w-0">
            <div
              className="flex relative gap-1 items-center px-3 py-5 rounded-[4px] border border-solid bg-zinc-100 border-neutral-300 w-full max-sm:gap-3 max-sm:px-3 max-sm:py-4 cursor-pointer"
              onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
            >
              <div className="overflow-hidden relative text-xl 2xl:text-2xl  tracking-tight leading-7 text-black flex-[1_0_0] text-ellipsis max-sm:text-lg">
                {selectedEventType}
              </div>
              <div className="flex relative gap-2.5 justify-center items-center p-1 w-6 h-6 rounded border border-solid aspect-[1/1] border-teal-950">
                <ChevronDown className="w-3.5 h-3.5 text-[#003233]" />
              </div>
            </div>
            {isEventTypeOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-[4px] shadow-lg z-10">
                {eventTypes.map((type) => (
                  <div
                    key={type}
                    className="px-3 py-3 text-xl 2xl:text-2xl  tracking-tight leading-7 text-black cursor-pointer hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl max-sm:text-lg"
                    onClick={() => {
                      setSelectedEventType(type);
                      setIsEventTypeOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative w-2/7 max-md:w-full min-w-0">
            <div
              className="flex relative gap-1 items-center px-3 py-5 rounded-[4px] border border-solid bg-zinc-100 border-neutral-300 w-full max-sm:gap-3 max-sm:px-3 max-sm:py-4 cursor-pointer"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <div className="overflow-hidden relative text-xl 2xl:text-2xl  tracking-tight leading-7 text-black flex-[1_0_0] text-ellipsis max-sm:text-lg">
                {selectedLocation}
              </div>
              <div className="flex relative gap-2.5 justify-center items-center p-1 w-6 h-6 rounded border border-solid aspect-[1/1] border-teal-950">
                <ChevronDown className="w-3.5 h-3.5 text-[#003233]" />
              </div>
            </div>
            {isLocationOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-[4px] shadow-lg z-10">
                {locations.map((location) => (
                  <div
                    key={location}
                    className="px-3 py-3 text-xl 2xl:text-2xl  tracking-tight leading-7 text-black cursor-pointer hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl max-sm:text-lg"
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationOpen(false);
                    }}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear All Button */}
          <button
            className="relative text-xl 2xl:text-3xl tracking-tight leading-7 text-black whitespace-nowrap w-1/7 max-md:w-full max-md:text-right cursor-pointer hover:underline max-sm:text-lg"
            onClick={handleClearAll}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryFilters;
