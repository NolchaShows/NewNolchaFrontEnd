import React, { useState, useEffect } from 'react';
import { DeckCard } from './Home/Card';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 2,
    minutes: 40,
    seconds: 8
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  // Split time into individual digits for the countdown display
  const getTimeDigits = () => {
    const hoursStr = formatTime(timeLeft.hours);
    const minutesStr = formatTime(timeLeft.minutes);
    const secondsStr = formatTime(timeLeft.seconds);

    return {
      hours: [hoursStr[0], hoursStr[1]],
      minutes: [minutesStr[0], minutesStr[1]],
      seconds: [secondsStr[0], secondsStr[1]]
    };
  };

  const timeDigits = getTimeDigits();

  return (
    <div className="p-4 lg:p-6 min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Top Row - Cards */}
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

        {/* Bottom - Event Countdown */}
        <div
          className="relative bg-cover bg-center rounded-xl overflow-hidden h-150"
          style={{ backgroundImage: "url('/dashboard/home/event.png')" }}
        >
          <div className="absolute inset-0 bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
            <h2 className="text-4xl font-bold mb-2">EVENT COUNTDOWN</h2>
            <p className="text-lg mb-8 text-center max-w-2xl">
              Don't miss out — the countdown is on!<br />
              Join us when the timer hits zero and be part of something exciting.
            </p>
            <div className="flex gap-4 items-center">
              {/* Hours */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.hours[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.hours[1]}</div>
              </div>
              <div className="text-3xl font-bold">:</div>

              {/* Minutes */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.minutes[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.minutes[1]}</div>
              </div>
              <div className="text-3xl font-bold">:</div>

              {/* Seconds */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.seconds[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 min-w-[80px] text-center">
                <div className="text-3xl font-bold">{timeDigits.seconds[1]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden mt-10">
        {/* Event Countdown - Mobile */}
        <div
          className="relative bg-cover bg-center rounded-xl overflow-hidden h-100 mb-6"
          style={{ backgroundImage: "url('/dashboard/home/event.png')" }}
        >
          <div className="absolute inset-0 bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
            <h2 className="text-xl font-bold mb-2">EVENT COUNTDOWN</h2>
            <p className="text-sm mb-6 text-center">
              Don't miss out — the countdown is on!<br />
              Join us when the timer hits zero and be part of something exciting.
            </p>
            <div className="flex gap-1 items-center">
              {/* Hours */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.hours[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.hours[1]}</div>
              </div>
              <div className="text-lg font-bold px-1">:</div>

              {/* Minutes */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.minutes[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.minutes[1]}</div>
              </div>
              <div className="text-lg font-bold px-1">:</div>

              {/* Seconds */}
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.seconds[0]}</div>
              </div>
              <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 min-w-[40px] text-center">
                <div className="text-lg font-bold">{timeDigits.seconds[1]}</div>
              </div>
            </div>
          </div>
        </div>
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