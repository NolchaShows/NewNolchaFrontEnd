import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-5xl 2xl:max-w-7xl">
          {/* Main Heading */}
          <h1 className="text-[32px] lg:text-[64px] 2xl:text-[80px] font-bold mb-8 leading-tight">
            Curated connections for leaders in AI, Web3 & Crypto.
          </h1>
          
          {/* Description */}
          <p className="text-[16px] md:text-[24px] 2xl:text-3xl font-light opacity-90 leading-relaxed">
            We are the destination for innovation & culture for over 15 years.
          </p>
        </div>
      </div>
    </div>
  );
}