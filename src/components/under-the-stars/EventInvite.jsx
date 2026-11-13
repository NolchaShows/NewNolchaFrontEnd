"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/**
 * Event Invite Section (Page 2, 4, 7)
 * - Video with playback controls, poster frame, no autoplay sound
 * - Event story: About the Evening
 * - Schedule: 7-9 PM Art & Networking, 9 PM-1 AM After Party
 */
export default function EventInvite({ eventData }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="event-invite" className="mt-20 lg:mt-32 pt-12 border-t border-[#E2E2DE]">
      {/* Invite Header */}
      <div className="mb-8 text-left">
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] text-[#0B0B0C]">
          Event Invite
        </h2>
        <p className="mt-2 text-[15px] md:text-[16px] text-[#62625F]">
          Embedded video with playback controls
        </p>
      </div>

      {/* Video Container with poster & controls */}
      <div className="relative w-full aspect-video bg-black overflow-hidden border border-[#E2E2DE]">
        <video
          ref={videoRef}
          src={eventData.video.url}
          poster={eventData.video.poster}
          playsInline
          muted={isMuted}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Video Overlay Controls Bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-end p-4 sm:p-6">
          <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 min-h-[44px] bg-white text-[#0B0B0C] font-bold text-[14px] hover:bg-white/90 transition-colors focus:outline-2 focus:outline-[#0B0B0C]"
                aria-label={isPlaying ? "Pause invitation video" : "Play invitation video"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? "Pause invitation" : "Play invitation"}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center justify-center w-11 h-11 bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20 focus:outline-2 focus:outline-white"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <span className="hidden sm:inline-block text-[12px] uppercase font-semibold tracking-wider text-white/80">
              {eventData.video.caption}
            </span>
          </div>
        </div>
      </div>

      {/* About the Evening & Schedule (Page 7) */}
      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
        <div className="md:col-span-6 lg:col-span-7">
          <h3 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight text-[#0B0B0C] uppercase mb-4">
            {eventData.aboutHeading}
          </h3>
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#2A2A29]">
            {eventData.aboutDescription}
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
          {eventData.schedule.map((item, idx) => (
            <div key={idx} className="border-t-2 border-[#0B0B0C] pt-4">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#62625F]">
                {item.time} / {item.label}
              </p>
              <p className="mt-2 text-[15px] sm:text-[16px] text-[#2A2A29] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
