import React from 'react';

export default function Hero({ heroData, loading }) {
  // Default values in case data is not available
  const defaultHeading = "Curated connections for leaders in AI, Web3 & Crypto.";
  const defaultDescription = "We are the destination for innovation & culture for over 15 years.";
  const defaultUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Use data from props if available, otherwise use defaults
  const heading = heroData?.heading || defaultHeading;
  const description = heroData?.description || defaultDescription;
  const videoUrl = heroData?.url || defaultUrl;

  // Don't render until we have data or confirmed no data
  if (loading) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoUrl} // Force re-render when URL changes
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-5xl 2xl:max-w-7xl">
          {/* Main Heading */}
          <h1
            className=" text-[32px] lg:text-[64px] 2xl:text-[80px] font-bold mb-8 leading-tight uppercase">
            {heading}
          </h1>


          {/* Description */}
          <p className=" text-[16px] md:text-[24px] 2xl:text-3xl font-normal opacity-90 leading-relaxed">
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}