import React from "react";

export default function ImageWithQuote({
  imageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  title = "Premium Membership Benefits",
  description = "Join our exclusive community of founders, investors, and creative leaders who shape the future. Access limited opportunities, strategic partnerships, and a network that opens doors to unprecedented growth."
}) {
  return (
    <div className="mt-8 mb-8 max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 p-4 lg:p-6 xl:p-8 2xl:p-10">
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 2xl:w-3/5 rounded-xl overflow-hidden shadow">
        <img src={imageUrl} alt="visual" className="w-full h-64 md:h-80 lg:h-96 xl:h-[32rem] 2xl:h-[40rem] object-cover" />
      </div>

      <div className="w-full md:w-1/2 lg:w-3/5 xl:w-3/5 2xl:w-3/5 relative">
        <div
          className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-80 2xl:h-80 bg-no-repeat bg-contain opacity-10 -ml-4 -mt-4 z-1"
          style={{ backgroundImage: "url('/membership/4.png')" }}
        ></div>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-green-900 mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 relative z-10 pt-4 lg:pt-6 xl:pt-8 2xl:pt-10">
          {title}
        </h2>
        
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-800 leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}