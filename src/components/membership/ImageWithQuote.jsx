import React from "react";

export default function ImageWithQuote({
  imageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  title = "Premium Membership Benefits",
  description = "Join our exclusive community of founders, investors, and creative leaders who shape the future. Access limited opportunities, strategic partnerships, and a network that opens doors to unprecedented growth."
}) {
  return (
    <div className="mt-8 mb-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 p-4">
      {/* Left Image */}
      <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow">
        <img src={imageUrl} alt="visual" className="w-full h-full object-cover" />
      </div>

      {/* Right Text Section */}
      <div className="md:w-1/2 w-full relative">
        {/* Background image positioned behind the title */}

        <h2 className="text-xl md:text-2xl font-semibold text-green-900 mb-3 relative z-10 pt-4">
          {title}
        </h2>
        <div
          className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-no-repeat bg-contain opacity-10 -ml-4 -mt-4 z-1"
          style={{ backgroundImage: "url('/membership/4.png')" }}
        ></div>
        <p className="text-sm md:text-base text-gray-800 leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}