import React from "react";

const Countdown = ({ isButton }) => {
    const [timeLeft, setTimeLeft] = React.useState({
        hours: 2,
        minutes: 40,
        seconds: 8
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => time.toString().padStart(2, '0');

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
        <div className="max-w-screen mx-auto lg:mx-0">
            <div
                className="relative bg-cover bg-center rounded-xl overflow-hidden"
                style={{
                    backgroundImage: "url('/dashboard/home/event.png')",
                    minHeight: '300px'
                }}
            >
                <div className="absolute inset-0 bg-opacity-40"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 min-h-[300px] lg:h-[400px] 2xl:h-[600px]">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center">EVENT COUNTDOWN</h2>
                    <p className="text-xs sm:text-sm md:text-base mb-6 text-center max-w-xs sm:max-w-sm md:max-w-md">
                        Don't miss out — the countdown is on!<br />
                        Join us when the timer hits zero and be part of something exciting.
                    </p>

                    <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.hours[0]}</div>
                        </div>
                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.hours[1]}</div>
                        </div>

                        <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold px-1">:</div>

                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.minutes[0]}</div>
                        </div>
                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.minutes[1]}</div>
                        </div>

                        <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold px-1">:</div>

                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.seconds[0]}</div>
                        </div>
                        <div className="bg-[#EBE2D7] bg-opacity-20 backdrop-blur-sm rounded-lg p-1 sm:p-2 md:p-3 flex-1 max-w-[35px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px] text-center">
                            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold">{timeDigits.seconds[1]}</div>
                        </div>
                    </div>

                    {/* Set Reminder Button */}
                    {
                        isButton && (
                            <button className="mt-6 bg-[#E7F0D3] cursor-pointer text-gray-800 py-2 px-6 rounded-lg font-medium hover:bg-[#bfc8ad] transition-colors text-xs sm:text-sm md:text-base">
                                Set reminder
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Countdown;